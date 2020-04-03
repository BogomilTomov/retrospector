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

        [HttpPost("api/[controller]/{userId}/select-team/{teamId}")]
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

        [HttpGet("api/[controller]")]
        public async Task<IActionResult> GetFilteredUsersByEmailAsync([FromQuery] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<IEnumerable<RetrospectorUser>> result = await _usersService.GetUsersFilteredByEmailAsync(email);
            IEnumerable<UserModel> viewModel = result.Data.Select(ru => new UserModel
            {
                Id = ru.Id,
                Email = ru.Email
            });

            return Ok(viewModel);
        }

        [HttpPost("/api/teams/{teamId}/users")]
        public async Task<IActionResult> AddUserToTeamAsync([FromBody] AddUserModel model, [FromRoute] int teamId)
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

        [HttpGet("/api/teams/{teamId}/users")]
        public async Task<IActionResult> GetUsersInTeamAsync([FromRoute] int teamId)
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

        [HttpDelete("/api/teams/{teamId}/users")]
        public async Task<IActionResult> RemoveUserFromTeamAsync([FromBody] AddUserModel user, [FromRoute] int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<RetrospectorUser> result = await _usersService.RemoveUserFromTeamAsync(user.Id, teamId);

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
    }
}