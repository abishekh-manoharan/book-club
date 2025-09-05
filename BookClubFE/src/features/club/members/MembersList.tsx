import { useParams } from "react-router-dom";
import { useGetClubUsersQuery } from "../clubSlice";
import MemberListEntry from "./MemberListEntry";

function MembersList() {
    const { clubid } = useParams();
    const { data: clubUsers } = useGetClubUsersQuery({ clubId: Number(clubid) }, { skip: !clubid || isNaN(Number(clubid)) })

    console.log(clubUsers);
    return (
        <>
            {clubUsers &&
                clubUsers.map((cu) => <MemberListEntry aspnetusersId={cu.aspnetusersId}
                    bio={cu.bio}
                    fName={cu.fName}
                    lName={cu.lName}
                    profileImg={cu.profileImg}
                    userId={Number(cu.userId)}
                    admin={cu.admin}
                />)}
        </>
    );
}

export default MembersList;