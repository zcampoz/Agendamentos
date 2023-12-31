﻿using Agendamentos.Business;
using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private ILoginBusiness _loginBusiness;

        public AuthController(ILoginBusiness loginBusiness)
        {
            _loginBusiness = loginBusiness;
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult Signin([FromBody] AuthDTO auth)
        {
            if (auth == null) return BadRequest("Usuário Inválido");
            var token = _loginBusiness.ValidateCredentials(auth);
            if (token == null) return Unauthorized();
            return Ok(token);
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh([FromBody] TokenVO tokenVo)
        {
            if (tokenVo == null) return BadRequest("Token Inválido");
            var token = _loginBusiness.ValidateCredentials(tokenVo);
            if (token == null) return BadRequest("Token Inválido");
            return Ok(token);
        }

        [HttpGet]
        [Route("revoke")]
        [Authorize("Bearer")]
        public IActionResult Revoke()
        {
            var username = User.Identity.Name;
            var result = _loginBusiness.RevokeToken(username);
            if (!result) return BadRequest("Token Inválido");
            return NoContent();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterDTO register)
        {
            if (register == null) return BadRequest("Usuário Inválido");

            var user = _loginBusiness.GetUserByEmail(register.Email);
            if (user != null) return BadRequest("Usuário já existe");

            var usuario = _loginBusiness.CreateUser(register);
            if (usuario == null) return BadRequest("Usuário Inválido");

            var auth = new AuthDTO() { Email = register.Email, Senha = register.Senha }; 

            var token = _loginBusiness.ValidateCredentials(auth);
            if (token == null) return Unauthorized();

            return Ok(token);
        }
    }
}
