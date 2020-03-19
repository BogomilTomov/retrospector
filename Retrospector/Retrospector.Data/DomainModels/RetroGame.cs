using System;
using System.Collections.Generic;
using System.Text;

namespace Retrospector.Data.DomainModels
{
    public class RetroGame
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public string Url { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }

        public IList<RetrospectorUser> Participants { get; set; }

        public IList<RetroGameUser> RetroGameUsers { get; set; }

        public IList<Note> Notes { get; set; }

    }
}