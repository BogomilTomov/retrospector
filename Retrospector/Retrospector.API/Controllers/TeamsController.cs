using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Retrospector.Data.DomainModels;
using Retrospector.Services;
using Retrospector.Services.Results;
using Retrospector.Api.ViewModels.Teams;
using Retrospector.Api.ViewModels.RetroGames;
using Retrospector.Api.ViewModels.Shared;
using Retrospector.Api.ViewModels.Notes;

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
        public async Task<IActionResult> CreateTeamAsync([FromBody] CreateTeamModel team)
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
        public async Task<IActionResult> GetTeamsAsync(string userId)
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

                    foreach(Note note in game.Notes)
                    {
                        NoteModel noteModel = new NoteModel
                        {
                            Id = note.Id,
                            Rating = note.Rating,
                            UserId = note.UserId,
                            RetroGameId = note.RetroGameId,
                            Text = note.Text
                        };

                        gameModel.Notes.Add(noteModel);
                    }

                    teamModel.RetroGames.Add(gameModel);
                }

                viewModel.Teams.Add(teamModel);
            }

            return Ok(viewModel);
        }
    }
}
