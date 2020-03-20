using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Retrospector.Data;
using Retrospector.Data.DomainModels;
using Retrospector.Data.Repositories;
using Retrospector.Services;
using System;
using System.Text;

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


            var SecretKey = Encoding.ASCII.GetBytes
         ("a541d6ef022d77a2318f7dd657f27793203bed4a");

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            /*.AddGoogle(o =>
            {
                IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");

                o.ClientId = googleAuthNSection["ClientId"];
                o.ClientSecret = googleAuthNSection["ClientSecret"];
            })*/
                .AddJwtBearer(token =>
                {
                    Configuration.Bind("JwtBearer", token);
                    token.RequireHttpsMetadata = false;
                    token.SaveToken = true;
                    token.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        //Same Secret key will be used while creating the token
                        IssuerSigningKey = new SymmetricSecurityKey(SecretKey),
                        ValidateIssuer = true,
                        //Usually, this is your application base URL
                        ValidIssuer = "accounts.google.com",
                        ValidateAudience = true,
                        //Here, we are creating and using JWT within the same application.
                        //In this case, base URL is fine.
                        //If the JWT is created using a web service, then this would be the consumer URL.
                        ValidAudience = "385337585654-qr5vnh01a0lno0o6e41jh6t5fodsfseq.apps.googleusercontent.com",
                        RequireExpirationTime = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });
            ;


            /*.AddJwtBearer(jwt => jwt.UseGoogle(
                clientId: "ID FROM GOOGLE API"));*/


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