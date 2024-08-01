using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;
using ToDoApp.Domain.Repositories;
using ToDoApp.Infrastructure.Data;

namespace ToDoApp.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        internal readonly ToDoAppContext _context;

        public UserRepository(ToDoAppContext context) : base(context)
        {
            _context = context;
        }
        public bool UserExists(string username)
        {
            return _context.Users.Any(u => u.Username == username);
        }

        public User GetUserByUsername(string username)
        {
            return _context.Users.SingleOrDefault(u => u.Username == username);
        }

        public User GetUserByRefreshToken(string refreshToken)
        {
            return _context.Users.SingleOrDefault(u => u.RefreshToken == refreshToken);
        }

    }
}
