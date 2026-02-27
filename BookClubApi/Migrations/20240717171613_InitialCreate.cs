using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "BookClub");

            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "__EFMigrationsHistory",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         MigrationId = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
            //         ProductVersion = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => x.MigrationId);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false),
                    Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetRoles",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         Id = table.Column<string>(type: "varchar(255)", nullable: false),
            //         Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         NormalizedName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => x.Id);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: true),
                    SecurityStamp = table.Column<string>(type: "longtext", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetime", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetUsers",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         Id = table.Column<string>(type: "varchar(255)", nullable: false),
            //         UserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         NormalizedUserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         Email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         NormalizedEmail = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
            //         EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
            //         PasswordHash = table.Column<string>(type: "longtext", nullable: true),
            //         SecurityStamp = table.Column<string>(type: "longtext", nullable: true),
            //         ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true),
            //         PhoneNumber = table.Column<string>(type: "longtext", nullable: true),
            //         PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
            //         TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
            //         LockoutEnd = table.Column<DateTime>(type: "datetime", nullable: true),
            //         LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
            //         AccessFailedCount = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => x.Id);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "book",
                schema: "BookClub",
                columns: table => new
                {
                    book_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    author_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    first_publish_year = table.Column<int>(type: "int", nullable: true),
                    number_of_pages_median = table.Column<int>(type: "int", nullable: true),
                    ratings_average = table.Column<float>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.book_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "club",
                schema: "BookClub",
                columns: table => new
                {
                    club_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    profile_img = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.club_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "progressType",
                schema: "BookClub",
                columns: table => new
                {
                    progresstype_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    progress_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.progresstype_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(type: "varchar(255)", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetRoleClaims",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
            //         RoleId = table.Column<string>(type: "varchar(255)", nullable: false),
            //         ClaimType = table.Column<string>(type: "longtext", nullable: true),
            //         ClaimValue = table.Column<string>(type: "longtext", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
            //             column: x => x.RoleId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetRoles",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false),
                    ProviderKey = table.Column<string>(type: "varchar(255)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "longtext", nullable: true),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false),
                    RoleId = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false),
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetUserClaims",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
            //         UserId = table.Column<string>(type: "varchar(255)", nullable: false),
            //         ClaimType = table.Column<string>(type: "longtext", nullable: true),
            //         ClaimValue = table.Column<string>(type: "longtext", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_AspNetUserClaims_AspNetUsers_UserId",
            //             column: x => x.UserId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetUsers",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetUserLogins",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false),
            //         ProviderKey = table.Column<string>(type: "varchar(255)", nullable: false),
            //         ProviderDisplayName = table.Column<string>(type: "longtext", nullable: true),
            //         UserId = table.Column<string>(type: "varchar(255)", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => new { x.LoginProvider, x.ProviderKey });
            //         table.ForeignKey(
            //             name: "FK_AspNetUserLogins_AspNetUsers_UserId",
            //             column: x => x.UserId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetUsers",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetUserRoles",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         UserId = table.Column<string>(type: "varchar(255)", nullable: false),
            //         RoleId = table.Column<string>(type: "varchar(255)", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => new { x.UserId, x.RoleId });
            //         table.ForeignKey(
            //             name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
            //             column: x => x.RoleId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetRoles",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_AspNetUserRoles_AspNetUsers_UserId",
            //             column: x => x.UserId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetUsers",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            // migrationBuilder.CreateTable(
            //     name: "AspNetUserTokens",
            //     schema: "BookClub",
            //     columns: table => new
            //     {
            //         UserId = table.Column<string>(type: "varchar(255)", nullable: false),
            //         LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false),
            //         Name = table.Column<string>(type: "varchar(255)", nullable: false),
            //         Value = table.Column<string>(type: "longtext", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PRIMARY", x => new { x.UserId, x.LoginProvider, x.Name });
            //         table.ForeignKey(
            //             name: "FK_AspNetUserTokens_AspNetUsers_UserId",
            //             column: x => x.UserId,
            //             principalSchema: "BookClub",
            //             principalTable: "AspNetUsers",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user",
                schema: "BookClub",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    bio = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    hash = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    salt = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    email = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    f_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    l_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    profile_img = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: true),
                    aspnetusers_id = table.Column<string>(type: "varchar(255)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.user_id);
                    table.ForeignKey(
                        name: "user_ibfk_1",
                        column: x => x.aspnetusers_id,
                        principalSchema: "BookClub",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "poll",
                schema: "BookClub",
                columns: table => new
                {
                    poll_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    club_id = table.Column<int>(type: "int", nullable: true),
                    name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    open = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.poll_id);
                    table.ForeignKey(
                        name: "poll_ibfk_1",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reading",
                schema: "BookClub",
                columns: table => new
                {
                    book_id = table.Column<int>(type: "int", nullable: false),
                    club_id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    description = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.book_id, x.club_id });
                    table.ForeignKey(
                        name: "reading_ibfk_1",
                        column: x => x.book_id,
                        principalSchema: "BookClub",
                        principalTable: "book",
                        principalColumn: "book_id");
                    table.ForeignKey(
                        name: "reading_ibfk_2",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "clubrecommendations",
                schema: "BookClub",
                columns: table => new
                {
                    club_id = table.Column<int>(type: "int", nullable: false),
                    book_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    date_added = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.club_id, x.book_id });
                    table.ForeignKey(
                        name: "clubrecommendations_ibfk_1",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id");
                    table.ForeignKey(
                        name: "clubrecommendations_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "clubrecommendations_ibfk_3",
                        column: x => x.book_id,
                        principalSchema: "BookClub",
                        principalTable: "book",
                        principalColumn: "book_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ClubUser",
                schema: "BookClub",
                columns: table => new
                {
                    club_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    admin = table.Column<bool>(type: "tinyint(1)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.club_id, x.user_id });
                    table.ForeignKey(
                        name: "clubuser_ibfk_1",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id");
                    table.ForeignKey(
                        name: "clubuser_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "JoinRequest",
                schema: "BookClub",
                columns: table => new
                {
                    club_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    request = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    invitation = table.Column<bool>(type: "tinyint(1)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.club_id, x.user_id });
                    table.ForeignKey(
                        name: "joinrequest_ibfk_1",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id");
                    table.ForeignKey(
                        name: "joinrequest_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserBook",
                schema: "BookClub",
                columns: table => new
                {
                    book_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    date_added = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.book_id, x.user_id });
                    table.ForeignKey(
                        name: "userbook_ibfk_1",
                        column: x => x.book_id,
                        principalSchema: "BookClub",
                        principalTable: "book",
                        principalColumn: "book_id");
                    table.ForeignKey(
                        name: "userbook_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "pollbook",
                schema: "BookClub",
                columns: table => new
                {
                    poll_id = table.Column<int>(type: "int", nullable: false),
                    book_id = table.Column<int>(type: "int", nullable: false),
                    votes = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.poll_id, x.book_id });
                    table.ForeignKey(
                        name: "pollbook_ibfk_1",
                        column: x => x.poll_id,
                        principalSchema: "BookClub",
                        principalTable: "poll",
                        principalColumn: "poll_id");
                    table.ForeignKey(
                        name: "pollbook_ibfk_2",
                        column: x => x.book_id,
                        principalSchema: "BookClub",
                        principalTable: "book",
                        principalColumn: "book_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "polluser",
                schema: "BookClub",
                columns: table => new
                {
                    poll_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.poll_id, x.user_id });
                    table.ForeignKey(
                        name: "polluser_ibfk_1",
                        column: x => x.poll_id,
                        principalSchema: "BookClub",
                        principalTable: "poll",
                        principalColumn: "poll_id");
                    table.ForeignKey(
                        name: "polluser_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "meetings",
                schema: "BookClub",
                columns: table => new
                {
                    meeting_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    book_id = table.Column<int>(type: "int", nullable: true),
                    club_id = table.Column<int>(type: "int", nullable: true),
                    start_time = table.Column<DateTime>(type: "datetime", nullable: true),
                    end_TIME = table.Column<DateTime>(type: "datetime", nullable: true),
                    description = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.meeting_id);
                    table.ForeignKey(
                        name: "meetings_ibfk_1",
                        columns: x => new { x.book_id, x.club_id },
                        principalSchema: "BookClub",
                        principalTable: "reading",
                        principalColumns: new[] { "book_id", "club_id" });
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "readinguser",
                schema: "BookClub",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false),
                    book_id = table.Column<int>(type: "int", nullable: false),
                    club_id = table.Column<int>(type: "int", nullable: false),
                    progress = table.Column<int>(type: "int", nullable: true),
                    progresstype_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.user_id, x.club_id, x.book_id });
                    table.ForeignKey(
                        name: "readinguser_ibfk_1",
                        columns: x => new { x.book_id, x.club_id },
                        principalSchema: "BookClub",
                        principalTable: "reading",
                        principalColumns: new[] { "book_id", "club_id" });
                    table.ForeignKey(
                        name: "readinguser_ibfk_2",
                        column: x => x.progresstype_id,
                        principalSchema: "BookClub",
                        principalTable: "progressType",
                        principalColumn: "progresstype_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "thread",
                schema: "BookClub",
                columns: table => new
                {
                    thread_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    parent_thread_id = table.Column<int>(type: "int", nullable: true),
                    book_id = table.Column<int>(type: "int", nullable: true),
                    club_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    time_posted = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.thread_id);
                    table.ForeignKey(
                        name: "thread_ibfk_1",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "thread_ibfk_2",
                        columns: x => new { x.book_id, x.club_id },
                        principalSchema: "BookClub",
                        principalTable: "reading",
                        principalColumns: new[] { "book_id", "club_id" });
                    table.ForeignKey(
                        name: "thread_ibfk_3",
                        column: x => x.parent_thread_id,
                        principalSchema: "BookClub",
                        principalTable: "thread",
                        principalColumn: "thread_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId1",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                schema: "BookClub",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex1",
                schema: "BookClub",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId1",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                schema: "BookClub",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId1",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                schema: "BookClub",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId1",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                schema: "BookClub",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex1",
                schema: "BookClub",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex1",
                schema: "BookClub",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "book_id",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "user_id1",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "user_id",
                schema: "BookClub",
                table: "ClubUser",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "user_id2",
                schema: "BookClub",
                table: "JoinRequest",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "book_id1",
                schema: "BookClub",
                table: "meetings",
                columns: new[] { "book_id", "club_id" });

            migrationBuilder.CreateIndex(
                name: "club_id",
                schema: "BookClub",
                table: "poll",
                column: "club_id");

            migrationBuilder.CreateIndex(
                name: "book_id2",
                schema: "BookClub",
                table: "pollbook",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "user_id5",
                schema: "BookClub",
                table: "polluser",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "club_id1",
                schema: "BookClub",
                table: "reading",
                column: "club_id");

            migrationBuilder.CreateIndex(
                name: "book_id3",
                schema: "BookClub",
                table: "readinguser",
                columns: new[] { "book_id", "club_id" });

            migrationBuilder.CreateIndex(
                name: "progresstype_id",
                schema: "BookClub",
                table: "readinguser",
                column: "progresstype_id");

            migrationBuilder.CreateIndex(
                name: "book_id4",
                schema: "BookClub",
                table: "thread",
                columns: new[] { "book_id", "club_id" });

            migrationBuilder.CreateIndex(
                name: "parent_thread_id",
                schema: "BookClub",
                table: "thread",
                column: "parent_thread_id");

            migrationBuilder.CreateIndex(
                name: "user_id3",
                schema: "BookClub",
                table: "thread",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "aspnetusers_id",
                schema: "BookClub",
                table: "user",
                column: "aspnetusers_id");

            migrationBuilder.CreateIndex(
                name: "user_id4",
                schema: "BookClub",
                table: "UserBook",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "__EFMigrationsHistory",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "clubrecommendations",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "ClubUser",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "JoinRequest",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "meetings",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "pollbook",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "polluser",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "readinguser",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "thread",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "UserBook",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetRoles",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "poll",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "progressType",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "reading",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "user",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "book",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "club",
                schema: "BookClub");

            migrationBuilder.DropTable(
                name: "AspNetUsers",
                schema: "BookClub");
        }
    }
}
