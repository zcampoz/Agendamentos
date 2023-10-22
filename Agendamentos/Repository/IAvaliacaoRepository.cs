using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface IAvaliacaoRepository
    {
        public Avaliacao Get(long id);

        public List<Avaliacao> FindAll();

        public Avaliacao Insert(Avaliacao avaliacao);

        public Avaliacao Update(Avaliacao avaliacao);

        public void Delete(long id);
    }
}
