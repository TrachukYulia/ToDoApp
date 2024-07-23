using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;
using ToDoApp.Domain.Repositories;
using ToDoApp.Infrastructure.Data;

namespace ToDoApp.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private Hashtable _repositories;
        private readonly ToDoAppContext _context;

        public UnitOfWork(ToDoAppContext context)
        {
            _context = context;
            if (_repositories == null)
                _repositories = new Hashtable();

        }
        public IBaseRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity
        {
            var Type = typeof(TEntity).Name;
            if (!_repositories.ContainsKey(Type))
            {
                var repositiryType = typeof(IBaseRepository<>);
                var repositoryInstance = Activator.CreateInstance(
                    repositiryType.MakeGenericType(typeof(TEntity)), _context);
                _repositories.Add(Type, repositoryInstance);
            }
            return (IBaseRepository<TEntity>)_repositories[Type];
        }
        public int Save()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

    }
}
