using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Retrospector.Data.DomainModels;
using Retrospector.Services;
using Retrospector.Services.Results;
using Retrospector.Api.ViewModels.Teams;

namespace Retrospector.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly TeamsService _teamService;

        public TeamsController(TeamsService teamService)
        {
            _teamService = teamService;
        }

        [Route("api/[controller]")]
        [HttpPost]
        public async Task<IActionResult> CreateTeamAsync([FromBody] TeamModel team)
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

        [Route("api/[controller]/{teamId}")]
        [HttpPost]
        public async Task<IActionResult> UpdateTeamAsync([FromBody] TeamModel teamModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team team = new Team
            {
                Id = teamModel.Id,
                Name = teamModel.Name,
                OwnerId = teamModel.OwnerId,
            };

            ResultData<Team> result = await _teamService.UpdateTeamAsync(team);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            TeamModel viewModel = new TeamModel
            {
                Id = result.Data.Id,
                Name = result.Data.Name,
                OwnerId = result.Data.OwnerId,
            };

            return Ok(viewModel);
        }

        [Route("/api/users/{userId}/teams")]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTeamsAsync([FromRoute] string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IList<Team>> teams = await _teamService.GetTeamsAsync(userId);
            if (!teams.Success)
            {
                return BadRequest(new { message = teams.Message });
            }

            ResultData<int> defaultTeam = await _teamService.GetDefaultTeamAsync(userId);
            if (!defaultTeam.Success)
            {
                return BadRequest(new { message = defaultTeam.Message });
            }

            TeamsDataModel viewModel = new TeamsDataModel();
            viewModel.DefaultTeam = defaultTeam.Data;
            viewModel.Teams = teams.Data
                .Select(team => new TeamModel
                {
                    Id = team.Id,
                    Name = team.Name,
                    CreationDate = team.CreationDate,
                    OwnerId = team.OwnerId
                });

            return Ok(viewModel);
        }
    }
}
