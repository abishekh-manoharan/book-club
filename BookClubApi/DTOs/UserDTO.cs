namespace BookClubApi.DTOs;

public class UserDTO
{
    public int UserId { get; set; }

    public string? Bio { get; set; }

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }

    public string? AspnetusersId { get; set; }

    public UserDTO(int userId, string? bio, string? fName, string? lName, string? profileImg, string? aspnetusersId)
    {
        UserId = userId;
        Bio = bio;
        FName = fName;
        LName = lName;
        ProfileImg = profileImg;
        AspnetusersId = aspnetusersId;
    }
}