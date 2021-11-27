using senai.roman.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.roman.webAPI.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Valida o usuário
        /// </summary>
        /// <param name="email">E-mail do usuário</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns>Um objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);

        /// <summary>
        /// Busca um usuário pelo seu id
        /// </summary>
        /// <param name="id">id do usuário que será buscado</param>
        /// <returns>O usuário buscado</returns>
        Usuario BuscarPorId(int id);
    }
}
