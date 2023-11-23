using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;
using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface IUsuarioRepository
    {
        public Usuario Get(long id);

        public List<Usuario> FindAll();

        public Usuario Insert(Usuario usuario);

        public Usuario Update(Usuario usuario);

        public Usuario UpdatePerfilEmpresa(long userId);

        public void Delete(long id);

        public Usuario ValidarUsuario(AuthDTO usuario);

        public Usuario ValidarUsuario(string username);

        public Usuario AtualizaInfoUsuario(Usuario usuario);

        public bool RevokeToken(string username, string refreshToken);

        public Usuario GetByEmail(string email);
    }
}
