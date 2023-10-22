using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Data.Converter.Implementation
{
    public class AvaliacaoConverter : IParser<AvaliacaoVO, Avaliacao>, IParser<Avaliacao, AvaliacaoVO>
    {
        public Avaliacao Parser(AvaliacaoVO origem)
        {
            if (origem == null) return null;

            return new Avaliacao
            { 
                ID = origem.ID,
                Comentario = origem.Comentario,
                Classificacao = origem.Classificacao,
                AgendamentoID = origem.AgendamentoID
            };
        }

        public AvaliacaoVO Parser(Avaliacao origem)
        {
            if (origem == null) return null;

            return new AvaliacaoVO
            {
                ID = origem.ID,
                Comentario = origem.Comentario,
                Classificacao = origem.Classificacao,
                AgendamentoID = origem.AgendamentoID
            };
        }

        public List<Avaliacao> Parse(List<AvaliacaoVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<AvaliacaoVO> Parse(List<Avaliacao> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
