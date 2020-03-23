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
using Retrospector.Api.ViewModels.RetroGames;
using Retrospector.Api.ViewModels.Shared;

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
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamModel team)
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

            CreateTeamModel viewModel = new CreateTeamModel
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

            TeamsAndDefaultTeamModel viewModel = new TeamsAndDefaultTeamModel();
            viewModel.DefaultTeam= defaultTeam.Data;
            viewModel.Teams = new List<TeamDetailsModel>();
            foreach (Team team in teams.Data)
            {
                TeamDetailsModel teamModel = new TeamDetailsModel
                {
                    Id = team.Id,
                    Name = team.Name,
                    CreationDate = team.CreationDate,
                    OwnerId = team.OwnerId
                };

                foreach (RetroGame game in team.RetroGames)
                {
                    RetroGameDetailsModel gameModel = new RetroGameDetailsModel
                    {
                        Id = game.Id,
                        Name = game.Name,
                        LastModified = game.LastModified,
                        CreationDate = game.CreationDate,
                        Url = game.Url
                    };

                    teamModel.RetroGames.Add(gameModel);
                }

                viewModel.Teams.Add(teamModel);
            }

            return Ok(viewModel);
        }
    }
}
