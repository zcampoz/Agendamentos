using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Data.VO
{
    public class AvaliacaoVO
    {
        public long ID { get; set; }

        public int Classificacao { get; set; }

        public string Comentario { get; set; }

        [ForeignKey("Agendamento")]
        public long AgendamentoID { get; set; }

        public AgendamentoVO Agendamento { get; set; }
    }
}
