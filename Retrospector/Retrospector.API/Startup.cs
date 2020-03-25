using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                    .AddJwtBearer(jwt => jwt.UseGoogle(
                        clientId: Configuration.GetSection("ClientId").Value
                        ));

            services.AddCors();
            services.AddRouting();
            services.AddControllers().AddNewtonsoftJson(o =>
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //Repositories
            services.AddScoped<AccountsRepository>();
            services.AddScoped<RetroGameRepository>();
            services.AddScoped<TeamsRepository>();

            //Services
            services.AddScoped<AccountsService>();
            services.AddScoped<RetroGameService>();
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
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}