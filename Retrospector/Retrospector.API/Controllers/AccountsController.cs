using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Retrospector.Api.InputModels.Users;
using Retrospector.Api.ViewModels.Users;
using Retrospector.Data.DomainModels;
using Retrospector.Services;
using Retrospector.Services.Results;

namespace Retrospector.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AccountsService _accountsService;
        private readonly SignInManager<RetrospectorUser> _signInManager;

        private const string UserRoleName = "User";

        public AccountsController(AccountsService accountsService, SignInManager<RetrospectorUser> signInManager)
        {
            _accountsService = accountsService;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> ExternalLoginAsync(ExternalLoginInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ResultData<RetrospectorUser> result = await _accountsService.LogInUserAsync(model.Email, UserRoleName);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            ResultData<IList<string>> rolesResult = await _accountsService.GetUserRolesAsync(result.Data);

            if (!rolesResult.Success)
            {
                return BadRequest(new { message = rolesResult.Message });
            }

            string role = rolesResult.Data[0];
            UserModel viewModel = new UserModel
            {
                Email = result.Data.Email,
                Id = result.Data.Id,
                Role = role
            };

            return Ok(viewModel);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }
    }
}