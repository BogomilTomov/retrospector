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

            RetrospectorUser user = await _userRepository.GetUserByIdAsync(userId);
            Team team = await _teamsRepository.GetTeamById(teamId);
            if (user.SelectedTeam == null)
            {
                user.SelectedTeam = new UserSelectedTeam()
                {
                    UserId = user.Id
                };
            }

            user.SelectedTeam.TeamId = teamId;
            await _userRepository.UpdateAsync(user);

            string successMessage = string.Format(SetDefaultTeamSuccessMessage, userId);
            return new ResultData<string>(successMessage, true, userId);
        }
    }
}
