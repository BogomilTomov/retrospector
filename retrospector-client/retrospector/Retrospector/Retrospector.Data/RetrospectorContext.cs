using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;

namespace Retrospector.Data
{
    public class RetrospectorContext : IdentityDbContext<RetrospectorUser>
    {
        public RetrospectorContext(DbContextOptions options) : base(options)
        {

        }
    }
}