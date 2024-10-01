namespace BookClubApi.DTOs;

class PollBookDTO
{
    public PollBookDTO(int pollId, int bookId, int? votes)
    {
        PollId = pollId;
        BookId = bookId;
        Votes = votes;
    }

    public int PollId { get; set; }

    public int BookId { get; set; }

    public int? Votes { get; set; }
}