using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Retrospector.Data;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services;

namespace Retrospector.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<RetrospectorContext>(o => 
            {
                o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<RetrospectorUser, IdentityRole>()
                    .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<RetrospectorContext>();


            services.AddAuthentication()
            .AddGoogle(o => 
            {
                IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");

                o.ClientId = googleAuthNSection["ClientId"];
                o.ClientSecret = googleAuthNSection["ClientSecret"];
            });

            services.AddCors();

            services.AddRouting();

            services.AddControllers().AddNewtonsoftJson(o =>
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //Repositories
            services.AddScoped<AccountsRepository>();
            services.AddScoped<TeamsRepository>();

            //Services
            services.AddScoped<AccountsService>();
            services.AddScoped<TeamsService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(o =>
            {
                o.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}