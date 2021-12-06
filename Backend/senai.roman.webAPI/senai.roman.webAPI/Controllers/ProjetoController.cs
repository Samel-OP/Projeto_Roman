using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.roman.webAPI.Domains;
using senai.roman.webAPI.Interfaces;
using senai.roman.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.roman.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjetoController : ControllerBase
    {
        private IProjetoRepository _projetoRepository { get; set; }

        public ProjetoController()
        {
            _projetoRepository = new ProjetoRepository();
        }

        /// <summary>
        /// Lista todos os projetos
        /// </summary>
        /// <returns>Uma lista de projetos</returns>
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_projetoRepository.ListarTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Cadastra um novo projeto
        /// </summary>
        /// <param name="novoProjeto">Objeto contendo o novo projeto</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Cadastrar(Projeto novoProjeto)
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _projetoRepository.Cadastrar(novoProjeto, idUsuario);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
