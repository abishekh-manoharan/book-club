import { useState } from "react";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";
import { useGetFavouritesQuery } from "./userSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useGetReadingUsersOfAUserQuery } from "../reading/readingSlice";
import JoinedReadings from "./JoinedReading";
import Favourites from "./Favourites/Favourites";

interface ProfileForm {
    fName: string;
    bio?: string;
    profileImg: string;
}

function UserProfile() {
    const nav = useNavigate()
    const { userId } = useParams();
    const [joinedReadingsHidden, setJoinedReadingsHidden] = useState(false);
    const { data: loggedInUserId } = useGetUserIdQuery();

    const { data: user, isLoading: isGetUserLoading, isError: isGetUserError } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const { data: favourites } = useGetFavouritesQuery(Number(userId), {
        skip: !userId,
    });

    const { data: readingUsersOfUser } = useGetReadingUsersOfAUserQuery(userId);

    if (isGetUserLoading) {
        return <div>Loading...</div>;
    }

    if (isGetUserError || !user) {
        return <div>Unable to load profile.</div>;
    }

    const toggleJoinedReadingsList = () => {
        setJoinedReadingsHidden((state) => !state);
    }

    const editProfileBtnClickHandler = () => {
        nav("/editProfile")
    }

    console.log(favourites)
    return (
        <div
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
            <br />

            <div className="bioSection">
                <label htmlFor="bio">
                    <h2>Biography</h2>
                </label>
                {user.bio && user.bio != "" ? <div className="bio" id="bio">
                    {user.bio}
                </div> :
                    <><i className="smallText">User hasn't added a biography</i></>
                }
            </div>
            <br />

            <Favourites favourites={favourites} profileIsUserAgents={loggedInUserId == userId} />
            <br />
            <div className="readingsListHeader" onClick={toggleJoinedReadingsList}>
                {joinedReadingsHidden ? <img className="readingsListHeader-plus" src='/src/assets/images/plus.svg' /> :
                    <img className="ListHeader-plus" src='/src/assets/images/minus.svg' />}
                <h2>Joined Readings</h2>
            </div>
            <div className="readingsListJoinedReadings" hidden={joinedReadingsHidden}>
                {
                    readingUsersOfUser && readingUsersOfUser!.map((reading) => {
                        return <JoinedReadings key={reading.bookId + reading.clubId - 1} bookId={reading.bookId} clubId={reading.clubId} progress={reading.progress!} progressTotal={reading.progressTotal} progresstypeId={reading.progresstypeId} profileIsUserAgents={loggedInUserId == userId} />;
                    })
                } <br />
            </div>

            {loggedInUserId == userId && <div className="editProfileBtn button" onClick={editProfileBtnClickHandler}>
                Edit Profile
            </div>}
        </div>
    );
}

export default UserProfile;