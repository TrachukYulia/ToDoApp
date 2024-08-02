using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.Services;

namespace ToDoApp.Application.Interfaces
{
    public class IServiceManager
    {
        public IToDoItemServices ToDoItemServices { get; }
        public ICategoryService CategoryService { get; }    
        public IUserService UserService { get; }
        public IJWTService JWTService { get; }
    }
}
