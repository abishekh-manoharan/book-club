import { ReadingUserExpanded } from "../../readingSlice";

function ReadingMembersListEntry({ReadingUser}: {ReadingUser: ReadingUserExpanded}) {
    return (
        <div>
            {ReadingUser.fName}
        </div>
    );
}

export default ReadingMembersListEntry;