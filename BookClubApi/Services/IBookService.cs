using BookClubApi.Models;

public interface IBookService {
    public Task AddBookToDbIfNeeded(Book book);
}