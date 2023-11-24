using Agendamentos.Model.Base;

namespace Agendamentos.Commom.DTO
{
    public class DisponibilidadeDto : BaseEntity
    {
        public string HoraInicio { get; set; }

        public string HoraFim { get; set; }

        public string DiaSemana { get; set; }

        public long PrestadorID { get; set; }
    }
}
