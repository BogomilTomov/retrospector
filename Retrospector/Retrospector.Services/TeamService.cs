using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services.Results;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Retrospector.Services
{
    public class TeamService
    {
        private const string TeamNullMessage = "Team cannot be null or empty!";
        private const string OwnerIdNullMessage = "OwnerId cannot be null or empty!";
        private const string CreationDateNullMessage = "CreationDate cannot be null or empty!";
        private const string TeamCreateSuccessMessage = "Team with email {0} created successfully!";
        private const string TeamNameExistsMessage = "Team with name {0} already exists!";
        private const string OwnerDoesntExist = "User with id {0} doesnt't exist!";

        private readonly TeamRepository _teamRepository;

        public TeamService(TeamRepository teamRepository)
        {
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

            if (!_teamRepository.OwnerExists(ownerId))
            {
                string errorMessage = string.Format(OwnerDoesntExist, ownerId);
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
    }
}