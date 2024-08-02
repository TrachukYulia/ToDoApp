using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Domain.Models
{
    public class ToDoItem: BaseEntity
    {
        public string Name { get; set; }
        public bool IsDone { get; set; }   
        public DateTime DueDate { get; set; }
        public int CategoryId { get; set; } 
        public Category Category { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
