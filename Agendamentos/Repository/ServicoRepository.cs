using Agendamentos.Commom.DTO;
using Agendamentos.Model.Context;
using Microsoft.EntityFrameworkCore;

namespace Agendamentos.Repository
{
    public class ServicoRepository : IServicoRepository
    {
        private SqlContext _context;

        private DbSet<Servico> dataSet;

        public ServicoRepository(SqlContext context)
        {
            _context = context;
            dataSet = _context.Set<Servico>();
        }

        public List<Servico> FindAll()
        {
            return _context.Servicos
                .Include(x => x.Categoria)
                .Include(x => x.Prestador)
                .ToList();
        }

        public Servico Get(long id)
        {
            return _context.Servicos
                .Include(x => x.Categoria)
                .Include(x => x.Prestador)
                .FirstOrDefault(x => x.ID.Equals(id));
        }

        public List<Servico> GetByPrestadorId(long prestadorId)
        {
            return _context.Servicos
                .Include(x => x.Categoria)
                .Include(x => x.Prestador)
                .Where(x => x.PrestadorID.Equals(prestadorId))
                .ToList();
        }

        public void Insert(ServiceRequestDto item)
        {
            try
            {
                var service = new Servico() 
                { 
                    Nome = item.Nome,
                    Descricao = item.Descricao,
                    DuracaoEstimada = item.DuracaoEstimada,
                    Preco = item.Preco,
                    CategoriaID = item.CategoriaID,
                    PrestadorID = item.PrestadorID
                };
                _context.Servicos.Add(service);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Servico Update(Servico item)
        {
            var result = dataSet.FirstOrDefault(x => x.ID == item.ID);
            if (result != null)
            {
                try
                {

                    _context.Entry(result).CurrentValues.SetValues(item);
                    _context.SaveChanges();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                return null;
            }
        }

        public void Delete(long id)
        {
            var result = dataSet.FirstOrDefault(x => x.ID == id);
            if (result != null)
            {
                try
                {
                    dataSet.Remove(result);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}
