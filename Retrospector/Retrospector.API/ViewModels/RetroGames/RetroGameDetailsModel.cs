using Retrospector.Api.ViewModels.Notes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Api.ViewModels.RetroGames
{
    public class RetroGameDetailsModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public string Url { get; set; }

        public List<NoteModel> Notes { get; set; } = new List<NoteModel>();
    }
}
