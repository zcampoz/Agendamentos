using Microsoft.EntityFrameworkCore;

namespace Agendamentos.Model.Context
{
    public class SqlContext : DbContext
    {
        public SqlContext() { }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }
        
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Agendamento> Agendamentos { get; set; }
        
        public DbSet<Avaliacao> Avaliacoes { get; set; }

        public DbSet<CategoriaServico> CategoriasServico { get; set; }

        public DbSet<HorarioDisponibilidade> HorariosDisponibilidade { get; set; }

        public DbSet<Servico> Servicos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
