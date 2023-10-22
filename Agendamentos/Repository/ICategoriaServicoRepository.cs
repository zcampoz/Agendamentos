using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface ICategoriaServicoRepository
    {
        public CategoriaServico Get(long id);

        public List<CategoriaServico> FindAll();

        public CategoriaServico Insert(CategoriaServico categoriaServico);

        public CategoriaServico Update(CategoriaServico categoriaServico);

        public void Delete(long id);
    }
}
