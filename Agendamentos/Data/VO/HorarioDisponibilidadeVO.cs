using Agendamentos.Commom.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Data.VO
{
    public class HorarioDisponibilidadeVO
    {
        public long ID { get; set; }

        public TimeSpan HoraInicio { get; set; }

        public TimeSpan HoraFim { get; set; }

        public DiaSemanaEnum DiaSemana { get; set; }

        [ForeignKey("Prestador")]
        public long PrestadorID { get; set; }

        public UsuarioVO Prestador { get; set; }
    }
}
