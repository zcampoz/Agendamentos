using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IHorarioDisponibilidadeBusiness
    {
        HorarioDisponibilidadeVO GetHorario(long prestadorId, string dataSecionada);

        public List<HorarioDisponibilidadeVO> GetByPrestadorId(long prestadorID);

        public HorarioDisponibilidadeVO Insert(DisponibilidadeDto horarioDisponibilidade);

        public HorarioDisponibilidadeVO Update(HorarioDisponibilidadeVO horarioDisponibilidade);

        public void Delete(long id);        
    }
}
