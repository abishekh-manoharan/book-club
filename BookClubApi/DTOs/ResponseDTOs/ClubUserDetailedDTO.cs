namespace BookClubApi.DTOs;
public class ClubUserDetailedDTO {
    private bool? admin;

    public ClubUserDetailedDTO (int clubId, int userId, bool? admin, string? bio, string? fName, string? lName, string? profileImg, string? aspnetusersId = null)
    {
        ClubId = clubId;
        UserId = userId;
        Admin = admin;
        Bio = bio;
        FName = fName;
        LName = lName;
        ProfileImg = profileImg;
        AspnetusersId = aspnetusersId;
    }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public bool? Admin { get; set; }

    public string? Bio { get; set; }

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }

    public string? AspnetusersId { get; set; }
}