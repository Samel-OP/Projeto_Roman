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
            return ctx.Projetos.Select(p => new Projeto()
            {
                NomeProjeto = p.NomeProjeto,
                IdUsuario = p.IdUsuario,
                Descricao = p.Descricao,
                IdUsuarioNavigation = new Usuario()
                {
                    Nome = p.IdUsuarioNavigation.Nome,
                    Email = p.IdUsuarioNavigation.Email,
                    Senha = p.IdUsuarioNavigation.Senha
                },
                IdTemaNavigation = new Tema()
                {
                    IdTema = p.IdTemaNavigation.IdTema,
                    NomeTema = p.IdTemaNavigation.NomeTema
                }
            }).ToList();
        }
    }
}
