using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Retrospector.Api.InputModels.RetroGames;
using Retrospector.Api.ViewModels.RetroGames;
using Retrospector.Data.DomainModels;
using Retrospector.Services;
using Retrospector.Services.Results;

namespace Retrospector.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class RetroGamesController : ControllerBase
    {
        private readonly RetroGameService _retroGameService;

        public RetroGamesController(RetroGameService retroGameService)
        {
            _retroGameService = retroGameService;
        }

        [Route("api/[controller]")]
        [HttpPost]
        public async Task<ActionResult<RetroGame>> PostRetroGameAsync(RetroGameInputModel game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<RetroGame> result = await _retroGameService.CreateRetroGameAsync(game.Name, game.Template, game.TeamId);

            if (!result.Success)
            {
                return Forbid(result.Message);
            }

            return Ok(result.Data);
        }

        [HttpGet]
        [Route("api/teams/{teamId}/retroGames")]
        public async Task<ActionResult<RetroGame[]>> GetRetroGamesAsync([FromRoute] int teamId, [FromQuery] int gamesCount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IEnumerable<RetroGame>> result = await _retroGameService.GetRetroGamesByTeamIdAsync(teamId, gamesCount);

            if (!result.Success)
            {
                return NotFound(result.Message);
            }

            IEnumerable<RetroGameModel> viewModel = result.Data
                .Select(rg => new RetroGameModel
                {
                    Id = rg.Id,
                    Name = rg.Name,
                    CreationDate = rg.CreationDate,
                    LastModified = rg.LastModified,
                    Url = rg.Url,
                    NotesCount = rg.Notes.Count()
                });

            return Ok(viewModel);
        }
    }
}