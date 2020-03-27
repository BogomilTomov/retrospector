using System.Collections.Generic;

namespace Retrospector.Api.ViewModels.Teams
{
    public class TeamsDataModel
    {
        public IEnumerable<TeamModel> Teams{ get; set; }

        public int DefaultTeam { get; set; }
    }
}
