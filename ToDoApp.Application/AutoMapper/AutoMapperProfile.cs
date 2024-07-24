using AutoMapper;
using ToDoApp.Domain.Models;
using ToDoApp.Application.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Application.AutoMapper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ToDoItem, ToDoItemRequest>()
                .ReverseMap();
            CreateMap<ToDoItem, ToDoItemResponse>()
               .ReverseMap();
        }
    }
}
