using senai.roman.webAPI.Context;
using senai.roman.webAPI.Domains;
using senai.roman.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.roman.webAPI.Repositories
{
    public class ProjetoRepository : IProjetoRepository
    {
        RomanContext ctx = new RomanContext();

        public void Cadastrar(Projeto novoProjeto)
        {
            ctx.Projetos.Add(novoProjeto);

            ctx.SaveChanges();
        }

        public List<Projeto> ListarTodos()
        {
            return ctx.Projetos.ToList();
        }
    }
}
