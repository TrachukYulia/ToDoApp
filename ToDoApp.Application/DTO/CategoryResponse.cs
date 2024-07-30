using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Application.DTO
{
    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string Icon { get; set; }
        public int Priority { get; set; }
        //public List<ToDoItemResponse> ToDoItemResponses { get; set; }
    }
}
