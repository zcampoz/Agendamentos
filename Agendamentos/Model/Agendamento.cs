using Agendamentos.Commom.Enum;
using Agendamentos.Model.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Model
{
    public class Agendamento : BaseEntity
    {
        public DateTime DataHora { get; set; }

        [EnumDataType(typeof(EstadoAgendamentoEnum))]
        public string EstadoAgendamento { get; set; }

        [ForeignKey("Cliente")]
        public long ClienteID { get; set; }

        public Usuario Cliente { get; set; }


        [ForeignKey("Prestador")]
        public long PrestadorID { get; set; }

        public Usuario Prestador { get; set; }

        [ForeignKey("Servico")]
        public long ServicoID { get; set; }

        public Servico Servico { get; set; }
    }
}
