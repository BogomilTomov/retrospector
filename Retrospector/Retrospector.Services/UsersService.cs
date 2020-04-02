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

        public async Task<ResultData<RetrospectorUser>> AddUserToTeamAsync(string email, int teamId)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new ResultData<RetrospectorUser>(EmailNullMessage, false);
            }

            RetrospectorUser user = await _userRepository.GetUserByEmailAsync(email);
            Team team = await _teamsRepository.GetTeamById(teamId);

            if (user == null)
            {
                return new ResultData<RetrospectorUser>(UserEmailDoesntExistMessage, false);
            }
            
            if (team == null)
            {
                return new ResultData<RetrospectorUser>(TeamDoesntExistMessage, false);
            }
            
            TeamUser teamUser = await _teamsRepository.GetTeamUser(user.Id, teamId);

            if (teamUser != null)
            {
                return new ResultData<RetrospectorUser>(UserAlreadyInTeamMessage, false);
            }

            teamUser = new TeamUser
            {
                TeamId = teamId,
                UserId = user.Id
            };

            await _userRepository.AddUserToTeamAsync(teamUser);
            return new ResultData<RetrospectorUser>(UsersAddedToTeamMessage, true, user);
        }

        public async Task<ResultData<IEnumerable<RetrospectorUser>>> GetUsersInTeamAsync(int teamId)
        {
            Team team = await _teamsRepository.GetTeamById(teamId);

            if (team == null)
            {
                return new ResultData<IEnumerable<RetrospectorUser>>(TeamDoesntExistMessage, false);
            }

            IEnumerable<RetrospectorUser> users = await _userRepository.GetUsersInTeamAsync(teamId);
            return new ResultData<IEnumerable<RetrospectorUser>>(UsersAddedToTeamMessage, true, users);
        }
    }
}
