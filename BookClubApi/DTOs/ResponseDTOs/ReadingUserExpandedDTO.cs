namespace BookClubApi.DTOs;

public class ReadingUserExpandedDTO
{
    public ReadingUserExpandedDTO(int userId, int bookId, int clubId, int progress, int? progressTotal, int progresstypeId, string? fName, string? lName, string? profileImg, string? aspnetusersId = null)
    {
        UserId = userId;
        BookId = bookId;
        ClubId = clubId;
        Progress = progress;
        ProgresstypeId = progresstypeId;
        ProgressTotal = progressTotal;
        FName = fName;
        LName = lName;
        ProfileImg = profileImg;
        AspnetusersId = aspnetusersId;
    }

    public int UserId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int Progress { get; set; }

    public int? ProgressTotal { get; set; }

    public int ProgresstypeId { get; set; }

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }

    public string? AspnetusersId { get; set; }

}
