﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai.roman.webAPI.Domains;
using senai.roman.webAPI.Interfaces;
using senai.roman.webAPI.Repositories;
using senai.roman.webAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace senai.roman.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        /// <summary>
        /// Realiza o login
        /// </summary>
        /// <param name="login">Objeto contendo as informações para realizar o login</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);

                if (usuarioBuscado == null)
                {
                    return NotFound("Email ou senha inválidos!");
                }

                var minhasClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim( "role", usuarioBuscado.IdTipoUsuario.ToString() )
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var meuToken = new JwtSecurityToken(
                       issuer: "roman.webAPI",
                       audience: "roman.webAPI",
                       claims: minhasClaims,
                       expires: DateTime.Now.AddHours(5),
                       signingCredentials: creds
                   );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
