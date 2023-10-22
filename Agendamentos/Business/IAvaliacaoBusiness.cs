using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IAvaliacaoBusiness
    {
        public AvaliacaoVO Get(long id);

        public List<AvaliacaoVO> FindAll();

        public AvaliacaoVO Insert(AvaliacaoVO avaliacao);

        public AvaliacaoVO Update(AvaliacaoVO avaliacao);

        public void Delete(long id);
    }
}
