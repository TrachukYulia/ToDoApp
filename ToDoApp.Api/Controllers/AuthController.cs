using Microsoft.AspNetCore.Mvc;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Interfaces;

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
}

