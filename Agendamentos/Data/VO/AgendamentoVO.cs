using Agendamentos.Commom.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Data.VO
{
    public class AgendamentoVO
    {
        public long ID { get; set; }

        public DateTime DataHora { get; set; }

        public EstadoAgendamentoEnum EstadoAgendamento { get; set; }

        [ForeignKey("Cliente")]
        public long ClienteID { get; set; }

        public UsuarioVO Cliente { get; set; }


        [ForeignKey("Prestador")]
        public long PrestadorID { get; set; }

        public UsuarioVO Prestador { get; set; }

        [ForeignKey("Servico")]
        public long ServicoID { get; set; }

        public ServicoVO Servico { get; set; }
    }
}
