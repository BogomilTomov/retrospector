using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Retrospector.Data.DomainModels
{
    public class RetrospectorUser : IdentityUser
    {
        public IList<Note> Notes { get; set; }

        public IList<TeamUser> TeamUsers { get; set; }

        public IList<Team> OwnedTeams { get; set; }

        public IList<RetroGameUser> RetroGameUsers { get; set; }
    }
}
