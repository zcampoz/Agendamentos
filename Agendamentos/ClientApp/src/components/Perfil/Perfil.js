import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

export const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const [agendamentos, setAgendamentos] = useState([]);
    const [empresa, setEmpresa] = useState(false);
    const [servicos, setServicos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const accessToken = localStorage.getItem('accessToken');
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    useEffect(() => {
        loadUserData();
        loadServicos();
        loadCategorias();
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
            const response = await api.get(`usuario/${userId}`, config);
            debugger
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
            api.get(`agendamento/prestador/${userId}`, config)
                .then(response => {
                    debugger
                    console.log('Perfil Agendamento Prestador: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
        else {
            api.get(`agendamento/cliente/${userId}`, config)
                .then(response => {
                    debugger
                    console.log('Perfil Agendamento Cliente: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
    };

    const loadServicos = () => {
        api.get(`servico/Prestador/${userId}`, config)
            .then(response => setServicos(response.data))
            .catch(error => console.error('Erro ao carregar serviços:', error));
    };

    const loadCategorias = () => {
        api.get('categoriaservico', config)
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Erro ao carregar categorias:', error));
    };

    const adicionarServico = () => {
        // Lógica para adicionar um novo serviço (substitua isso com a lógica real)
        console.log('Adicionar novo serviço');
    };

    const adicionarCategoria = () => {
        // Lógica para adicionar uma nova categoria (substitua isso com a lógica real)
        console.log('Adicionar nova categoria');
    };

    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
        </Helmet>
        <div>
            <h2>Usuário</h2>
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.email}</p>
            <p>Perfil: {usuario.empresa ? 'Empresa' : 'Cliente'}</p>

            <>
                
                {agendamentos.length > 0 ? (
                    <>
                    <h3>Agendamentos</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data e Hora</th>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th>Ações</th>
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
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary" title="Confirmar">
                                                <FontAwesomeIcon icon={faThumbsUp} /></button>
                                            <button type="button" className="btn btn-success" title="Concluir">
                                                <FontAwesomeIcon icon={faCheck} /></button>
                                            <button type="button" className="btn btn-danger" title="Cancelar">
                                                <FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </>
                ) : (
                    <p>Nenhum agendamento disponível.</p>
                )}
            </>

            {empresa && (
                <>
                    {servicos.length > 0 ? (
                        <>
                            <h3>Serviços da Empresa</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Duração Estimada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servico => (
                                        <tr key={servico.id}>
                                            <td>{servico.id}</td>
                                            <td>{servico.nome}</td>
                                            <td>{servico.descricao}</td>
                                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco) }</td>
                                            <td>{servico.duracaoEstimada}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>Nenhum dado de serviço disponível.</p>
                    )}
                    <button className="btn btn-primary" onClick={adicionarServico}>
                        Adicionar Novo Serviço
                    </button>

                    {categorias.length > 0 ? (
                        <>
                            <h3>Categorias de Serviço</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map(categoria => (
                                        <tr key={categoria.id}>
                                            <td>{categoria.id}</td>
                                            <td>{categoria.nome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>Nenhum dado de categoria disponível.</p>
                    )}
                    <button className="btn btn-primary" onClick={adicionarCategoria}>
                        Adicionar Nova Categoria
                    </button>
                </>
            )}
        </div>
        </>
    );
};