using Retrospector.Api.ViewModels.Teams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Api.ViewModels.Shared
{
    public class TeamsDataModel
    {
        public List<TeamDetailsModel> Teams{ get; set; }

        public int DefaultTeam { get; set; }
    }
}
