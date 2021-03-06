﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Retrospector.Data.DomainModels
{
    public class Team
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OwnerId { get; set; }

        public RetrospectorUser Owner { get; set; }

        public IEnumerable<RetroGame> RetroGames { get; set; }

        public IEnumerable<TeamUser> TeamUsers { get; set; }

        public IEnumerable<UserSelectedTeam> UserSelectedTeams{ get; set; }

        public DateTime CreationDate { get; set; }
    }
}
