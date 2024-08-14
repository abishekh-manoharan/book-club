using System;
using System.Collections.Generic;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookClubApi.Data;

public partial class BookClubContext :  IdentityDbContext<ApplicationUser>
{
    public BookClubContext()
    {
    }

    public BookClubContext(DbContextOptions<BookClubContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Club> Clubs { get; set; }

    public virtual DbSet<ClubUser> ClubUsers { get; set; }

    public virtual DbSet<Clubrecommendation> Clubrecommendations { get; set; }

    public virtual DbSet<EfmigrationsHistory> EfmigrationsHistories { get; set; }

    public virtual DbSet<JoinRequest> JoinRequests { get; set; }

    public virtual DbSet<Meeting> Meetings { get; set; }

    public virtual DbSet<Poll> Polls { get; set; }

    public virtual DbSet<Pollbook> Pollbooks { get; set; }

    public virtual DbSet<ProgressType> ProgressTypes { get; set; }

    public virtual DbSet<Reading> Readings { get; set; }

    public virtual DbSet<Readinguser> Readingusers { get; set; }

    public virtual DbSet<Models.Thread> Threads { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserBook> UserBooks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("AspNetRoles", "BookClub");

            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex").IsUnique();

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("AspNetRoleClaims", "BookClub");

            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("AspNetUsers", "BookClub");

            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.LockoutEnd).HasColumnType("datetime");
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PRIMARY");
                        j.ToTable("AspNetUserRoles", "BookClub");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("AspNetUserClaims", "BookClub");

            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey }).HasName("PRIMARY");

            entity.ToTable("AspNetUserLogins", "BookClub");

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name }).HasName("PRIMARY");

            entity.ToTable("AspNetUserTokens", "BookClub");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.BookId).HasName("PRIMARY");

            entity.ToTable("book", "BookClub");

            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.AuthorName)
                .HasMaxLength(255)
                .HasColumnName("author_name");
            entity.Property(e => e.FirstPublishYear).HasColumnName("first_publish_year");
            entity.Property(e => e.NumberOfPagesMedian).HasColumnName("number_of_pages_median");
            entity.Property(e => e.RatingsAverage).HasColumnName("ratings_average");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Club>(entity =>
        {
            entity.HasKey(e => e.ClubId).HasName("PRIMARY");

            entity.ToTable("club", "BookClub");

            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.ProfileImg)
                .HasMaxLength(300)
                .HasColumnName("profile_img");
        });

        modelBuilder.Entity<ClubUser>(entity =>
        {
            entity.HasKey(e => new { e.ClubId, e.UserId }).HasName("PRIMARY");

            entity.ToTable("ClubUser", "BookClub");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Admin).HasColumnName("admin");

            entity.HasOne(d => d.Club).WithMany(p => p.ClubUsers)
                .HasForeignKey(d => d.ClubId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("clubuser_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.ClubUsers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("clubuser_ibfk_2");
        });

        modelBuilder.Entity<Clubrecommendation>(entity =>
        {
            entity.HasKey(e => new { e.ClubId, e.BookId }).HasName("PRIMARY");

            entity.ToTable("clubrecommendations", "BookClub");

            entity.HasIndex(e => e.BookId, "book_id");

            entity.HasIndex(e => e.UserId, "user_id1");

            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.DateAdded)
                .HasColumnType("datetime")
                .HasColumnName("date_added");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Book).WithMany(p => p.Clubrecommendations)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("clubrecommendations_ibfk_3");

            entity.HasOne(d => d.Club).WithMany(p => p.Clubrecommendations)
                .HasForeignKey(d => d.ClubId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("clubrecommendations_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Clubrecommendations)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("clubrecommendations_ibfk_2");
        });

        modelBuilder.Entity<EfmigrationsHistory>(entity =>
        {
            entity.HasKey(e => e.MigrationId).HasName("PRIMARY");

            entity.ToTable("__EFMigrationsHistory", "BookClub");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<JoinRequest>(entity =>
        {
            entity.HasKey(e => new { e.ClubId, e.UserId }).HasName("PRIMARY");

            entity.ToTable("JoinRequest", "BookClub");

            entity.HasIndex(e => e.UserId, "user_id2");

            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Invitation).HasColumnName("invitation");
            entity.Property(e => e.Request).HasColumnName("request");

            entity.HasOne(d => d.Club).WithMany(p => p.JoinRequests)
                .HasForeignKey(d => d.ClubId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("joinrequest_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.JoinRequests)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("joinrequest_ibfk_2");
        });

        modelBuilder.Entity<Meeting>(entity =>
        {
            entity.HasKey(e => e.MeetingId).HasName("PRIMARY");

            entity.ToTable("meetings", "BookClub");

            entity.HasIndex(e => new { e.BookId, e.ClubId }, "book_id1");

            entity.Property(e => e.MeetingId).HasColumnName("meeting_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("end_TIME");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("start_time");

            entity.HasOne(d => d.Reading).WithMany(p => p.Meetings)
                .HasForeignKey(d => new { d.BookId, d.ClubId })
                .HasConstraintName("meetings_ibfk_1");
        });

        modelBuilder.Entity<Poll>(entity =>
        {
            entity.HasKey(e => e.PollId).HasName("PRIMARY");

            entity.ToTable("poll", "BookClub");

            entity.HasIndex(e => e.ClubId, "club_id");

            entity.Property(e => e.PollId).HasColumnName("poll_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.CreatedDate)
                .HasColumnType("datetime")
                .HasColumnName("created_date");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Open).HasColumnName("open");

            entity.HasOne(d => d.Club).WithMany(p => p.Polls)
                .HasForeignKey(d => d.ClubId)
                .HasConstraintName("poll_ibfk_1");

            entity.HasMany(d => d.Users).WithMany(p => p.Polls)
                .UsingEntity<Dictionary<string, object>>(
                    "Polluser",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("polluser_ibfk_2"),
                    l => l.HasOne<Poll>().WithMany()
                        .HasForeignKey("PollId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("polluser_ibfk_1"),
                    j =>
                    {
                        j.HasKey("PollId", "UserId").HasName("PRIMARY");
                        j.ToTable("polluser", "BookClub");
                        j.HasIndex(new[] { "UserId" }, "user_id5");
                        j.IndexerProperty<int>("PollId").HasColumnName("poll_id");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                    });
        });

        modelBuilder.Entity<Pollbook>(entity =>
        {
            entity.HasKey(e => new { e.PollId, e.BookId }).HasName("PRIMARY");

            entity.ToTable("pollbook", "BookClub");

            entity.HasIndex(e => e.BookId, "book_id2");

            entity.Property(e => e.PollId).HasColumnName("poll_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.Votes).HasColumnName("votes");

            entity.HasOne(d => d.Book).WithMany(p => p.Pollbooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pollbook_ibfk_2");

            entity.HasOne(d => d.Poll).WithMany(p => p.Pollbooks)
                .HasForeignKey(d => d.PollId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pollbook_ibfk_1");
        });

        modelBuilder.Entity<ProgressType>(entity =>
        {
            entity.HasKey(e => e.ProgresstypeId).HasName("PRIMARY");

            entity.ToTable("progressType", "BookClub");

            entity.Property(e => e.ProgresstypeId).HasColumnName("progresstype_id");
            entity.Property(e => e.ProgressType1)
                .HasMaxLength(50)
                .HasColumnName("progress_type");
        });

        modelBuilder.Entity<Reading>(entity =>
        {
            entity.HasKey(e => new { e.BookId, e.ClubId }).HasName("PRIMARY");

            entity.ToTable("reading", "BookClub");

            entity.HasIndex(e => e.ClubId, "club_id1");

            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.HasOne(d => d.Book).WithMany(p => p.Readings)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reading_ibfk_1");

            entity.HasOne(d => d.Club).WithMany(p => p.Readings)
                .HasForeignKey(d => d.ClubId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("reading_ibfk_2");
        });

        modelBuilder.Entity<Readinguser>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ClubId, e.BookId }).HasName("PRIMARY");

            entity.ToTable("readinguser", "BookClub");

            entity.HasIndex(e => new { e.BookId, e.ClubId }, "book_id3");

            entity.HasIndex(e => e.ProgresstypeId, "progresstype_id");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.Progress).HasColumnName("progress");
            entity.Property(e => e.ProgresstypeId).HasColumnName("progresstype_id");

            entity.HasOne(d => d.Progresstype).WithMany(p => p.Readingusers)
                .HasForeignKey(d => d.ProgresstypeId)
                .HasConstraintName("readinguser_ibfk_2");

            entity.HasOne(d => d.Reading).WithMany(p => p.Readingusers)
                .HasForeignKey(d => new { d.BookId, d.ClubId })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("readinguser_ibfk_1");
        });

        modelBuilder.Entity<Models.Thread>(entity =>
        {
            entity.HasKey(e => e.ThreadId).HasName("PRIMARY");

            entity.ToTable("thread", "BookClub");

            entity.HasIndex(e => new { e.BookId, e.ClubId }, "book_id4");

            entity.HasIndex(e => e.ParentThreadId, "parent_thread_id");

            entity.HasIndex(e => e.UserId, "user_id3");

            entity.Property(e => e.ThreadId).HasColumnName("thread_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.ParentThreadId).HasColumnName("parent_thread_id");
            entity.Property(e => e.TimePosted)
                .HasColumnType("datetime")
                .HasColumnName("time_posted");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.ParentThread).WithMany(p => p.InverseParentThread)
                .HasForeignKey(d => d.ParentThreadId)
                .HasConstraintName("thread_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.Threads)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("thread_ibfk_1");

            entity.HasOne(d => d.Reading).WithMany(p => p.Threads)
                .HasForeignKey(d => new { d.BookId, d.ClubId })
                .HasConstraintName("thread_ibfk_2");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user", "BookClub");

            entity.HasIndex(e => e.AspnetusersId, "aspnetusers_id");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.AspnetusersId).HasColumnName("aspnetusers_id");
            entity.Property(e => e.Bio)
                .HasMaxLength(200)
                .HasColumnName("bio");
            entity.Property(e => e.FName)
                .HasMaxLength(50)
                .HasColumnName("f_name");
            entity.Property(e => e.LName)
                .HasMaxLength(50)
                .HasColumnName("l_name");
            entity.Property(e => e.ProfileImg)
                .HasMaxLength(300)
                .HasColumnName("profile_img");

            entity.HasOne(d => d.Aspnetusers).WithMany(p => p.Users)
                .HasForeignKey(d => d.AspnetusersId)
                .HasConstraintName("user_ibfk_1");
        });

        modelBuilder.Entity<UserBook>(entity =>
        {
            entity.HasKey(e => new { e.BookId, e.UserId }).HasName("PRIMARY");

            entity.ToTable("UserBook", "BookClub");

            entity.HasIndex(e => e.UserId, "user_id4");

            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.DateAdded)
                .HasColumnType("datetime")
                .HasColumnName("date_added");

            entity.HasOne(d => d.Book).WithMany(p => p.UserBooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("userbook_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.UserBooks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("userbook_ibfk_2");
        });

        OnModelCreatingPartial(modelBuilder);

        base.OnModelCreating(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}