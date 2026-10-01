import { useEffect, useState } from "react";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";
import { useGetFavouritesQuery, useUpdateProfileMutation } from "./userSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import Book from "./Book";
import { useGetReadingUsersOfLoggedInUsersQuery } from "../reading/readingSlice";

interface ProfileForm {
    fName: string;
    bio?: string;
    profileImg: string;
}

function UserProfile() {
    const dispatch = useAppDispatch();
    const nav = useNavigate()
    const { userId } = useParams();
    // const { data: loggedInUserId } = useGetUserIdQuery();

    const { data: user, isLoading: isGetUserLoading, isError: isGetUserError } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const { data: favourites, isLoading: usGetFavouritesLoading, isError: isGetFavouritesError } = useGetFavouritesQuery(Number(userId), {
        skip: !userId,
    });

    console.log(user)

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


    if (isGetUserLoading) {
        return <div>Loading...</div>;
    }

    if (isGetUserError || !user) {
        return <div>Unable to load profile.</div>;
    }

    const editBtnClickHandler = () => {
        nav("/create");
    }
    console.log(favourites)
    return (
        <form
            className="profilePage"
        >
            <div className="avatarSection">
                <img className="profilePicture" src={user.profileImg} />
                <h1 className="displayNameSec">
                    {user.fName || user.username}
                </h1>
                <div className="displayNameSec">
                    {user.username}
                </div>
            </div>


            {user.bio &&
                <div className="bioSection">
                    <label htmlFor="bio">
                        About
                    </label>
                    <div className="bio" id="bio">
                        {user.bio}
                    </div>
                </div>
            }
            <br />
            fav books
            <div className="favouriteBooks">
                {favourites != undefined ? favourites.map((f) => <Book book={f} />) : <>no favs</>}
            </div>


        </form>
    );
}

export default UserProfile;