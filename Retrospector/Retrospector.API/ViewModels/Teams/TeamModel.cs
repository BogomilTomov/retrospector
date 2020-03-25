using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Api.ViewModels.Teams
{
    public class TeamModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OwnerId { get; set; }

        public RetrospectorUser Owner { get; set; }

        public IEnumerable<RetroGame> RetroGames { get; set; }

        public IEnumerable<RetrospectorUser> Users { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
