using Agendamentos.Model;
using Agendamentos.Model.Context;
using Microsoft.EntityFrameworkCore;

namespace Agendamentos.Repository
{
    public class HorarioDisponibilidadeRepository : IHorarioDisponibilidadeRepository
    {
        private SqlContext _context;

        private DbSet<HorarioDisponibilidade> dataSet;

        public HorarioDisponibilidadeRepository(SqlContext context)
        {
            _context = context;
            dataSet = _context.Set<HorarioDisponibilidade>();
        }

        public List<HorarioDisponibilidade> FindAll()
        {
            return _context.HorariosDisponibilidade
                .Include(x => x.Prestador)
                .ToList();
        }

        public HorarioDisponibilidade Get(long id)
        {
            return _context.HorariosDisponibilidade
                .Include(x => x.Prestador)
                .FirstOrDefault(x => x.ID.Equals(id));
        }

        public HorarioDisponibilidade Insert(HorarioDisponibilidade item)
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

        public HorarioDisponibilidade Update(HorarioDisponibilidade item)
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

        public HorarioDisponibilidade GetHorario(long prestadorId, string diaDaSemana)
        {
            return _context.HorariosDisponibilidade
                .FirstOrDefault(x => x.PrestadorID.Equals(prestadorId) && x.DiaSemana.Equals(diaDaSemana));
        }

        public List<HorarioDisponibilidade> GetByPrestadorId(long prestadorId)
        {
            return _context.HorariosDisponibilidade
                .Where(x => x.PrestadorID.Equals(prestadorId))
                .ToList();
        }
    }
}
