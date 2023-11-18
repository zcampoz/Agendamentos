using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Repository
{
    public interface IAgendamentoBusiness
    {
        public AgendamentoVO Get(long id);

        public List<AgendamentoVO> FindAll();

        public AgendamentoVO Insert(AgendamentoVO agendamento);

        public AgendamentoVO Update(AgendamentoVO agendamento);

        public void Delete(long id);

        public AgendamentoVO InsertAgendamento(AgendamentoDto agendamento);

        public List<AgendamentoVO> GetByClienteID(long clienteID);

        public List<AgendamentoVO> GetByPrestadorID(long prestadorID);

        public AgendamentoVO UpdateStatus(AgendamentoStatusDto agendamento);

        List<AgendamentoVO> GetAgendados(long prestadorID, string dataSelecionada);
    }
}
