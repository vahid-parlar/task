using DAL.Entity;
using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public interface IUserService
    {
        Task<List<UserResult>> GetUsers();
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        public UserService(ApplicationDbContext context)
        {
            _db = context;

        }
        public async Task<List<UserResult>> GetUsers()
        {
            return await _db.Users.Select(c => new UserResult
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                UserName = c.UserName,
                Mobile = c.Mobile,
                Email = c.Email
            }).ToListAsync();
        }

    }
}
