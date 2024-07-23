﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;

namespace ToDoApp.Domain.Repositories
{
    public interface IUnitOfWork
    {
        int Save();
        IBaseRepository<T> GetRepository<T>() where T : BaseEntity;
    }
}
