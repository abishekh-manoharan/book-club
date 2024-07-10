﻿// <auto-generated />
using System;
using BookClubApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BookClubApi.Migrations
{
    [DbContext(typeof(BookClubContext))]
    partial class BookClubContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BookClubApi.Models.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<string>("AuthorName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("author_name");

                    b.Property<int?>("FirstPublishYear")
                        .HasColumnType("int")
                        .HasColumnName("first_publish_year");

                    b.Property<int?>("NumberOfPagesMedian")
                        .HasColumnType("int")
                        .HasColumnName("number_of_pages_median");

                    b.Property<float?>("RatingsAverage")
                        .HasColumnType("float")
                        .HasColumnName("ratings_average");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("title");

                    b.HasKey("BookId")
                        .HasName("PRIMARY");

                    b.ToTable("book", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Club", b =>
                {
                    b.Property<int>("ClubId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.Property<string>("ProfileImg")
                        .HasMaxLength(300)
                        .HasColumnType("varchar(300)")
                        .HasColumnName("profile_img");

                    b.HasKey("ClubId")
                        .HasName("PRIMARY");

                    b.ToTable("club", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.ClubUser", b =>
                {
                    b.Property<int>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.Property<bool?>("Admin")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("admin");

                    b.HasKey("ClubId", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "user_id");

                    b.ToTable("ClubUser", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Clubrecommendation", b =>
                {
                    b.Property<int>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<DateTime?>("DateAdded")
                        .HasColumnType("datetime")
                        .HasColumnName("date_added");

                    b.Property<int?>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("ClubId", "BookId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId" }, "book_id");

                    b.HasIndex(new[] { "UserId" }, "user_id")
                        .HasDatabaseName("user_id1");

                    b.ToTable("clubrecommendations", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.JoinRequest", b =>
                {
                    b.Property<int>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.Property<bool?>("Invitation")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("invitation");

                    b.Property<bool?>("Request")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("request");

                    b.HasKey("ClubId", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "user_id")
                        .HasDatabaseName("user_id2");

                    b.ToTable("JoinRequest", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Meeting", b =>
                {
                    b.Property<int>("MeetingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("meeting_id");

                    b.Property<int?>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int?>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("description");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime")
                        .HasColumnName("end_TIME");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("datetime")
                        .HasColumnName("start_time");

                    b.HasKey("MeetingId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId", "ClubId" }, "book_id")
                        .HasDatabaseName("book_id1");

                    b.ToTable("meetings", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Poll", b =>
                {
                    b.Property<int>("PollId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("poll_id");

                    b.Property<int?>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime")
                        .HasColumnName("created_date");

                    b.Property<string>("Name")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<bool?>("Open")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("open");

                    b.HasKey("PollId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "ClubId" }, "club_id");

                    b.ToTable("poll", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Pollbook", b =>
                {
                    b.Property<int>("PollId")
                        .HasColumnType("int")
                        .HasColumnName("poll_id");

                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int?>("Votes")
                        .HasColumnType("int")
                        .HasColumnName("votes");

                    b.HasKey("PollId", "BookId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId" }, "book_id")
                        .HasDatabaseName("book_id2");

                    b.ToTable("pollbook", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.ProgressType", b =>
                {
                    b.Property<int>("ProgresstypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("progresstype_id");

                    b.Property<string>("ProgressType1")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("progress_type");

                    b.HasKey("ProgresstypeId")
                        .HasName("PRIMARY");

                    b.ToTable("progressType", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Reading", b =>
                {
                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<string>("Description")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("name");

                    b.HasKey("BookId", "ClubId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "ClubId" }, "club_id")
                        .HasDatabaseName("club_id1");

                    b.ToTable("reading", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Readinguser", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.Property<int>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int?>("Progress")
                        .HasColumnType("int")
                        .HasColumnName("progress");

                    b.Property<int?>("ProgresstypeId")
                        .HasColumnType("int")
                        .HasColumnName("progresstype_id");

                    b.HasKey("UserId", "ClubId", "BookId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId", "ClubId" }, "book_id")
                        .HasDatabaseName("book_id3");

                    b.HasIndex(new[] { "ProgresstypeId" }, "progresstype_id");

                    b.ToTable("readinguser", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.Thread", b =>
                {
                    b.Property<int>("ThreadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("thread_id");

                    b.Property<int?>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int?>("ClubId")
                        .HasColumnType("int")
                        .HasColumnName("club_id");

                    b.Property<int?>("ParentThreadId")
                        .HasColumnType("int")
                        .HasColumnName("parent_thread_id");

                    b.Property<DateTime?>("TimePosted")
                        .HasColumnType("datetime")
                        .HasColumnName("time_posted");

                    b.Property<int?>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("ThreadId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId", "ClubId" }, "book_id")
                        .HasDatabaseName("book_id4");

                    b.HasIndex(new[] { "ParentThreadId" }, "parent_thread_id");

                    b.HasIndex(new[] { "UserId" }, "user_id")
                        .HasDatabaseName("user_id3");

                    b.ToTable("thread", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.Property<string>("Bio")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("bio");

                    b.Property<string>("Email")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("email");

                    b.Property<string>("FName")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("f_name");

                    b.Property<string>("Hash")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("hash");

                    b.Property<string>("LName")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("l_name");

                    b.Property<string>("ProfileImg")
                        .HasMaxLength(300)
                        .HasColumnType("varchar(300)")
                        .HasColumnName("profile_img");

                    b.Property<string>("Salt")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)")
                        .HasColumnName("salt");

                    b.Property<string>("Username")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("username");

                    b.HasKey("UserId")
                        .HasName("PRIMARY");

                    b.ToTable("user", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.UserBook", b =>
                {
                    b.Property<int>("BookId")
                        .HasColumnType("int")
                        .HasColumnName("book_id");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.Property<DateTime?>("DateAdded")
                        .HasColumnType("datetime")
                        .HasColumnName("date_added");

                    b.HasKey("BookId", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "user_id")
                        .HasDatabaseName("user_id4");

                    b.ToTable("UserBook", "BookClub");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Polluser", b =>
                {
                    b.Property<int>("PollId")
                        .HasColumnType("int")
                        .HasColumnName("poll_id");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("PollId", "UserId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "user_id")
                        .HasDatabaseName("user_id5");

                    b.ToTable("polluser", "BookClub");
                });

            modelBuilder.Entity("BookClubApi.Models.ClubUser", b =>
                {
                    b.HasOne("BookClubApi.Models.Club", "Club")
                        .WithMany("ClubUsers")
                        .HasForeignKey("ClubId")
                        .IsRequired()
                        .HasConstraintName("clubuser_ibfk_1");

                    b.HasOne("BookClubApi.Models.User", "User")
                        .WithMany("ClubUsers")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("clubuser_ibfk_2");

                    b.Navigation("Club");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BookClubApi.Models.Clubrecommendation", b =>
                {
                    b.HasOne("BookClubApi.Models.Book", "Book")
                        .WithMany("Clubrecommendations")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("clubrecommendations_ibfk_3");

                    b.HasOne("BookClubApi.Models.Club", "Club")
                        .WithMany("Clubrecommendations")
                        .HasForeignKey("ClubId")
                        .IsRequired()
                        .HasConstraintName("clubrecommendations_ibfk_1");

                    b.HasOne("BookClubApi.Models.User", "User")
                        .WithMany("Clubrecommendations")
                        .HasForeignKey("UserId")
                        .HasConstraintName("clubrecommendations_ibfk_2");

                    b.Navigation("Book");

                    b.Navigation("Club");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BookClubApi.Models.JoinRequest", b =>
                {
                    b.HasOne("BookClubApi.Models.Club", "Club")
                        .WithMany("JoinRequests")
                        .HasForeignKey("ClubId")
                        .IsRequired()
                        .HasConstraintName("joinrequest_ibfk_1");

                    b.HasOne("BookClubApi.Models.User", "User")
                        .WithMany("JoinRequests")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("joinrequest_ibfk_2");

                    b.Navigation("Club");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BookClubApi.Models.Meeting", b =>
                {
                    b.HasOne("BookClubApi.Models.Reading", "Reading")
                        .WithMany("Meetings")
                        .HasForeignKey("BookId", "ClubId")
                        .HasConstraintName("meetings_ibfk_1");

                    b.Navigation("Reading");
                });

            modelBuilder.Entity("BookClubApi.Models.Poll", b =>
                {
                    b.HasOne("BookClubApi.Models.Club", "Club")
                        .WithMany("Polls")
                        .HasForeignKey("ClubId")
                        .HasConstraintName("poll_ibfk_1");

                    b.Navigation("Club");
                });

            modelBuilder.Entity("BookClubApi.Models.Pollbook", b =>
                {
                    b.HasOne("BookClubApi.Models.Book", "Book")
                        .WithMany("Pollbooks")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("pollbook_ibfk_2");

                    b.HasOne("BookClubApi.Models.Poll", "Poll")
                        .WithMany("Pollbooks")
                        .HasForeignKey("PollId")
                        .IsRequired()
                        .HasConstraintName("pollbook_ibfk_1");

                    b.Navigation("Book");

                    b.Navigation("Poll");
                });

            modelBuilder.Entity("BookClubApi.Models.Reading", b =>
                {
                    b.HasOne("BookClubApi.Models.Book", "Book")
                        .WithMany("Readings")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("reading_ibfk_1");

                    b.HasOne("BookClubApi.Models.Club", "Club")
                        .WithMany("Readings")
                        .HasForeignKey("ClubId")
                        .IsRequired()
                        .HasConstraintName("reading_ibfk_2");

                    b.Navigation("Book");

                    b.Navigation("Club");
                });

            modelBuilder.Entity("BookClubApi.Models.Readinguser", b =>
                {
                    b.HasOne("BookClubApi.Models.ProgressType", "Progresstype")
                        .WithMany("Readingusers")
                        .HasForeignKey("ProgresstypeId")
                        .HasConstraintName("readinguser_ibfk_2");

                    b.HasOne("BookClubApi.Models.Reading", "Reading")
                        .WithMany("Readingusers")
                        .HasForeignKey("BookId", "ClubId")
                        .IsRequired()
                        .HasConstraintName("readinguser_ibfk_1");

                    b.Navigation("Progresstype");

                    b.Navigation("Reading");
                });

            modelBuilder.Entity("BookClubApi.Models.Thread", b =>
                {
                    b.HasOne("BookClubApi.Models.Thread", "ParentThread")
                        .WithMany("InverseParentThread")
                        .HasForeignKey("ParentThreadId")
                        .HasConstraintName("thread_ibfk_3");

                    b.HasOne("BookClubApi.Models.User", "User")
                        .WithMany("Threads")
                        .HasForeignKey("UserId")
                        .HasConstraintName("thread_ibfk_1");

                    b.HasOne("BookClubApi.Models.Reading", "Reading")
                        .WithMany("Threads")
                        .HasForeignKey("BookId", "ClubId")
                        .HasConstraintName("thread_ibfk_2");

                    b.Navigation("ParentThread");

                    b.Navigation("Reading");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BookClubApi.Models.UserBook", b =>
                {
                    b.HasOne("BookClubApi.Models.Book", "Book")
                        .WithMany("UserBooks")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("userbook_ibfk_1");

                    b.HasOne("BookClubApi.Models.User", "User")
                        .WithMany("UserBooks")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("userbook_ibfk_2");

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Polluser", b =>
                {
                    b.HasOne("BookClubApi.Models.Poll", null)
                        .WithMany()
                        .HasForeignKey("PollId")
                        .IsRequired()
                        .HasConstraintName("polluser_ibfk_1");

                    b.HasOne("BookClubApi.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("polluser_ibfk_2");
                });

            modelBuilder.Entity("BookClubApi.Models.Book", b =>
                {
                    b.Navigation("Clubrecommendations");

                    b.Navigation("Pollbooks");

                    b.Navigation("Readings");

                    b.Navigation("UserBooks");
                });

            modelBuilder.Entity("BookClubApi.Models.Club", b =>
                {
                    b.Navigation("ClubUsers");

                    b.Navigation("Clubrecommendations");

                    b.Navigation("JoinRequests");

                    b.Navigation("Polls");

                    b.Navigation("Readings");
                });

            modelBuilder.Entity("BookClubApi.Models.Poll", b =>
                {
                    b.Navigation("Pollbooks");
                });

            modelBuilder.Entity("BookClubApi.Models.ProgressType", b =>
                {
                    b.Navigation("Readingusers");
                });

            modelBuilder.Entity("BookClubApi.Models.Reading", b =>
                {
                    b.Navigation("Meetings");

                    b.Navigation("Readingusers");

                    b.Navigation("Threads");
                });

            modelBuilder.Entity("BookClubApi.Models.Thread", b =>
                {
                    b.Navigation("InverseParentThread");
                });

            modelBuilder.Entity("BookClubApi.Models.User", b =>
                {
                    b.Navigation("ClubUsers");

                    b.Navigation("Clubrecommendations");

                    b.Navigation("JoinRequests");

                    b.Navigation("Threads");

                    b.Navigation("UserBooks");
                });
#pragma warning restore 612, 618
        }
    }
}
