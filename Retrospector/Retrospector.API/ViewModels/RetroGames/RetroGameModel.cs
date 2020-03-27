using System;
using System.Collections.Generic;
using Retrospector.Api.ViewModels.Notes;

namespace Retrospector.Api.ViewModels.RetroGames
{
    public class RetroGameModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public string Url { get; set; }

        public int? NotesCount { get; set; }

        public IEnumerable<NoteModel> Notes { get; set; } = new List<NoteModel>();
    }
}
