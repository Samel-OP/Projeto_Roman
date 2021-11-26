using System;
using System.Collections.Generic;

#nullable disable

namespace senai.roman.webAPI.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Professores = new HashSet<Professore>();
            Projetos = new HashSet<Projeto>();
        }

        public int IdUsuario { get; set; }
        public byte IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Professore> Professores { get; set; }
        public virtual ICollection<Projeto> Projetos { get; set; }
    }
}
