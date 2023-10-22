using Agendamentos.Business;
using Agendamentos.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    public class CategoriaServicoController : ControllerBase
    {
        private readonly ILogger<CategoriaServicoController> _logger;
        private readonly ICategoriaServicoBusiness _business;

        public CategoriaServicoController(ILogger<CategoriaServicoController> logger, ICategoriaServicoBusiness business)
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
        public IActionResult Create([FromBody] CategoriaServicoVO categoria)
        {
            if (categoria == null)
                return BadRequest();

            return Ok(_business.Insert(categoria));
        }

        [HttpPut]
        public IActionResult Update([FromBody] CategoriaServicoVO categoria)
        {
            if (categoria == null)
                return BadRequest();

            return Ok(_business.Update(categoria));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}