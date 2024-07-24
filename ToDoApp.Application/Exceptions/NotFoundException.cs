using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Application.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(object entity)
            : base($"Entity \"{entity.GetType()}\" was not found.")
        {
        }
    }
}
