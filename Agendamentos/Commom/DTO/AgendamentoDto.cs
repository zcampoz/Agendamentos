namespace Agendamentos.Commom.DTO
{
    public class AgendamentoDto
    {
        public long UsuarioId { get; set; }

        public long ServicoId { get; set; }

        public long PrestadorId { get; set; }

        public string DataHora { get; set; }

        public string HorarioAgendamento { get; set; }
    }
}
