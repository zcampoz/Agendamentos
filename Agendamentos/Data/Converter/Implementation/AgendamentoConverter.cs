using Agendamentos.Commom.Enum;
using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Data.Converter.Implementation
{
    public class AgendamentoConverter : IParser<AgendamentoVO, Agendamento>, IParser<Agendamento, AgendamentoVO>
    {
        private readonly UsuarioConverter _userConverter;
        private readonly ServicoConverter _serviceConverter;

        public AgendamentoConverter()
        {
            _userConverter = new UsuarioConverter();
            _serviceConverter = new ServicoConverter();
        }

        public Agendamento Parser(AgendamentoVO origem)
        {
            if (origem == null) return null;

            return new Agendamento
            { 
                ID = origem.ID,
                DataHora = origem.DataHora,
                EstadoAgendamento = origem.EstadoAgendamento.ToString(),
                ClienteID = origem.ClienteID,
                PrestadorID = origem.PrestadorID,
                ServicoID = origem.ServicoID,
                Cliente = _userConverter.Parser(origem.Cliente),
                Prestador = _userConverter.Parser(origem.Prestador),
                Servico = _serviceConverter.Parser(origem.Servico)
            };
        }

        public AgendamentoVO Parser(Agendamento origem)
        {
            if (origem == null) return null;

            Enum.TryParse(origem.EstadoAgendamento, out EstadoAgendamentoEnum enumValue);

            return new AgendamentoVO
            {
                ID = origem.ID,
                DataHora = origem.DataHora,
                EstadoAgendamento = enumValue,
                ClienteID = origem.ClienteID,
                PrestadorID = origem.PrestadorID,
                ServicoID = origem.ServicoID,
                Cliente = _userConverter.Parser(origem.Cliente),
                Prestador = _userConverter.Parser(origem.Prestador),
                Servico = _serviceConverter.Parser(origem.Servico)
            };
        }

        public List<Agendamento> Parse(List<AgendamentoVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<AgendamentoVO> Parse(List<Agendamento> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
