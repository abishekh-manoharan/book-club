import { useParams } from "react-router-dom";
import { useGetReadingMembersQuery } from "../readingSlice";

function ReadingMembersList() {
    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const {data} = useGetReadingMembersQuery({ClubId: clubId, BookId: bookId});

    console.log(data);

    return (
        <div>
            Members Listvrv
        </div>
    );
}

export default ReadingMembersList;