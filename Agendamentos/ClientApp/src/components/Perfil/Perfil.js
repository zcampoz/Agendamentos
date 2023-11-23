import { faCheck, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const [agendamentos, setAgendamentos] = useState([]);
    const [empresa, setEmpresa] = useState(false);
    const [servicos, setServicos] = useState([]);

    const userId = parseInt(localStorage.getItem('userId'), 10);

    useEffect(() => {
        loadUserData();
        loadServicos();
    }, []);

    const StatusAgendamento = {
        PENDENTE: 'Pendente',
        CONFIRMADO: 'Confirmado',
        CONCLUIDO: 'Concluido',
        CANCELADO: 'Cancelado'
    };

    const getStatusByIndex = (index) => {
        const keys = Object.keys(StatusAgendamento);
        const statusKey = keys[index];
        return StatusAgendamento[statusKey];
    };

    const loadUserData = async () => {
        try {
            const response = await api.get(`usuario/${userId}`);
            console.log('Perfil Usuario: ', response.data);
            setUsuario(response.data);
            setEmpresa(response.data.empresa);
            loadAgendamentos(response.data.empresa);
        } catch (error) {
            console.error('Erro ao carregar dados do usu�rio:', error);
        }
    };

    const loadAgendamentos = (perfilEmpresa) => {
        if (perfilEmpresa) {
            api.get(`agendamento/prestador/${userId}`)
                .then(response => {
                    console.log('Perfil Agendamento Prestador: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
        else {
            api.get(`agendamento/cliente/${userId}`)
                .then(response => {
                    console.log('Perfil Agendamento Cliente: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
    };

    const loadServicos = () => {
        api.get(`servico/Prestador/${userId}`)
            .then(response => setServicos(response.data))
            .catch(error => console.error('Erro ao carregar servi�os:', error));
    };

    const confirmarAgendamento = (agendamentoId) => {
        const data = { id: agendamentoId, novoStatus: 1 };
        atualizarStatusAgendamento(data);
    };

    const concluirAgendamento = (agendamentoId) => {
        const data = { id: agendamentoId, novoStatus: 2 };
        atualizarStatusAgendamento(data);
    };

    const cancelarAgendamento = (agendamentoId) => {
        const data = { id: agendamentoId, novoStatus: 3 };
        atualizarStatusAgendamento(data);
    };

    const atualizarStatusAgendamento = (data) => {
        api.put(`agendamento/UpdateStatus`, data)
        .then((response) => {
            loadUserData();
            console.log(`Status atualizado com sucesso! ${data}`);
        })
        .catch((error) => {
            console.error('Erro ao atualizar o status do agendamento:', error);
        });
    }

    const cancelarServico = (servicoId) => {
        api.delete(`servico/${servicoId}`)
        .then((response) => {
            const novaLista = servicos.filter(item => item.id !== servicoId);
            setServicos(novaLista);
            console.log(`Servi�o excluido com sucesso ${servicoId}`);
        })
        .catch((error) => {
            console.error('Erro ao excluir o servi�o:', error);
            alert(`Erro ao excluir o servi�o id: ${servicoId}!`);
        });
    };

    const atualizarPerfilEmpresa = () => {
        api.put('usuario/AtualizarPerfilPrestador', { id: userId })
            .then((response) => {
                loadUserData();
            })
            .catch((error) => {
                console.error('Erro ao atualizar o status do agendamento:', error);
            });
    }

    return (
        <div className="mb-3">
            <h2>Perfil do cliente</h2>
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.email}</p>
            <p>Perfil: {usuario.empresa ? 'Empresa' : 'Cliente'}</p>
            {!usuario.empresa && (
                <div className="col-12">
                    <button type="button" className="btn btn-secondary" onClick={() => atualizarPerfilEmpresa()}>Adicionar perfil empresa?</button>
                </div>
            )}
            {agendamentos.length > 0 ? (
                <div className="perfil-grid">
                    <h3>Agendamentos</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data e Hora</th>
                                <th>Atividade</th>
                                <th>Status</th>
                                <th>Executar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => (
                                <tr key={agendamento.id}>
                                    <td>{agendamento.id}</td>
                                    <td>{format(new Date(agendamento.dataHora), 'dd/MM/yyyy HH:mm')}</td>
                                    <td>{agendamento.servico.nome}</td>
                                    <td>{getStatusByIndex(agendamento.estadoAgendamento)}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="A��es">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                title="Confirmar"
                                                onClick={() => confirmarAgendamento(agendamento.id)}
                                            >
                                                <FontAwesomeIcon icon={faThumbsUp} />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                title="Concluir"
                                                onClick={() => concluirAgendamento(agendamento.id)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                title="Cancelar"
                                                onClick={() => cancelarAgendamento(agendamento.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhum agendamento dispon�vel.</p>
            )}

            {empresa && (
                <>
                    {servicos.length > 0 ? (
                        <>
                            <h3>Servi�os da Empresa</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Descri��o</th>
                                        <th scope="col">Pre�o</th>
                                        <th scope="col">Dura��o Estimada</th>
                                        <th scope="col">A��es</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servico => (
                                        <tr key={servico.id}>
                                            <td>{servico.id}</td>
                                            <td>{servico.nome}</td>
                                            <td>{servico.descricao}</td>
                                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco)}</td>
                                            <td>{servico.duracaoEstimada}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    title="Excluir"
                                                    onClick={() => cancelarServico(servico.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>Nenhum dado de servi�o dispon�vel.</p>
                    )}

                    <Link to="/add-service">
                        <button className="btn btn-primary">Adicionar Servi�o</button>
                    </Link>
                        
                </>
            )}
        </div >
    );
};