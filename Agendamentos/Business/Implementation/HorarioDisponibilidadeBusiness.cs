using Agendamentos.Commom.DTO;
using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;
using System.Globalization;

namespace Agendamentos.Business.Implementation
{
    public class HorarioDisponibilidadeBusiness : IHorarioDisponibilidadeBusiness
    {
        private readonly IHorarioDisponibilidadeRepository _repository;
        private readonly HorarioDisponibilidadeConverter _converter;

        public HorarioDisponibilidadeBusiness(IHorarioDisponibilidadeRepository repository)
        {
            _repository = repository;
            _converter = new HorarioDisponibilidadeConverter();
        }

        public List<HorarioDisponibilidadeVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public HorarioDisponibilidadeVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public HorarioDisponibilidadeVO GetHorario(long prestadorId, string dataSecionada)
        {
            var dataAtual = Convert.ToDateTime(dataSecionada);

            CultureInfo cultura = new CultureInfo("pt-BR");
            var diaDaSemanaEmPortugues = cultura.DateTimeFormat.GetDayName(dataAtual.DayOfWeek).Split('-');

            return _converter.Parser(_repository.GetHorario(prestadorId, diaDaSemanaEmPortugues[0]));
        }

        public HorarioDisponibilidadeVO Insert(HorarioDisponibilidadeVO horarioDisponibilidade)
        {
            var entity = _converter.Parser(horarioDisponibilidade);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public HorarioDisponibilidadeVO Update(HorarioDisponibilidadeVO horarioDisponibilidade)
        {
            var entity = _converter.Parser(horarioDisponibilidade);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
