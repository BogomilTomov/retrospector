using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services.Results;

namespace Retrospector.Services
{
    public class TeamsService
    {
        private const string TeamNullMessage = "Team cannot be null or empty!";
        private const string OwnerIdNullMessage = "OwnerId cannot be null or empty!";
        private const string CreationDateNullMessage = "CreationDate cannot be null or empty!";
        private const string TeamCreateSuccessMessage = "Team with email {0} created successfully!";
        private const string TeamNameExistsMessage = "Team with name {0} already exists!";
        private const string UserDoesntExistMessage = "User with id {0} doesnt't exist!";
        private const string GetTeamsSuccessMessage = "{0}'s teams successfully retrieved!";
        private const string GetDefaultTeamSuccessMessage = "{0}'s default team sucessfully retrieved!";
        private const string TeamDoesntExistMessage = "Team with id {0} doesnt't exist!";
        
        private readonly UsersRepository _userRepository;
        private readonly TeamsRepository _teamRepository;

        public TeamsService(UsersRepository userRepository, TeamsRepository teamRepository)
        {
            _userRepository = userRepository;
            _teamRepository = teamRepository;
        }

        public async Task<ResultData<Team>> CreateTeamAsync(string name, string ownerId, DateTime creationDate)
        {
            if (string.IsNullOrEmpty(name))
            {
                return new ResultData<Team>(TeamNullMessage, false);
            }

            if (string.IsNullOrEmpty(ownerId))
            {
                return new ResultData<Team>(OwnerIdNullMessage, false);
            }

            if (string.IsNullOrEmpty(creationDate.ToString()))
            {
                return new ResultData<Team>(CreationDateNullMessage, false);
            }

            Team newTeam = new Team()
            {
                Name = name,
                OwnerId = ownerId,
                CreationDate = creationDate
            };

            if (!_userRepository.UserExists(ownerId))
            {
                string errorMessage = string.Format(UserDoesntExistMessage, ownerId);
                return new ResultData<Team>(errorMessage, false, newTeam);
            }

            if (_teamRepository.TeamNameAlreadyExists(newTeam.Name))
            {
                string errorMessage = string.Format(TeamNameExistsMessage, newTeam.Name);
                return new ResultData<Team>(errorMessage, false, newTeam);
            }

            Team team = await _teamRepository.CreateTeamAsync(newTeam);
            string successMessage = string.Format(TeamCreateSuccessMessage, team.Id);
            return new ResultData<Team>(successMessage, true, team);
        }

        public async Task<ResultData<IList<Team>>> GetTeamsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new ResultData<IList<Team>>(OwnerIdNullMessage, false);
            }

            IList<Team> Teams = await _teamRepository.GetTeamsAsync(userId);
            string successMessage = string.Format(GetTeamsSuccessMessage, userId);
            return new ResultData<IList<Team>>(successMessage, true, Teams);
        }

        public async Task<ResultData<int>> GetDefaultTeamAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new ResultData<int>(OwnerIdNullMessage, false);
            }

            int defaultTeamId = await _teamRepository.GetDefaultTeamAsync(userId);
            if (!_teamRepository.TeamExists(defaultTeamId))
            {
                defaultTeamId = 0;
            }

            string successMessage = string.Format(GetDefaultTeamSuccessMessage, userId);
            return new ResultData<int>(successMessage, true, defaultTeamId);
        }
    }
}
