using Agendamentos.Commom.DTO;
using Agendamentos.Data.Converter.Implementation;
using Agendamentos.Data.VO;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class ServicoBusiness : IServicoBusiness
    {
        private readonly IServicoRepository _repository;
        private readonly ServicoConverter _converter;

        public ServicoBusiness(IServicoRepository repository)
        {
            _repository = repository;
            _converter = new ServicoConverter();
        }

        public List<ServiceDto> FindAll()
        {
            var servicesDto = new List<ServiceDto>();
            var services = _repository.FindAll();

            services.ForEach(service => {
                servicesDto.Add(new ServiceDto() 
                { 
                    Id = service.ID,
                    Nome = service.Nome,
                    Descricao = service.Descricao,
                    DuracaoEstimada = service.DuracaoEstimada,
                    Preco = service.Preco,
                    CategoriaID = service.CategoriaID,
                    CategoriaNome = service.Categoria.Nome
                });
            });

            return servicesDto;
        }

        public ServicoVO Get(long id)
        {
            return _converter.Parser(_repository.Get(id));
        }

        public ServicoVO Insert(ServicoVO servico)
        {
            var entity = _converter.Parser(servico);
            entity = _repository.Insert(entity);
            return _converter.Parser(entity);
        }

        public ServicoVO Update(ServicoVO servico)
        {
            var entity = _converter.Parser(servico);
            entity = _repository.Update(entity);
            return _converter.Parser(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
