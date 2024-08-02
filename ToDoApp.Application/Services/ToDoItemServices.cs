using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Exceptions;
using ToDoApp.Application.Interfaces;
using ToDoApp.Domain.Models;
using ToDoApp.Domain.Repositories;

namespace ToDoApp.Application.Services
{
    public class ToDoItemServices: IToDoItemServices
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ToDoItemServices(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public void Create(ToDoItemRequest toDoItemRequest)
        {
            if (toDoItemRequest is null)
                throw new ArgumentNullException(nameof(toDoItemRequest), message: "Object is empty");
            var item = _mapper.Map<ToDoItem>(toDoItemRequest);
            _unitOfWork.GetRepository<ToDoItem>().Create(item);
            _unitOfWork.Save();
        }

        public void Delete(int id)
        {
            var toDoItem = _unitOfWork.GetRepository<ToDoItem>().Get(id);

            if (toDoItem is null)
                throw new NotFoundException(toDoItem);

            _unitOfWork.GetRepository<ToDoItem>().Delete(toDoItem);
            _unitOfWork.Save();
        }

        public ToDoItemResponse Get(int id)
        {
            var toDoItem = _unitOfWork.GetRepository<ToDoItem>().Get(id);

            if (toDoItem == null)
            {
                throw new NotFoundException(toDoItem);
            }

            return _mapper.Map<ToDoItemResponse>(toDoItem);
        }

        public IEnumerable<ToDoItemResponse> GetAll(int userId)
        {
            var toDoItems = _unitOfWork.ToDoItemRepository.GetAllByUser(userId);
            if (toDoItems is null)
                throw new NotFoundException(toDoItems);
            return _mapper.Map<IEnumerable<ToDoItemResponse>>(toDoItems);
        }

        public void Update(ToDoItemUpdate toDoItemRequest, int id)
        {
            
             var toDoItem = _unitOfWork.GetRepository<ToDoItem>().Get(id);
            if (toDoItemRequest.DueDate == null)
                toDoItemRequest.DueDate = toDoItem.DueDate;
            if (toDoItem == null)
            {
                throw new NotFoundException(toDoItem);
            }
            toDoItem = _mapper.Map(toDoItemRequest, toDoItem);

            _unitOfWork.GetRepository<ToDoItem>().Update(toDoItem);
            _unitOfWork.Save();
        }

    }

}

