using Agendamentos.Commom.DTO;
using Agendamentos.Repository;

namespace Agendamentos.Business.Implementation
{
    public class ServicoBusiness : IServicoBusiness
    {
        private readonly IServicoRepository _repository;

        public ServicoBusiness(IServicoRepository repository)
        {
            _repository = repository;
        }

        public List<ServiceDto> FindAll()
        {
            return this.ParseService(_repository.FindAll());
        }

        public ServiceDto Get(long id)
        {
            return this.ConvertToServiceDto(_repository.Get(id));
        }

        public List<ServiceDto> GetByPrestadorId(long prestadorId)
        {
            return this.ParseService(_repository.GetByPrestadorId(prestadorId));
        }

        public ServiceDto Insert(ServiceDto servico)
        {
            var entity = this.ConvertToServico(servico);
            entity = _repository.Insert(entity);
            return this.ConvertToServiceDto(entity);
        }

        public ServiceDto Update(ServiceDto servico)
        {
            var entity = this.ConvertToServico(servico);
            entity = _repository.Update(entity);
            return this.ConvertToServiceDto(entity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }

        private ServiceDto ConvertToServiceDto(Servico servico)
        {
            return new ServiceDto()
            {
                Id = servico.ID,
                Nome = servico.Nome,
                Descricao = servico.Descricao,
                Preco = servico.Preco,
                DuracaoEstimada = servico.DuracaoEstimada,
                CategoriaID = servico.CategoriaID,
                CategoriaNome = servico.Categoria.Nome,
                PrestadorID = servico.PrestadorID                
            };
        }
        private Servico ConvertToServico(ServiceDto servico)
        {
            return new Servico()
            {
                ID = servico.Id,
                Nome = servico.Nome,
                Descricao = servico.Descricao,
                Preco = servico.Preco,
                DuracaoEstimada = servico.DuracaoEstimada,
                CategoriaID = servico.CategoriaID,
                PrestadorID = servico.PrestadorID                
            };
        }

        public List<ServiceDto> ParseService(List<Servico> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => ConvertToServiceDto(item)).ToList();
        }

        public List<Servico> ParseService(List<ServiceDto> origem)
        {
            if (origem == null) return null;

            return origem.Select(item => ConvertToServico(item)).ToList();
        }
    }
}
