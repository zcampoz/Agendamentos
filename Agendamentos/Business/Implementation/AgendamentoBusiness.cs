using Agendamentos.Commom.DTO;
using Agendamentos.Commom.Enum;
using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class AgendamentoBusiness : IAgendamentoBusiness
    {
        private readonly IAgendamentoRepository _repository;
        private readonly AgendamentoConverter _converter;

        public AgendamentoBusiness(IAgendamentoRepository repository)
        {
            _repository = repository;
            _converter = new AgendamentoConverter();
        }

        public List<AgendamentoVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public AgendamentoVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public List<AgendamentoVO> GetByClienteID(long clienteID)
        {
            return _converter.Parse(_repository.GetByClienteID(clienteID));
        }

        public List<AgendamentoVO> GetByPrestadorID(long prestadorID)
        {
            return _converter.Parse(_repository.GetByPrestadorID(prestadorID));
        }

        public AgendamentoVO Insert(AgendamentoVO agendamento)
        {
            var entity = _converter.Parser(agendamento);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public AgendamentoVO InsertAgendamento(AgendamentoDto agendamento)
        {
            return _converter.Parser(_repository.Insert(this.ConvertToEntity(agendamento)));
        }

        public AgendamentoVO Update(AgendamentoVO agendamento)
        {
            var entity = _converter.Parser(agendamento);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }

        private Agendamento ConvertToEntity(AgendamentoDto agendamento)
        {
            return new Agendamento()
            {
                DataHora = Convert.ToDateTime(agendamento.DataHora + "T" + agendamento.HorarioAgendamento),
                EstadoAgendamento = EstadoAgendamentoEnum.pendente.ToString(),
                ClienteID = agendamento.UsuarioId,
                PrestadorID = agendamento.PrestadorId,
                ServicoID = agendamento.ServicoId
            };
        }
    }
}
