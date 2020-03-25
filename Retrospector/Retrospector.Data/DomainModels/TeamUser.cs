namespace Retrospector.Data.DomainModels
{
    public class TeamUser
    {
        public int TeamId { get; set; }

        public Team Team { get; set; }

        public string UserId { get; set; }

        public RetrospectorUser User { get; set; }
    }
}
