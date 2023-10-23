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

        public void Delete(long id);

        public Usuario ValidarUsuario(AuthDTO usuario);

        public Usuario ValidarUsuario(string username);

        public Usuario AtualizaInfoUsuario(Usuario usuario);

        public bool RevokeToken(string username);

        public Usuario GetByEmail(string email);
    }
}
