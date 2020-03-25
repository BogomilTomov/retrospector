using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Retrospector.Api.InputModels.RetroGames;
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
            ResultData<RetroGame> result = await _retroGameService.CreateRetroGameAsync(game.Name, game.Template);

            if (!result.Success)
            {
                return Forbid(result.Message);
            }

            return CreatedAtAction("GetRetroGame", result.Data, result.Data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RetroGame>> GetRetroGameAsync(int id)
        {
            var game = await _retroGameService.GetRetroGameByIdAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpGet]
        public async Task<ActionResult<RetroGame[]>> GetRetroGamesAsync()
        {
            ResultData<IEnumerable<RetroGame>> result = await _retroGameService.GetRetroGamesAsync();

            if (!result.Success)
            {
                return NotFound(result.Message);
            }

            return Ok(result);
        }
    }
}