﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Domain.Models;

namespace ToDoApp.Application.DTO
{
    public class ToDoItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDone { get; set; }
        public DateTime DueDate { get; set; }
        public int CategoryId { get; set; }

    }
}
