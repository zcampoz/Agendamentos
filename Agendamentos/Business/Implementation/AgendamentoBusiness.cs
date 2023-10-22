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

        public AgendamentoVO Insert(AgendamentoVO agendamento)
        {
            var entity = _converter.Parser(agendamento);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public AgendamentoDto InsertAgendamento(AgendamentoDto agendamento)
        {
            var entity = new Agendamento()
                {
                    DataHora = agendamento.DataHora,
                    EstadoAgendamento = EstadoAgendamentoEnum.pendente.ToString(),
                    ClienteID = agendamento.ClienteID,
                    PrestadorID = agendamento.PrestadorID,
                    ServicoID = agendamento.ServicoID
                };

            entity = _repository.Insert(entity);

            return new AgendamentoDto()
            {
                ID = entity.ID,
                DataHora = entity.DataHora,
                ClienteID = entity.ClienteID,
                ServicoID = entity.ServicoID,
                PrestadorID = entity.PrestadorID
            };
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
    }
}
