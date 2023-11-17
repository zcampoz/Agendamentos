using Agendamentos.Commom.Enum;

namespace Agendamentos.Commom.DTO
{
    public class UsuarioDto
    {
        public long Id { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public UsuarioEnum TipoUsuario { get; set; }

        public bool Empresa { get; set; }
    }
}
