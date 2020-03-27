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

        public bool UserExists(string userId)
        {
            return _context.Users.Any(u => u.Id == userId);
        }
    }
}
