using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface IAgendamentoRepository
    {
        public Agendamento Get(long id);

        public List<Agendamento> FindAll();

        public Agendamento Insert(Agendamento agendamento);

        public Agendamento Update(Agendamento agendamento);

        public void Delete(long id);

        public List<Agendamento> GetByClienteID(long clienteID);

        public List<Agendamento> GetByPrestadorID(long prestadorID);
    }
}
