using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;

namespace ToDoApp.Domain.Repositories
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        T Get(int id);
        List<T> GetAll();
    }
}
