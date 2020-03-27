using Retrospector.Api.ViewModels.RetroGames;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Api.ViewModels.Teams
{
    public class TeamDetailsModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreationDate { get; set; }

        public string OwnerId { get; set; }

        public IEnumerable<RetroGameModel> RetroGames { get; set; } = new List<RetroGameModel>();
    }
}
