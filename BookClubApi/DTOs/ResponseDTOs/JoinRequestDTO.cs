namespace BookClubApi.DTOs;

public class JoinRequestDTO
{
    public JoinRequestDTO(int clubId, int userId, bool request, bool invitation, string userName, string fName, string lName)
    {
        ClubId = clubId;
        UserId = userId;
        Request = request;
        Invitation = invitation;
        UserName = userName;
        FName = fName;
        LName = lName;
    }
    public JoinRequestDTO(int clubId, int userId, bool request, bool invitation)
    {
        ClubId = clubId;
        UserId = userId;
        Request = request;
        Invitation = invitation;
    }

    public int ClubId { get; set; }
    public int UserId { get; set; }
    public bool Request { get; set; }
    public bool Invitation { get; set; }
    public string? UserName { get; set; } = null;
    public string? FName { get; set; } = null;
    public string? LName { get; set; } = null;

}