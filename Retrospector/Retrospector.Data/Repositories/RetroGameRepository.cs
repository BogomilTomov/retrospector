using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Retrospector.Data.DomainModels;

namespace Retrospector.Data.Repositories
{
    public class RetroGameRepository
    {
        private readonly RetrospectorContext _context;

        public RetroGameRepository(RetrospectorContext context)
        {
            _context = context;
        }

        public async Task<RetroGame> CreateRetroGameAsync(string name, string template, int teamId)
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
                TeamId = teamId,
                Url = string.Empty
            };

            _context.RetroGames.Add(newGame);

            await _context.SaveChangesAsync();

            return await _context.RetroGames.FirstOrDefaultAsync(rg => rg.Name == name);
        }

        public async Task<RetroGame> GetRetroGameByIdAsync(int id)
        {
            return await _context.RetroGames.FindAsync(id);
        }

        public async Task<IEnumerable<RetroGame>> GetRetroGamesByTeamIdAsync(int teamId) {
            return await _context.RetroGames
                .Where(rg => rg.TeamId == teamId)
                .Include(rg => rg.Notes)
                .OrderByDescending(rg => rg.LastModified)
                .ToListAsync();
        }
    }
}