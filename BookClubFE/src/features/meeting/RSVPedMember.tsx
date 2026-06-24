function RSVPedMember({ fName, lName }: {fName: string, lName: string}) {
    return (
        <span className="rsvpedMember">
            {fName} {lName}
        </span>
    );
}

export default RSVPedMember;