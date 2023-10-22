using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class HorarioDisponibilidadeBusiness : IHorarioDisponibilidadeBusiness
    {
        private readonly IRepository<HorarioDisponibilidade> _repository;
        private readonly HorarioDisponibilidadeConverter _converter;

        public HorarioDisponibilidadeBusiness(IRepository<HorarioDisponibilidade> repository)
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
