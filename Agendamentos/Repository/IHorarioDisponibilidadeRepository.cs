using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface IHorarioDisponibilidadeRepository
    {
        public HorarioDisponibilidade Get(long id);

        public List<HorarioDisponibilidade> FindAll();

        public HorarioDisponibilidade Insert(HorarioDisponibilidade horarioDisponibilidade);

        public HorarioDisponibilidade Update(HorarioDisponibilidade horarioDisponibilidade);

        public void Delete(long id);

        public HorarioDisponibilidade GetHorario(long prestadorId, string diaDaSemana);
    }
}
