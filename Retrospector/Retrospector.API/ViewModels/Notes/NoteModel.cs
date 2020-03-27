namespace Retrospector.Api.ViewModels.Notes
{
    public class NoteModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int Rating { get; set; }

        public string UserId { get; set; }

        public int RetroGameId { get; set; }
    }
}
