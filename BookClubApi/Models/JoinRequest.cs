namespace BookClubApi.Models;

public partial class JoinRequest
{
    public JoinRequest(int clubId, int userId, bool? request, bool? invitation)
    {
        ClubId = clubId;
        UserId = userId;
        Request = request;
        Invitation = invitation;
    }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public bool? Request { get; set; }

    public bool? Invitation { get; set; }

    public virtual Club Club { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
