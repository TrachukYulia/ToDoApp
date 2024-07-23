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
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ToDoAppContext context) : base(context)
        {
        }
    }
}
