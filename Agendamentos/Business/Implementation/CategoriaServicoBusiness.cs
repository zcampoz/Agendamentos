using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class CategoriaServicoBusiness : ICategoriaServicoBusiness
    {
        private readonly IRepository<CategoriaServico> _repository;
        private readonly CategoriaServicoConverter _converter;

        public CategoriaServicoBusiness(IRepository<CategoriaServico> repository)
        {
            _repository = repository;
            _converter = new CategoriaServicoConverter();
        }

        public List<CategoriaServicoVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public CategoriaServicoVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public CategoriaServicoVO Insert(CategoriaServicoVO categoriaServico)
        {
            var entity = _converter.Parser(categoriaServico);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public CategoriaServicoVO Update(CategoriaServicoVO categoriaServico)
        {
            var entity = _converter.Parser(categoriaServico);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
