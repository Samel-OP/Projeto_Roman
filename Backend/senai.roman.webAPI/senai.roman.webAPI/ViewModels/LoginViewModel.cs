﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace senai.roman.webAPI.ViewModels
{
    /// <summary>
    /// Classe responsável pelo modelo de Login
    /// </summary>
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o email do usuário!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha do usuário!")]
        public string Senha { get; set; }
    }
}
