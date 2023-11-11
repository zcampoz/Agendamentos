using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IUsuarioBusiness
    {
        public UsuarioVO Get(long id);

        public UsuarioVO GetByEmail(string email);

        public List<UsuarioVO> FindAll();

        public UsuarioVO Insert(UsuarioVO usuario);

        public UsuarioVO Update(UsuarioVO usuario);

        public void Delete(long id);
    }
}
