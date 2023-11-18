using Agendamentos.Business;
using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Agendamentos.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("api/[controller]")]
    public class HorarioDisponibilidadeController : ControllerBase
    {
        private readonly ILogger<HorarioDisponibilidadeController> _logger;
        private readonly IHorarioDisponibilidadeBusiness _business;

        public HorarioDisponibilidadeController(ILogger<HorarioDisponibilidadeController> logger, IHorarioDisponibilidadeBusiness business)
        {
            _logger = logger;
            _business = business;
        }
        
        [HttpGet]
        public IActionResult Get(long PrestadorID,  string dataSecionada)
        {
            return Ok(_business.GetHorario(PrestadorID, dataSecionada));
        }

        [HttpPost]
        public IActionResult Create([FromBody] HorarioDisponibilidadeVO disponibilidade)
        {
            if (disponibilidade == null)
                return BadRequest();

            return Ok(_business.Insert(disponibilidade));
        }

        [HttpPut]
        public IActionResult Update([FromBody] HorarioDisponibilidadeVO disponibilidade)
        {
            if (disponibilidade == null)
                return BadRequest();

            return Ok(_business.Update(disponibilidade));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _business.Delete(id);
            return NoContent();
        }
    }
}