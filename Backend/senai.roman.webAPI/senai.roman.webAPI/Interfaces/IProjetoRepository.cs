using senai.roman.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.roman.webAPI.Interfaces
{
    interface IProjetoRepository
    {
        /// <summary>
        /// Cadastra um novo projeto
        /// </summary>
        /// <param name="novoProjeto">Objeto contendo as informações o novo projeto</param>
        void Cadastrar(Projeto novoProjeto);

        /// <summary>
        /// Lista todos os projetos
        /// </summary>
        /// <returns>Uma lista de projetos</returns>
        List<Projeto> ListarTodos();
    }
}
