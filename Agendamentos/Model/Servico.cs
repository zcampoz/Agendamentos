using Agendamentos.Model;
using Agendamentos.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

public class Servico : BaseEntity
{
    public string Nome { get; set; }

    public string Descricao { get; set; }

    public decimal Preco { get; set; }

    public int DuracaoEstimada { get; set; }

    [ForeignKey("Categoria")]
    public long CategoriaID { get; set; }

    public CategoriaServico Categoria { get; set; }
}
