﻿using Agendamentos.Commom.DTO;
using Agendamentos.Model;

namespace Agendamentos.Repository
{
    public interface IServicoRepository
    {
        public Servico Get(long id);

        public List<Servico> FindAll();

        public void Insert(ServiceRequestDto servico);

        public Servico Update(Servico servico);

        public void Delete(long id);

        public List<Servico> GetByPrestadorId(long prestadorId);
    }
}
