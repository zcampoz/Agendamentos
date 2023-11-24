import { faCheck, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const [agendamentos, setAgendamentos] = useState([]);
    const [empresa, setEmpresa] = useState(false);
    const [servicos, setServicos] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const userId = parseInt(localStorage.getItem('userId'), 10);

    const navigate = useNavigate();

    const handleAddService = () => {
        navigate('/add-service', { state: { byProfile: true } });
    };

    const handleAddDisponibilidade = () => {
        navigate('/add-disponibilidade', { state: { byProfile: true } });
    };

    useEffect(() => {
        loadUserData();
        if (usuario.empresa) {
            loadServicos();
            loadHorarios();
        }
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
            console.error('Erro ao carregar dados do usuário:', error);
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
            .catch(error => console.error('Erro ao carregar serviços:', error));
    };

    const loadHorarios = () => {
        debugger
        api.get(`horariodisponibilidade/Prestador/${userId}`)
            .then(response => setHorarios(response.data))
            .catch(error => console.error('Erro ao carregar horarios:', error));
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
            console.log(`Serviço excluido com sucesso ${servicoId}`);
        })
        .catch((error) => {
            console.error('Erro ao excluir o serviço:', error);
            alert(`Erro ao excluir o serviço id: ${servicoId}!`);
        });
    };

    const cancelarHorario = (horarioId) => {
        api.delete(`horariodisponibilidade/${horarioId}`)
            .then((response) => {
                const novaLista = horarios.filter(item => item.id !== horarioId);
                setHorarios(novaLista);
                console.log(`Horario excluido com sucesso ${horarioId}`);
                alert(`Horario excluido com sucesso ${horarioId}`);
            })
            .catch((error) => {
                console.error('Erro ao excluir o horario:', error);
                alert(`Erro ao excluir o horario id: ${horarioId}!`);
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
            <h2><strong>Perfil do cliente</strong></h2>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Email:</strong > {usuario.email}</p>
            <p><strong>Perfil:</strong > {usuario.empresa ? 'Empresa' : 'Cliente'}</p>
            {!usuario.empresa && (
                <div className="col-12">
                    <button type="button" className="btn btn-secondary" onClick={() => atualizarPerfilEmpresa()}>Adicionar perfil empresa?</button>
                </div>
            )}

            <h3>Agendamentos</h3>
            {agendamentos.length > 0 ? (
                <>
                <div className="perfil-grid">
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
                                        <div className="btn-group" role="group" aria-label="Ações">
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
                </>
            ) : (
                    <p><strong>Nenhum agendamento disponivel.</strong></p>
            )}

            {empresa && (
                <>
                    <h3>Atividades da Empresa</h3>
                    {servicos.length > 0 ? (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Nome da atividade</th>
                                        <th scope="col">Descritivo</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Tempo Estimado</th>
                                        <th scope="col">Executar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servico => (
                                        <tr key={servico.id}>
                                            <td>{servico.id}</td>
                                            <td>{servico.nome}</td>
                                            <td>{servico.descricao}</td>
                                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco)}</td>
                                            <td>{servico.duracaoEstimada + ' min'}</td>
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
                        <p><strong>Nenhuma atividade disponivel.</strong></p>
                    )}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" onClick={() => handleAddService()}>Adicionar Atividade</button>
                    </div>

                    <h3>Disponibilidade das Atividades</h3>
                    {horarios.length > 0 ? (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Dia da Semana</th>
                                        <th scope="col">Hora Inicial</th>
                                        <th scope="col">Hora Final</th>
                                        <th scope="col">Executar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {horarios.map(horario => (
                                        <tr key={horario.id}>
                                            <td>{horario.id}</td>
                                            <td>{horario.diaSemana}</td>
                                            <td>{horario.horaInicio}</td>
                                            <td>{horario.horaFim}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    title="Excluir"
                                                    onClick={() => cancelarHorario(horario.id)}
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
                        <p><strong>Nenhuma disponibilidade no momento.</strong></p>
                    )}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary" onClick={() => handleAddDisponibilidade()}>Adicionar Disponibilidade</button>
                    </div>
                        
                </>
            )}
        </div >
    );
};