using Agendamentos.Commom.DTO;
using Agendamentos.Commom.Enum;
using Agendamentos.Model;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class UsuarioBusiness : IUsuarioBusiness
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioBusiness(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public List<UsuarioDto> FindAll()
        {
            return this.ParseUser(_repository.FindAll());
        }

        public UsuarioDto Get(long id)
        {
            return this.ConvertToUsuarioDto(_repository.Get(id));            
        }

        public UsuarioDto GetByEmail(string email)
        {
            return this.ConvertToUsuarioDto(_repository.GetByEmail(email));
        }

        public UsuarioDto Update(UsuarioDto usuario)
        {
            var entity = this.ConvertToUsuario(usuario);
            entity = _repository.Update(entity);
            return this.ConvertToUsuarioDto(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }

        private UsuarioDto ConvertToUsuarioDto(Usuario user)
        {
            Enum.TryParse(user.TipoUsuario, out UsuarioEnum enumValue);
            var empresa = enumValue.Equals(UsuarioEnum.prestador);

            return new UsuarioDto()
            {
                Id = user.ID,
                Email = user.Email,
                Nome = user.Nome,
                TipoUsuario = enumValue,
                Empresa = empresa
            };
        }

        private Usuario ConvertToUsuario(UsuarioDto user)
        {
            return new Usuario()
            {
                ID = user.Id,
                Email = user.Email,
                Nome = user.Nome,
                TipoUsuario = user.TipoUsuario.ToString()
            };
        }

        public List<UsuarioDto> ParseUser(List<Usuario> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => ConvertToUsuarioDto(item)).ToList();
        }

        public List<Usuario> ParseUser(List<UsuarioDto> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => ConvertToUsuario(item)).ToList();
        }
    }
}
