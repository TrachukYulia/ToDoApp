using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;

namespace ToDoApp.Domain.Repositories
{
    public interface IToDoItemRepository : IBaseRepository<ToDoItem>
    {
    }
}
