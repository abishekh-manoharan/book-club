import { useGetClubUserQuery } from "../../../../features/club/clubSlice";
import Progress from "../../ActiveReadings/Progress";
import { ReadingUserExpanded } from "../../readingSlice";

function ReadingMembersListEntry({ ReadingUser: ru }: { ReadingUser: ReadingUserExpanded }) {
    const {data: cu} = useGetClubUserQuery({ userId: ru.userId, clubId: ru.clubId});

    return (
        <div className="memberListEntry">
            <div className="memberListEntryDetails">
                <img src="https://placecats.com/100/100" className="profilePicture" alt='member profile picture' />
                <div className="name inline">{ru.fName} {ru.lName}</div>
                <div className="adminStatus inline">{cu?.admin ? <img src="/src/assets/images/key.svg" /> : ""}</div>
            </div>
            <Progress key={ru.userId} bookId={ru.bookId} clubId={ru.clubId} progress={ru.progress} progressTotal={ru.progressTotal} progresstypeId={ru.progresstypeId} updateOption={true}/>
            <div className="line" />
        </div>
    );
}

export default ReadingMembersListEntry;