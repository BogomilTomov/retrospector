using System;
using System.Collections.Generic;
using System.Text;

namespace Retrospector.Data.DomainModels
{
    public class RetroGameUser
    {
        public int RetroGameId { get; set; }

        public RetroGame RetroGame { get; set; }

        public string UserId { get; set; }

        public RetrospectorUser User { get; set; }
    }
}