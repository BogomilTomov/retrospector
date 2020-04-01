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
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost("{userId}/select-team/{teamId}")]
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
    }
}