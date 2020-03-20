using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Retrospector.Data.DomainModels
{
    public class Note
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int Rating { get; set; }

        public string UserId { get; set; }

        public RetrospectorUser User { get; set; }

        public int RetroGameId { get; set; }

        public RetroGame RetroGame { get; set; }
    }
}
