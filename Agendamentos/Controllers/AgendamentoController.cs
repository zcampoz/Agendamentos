using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;
using Agendamentos.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    public class AgendamentoController : ControllerBase
    {
        private readonly ILogger<AgendamentoController> _logger;
        private readonly IAgendamentoBusiness _business;

        public AgendamentoController(ILogger<AgendamentoController> logger, IAgendamentoBusiness business)
        {
            _logger = logger;
            _business = business;
        }

        [HttpGet]
        public IActionResult FindAll()
        {
            return Ok(_business.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            return Ok(_business.Get(id));
        }

        [HttpGet("Prestador/{prestadorID}")]
        public IActionResult GetByPrestadorID(long prestadorID)
        {
            var teste = _business.GetByPrestadorID(prestadorID);
            return Ok(teste);
        }

        [HttpGet("Cliente/{clienteID}")]
        public IActionResult GetByClienteID(long clienteID)
        {
            var teste = _business.GetByClienteID(clienteID);
            return Ok(teste);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AgendamentoDto dados)
        {
            if (dados == null)
                return BadRequest();

            return Ok(_business.InsertAgendamento(dados));
        }

        [HttpPut]
        public IActionResult Update([FromBody] AgendamentoVO agendamento)
        {
            if (agendamento == null)
                return BadRequest();

            return Ok(_business.Update(agendamento));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}