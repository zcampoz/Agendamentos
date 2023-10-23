using Agendamentos.Commom.Enum;

namespace Agendamentos.Commom.DTO
{
    public class RegisterDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public UsuarioEnum TipoUsuario { get; set; }
    }
}
