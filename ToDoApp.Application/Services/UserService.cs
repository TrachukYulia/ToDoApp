using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Interfaces;
using ToDoApp.Domain.Models;
using ToDoApp.Domain.Repositories;
using ToDoApp.Application.Exceptions;

namespace ToDoApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IJWTService _jwtService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IJWTService jwtService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        public void Register(RegisterRequest model)
        {
            if (_unitOfWork.UsersRepository.UserExists(model.Username))
                throw new ArgumentException(message: "User already exists");
            var user = _mapper.Map<User>(model);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            _unitOfWork.UsersRepository.Create(user);
            _unitOfWork.Save();

            var categories = new List<Category>
            {
            new Category { Name = "My Day", Priority = 1, Icon = "wb_sunny", UserId = user.Id },
            new Category { Name = "Important", Priority = 1, Icon = "star", UserId = user.Id },
            new Category { Name = "Tasks", Priority = 1, Icon = "task", UserId = user.Id },
            new Category { Name = "Planned", Priority = 2, Icon = "event", UserId = user.Id },
            new Category { Name = "Groceries", Priority = 2, Icon = "shopping_cart", UserId = user.Id }
            };

            foreach (var category in categories)
            {
                _unitOfWork.GetRepository<Category>().Create(category);
            }
            _unitOfWork.Save();
        }
        public (string, string) Login(LoginRequest model)
        {
            var user = _unitOfWork.UsersRepository.GetUserByUsername(model.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return (null, null);
            var token = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();
            user.Token = token;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            _unitOfWork.UsersRepository.Update(user);
            _unitOfWork.Save();

            return (token, refreshToken);
        }

        public (string, string) RefreshToken(TokenDTO model)
        {
            if (model == null)
                return (null, null);

            var principal = _jwtService.GetPrincipalFromExpiredToken(model.Token);
            var username = principal.Identity.Name;

            var user = _unitOfWork.UsersRepository.GetUserByUsername(username);
            if (user == null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return (null, null);

            var newToken = _jwtService.GenerateToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            _unitOfWork.UsersRepository.Update(user);
            _unitOfWork.Save();

            return (newToken, newRefreshToken);
        }

        public void RevokeToken(string refreshToken)
        {
            var user = _unitOfWork.UsersRepository.GetUserByRefreshToken(refreshToken);
            if (user != null)
            {
                user.RefreshToken = null;
                _unitOfWork.UsersRepository.Update(user);
                _unitOfWork.Save();
            }
        }
    }
}
