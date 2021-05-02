using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // [HttpPost("register")]
        // public async Task<ActionResult<AppUser>> Register(string username, string password)
        // {
        //     using var hmac = new HMACSHA512();
        //     var user = new AppUser
        //     {
        //      UserName= username,
        //      PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
        //       PasswordSalt = hmac.Key
        //     };
        //     _context.Users.Add(user);
        //     await _context.SaveChangesAsync();
        //     return user;
        // }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.UserName)) return BadRequest("User already exists");

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // fetch the user from DB on basis of Username provided in input
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            // if user doesn't exist, throw invalid user name 
            if (user == null) return Unauthorized("Invalid User name");

            // create HMAC salting for passord
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

             return new UserDto{
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }


        private async Task<bool> UserExist(string userName)
        {
            return await _context.Users.AnyAsync(user => user.UserName == userName.ToLower());
        }

    }
}