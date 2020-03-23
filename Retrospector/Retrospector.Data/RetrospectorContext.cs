using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;

namespace Retrospector.Data
{
    public class RetrospectorContext : IdentityDbContext<RetrospectorUser>
    {
        public RetrospectorContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }

        public DbSet<RetroGame> RetroGames { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<TeamUser> TeamUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Note>()
                .HasOne(n => n.RetroGame)
                .WithMany(rg => rg.Notes)
                .HasForeignKey("RetroGameId")
                .IsRequired();

            modelBuilder.Entity<Note>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notes)
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<RetroGame>()
                .HasOne(rg => rg.Team)
                .WithMany(t => t.RetroGames)
                .HasForeignKey("TeamId")
                .IsRequired();

            modelBuilder.Entity<TeamUser>()
                .HasOne(tu => tu.Team)
                .WithMany(t => t.TeamUsers)
                .HasForeignKey("TeamId")
                .IsRequired();

            modelBuilder.Entity<TeamUser>()
                .HasOne(tu => tu.User)
                .WithMany(u => u.TeamUsers)
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Owner)
                .WithMany(o => o.OwnedTeams)
                .HasForeignKey("OwnerId")
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RetrospectorUser>()
                .HasOne(ru => ru.SelectedTeam)
                .WithOne(st => st.User)
                .HasForeignKey<UserSelectedTeam>(st => st.UserId);

            modelBuilder.Entity<TeamUser>()
                .HasKey(tu => new { tu.TeamId, tu.UserId });
            
            modelBuilder.Entity<RetroGame>()
                .Property(rg => rg.Name)
                .IsRequired();
            modelBuilder.Entity<RetroGame>()
                .Property(rg => rg.Url)
                .IsRequired();

            modelBuilder.Entity<UserSelectedTeam>()
                .Property(ust => ust.UserId)
                .IsRequired();

            modelBuilder.Entity<Team>()
                .Property(t => t.Name)
                .IsRequired();

            modelBuilder.Entity<Note>()
                .Property(n => n.Text)
                .IsRequired();
            modelBuilder.Entity<Note>()
                .Property(n => n.UserId)
                .IsRequired();
        }
    }
}
