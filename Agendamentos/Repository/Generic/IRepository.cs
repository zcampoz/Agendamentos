using Agendamentos.Model;
using Agendamentos.Model.Base;

namespace Agendamentos.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        public T Get(long id);

        public List<T> FindAll();

        public T Insert(T item);

        public T Update(T item);

        public void Delete(long id);
    }
}
