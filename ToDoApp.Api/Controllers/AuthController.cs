using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Interfaces;
using ToDoApp.Application.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest model)
    {
        _userService.Register(model);
        //if (result == "User already exists")
        //    return BadRequest(result);
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest model)
    {
        var (token, refreshToken) = _userService.Login(model);
        if (token == null || refreshToken == null)
            return Unauthorized("Invalid username or password");
        return Ok(new { Token = token, RefreshToken = refreshToken });
    }

    [HttpPost("refresh")]
    public IActionResult Refresh([FromBody] TokenDTO model)
    {
        var (newToken, newRefreshToken) = _userService.RefreshToken(model);
        if (newToken == null || newRefreshToken == null)
            return BadRequest("Invalid client request");

        return Ok(new { Token = newToken, RefreshToken = newRefreshToken });
    }

    [HttpPost("revoke")]
    public IActionResult Revoke([FromBody] TokenDTO model)
    {
        _userService.RevokeToken(model.RefreshToken);
        return NoContent();
    }
    [HttpGet("userid")]
    [Authorize]
    public IActionResult GetUserId()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token != null)
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (userId != null)
            {
                return Ok(new { userId = int.Parse(userId) });
            }
        }

        return Unauthorized();
    }
    [HttpGet("username")]
    [Authorize]
    public IActionResult GetUsernameByid()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token != null)
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var username = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            if (username != null)
            {
                return Ok(new { username });
            }
        }

        return Unauthorized();
    }
}

