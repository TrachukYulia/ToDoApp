using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Domain.Models
{
    public class Category: BaseEntity
    {
       public string Name { get; set; }
       public int Priority { get; set; }
       public string Icon { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<ToDoItem> ToDoItems { get; set; }   
    }
}
