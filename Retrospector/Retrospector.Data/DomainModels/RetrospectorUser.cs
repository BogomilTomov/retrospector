using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Retrospector.Data.DomainModels
{
    public class RetrospectorUser : IdentityUser
    {
        public IEnumerable<Note> Notes { get; set; }

        public IEnumerable<TeamUser> TeamUsers { get; set; }

        public IEnumerable<Team> OwnedTeams { get; set; }

        public UserSelectedTeam SelectedTeam { get; set; }
    }
}
