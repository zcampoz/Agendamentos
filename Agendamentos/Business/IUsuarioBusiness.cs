using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IUsuarioBusiness
    {
        public UsuarioDto Get(long id);

        public UsuarioDto GetByEmail(string email);

        public List<UsuarioDto> FindAll();

        public UsuarioDto Update(UsuarioDto usuario);

        public void Delete(long id);

        public UsuarioDto AtualizarPerfilPrestador(long userId);
    }
}
