using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IServicoBusiness
    {
        public ServiceDto Get(long id);

        public List<ServiceDto> GetByPrestadorId(long prestadorId);

        public List<ServiceDto> FindAll();

        public void Insert(ServiceRequestDto servico);

        public ServiceDto Update(ServiceDto servico);

        public void Delete(long id);
    }
}
