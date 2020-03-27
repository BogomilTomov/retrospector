using System;
using System.Collections.Generic;
using Retrospector.Data.DomainModels;

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
