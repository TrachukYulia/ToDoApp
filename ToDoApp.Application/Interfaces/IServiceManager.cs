﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Application.Interfaces
{
    public class IServiceManager
    {
        public IToDoItemServices ToDoItemServices { get; }
        public ICategoryService CategoryService { get; }    
    }
}
