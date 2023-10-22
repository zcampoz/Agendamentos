using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IHorarioDisponibilidadeBusiness
    {
        public HorarioDisponibilidadeVO Get(long id);

        public List<HorarioDisponibilidadeVO> FindAll();

        public HorarioDisponibilidadeVO Insert(HorarioDisponibilidadeVO horarioDisponibilidade);

        public HorarioDisponibilidadeVO Update(HorarioDisponibilidadeVO horarioDisponibilidade);

        public void Delete(long id);
    }
}
