namespace Retrospector.Data.DomainModels
{
    public class UserSelectedTeam
    {
        public int Id { get; set; }

        public RetrospectorUser User { get; set; }

        public string UserId { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }
    }
}
