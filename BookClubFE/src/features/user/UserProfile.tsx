import { useEffect, useState } from "react";
import { useGetUserIdQuery, useGetUserQuery } from "../auth/authSlice";
import { useGetFavouritesQuery, useUpdateProfileMutation } from "./userSlice";
import { isFetchBaseQueryError, isSerializedError } from "../../app/typeGuards";
import { updateErrorMessageThunk } from "../error/errorSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import Book from "./Book";
import { useGetReadingUsersOfAUserQuery, useGetReadingUsersOfLoggedInUsersQuery } from "../reading/readingSlice";
import JoinedReadings from "./JoinedReading";

interface ProfileForm {
    fName: string;
    bio?: string;
    profileImg: string;
}

function UserProfile() {
    const dispatch = useAppDispatch();
    const nav = useNavigate()
    const { userId } = useParams();
    const [joinedReadingsHidden, setJoinedReadingsHidden] = useState(false);
    const { data: loggedInUserId } = useGetUserIdQuery();

    const { data: user, isLoading: isGetUserLoading, isError: isGetUserError } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const { data: favourites, isLoading: usGetFavouritesLoading, isError: isGetFavouritesError } = useGetFavouritesQuery(Number(userId), {
        skip: !userId,
    });

    const { data: readingUsersOfUser, isFetching: isFetchingReadingUsersOfLoggedInUser, isSuccess } = useGetReadingUsersOfAUserQuery(userId);


    if (isGetUserLoading) {
        return <div>Loading...</div>;
    }

    if (isGetUserError || !user) {
        return <div>Unable to load profile.</div>;
    }
    const toggleJoinedReadingsList = () => {
        setJoinedReadingsHidden((state) => !state);
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

            readings user is a part of
            <div className="readingsListHeader" onClick={toggleJoinedReadingsList}>
                {joinedReadingsHidden ? <img className="readingsListHeader-plus" src='src/assets/images/plus.svg' /> :
                    <img className="ListHeader-plus" src='src/assets/images/minus.svg' />}
                <h2>Joined Readings</h2>
            </div>
            <div className="readingsListJoinedReadings" hidden={joinedReadingsHidden}>
                {
                    readingUsersOfUser && readingUsersOfUser!.map((reading) => {
                        return <JoinedReadings key={reading.bookId + reading.clubId - 1} bookId={reading.bookId} clubId={reading.clubId} progress={reading.progress!} progressTotal={reading.progressTotal} progresstypeId={reading.progresstypeId} profileIsUserAgents={loggedInUserId==userId}/>;
                    })
                } <br />
            </div>

        </div>
    );
}

export default UserProfile;