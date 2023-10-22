using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Data.Converter.Implementation
{
    public class CategoriaServicoConverter : IParser<CategoriaServicoVO, CategoriaServico>, IParser<CategoriaServico, CategoriaServicoVO>
    {
        public CategoriaServico Parser(CategoriaServicoVO origem)
        {
            if (origem == null) return null;

            return new CategoriaServico
            { 
                ID = origem.ID,
                Nome = origem.Nome
            };
        }

        public CategoriaServicoVO Parser(CategoriaServico origem)
        {
            if (origem == null) return null;

            return new CategoriaServicoVO
            {
                ID = origem.ID,
                Nome = origem.Nome
            };
        }

        public List<CategoriaServico> Parse(List<CategoriaServicoVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<CategoriaServicoVO> Parse(List<CategoriaServico> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
