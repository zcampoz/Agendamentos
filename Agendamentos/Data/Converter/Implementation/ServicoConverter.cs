using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;

namespace Agendamentos.Data.Converter.Implementation
{
    public class ServicoConverter : IParser<ServicoVO, Servico>, IParser<Servico, ServicoVO>
    {
        private readonly CategoriaServicoConverter _converter;
        public ServicoConverter()
        {
            _converter = new CategoriaServicoConverter();
        }

        public Servico Parser(ServicoVO origem)
        {
            if (origem == null) return null;

            return new Servico
            { 
                ID = origem.ID,
                Nome = origem.Nome,
                Descricao = origem.Descricao,
                CategoriaID = origem.CategoriaID,
                DuracaoEstimada = origem.DuracaoEstimada,
                Preco = origem.Preco,
                Categoria = _converter.Parser(origem.Categoria)
            };
        }

        public ServicoVO Parser(Servico origem)
        {
            if (origem == null) return null;

            return new ServicoVO
            {
                ID = origem.ID,
                Nome = origem.Nome,
                Descricao = origem.Descricao,
                CategoriaID = origem.CategoriaID,
                DuracaoEstimada = origem.DuracaoEstimada,
                Preco = origem.Preco,
                Categoria = _converter.Parser(origem.Categoria)
            };
        }

        public List<Servico> Parse(List<ServicoVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<ServicoVO> Parse(List<Servico> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
