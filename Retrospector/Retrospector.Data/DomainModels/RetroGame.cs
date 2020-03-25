using System;
using System.Collections.Generic;

namespace Retrospector.Data.DomainModels
{
    public class RetroGame
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Template { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public string Url { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }

        public IEnumerable<Note> Notes { get; set; }
    }
}
