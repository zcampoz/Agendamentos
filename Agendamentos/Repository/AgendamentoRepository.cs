using Agendamentos.Model;
using Agendamentos.Model.Base;
using Agendamentos.Model.Context;
using Microsoft.EntityFrameworkCore;

namespace Agendamentos.Repository
{
    public class AgendamentoRepository : IAgendamentoRepository
    {
        private SqlContext _context;
        private DbSet<Agendamento> dataSet;

        public AgendamentoRepository(SqlContext context)
        {
            _context = context;
            dataSet = _context.Set<Agendamento>();
        }

        public List<Agendamento> FindAll()
        {
            return _context.Agendamentos
                .Include(p => p.Prestador)
                .Include(p => p.Cliente)
                .Include(s => s.Servico)
                .ToList();
        }

        public Agendamento Get(long id)
        {
            return dataSet.SingleOrDefault(x => x.ID.Equals(id));
        }

        public Agendamento Insert(Agendamento item)
        {
            try
            {
                _context.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Agendamento Update(Agendamento item)
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
            if (result == null)
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

        private bool Exists(long id)
        {
            return dataSet.Any(x => x.ID == id);
        }
    }
}
