using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Retrospector.Data
{
    public class RetrospectorContextFactory : IDesignTimeDbContextFactory<RetrospectorContext>
    {
        public RetrospectorContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RetrospectorContext>();
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=RetrospectorDb;Trusted_Connection=True;");

            return new RetrospectorContext(optionsBuilder.Options);

        }
    }
}