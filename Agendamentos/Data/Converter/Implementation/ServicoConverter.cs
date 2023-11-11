using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;

namespace Agendamentos.Data.Converter.Implementation
{
    public class ServicoConverter : IParser<ServicoVO, Servico>, IParser<Servico, ServicoVO>
    {
        private readonly CategoriaServicoConverter _converterCategoria;
        private readonly UsuarioConverter _converterUsuario;
        public ServicoConverter()
        {
            _converterCategoria = new CategoriaServicoConverter();
            _converterUsuario = new UsuarioConverter();
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
                PrestadorID = origem.PrestadorID,
                DuracaoEstimada = origem.DuracaoEstimada,
                Preco = origem.Preco,
                Categoria = _converterCategoria.Parser(origem.Categoria),
                Prestador = _converterUsuario.Parser(origem.Prestador)
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
                PrestadorID = origem.PrestadorID,
                DuracaoEstimada = origem.DuracaoEstimada,
                Preco = origem.Preco,
                Categoria = _converterCategoria.Parser(origem.Categoria),
                Prestador = _converterUsuario.Parser(origem.Prestador)
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
