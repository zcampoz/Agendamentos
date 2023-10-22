using Agendamentos.Commom.Enum;

namespace Agendamentos.Data.VO
{
    public class UsuarioVO
    {
        public long ID { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public UsuarioEnum TipoUsuario { get; set; }
    }
}
