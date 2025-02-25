namespace BookClubApi.DTOs;

public class ClubUserDTO {
    public ClubUserDTO(int clubId, int userId, bool admin)
    {
        ClubId = clubId;
        UserId = userId;
        Admin = admin;
    }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public bool Admin { get; set; }

}