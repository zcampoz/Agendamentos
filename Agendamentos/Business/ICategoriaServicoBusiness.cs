using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface ICategoriaServicoBusiness
    {
        public CategoriaServicoVO Get(long id);

        public List<CategoriaServicoVO> FindAll();

        public CategoriaServicoVO Insert(CategoriaServicoVO categoriaServico);

        public CategoriaServicoVO Update(CategoriaServicoVO categoriaServico);

        public void Delete(long id);
    }
}
