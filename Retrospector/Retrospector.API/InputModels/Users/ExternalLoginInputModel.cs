using System.ComponentModel.DataAnnotations;

namespace Retrospector.Api.InputModels.Users
{
    public class ExternalLoginInputModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string AuthToken { get; set; }
    }
}