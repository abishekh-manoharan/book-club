import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useGetClubUserQuery } from '../club/clubSlice';
import { useGetUserIdQuery } from '../auth/authSlice';

function CreateMeetingBtn() {
    const { clubid, bookid } = useParams()
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: userId, isSuccess: getUserIsSuccess } = useGetUserIdQuery();

    const { data: clubUser } = useGetClubUserQuery(
        { clubId: clubId, userId: userId as number },
        { skip: !getUserIsSuccess || !userId || !clubId || isNaN(clubId) }
    );
    return (<>
        { clubUser && clubUser.admin &&
            <Link to={`/club/${clubId}/${bookId}/meetings/create`}>
                <div className="circleBtn">
                    <img className="ListHeader-plus" src='/src/assets/images/plusNoCircle.svg' />
                </div>
            </Link>
        }
    </>
    );
}

export default CreateMeetingBtn;