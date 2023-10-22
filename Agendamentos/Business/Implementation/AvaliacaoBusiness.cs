using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class AvaliacaoBusiness : IAvaliacaoBusiness
    {
        private readonly IRepository<Avaliacao> _repository;
        private readonly AvaliacaoConverter _converter;

        public AvaliacaoBusiness(IRepository<Avaliacao> repository)
        {
            _repository = repository;
            _converter = new AvaliacaoConverter();
        }

        public List<AvaliacaoVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public AvaliacaoVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public AvaliacaoVO Insert(AvaliacaoVO avaliacao)
        {
            var entity = _converter.Parser(avaliacao);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public AvaliacaoVO Update(AvaliacaoVO avaliacao)
        {
            var entity = _converter.Parser(avaliacao);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
