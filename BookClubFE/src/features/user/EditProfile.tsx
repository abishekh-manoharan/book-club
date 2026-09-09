import { useEffect, useState } from "react";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";
import { useUpdateProfileMutation } from "./userSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";

interface ProfileForm {
    fName: string;
    bio?: string;
    profileImg: string;
}

function EditProfile() {
    const dispatch = useAppDispatch();

    const { data: userId } = useGetUserIdQuery();

    const { data: user, isLoading, isError } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const [form, setForm] = useState<ProfileForm>({
        fName: "",
        bio: "",
        profileImg: "",
    });

    // Populate the form once the user data arrives.
    useEffect(() => {
        if (!user) return;

        setForm({
            fName: user.fName ?? "",
            bio: user.bio ?? "",
            profileImg: user.profileImg ?? "",
        });
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userId) return;

        try {
            await updateProfile(form).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorMessage = (error.data as string) || "Unknown error";
                dispatch(updateErrorMessageThunk(errorMessage));
            } else if (isSerializedError(error)) {
                dispatch(updateErrorMessageThunk(error.message!));
            } else {
                dispatch(updateErrorMessageThunk("Unknown error occured."));
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !user) {
        return <div>Unable to load profile.</div>;
    }

    return (
        <form
            className="editProfilePage"
            onSubmit={handleSubmit}
        >
            <div className="avatarSection">
                {/* avatar input */}
            </div>

            <div className="displayNameSec">
                <label htmlFor="displayName">
                    Display Name
                </label>

                <input
                    id="displayName"
                    name="fName"
                    value={form.fName}
                    onChange={handleChange}
                />
            </div>

            <div className="bioSection">
                <label htmlFor="bio">
                    Bio
                </label>

                <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}

export default EditProfile;