using Agendamentos.Business;
using Agendamentos.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ILogger<UsuarioController> _logger;
        private readonly IUsuarioBusiness _business;

        public UsuarioController(ILogger<UsuarioController> logger, IUsuarioBusiness business)
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
        public IActionResult Create([FromBody] UsuarioVO usuario)
        {
            if (usuario == null)
                return BadRequest();

            return Ok(_business.Insert(usuario));
        }

        [HttpPut]
        public IActionResult Update([FromBody] UsuarioVO usuario)
        {
            if (usuario == null)
                return BadRequest();

            return Ok(_business.Update(usuario));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}