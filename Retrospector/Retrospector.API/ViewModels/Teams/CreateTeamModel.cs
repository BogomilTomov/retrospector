using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Api.ViewModels.Teams
{
    public class CreateTeamModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OwnerId { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
