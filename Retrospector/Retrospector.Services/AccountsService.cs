using Microsoft.AspNetCore.Identity;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services.Results;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Retrospector.Services
{
    public class AccountsService
    {
        private const string EmailNullMessage = "Email cannot be null or empty!";
        private const string UserIsFoundMessage = "User with email {0} found!";
        private const string UserCreateFailMessage = "Failed to create new user!";
        private const string UserCreateSuccessMessage = "User with email {0} created successfully!";
        private const string UserNotFoundMessage = "User not found!";
        private const string RoleNameEmptyMessage = "Role must not be empty!";
        private const string AssignedToRoleSuccessMessage = "Successfully assigned user {0} to role {1}";
        private const string AssignToUserRoleFailMessage = "Could not assign user {0} to role!";
        private const string UserRolesCountZeroMessage = "User {0} doesn't have any roles!";
        private const string UserRolesFound = "User {0} has roles!";

        private readonly AccountsRepository _accountsRepository;

        public AccountsService(AccountsRepository accountsRepository)
        {
            _accountsRepository = accountsRepository;
        }
        
        public async Task<ResultData<RetrospectorUser>> LogInUserAsync(string email, string roleName)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<RetrospectorUser>(EmailNullMessage, false);
            }

            if (string.IsNullOrEmpty(roleName))
            {
                return new ResultData<RetrospectorUser>(RoleNameEmptyMessage, false);
            }

            ResultData<RetrospectorUser> result = await CreateUserAsync(email, roleName);

            if (!result.Success)
            {
                return new ResultData<RetrospectorUser>(UserCreateFailMessage, false);
            }

            string message = string.Format(UserIsFoundMessage, email);

            return new ResultData<RetrospectorUser>(message, true, result.Data);
        }

        public async Task<ResultData<RetrospectorUser>> CreateUserAsync(string email, string roleName)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<RetrospectorUser>(EmailNullMessage, false);
            }

            if (string.IsNullOrEmpty(roleName))
            {
                return new ResultData<RetrospectorUser>(RoleNameEmptyMessage, false);
            }

            RetrospectorUser user = await _accountsRepository.GetUserByEmailAsync(email);

            if (user != null)
            {
                string userFoundMessage = string.Format(UserIsFoundMessage, email);
                return new ResultData<RetrospectorUser>(userFoundMessage, true, user);
            }

            user = new RetrospectorUser
            {
                Email = email,
                UserName = email
            };

            IdentityResult identityResult = await _accountsRepository.AddUserAsync(user);

            if (!identityResult.Succeeded)
            {
                return new ResultData<RetrospectorUser>(UserCreateFailMessage, false);
            }

            Result roleResult = await AssginToRoleUserAsync(user, roleName);

            if (!roleResult.Success)
            {
                string roleMessage = string.Format(AssignToUserRoleFailMessage, email);

                return new ResultData<RetrospectorUser>(roleMessage, false);
            }

            string message = string.Format(UserCreateSuccessMessage, user.Email);
            return new ResultData<RetrospectorUser>(message, true, user);
        }

        public async Task<ResultData<IList<string>>> GetUserRolesAsync(RetrospectorUser user)
        {
            if (user == null)
            {
                return new ResultData<IList<string>>(UserNotFoundMessage, false);
            }

            string message;

            IList<string> userRoles = await _accountsRepository.GetUserRolesAsync(user);

            if (userRoles.Count == 0)
            {
                message = string.Format(UserRolesCountZeroMessage, user.Email);
                return new ResultData<IList<string>>(message, false);
            }

            message = string.Format(UserRolesFound, user.Email);
            return new ResultData<IList<string>>(message, true, userRoles);
        }

        private async Task<Result> AssginToRoleUserAsync(RetrospectorUser user, string roleName)
        {
            if (user == null)
            {
                return new Result(UserNotFoundMessage, false);
            }

            if (string.IsNullOrEmpty(roleName))
            {
                return new Result(RoleNameEmptyMessage, false);
            }

            await _accountsRepository.AssignToRoleUserAsync(user, roleName);

            string message = string.Format(AssignedToRoleSuccessMessage, user.Email, roleName);
            return new Result(message, true);
        }
    }
}