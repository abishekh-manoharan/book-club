using System;
using System.Collections.Generic;

namespace BookClubApi.DTOs;

public partial class ReadingUserDTO
{
    public ReadingUserDTO(int userId, int bookId, int clubId, int? progress, int progresstypeId)
    {
        UserId = userId;
        BookId = bookId;
        ClubId = clubId;
        Progress = progress;
        ProgresstypeId = progresstypeId;
    }

    public int UserId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int? Progress { get; set; }

    public int ProgresstypeId { get; set; }

}
