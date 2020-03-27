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
    [Route("api/[controller]")]
    [ApiController]
    public class RetroGamesController : ControllerBase
    {
        private readonly RetroGameService _retroGameService;

        public RetroGamesController(RetroGameService retroGameService)
        {
            _retroGameService = retroGameService;
        }

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

            return CreatedAtAction("GetRetroGame", result.Data, result.Data);
        }

        [HttpGet("{teamId}")]
        public async Task<ActionResult<RetroGame[]>> GetRetroGamesAsync([FromRoute] int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IEnumerable<RetroGame>> result = await _retroGameService.GetRetroGamesByTeamIdAsync(teamId);

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