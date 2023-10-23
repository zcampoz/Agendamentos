using Agendamentos.Commom.DTO;
using Agendamentos.Model;
using Agendamentos.Model.Context;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Agendamentos.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private SqlContext _context;

        private DbSet<Usuario> dataSet;

        public UsuarioRepository(SqlContext context)
        {
            _context = context;
            dataSet = _context.Set<Usuario>();
        }

        public List<Usuario> FindAll()
        {
            return _context.Usuarios.ToList();
        }

        public Usuario Get(long id)
        {
            return _context.Usuarios.SingleOrDefault(x => x.ID.Equals(id));
        }

        public Usuario GetByEmail(string email)
        {
            return _context.Usuarios.SingleOrDefault(x => x.Email.Equals(email));
        }

        public Usuario Insert(Usuario item)
        {
            try
            {
                item.Senha = ComputeHash(item.Senha, new SHA256CryptoServiceProvider());
                _context.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception)
            {
                throw;
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
        public bool RevokeToken(string username)
        {
            var user = _context.Usuarios.SingleOrDefault(x => x.Email.Equals(username));
            if (user == null) return false;

            user.RefreshToken = null;
            _context.SaveChanges();

            return true;
        }

        public Usuario ValidarUsuario(AuthDTO auth)
        {
            var senha = ComputeHash(auth.Senha, new SHA256CryptoServiceProvider());
            return _context.Usuarios.FirstOrDefault(u => (u.Email == auth.Email && u.Senha == senha));
        }

        public Usuario AtualizaInfoUsuario(Usuario usuario)
        {
            if (!_context.Usuarios.Any(x => x.ID.Equals(usuario.ID))) return null;

            var result = _context.Usuarios.SingleOrDefault(x => x.ID.Equals(usuario.ID));
            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(usuario);
                    _context.SaveChanges();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }

            return result;
        }

        private string ComputeHash(string senha, SHA256CryptoServiceProvider algorithm)
        {
            Byte[] inputBytes = Encoding.UTF8.GetBytes(senha);
            Byte[] hashedBytes = algorithm.ComputeHash(inputBytes);
            return BitConverter.ToString(hashedBytes);
        }

        public Usuario Update(Usuario usuario)
        {
            var result = dataSet.FirstOrDefault(x => x.ID == usuario.ID);
            if (result != null)
            {
                try
                {

                    _context.Entry(result).CurrentValues.SetValues(usuario);
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

        public Usuario ValidarUsuario(string username)
        {
            return _context.Usuarios.SingleOrDefault(x => x.Email.Equals(username));
        }
    }
}
