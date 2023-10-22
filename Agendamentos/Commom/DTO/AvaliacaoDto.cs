using Agendamentos.Model;
using Agendamentos.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Commom.DTO
{
    public class AvaliacaoDto : BaseEntity
    {
        public int Classificacao { get; set; }

        public string Comentario { get; set; }

        [ForeignKey("Agendamento")]
        public long AgendamentoID { get; set; }

        public Agendamento Agendamento { get; set; }
    }
}
