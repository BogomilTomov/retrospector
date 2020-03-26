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
        private const string DuplicateRetroGameNameMessage = "A retrospective game with that name already exists!";
        private const string RetroGameCreationFailureMessage = "A retrospective game creation failed!";
        private const string RetroGameCreationSuccessMessage = "A retrospective game successful!";
        private const string GetRetroGameSuccessMessage = "Retrospective games retrieved successfully!";
        private const string GetRetroGameFailureMessage = "Retrospective games retrieve failed!";

        private readonly RetroGameRepository _retroGameRepository;

        public RetroGameService(RetroGameRepository retroGameRepository)
        {
            _retroGameRepository = retroGameRepository;
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

            RetroGame game = await _retroGameRepository.CreateRetroGameAsync(name, template, teamId);

            if (game == null)
            {
                return new ResultData<RetroGame>(RetroGameCreationFailureMessage, false);
            }

            string message = string.Format(RetroGameCreationSuccessMessage, game.Name);
            return new ResultData<RetroGame>(message, true, game);
        }

        public async Task<ResultData<IEnumerable<RetroGame>>> GetRetroGamesAsync() {
            var games = await _retroGameRepository.GetRetroGamesAsync();

            if (games == null)
            {
                return new ResultData<IEnumerable<RetroGame>>(GetRetroGameFailureMessage, false);
            }

            string message = GetRetroGameSuccessMessage;
            return new ResultData<IEnumerable<RetroGame>>(message, true, games);
        }
    }
}
