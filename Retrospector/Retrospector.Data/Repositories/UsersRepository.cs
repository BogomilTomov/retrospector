using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;

namespace Retrospector.Data.Repositories
{
    public class UsersRepository
    {
        private readonly RetrospectorContext _context;

        public UsersRepository(RetrospectorContext context)
        {
            _context = context;
        }

        public async Task<RetrospectorUser> UpdateAsync(RetrospectorUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<RetrospectorUser> GetUserByIdAsync(string userId)
        {
            return await _context.Users
                .Include(u => u.SelectedTeam)
                .SingleOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<RetrospectorUser> GetUserWithTeamUsersAsync(string userId)
        {
            return await _context.Users
                .Include(u => u.TeamUsers)
                .SingleOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<RetrospectorUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<RetrospectorUser>> GetUsersFilteredByEmailAsync(string email)
        {
            return await _context.Users
                .Where(u => u.Email.StartsWith(email))
                .ToListAsync();
        }

        public async Task<TeamUser> AddUserToTeamAsync(TeamUser teamUser)
        {
            await _context.TeamUsers.AddAsync(teamUser);
            await _context.SaveChangesAsync();
            return teamUser;
        }

        public async Task<IEnumerable<RetrospectorUser>> GetUsersInTeamAsync(int teamId)
        {
            return await _context.Users
                .Include(u => u.TeamUsers)
                .Where(u => u.TeamUsers.Any(tu => tu.TeamId == teamId) == true)
                .ToListAsync();
        }

        public bool UserExists(string userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }

        public bool UserEmailExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
    }
}
