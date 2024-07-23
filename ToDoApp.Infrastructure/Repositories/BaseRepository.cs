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
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        internal readonly ToDoAppContext dataContext;

        public BaseRepository(ToDoAppContext context)
        {
            dataContext = context;
        }

        public void Create(T entity)
        {
            dataContext.Add(entity);
        }

        public void Update(T entity)
        {
            dataContext.Update(entity);
        }
        public void Delete(T entity)
        {
            dataContext.Set<T>().Remove(entity);
        }

        public T Get(int id)
        {
            return dataContext.Set<T>().FirstOrDefault(x => x.Id == id);
        }

        public List<T> GetAll()
        {
            return dataContext.Set<T>().ToList();
        }
    }
}
