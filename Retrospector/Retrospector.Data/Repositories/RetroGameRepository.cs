using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Retrospector.Data.Repositories
{
    public class RetroGameRepository
    {
        private readonly RetrospectorContext _context;

        public RetroGameRepository(RetrospectorContext context)
        {
            _context = context;
        }

        public async Task<RetroGame> GetRetroGameByNameAsync(string name)
        {
            return await _context.RetroGames.FirstOrDefaultAsync(rg => rg.Name == name);
        }

        public async Task<RetroGame> CreateRetroGameAsync(string name, string template)
        {
            var game = await _context.RetroGames.FirstOrDefaultAsync(rg => rg.Name == name);

            if (game != null)
            {
                return game;
            }

            var newGame = new RetroGame()
            {
                Name = name,
                Template = template,
                CreationDate = DateTime.Now,
                LastModified = DateTime.Now,
                Notes = new List<Note>(),
                Team = new Team()
                {
                    Name = "Test Team",
                    Owner = new RetrospectorUser()
                    {
                        Notes = new List<Note>(),
                        TeamUsers = new List<TeamUser>(),
                        OwnedTeams = new List<Team>()
                    },
                    RetroGames = new List<RetroGame>(),
                    TeamUsers = new List<TeamUser>(),
                    CreationDate = DateTime.Now
                },
                Url = Guid.NewGuid().ToString()
            };

            _context.RetroGames.Add(newGame);

            await _context.SaveChangesAsync();

            return await _context.RetroGames.FirstOrDefaultAsync(rg => rg.Name == name);
        }

        public async Task<RetroGame> GetRetroGameByIdAsync(int id)
        {
            return await _context.RetroGames.FindAsync(id);
        }

        public async Task<IEnumerable<RetroGame>> GetRetroGamesAsync() {
            var games = _context.RetroGames.OrderByDescending(rg => rg.CreationDate).Take(20);
            return await games.ToListAsync();
        }
    }
}