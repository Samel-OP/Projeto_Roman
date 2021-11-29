using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using senai.roman.webAPI.Domains;

#nullable disable

namespace senai.roman.webAPI.Context
{
    public partial class RomanContext : DbContext
    {
        public RomanContext()
        {
        }

        public RomanContext(DbContextOptions<RomanContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Professore> Professores { get; set; }
        public virtual DbSet<Projeto> Projetos { get; set; }
        public virtual DbSet<Tema> Temas { get; set; }
        public virtual DbSet<Tipousuario> Tipousuarios { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=NOTE0113A2\\SQLEXPRESS17; initial catalog=PROJETO_ROMAN; user Id=sa; pwd=senai@132;");
                // optionsBuilder.UseSqlServer("Data Source=DESKTOP-20INV7D\\SQLEXPRESS; initial catalog=PROJETO_ROMAN; user Id=sa; pwd=SenaiSamuel1;");
                // SoptionsBuilder.UseSqlServer("Data Source=NOTE0113I5\\SQLEXPRESS; initial catalog=PROJETO_ROMAN; user Id=sa; pwd=Senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Professore>(entity =>
            {
                entity.HasKey(e => e.IdProfessor)
                    .HasName("PK__PROFESSO__4E7C3C6D3D5BC669");

                entity.ToTable("PROFESSORES");

                entity.Property(e => e.IdProfessor).HasColumnName("idProfessor");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.NomeProfessor)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("nomeProfessor");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Professores)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__PROFESSOR__idUsu__3C69FB99");
            });

            modelBuilder.Entity<Projeto>(entity =>
            {
                entity.HasKey(e => e.IdProjeto)
                    .HasName("PK__PROJETOS__8FCCED76E09A95C7");

                entity.ToTable("PROJETOS");

                entity.Property(e => e.IdProjeto).HasColumnName("idProjeto");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descricao");

                entity.Property(e => e.IdTema).HasColumnName("idTema");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.NomeProjeto)
                    .IsRequired()
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("nomeProjeto");

                entity.HasOne(d => d.IdTemaNavigation)
                    .WithMany(p => p.Projetos)
                    .HasForeignKey(d => d.IdTema)
                    .HasConstraintName("FK__PROJETOS__idTema__412EB0B6");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Projetos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__PROJETOS__idUsua__4222D4EF");
            });

            modelBuilder.Entity<Tema>(entity =>
            {
                entity.HasKey(e => e.IdTema)
                    .HasName("PK__TEMA__BCD9EB48F7C510AF");

                entity.ToTable("TEMA");

                entity.Property(e => e.IdTema).HasColumnName("idTema");

                entity.Property(e => e.NomeTema)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nomeTema");
            });

            modelBuilder.Entity<Tipousuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TIPOUSUA__03006BFF37FBA590");

                entity.ToTable("TIPOUSUARIO");

                entity.HasIndex(e => e.Tipo, "UQ__TIPOUSUA__E7F9564900E4686D")
                    .IsUnique();

                entity.Property(e => e.IdTipoUsuario)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idTipoUsuario");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("tipo");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__USUARIO__645723A672069285");

                entity.ToTable("USUARIO");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nome");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(18)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__USUARIO__idTipoU__398D8EEE");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
