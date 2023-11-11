using Agendamentos.Model.Base;

namespace Agendamentos.Commom.DTO
{
    public class HorarioDisponibilidadeRequestDto : BaseEntity
    {
        public long PrestadorID { get; set; }

        public string DataSelecionada { get; set; }
    }
}
