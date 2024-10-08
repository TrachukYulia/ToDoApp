﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.DTO;
using ToDoApp.Domain.Models;

namespace ToDoApp.Application.Interfaces
{
    public interface IToDoItemServices
    {
        IEnumerable<ToDoItemResponse> GetAll(int userId);
        void Create(ToDoItemRequest toDoItemRequest);
        ToDoItemResponse Get(int id);
        void Update(ToDoItemUpdate toDoItemRequest, int id);
        void Delete(int id);
    }
}
