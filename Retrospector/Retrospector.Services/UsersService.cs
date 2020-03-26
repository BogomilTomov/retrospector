using System.Threading.Tasks;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services.Results;

namespace Retrospector.Services
{
    public class UsersService
    {
        private const string SetDefaultTeamSuccessMessage = "{0}'s default team sucessfully set!";
        private const string TeamDoesntExistMessage = "Team with id {0} doesnt't exist!";
        private const string UserDoesntExistMessage = "User with id {0} doesnt't exist!";
        private const string OwnerIdNullMessage = "OwnerId cannot be null or empty!";

        private readonly UsersRepository _userRepository;
        private readonly TeamsRepository _teamsRepository;

        public UsersService(UsersRepository userRepository, TeamsRepository teamsRepository)
        {
            _userRepository = userRepository;
            _teamsRepository = teamsRepository;
        }

        public async Task<ResultData<string>> SetSelectedTeamAsync(string userId, int teamId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new ResultData<string>(OwnerIdNullMessage, false);
            }

            if (!_userRepository.UserExists(userId))
            {
                string errorMessage = string.Format(UserDoesntExistMessage, userId);
                return new ResultData<string>(errorMessage, false, userId);
            }

            if (!_teamsRepository.TeamExists(teamId))
            {
                string errorMessage = string.Format(TeamDoesntExistMessage, teamId);
                return new ResultData<string>(errorMessage, false, userId);
            }

            if (!await UserHasDefaultTeamSetAsync(userId))
            {
                RetrospectorUser user = await _userRepository.GetUserById(userId);
                user.SelectedTeam = new UserSelectedTeam();
            }

            await _userRepository.SetSelectedTeamAsync(userId, teamId);
            string successMessage = string.Format(SetDefaultTeamSuccessMessage, userId);
            return new ResultData<string>(successMessage, true, userId);
        }

        public async Task<bool> UserHasDefaultTeamSetAsync(string userId)
        {
            return await _teamsRepository.GetDefaultTeamAsync(userId) != 0;
        }
    }
}
