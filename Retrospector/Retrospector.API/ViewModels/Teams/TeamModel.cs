using System;

namespace Retrospector.Api.ViewModels.Teams
{
    public class TeamModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OwnerId { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
