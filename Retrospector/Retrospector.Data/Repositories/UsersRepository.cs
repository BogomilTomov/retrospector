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

        public async Task<string> SetSelectedTeamAsync(string userId, int teamId)
        {
            RetrospectorUser user = await _context.Users
                .Include(u => u.SelectedTeam)
                .SingleOrDefaultAsync(u => u.Id == userId);
            user.SelectedTeam.TeamId = teamId;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return userId;
        }

        public async Task<RetrospectorUser> GetUserById(string userId)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);
        }

        public bool UserExists(string userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }
    }
}
