using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.DTO;

namespace ToDoApp.Application.Interfaces
{
    public interface IUserService
    {
        void Register(RegisterRequest model);
        (string, string) Login(LoginRequest model);
        (string, string) RefreshToken(TokenDTO model);
        void RevokeToken(string refreshToken);
        string UsernameById(int id);
    }
}
