using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Retrospector.Api.ViewModels.Users;
using Retrospector.Data.DomainModels;
using Retrospector.Services;
using Retrospector.Services.Results;

namespace Retrospector.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [Route("api/[controller]/{userId}/select-team/{teamId}")]
        [HttpPost]
        public async Task<IActionResult> SetSelectedTeamAsync([FromRoute] string userId, [FromRoute] int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<string> result = await _usersService.SetSelectedTeamAsync(userId, teamId);
            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(result);
        }

        [Route("api/[controller]")]
        [HttpGet]
        public async Task<IActionResult> GetFilteredUsersByEmail([FromQuery] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IEnumerable<RetrospectorUser>> result = await _usersService.GetUsersFilteredBtEmailAsync(email);
            IEnumerable<UserModel> viewModel = result.Data.Select(ru => new UserModel
            {
                Id = ru.Id,
                Email = ru.Email
            });

            return Ok(viewModel);
        }

        [Route("/api/teams/{teamId}/users")]
        [HttpPost]
        public async Task<IActionResult> AddUserToTeam([FromBody] AddUserModel model, [FromRoute] int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<RetrospectorUser> result = await _usersService.AddUserToTeamAsync(model.Email, teamId);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            UserModel viewModel = new UserModel
            {
                Id = result.Data.Id,
                Email = result.Data.Email
            };

            return Ok(viewModel);
        }

        [Route("/api/teams/{teamId}/users")]
        [HttpGet]
        public async Task<IActionResult> GetUsersInTeam([FromRoute] int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IEnumerable<RetrospectorUser>> result = await _usersService.GetUsersInTeamAsync(teamId);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            IEnumerable<UserModel> viewModel = result.Data.Select(ru => new UserModel
            {
                Id = ru.Id,
                Email = ru.Email
            });

            return Ok(viewModel);
        }
    }
}