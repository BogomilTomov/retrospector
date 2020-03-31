using System.Collections.Generic;
using System.Threading.Tasks;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services.Results;

namespace Retrospector.Services
{
    public class RetroGameService
    {
        private const string InvalidRetroGameNameMessage = "Email cannot be null or empty!";
        private const string InvalidRetroGameTemplateMessage = "Invalid retrospective game template!";
        private const string RetroGameCreationSuccessMessage = "A retrospective game successful!";
        private const string GetRetroGameSuccessMessage = "Retrospective games retrieved successfully!";
        private const string TeamDoesntExistMessage = "Team with id {0} doesnt't exist!";
        private const string TeamHasGameWithSameNameMessage = "A game with name {0} already exists in that team.";
        
        private readonly RetroGameRepository _retroGameRepository;
        private readonly TeamsRepository _teamsRepository;

        public RetroGameService(RetroGameRepository retroGameRepository, TeamsRepository teamsRepository)
        {
            _retroGameRepository = retroGameRepository;
            _teamsRepository = teamsRepository;
        }

        public async Task<RetroGame> GetRetroGameByIdAsync(int id)
        {
            return await _retroGameRepository.GetRetroGameByIdAsync(id);
        }

        public async Task<ResultData<RetroGame>> CreateRetroGameAsync(string name, string template, int teamId)
        {
            if (string.IsNullOrEmpty(name))
            {
                return new ResultData<RetroGame>(InvalidRetroGameNameMessage, false);
            }

            if (string.IsNullOrEmpty(template))
            {
                return new ResultData<RetroGame>(InvalidRetroGameTemplateMessage, false);
            }
            
            if (!_teamsRepository.TeamExists(teamId))
            {
                string errorMessage = string.Format(TeamDoesntExistMessage, teamId);
                return new ResultData<RetroGame>(errorMessage, false);
            }

            RetroGame game = await _retroGameRepository.CreateRetroGameAsync(name, template, teamId);

            if (game == null)
            {
                string errorMessage = string.Format(TeamHasGameWithSameNameMessage, name);
                return new ResultData<RetroGame>(errorMessage, false);
            }

            string message = string.Format(RetroGameCreationSuccessMessage, game.Name);
            return new ResultData<RetroGame>(message, true, game);
        }

        public async Task<ResultData<IEnumerable<RetroGame>>> GetRetroGamesByTeamIdAsync(int teamId, int gamesCount) {
            if (!_teamsRepository.TeamExists(teamId))
            {
                string errorMessage = string.Format(TeamDoesntExistMessage, teamId);
                return new ResultData<IEnumerable<RetroGame>>(errorMessage, false);
            }

            var games = await _retroGameRepository.GetRetroGamesByTeamIdAsync(teamId, gamesCount);
            string message = GetRetroGameSuccessMessage;
            return new ResultData<IEnumerable<RetroGame>>(message, true, games);
        }
    }
}
