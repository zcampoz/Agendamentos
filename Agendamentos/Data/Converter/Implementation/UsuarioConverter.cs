using Agendamentos.Commom.Enum;
using Agendamentos.Data.Converter.Contract;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Data.Converter.Implementation
{
    public class UsuarioConverter : IParser<UsuarioVO, Usuario>, IParser<Usuario, UsuarioVO>
    {
        public Usuario Parser(UsuarioVO origem)
        {
            if (origem == null) return null;

            return new Usuario
            { 
                ID = origem.ID, 
                Nome = origem.Nome,
                Email = origem.Email,
                Senha = origem.Senha,
                TipoUsuario = origem.TipoUsuario.ToString(),
                RefreshToken = origem.RefreshToken,
                DataExpiracaoRefreshToken = origem.DataExpiracaoRefreshToken
            };
        }

        public UsuarioVO Parser(Usuario origem)
        {
            if (origem == null) return null;

            Enum.TryParse(origem.TipoUsuario, out UsuarioEnum enumValue);

            return new UsuarioVO
            {
                ID = origem.ID,
                Nome = origem.Nome,
                Email = origem.Email,
                Senha = origem.Senha,
                TipoUsuario = enumValue,
                RefreshToken = origem.RefreshToken,
                DataExpiracaoRefreshToken = origem.DataExpiracaoRefreshToken
            };
        }

        public List<Usuario> Parse(List<UsuarioVO> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }

        public List<UsuarioVO> Parse(List<Usuario> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => Parser(item)).ToList();
        }
    }
}
