using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Retrospector.Data.Repositories
{
    public class TeamsRepository
    {
        private readonly RetrospectorContext _context;

        public TeamsRepository(RetrospectorContext context)
        {
            _context = context;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();
            return team;
        }

        public bool TeamNameAlreadyExists(string name)
        {
            return _context.Teams.Any(t => t.Name == name);
        }

        public bool OwnerExists(string userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        public async Task<List<Team>> GetTeamsAsync(string userId)
        {
            return await _context.Teams
                .Where(t => t.OwnerId == userId || t.TeamUsers.Any(tu => tu.UserId == userId))
                .Include(t => t.RetroGames)
                .OrderBy(t => t.Name)
                .ToListAsync();
        }

        public async Task<int> GetDefaultTeamAsync(string userId)
        {
            RetrospectorUser user = await _context.Users
                .Include(u => u.SelectedTeam)
                .FirstOrDefaultAsync(u => u.SelectedTeam.UserId == userId);
            return user.SelectedTeam.TeamId;
        }
    }
}
