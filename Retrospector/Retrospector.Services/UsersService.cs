using System.Collections.Generic;
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
        private const string UserIdDoesntExistMessage = "User with such ID doesnt't exist!";
        private const string UserEmailDoesntExistMessage = "User with such email doesnt't exist!";
        private const string UsersSuccessMessage = "Users successfully retrieved!";
        private const string UsersAddedToTeamMessage = "User successfully added to team!";
        private const string OwnerIdNullMessage = "OwnerId cannot be null or empty!";
        private const string EmailNullMessage = "Email cannot be null or empty!";
        private const string UserAlreadyInTeamMessage  = "This user is already in this team.";

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

            RetrospectorUser user = await _userRepository.GetUserByIdAsync(userId);
            Team team = await _teamsRepository.GetTeamById(teamId);

            if (user == null)
            {
                return new ResultData<string>(UserIdDoesntExistMessage, false);
            }

            if (team == null)
            {
                return new ResultData<string>(TeamDoesntExistMessage, false);
            }

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

        public async Task<ResultData<IEnumerable<RetrospectorUser>>> GetUsersFilteredBtEmailAsync(string email)
        {
            IEnumerable<RetrospectorUser> users = await _userRepository.GetUsersFilteredByEmailAsync(email);
            string successMessage = string.Format(UsersSuccessMessage, users);
            return new ResultData<IEnumerable<RetrospectorUser>>(successMessage, true, users);
        }

        public async Task<ResultData<string>> AddUserToTeamAsync(string email, int teamId)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<string>(EmailNullMessage, false);
            }

            RetrospectorUser user = await _userRepository.GetUserByEmailAsync(email);
            Team team = await _teamsRepository.GetTeamById(teamId);
            TeamUser teamUser = await _teamsRepository.GetTeamUser(user.Id, teamId);

            if (user == null)
            {
                return new ResultData<string>(UserEmailDoesntExistMessage, false);
            }
            
            if (team == null)
            {
                return new ResultData<string>(TeamDoesntExistMessage, false);
            }

            if (teamUser != null)
            {
                return new ResultData<string>(UserAlreadyInTeamMessage, false);
            }

            teamUser = new TeamUser
            {
                TeamId = teamId,
                UserId = user.Id
            };

            await _userRepository.AddUserToTeamAsync(teamUser);
            return new ResultData<string>(UsersAddedToTeamMessage, true);
        }
    }
}
