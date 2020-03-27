using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;

namespace Retrospector.Data.Repositories
{
    public class AccountsRepository
    {
        private readonly UserManager<RetrospectorUser> _userManager;

        public AccountsRepository(UserManager<RetrospectorUser> usermanager)
        {
            _userManager = usermanager;
        }

        public async Task<IdentityResult> AddUserAsync(RetrospectorUser user)
        {
            return await _userManager.CreateAsync(user);
        }

        public async Task<RetrospectorUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IList<string>> GetUserRolesAsync(RetrospectorUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task AssignToRoleUserAsync(RetrospectorUser user, string rolename)
        {
            await _userManager.AddToRoleAsync(user, rolename);
        }
    }
}