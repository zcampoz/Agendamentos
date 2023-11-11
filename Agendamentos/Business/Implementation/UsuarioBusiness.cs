using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class UsuarioBusiness : IUsuarioBusiness
    {
        private readonly IUsuarioRepository _repository;
        private readonly UsuarioConverter _converter; 

        public UsuarioBusiness(IUsuarioRepository repository)
        {
            _repository = repository;
            _converter = new UsuarioConverter();
        }

        public List<UsuarioVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public UsuarioVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public UsuarioVO GetByEmail(string email)
        {
            return _converter.Parser(_repository.GetByEmail(email));
        }

        public UsuarioVO Insert(UsuarioVO usuario)
        {
            var entity = _converter.Parser(usuario);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public UsuarioVO Update(UsuarioVO usuario)
        {
            var entity = _converter.Parser(usuario);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
