using Agendamentos.Commom.Enum;
using Agendamentos.Model.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Model
{
    public class HorarioDisponibilidade : BaseEntity
    {
        public TimeSpan HoraInicio { get; set; }

        public TimeSpan HoraFim { get; set; }

        [EnumDataType(typeof(DiaSemanaEnum))]
        public string DiaSemana { get; set; }

        [ForeignKey("Prestador")]
        public long PrestadorID { get; set; }

        public Usuario Prestador { get; set; }
    }
}
