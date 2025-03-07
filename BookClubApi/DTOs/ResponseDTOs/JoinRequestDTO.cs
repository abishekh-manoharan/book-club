namespace BookClubApi.DTOs;

public class JoinRequestDTO {
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
}