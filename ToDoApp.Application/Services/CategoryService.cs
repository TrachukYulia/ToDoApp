using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Exceptions;
using ToDoApp.Application.Interfaces;
using ToDoApp.Domain.Models;
using ToDoApp.Domain.Repositories;

namespace ToDoApp.Application.Services
{
    public class CategoryService: ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public void Create(CategoryRequest categoryRequest)
        {
            if (categoryRequest is null)
                throw new ArgumentNullException(nameof(categoryRequest), message: "Object is empty");
            var category = _mapper.Map<Category>(categoryRequest);
            _unitOfWork.GetRepository<Category>().Create(category);
            _unitOfWork.Save();
        }

        public void Delete(int id)
        {
            var category = _unitOfWork.GetRepository<Category>().Get(id);

            if (category is null)
                throw new NotFoundException(category);

            _unitOfWork.GetRepository<Category>().Delete(category);
            _unitOfWork.Save();
        }

        public CategoryResponse Get(int id)
        {
            var category = _unitOfWork.GetRepository<ToDoItem>().Get(id);

            if (category == null)
            {
                throw new NotFoundException(category);
            }

            return _mapper.Map<CategoryResponse>(category);
        }

        public IEnumerable<CategoryResponse> GetAll()
        {
            var categories = _unitOfWork.GetRepository<Category>().GetAll();
            if (categories is null)
                throw new NotFoundException(categories);
            return _mapper.Map<IEnumerable<CategoryResponse>>(categories);
        }

        public void Update(CategoryRequest categoryRequest, int id)
        {

            var category = _unitOfWork.GetRepository<Category>().Get(id);

            if (category == null)
            {
                throw new NotFoundException(category);
            }
            category = _mapper.Map(categoryRequest, category);

            _unitOfWork.GetRepository<Category>().Update(category);
            _unitOfWork.Save();
        }
    }
}
