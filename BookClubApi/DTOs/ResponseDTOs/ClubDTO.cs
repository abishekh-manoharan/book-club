namespace BookClubApi.DTOs;

public class ClubDTO
{

    public int ClubId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ProfileImg { get; set; }

    
    public bool Private { get; set; }

    public ClubDTO(int clubId, string? name, string? description, string? profileImg, bool privateArg)
    {
        ClubId = clubId;
        Name = name;
        Description = description;
        ProfileImg = profileImg;
        Private = privateArg;
    }
}