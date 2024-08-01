using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.DTO;

namespace ToDoApp.Application.Interfaces
{
    public interface ICategoryService
    {
        IEnumerable<CategoryResponse> GetAll(int userId);
        void Create(CategoryRequest categoryRequest);
        CategoryResponse Get(int id);
        void Update(CategoryRequest categoryRequest, int id);
        void Delete(int id);
    }
}
