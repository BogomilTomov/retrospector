using System.Collections.Generic;
using Retrospector.Api.ViewModels.Teams;

namespace Retrospector.Api.ViewModels.Shared
{
    public class TeamsDataModel
    {
        public List<TeamModel> Teams{ get; set; }

        public int DefaultTeam { get; set; }
    }
}
