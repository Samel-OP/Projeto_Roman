using System;
using System.Collections.Generic;

#nullable disable

namespace senai.roman.webAPI.Domains
{
    public partial class Professore
    {
        public int IdProfessor { get; set; }
        public int IdUsuario { get; set; }
        public string NomeProfessor { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
