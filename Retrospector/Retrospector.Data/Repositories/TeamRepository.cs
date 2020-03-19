using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Retrospector.Data.Repositories
{
    public class TeamRepository
    {
        private readonly RetrospectorContext _context;

        public TeamRepository(RetrospectorContext context)
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
    }
}