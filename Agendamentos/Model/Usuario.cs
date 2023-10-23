using Agendamentos.Commom.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Agendamentos.Model
{
    [Table("Usuarios")]
    public class Usuario 
    {
        [Key]
        public long ID { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        [EnumDataType(typeof(UsuarioEnum))]
        public string TipoUsuario { get; set; }

        public string RefreshToken { get; set; }

        public DateTime? DataExpiracaoRefreshToken { get; set; }
    }
}
