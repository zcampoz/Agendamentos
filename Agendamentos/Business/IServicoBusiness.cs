using Agendamentos.Commom.DTO;
using Agendamentos.Data.VO;

namespace Agendamentos.Business
{
    public interface IServicoBusiness
    {
        public ServicoVO Get(long id);

        public List<ServiceDto> FindAll();

        public ServicoVO Insert(ServicoVO servico);

        public ServicoVO Update(ServicoVO servico);

        public void Delete(long id);
    }
}
