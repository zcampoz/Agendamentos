using Agendamentos.Commom.Enum;
using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Data.Converter.Implementation
{
    public class HorarioDisponibilidadeConverter : IParser<HorarioDisponibilidadeVO, HorarioDisponibilidade>, IParser<HorarioDisponibilidade, HorarioDisponibilidadeVO>
    {
        public HorarioDisponibilidade Parser(HorarioDisponibilidadeVO origem)
        {
            if (origem == null) return null;

            return new HorarioDisponibilidade
            { 
                ID = origem.ID,
                PrestadorID = origem.PrestadorID,
                DiaSemana = origem.DiaSemana.ToString(),
                HoraInicio = origem.HoraInicio, 
                HoraFim = origem.HoraFim
                //Prestador = origem.Prestador
            };
        }

        public HorarioDisponibilidadeVO Parser(HorarioDisponibilidade origem)
        {
            if (origem == null) return null;

            Enum.TryParse(origem.DiaSemana, out DiaSemanaEnum enumValue);

            return new HorarioDisponibilidadeVO
            {
                ID = origem.ID,
                PrestadorID = origem.PrestadorID,
                DiaSemana = enumValue,
                HoraInicio = origem.HoraInicio,
                HoraFim = origem.HoraFim
                //Prestador = origem.Prestador
            };
        }

        public List<HorarioDisponibilidade> Parse(List<HorarioDisponibilidadeVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<HorarioDisponibilidadeVO> Parse(List<HorarioDisponibilidade> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
