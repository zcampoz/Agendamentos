using Agendamentos.Business;
using Agendamentos.Commom.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    public class ServicoController : ControllerBase
    {
        private readonly ILogger<ServicoController> _logger;
        private readonly IServicoBusiness _business;

        public ServicoController(ILogger<ServicoController> logger, IServicoBusiness business)
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

        [HttpGet("Prestador/{PrestadorID}")]
        public IActionResult GetByPrestadorId(long prestadorID)
        {
            return Ok(_business.GetByPrestadorId(prestadorID));
        }

        [HttpPost]
        public IActionResult Create([FromBody] ServiceRequestDto servico)
        {
            if (servico == null)
                return BadRequest();

            _business.Insert(servico);

            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] ServiceDto servico)
        {
            if (servico == null)
                return BadRequest();

            return Ok(_business.Update(servico));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}