namespace Agendamentos.Commom.DTO
{
    public class ServiceDto
    {
        public long Id { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public decimal Preco { get; set; }

        public int DuracaoEstimada { get; set; }

        public long CategoriaID { get; set; }

        public string CategoriaNome { get; set; }

        public long PrestadorID { get; set; }
    }
}
