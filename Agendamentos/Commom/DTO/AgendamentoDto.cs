using Agendamentos.Commom.Enum;
using Agendamentos.Model;
using Agendamentos.Model.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Commom.DTO
{
    public class AgendamentoDto
    {
        public long ID { get; set; }

        public DateTime DataHora { get; set; }

        public long ClienteID { get; set; }

        public long PrestadorID { get; set; }

        public long ServicoID { get; set; }
    }
}
