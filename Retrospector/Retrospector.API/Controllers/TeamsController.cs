using Microsoft.AspNetCore.Mvc;
using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Retrospector.Services;
using Retrospector.Services.Results;
using Retrospector.Api.ViewModels.Teams;
using Microsoft.AspNetCore.Authorization;

namespace Retrospector.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly TeamsService _teamService;

        public TeamsController(TeamsService teamService)
        {
            _teamService = teamService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] TeamModel team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<Team> result = await _teamService.CreateTeamAsync(team.Name, team.OwnerId, team.CreationDate);
            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            TeamModel viewModel = new TeamModel
            {
                Id = result.Data.Id,
                Name = result.Data.Name,
                CreationDate = result.Data.CreationDate,
                OwnerId = result.Data.OwnerId,
            };

            return Ok(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> GetTeams(string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IList<Team>> result = await _teamService.GetTeamsAsync(userId);
            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            List<TeamModel> teamModels = new List<TeamModel>();
            foreach (Team team in result.Data)
            {
                TeamModel teamModel = new TeamModel()
                {
                    Id = team.Id,
                    Name = team.Name,
                    OwnerId = team.OwnerId,
                    RetroGames = team.RetroGames,
                    CreationDate = team.CreationDate,
                };

                teamModels.Add(teamModel);
            }

            return Ok(teamModels);
        }
    }
}
