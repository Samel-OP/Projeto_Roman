using Microsoft.EntityFrameworkCore;
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

        public void Cadastrar(Projeto novoProjeto, int idUsuario)
        {
            Projeto projeto = new Projeto()
            {
                IdTema = novoProjeto.IdTema,
                IdUsuario = idUsuario,
                NomeProjeto = novoProjeto.NomeProjeto,
                Descricao = novoProjeto.Descricao,
            };

            ctx.Projetos.Add(projeto);

            ctx.SaveChanges();
        }

        public List<Projeto> ListarTodos()
        {
            return ctx.Projetos
                .Include("IdUsuarioNavigation")
                .Include(c => c.IdTemaNavigation)
                .ToList();
        }
    }
}
