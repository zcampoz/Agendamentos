using Agendamentos.Business;
using Agendamentos.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    public class AvaliacaoController : ControllerBase
    {
        private readonly ILogger<AvaliacaoController> _logger;
        private readonly IAvaliacaoBusiness _business;

        public AvaliacaoController(ILogger<AvaliacaoController> logger, IAvaliacaoBusiness business)
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

        [HttpPost]
        public IActionResult Create([FromBody] AvaliacaoVO avaliacao)
        {
            if (avaliacao == null)
                return BadRequest();

            return Ok(_business.Insert(avaliacao));
        }

        [HttpPut]
        public IActionResult Update([FromBody] AvaliacaoVO avaliacao)
        {
            if (avaliacao == null)
                return BadRequest();

            return Ok(_business.Update(avaliacao));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}