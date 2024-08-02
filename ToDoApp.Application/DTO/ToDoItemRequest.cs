using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Application.DTO
{
    public class ToDoItemRequest
    {
        public string Name { get; set; }
        public bool IsDone { get; set; }
        public DateTime DueDate { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }

    }
}
