import { useParams } from "react-router-dom";
import { useGetReadingMembersQuery } from "../../readingSlice";
import ReadingMembersListEntry from "./ReadingMembersListEntry";

function ReadingMembersList() {
    const { clubid, bookid } = useParams();
    const clubId = Number(clubid);
    const bookId = Number(bookid);

    const { data: readingMembers } = useGetReadingMembersQuery({ ClubId: clubId, BookId: bookId });

    return (
        <div>
            {readingMembers?.map((ru) => <ReadingMembersListEntry key={ru.fName+" "+ru.lName+" "+ru.bookId+ru.clubId} ReadingUser={ru}/>)}
        </div>
    );
}

export default ReadingMembersList;