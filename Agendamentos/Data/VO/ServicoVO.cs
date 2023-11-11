namespace Agendamentos.Data.VO
{
    public class ServicoVO
    {
        public long ID { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public decimal Preco { get; set; }

        public int DuracaoEstimada { get; set; }

        public long CategoriaID { get; set; }

        public CategoriaServicoVO Categoria { get; set; }

        public long PrestadorID { get; set; }

        public UsuarioVO Prestador { get; set; }
    }
}
