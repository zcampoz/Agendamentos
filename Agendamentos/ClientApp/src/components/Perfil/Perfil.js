import { faCheck, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { api } from '../../services/api';
import { MeuModal } from './AdicionarServico';
import { Link } from 'react-router-dom';

export const Perfil = () => {
    const [usuario, setUsuario] = useState({});
    const [agendamentos, setAgendamentos] = useState([]);
    const [empresa, setEmpresa] = useState(false);
    const [servicos, setServicos] = useState([]);
    //const [showServicoModal, setShowServicoModal] = useState(false);

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
            api.get(`agendamento/prestador/${userId}`, config)
                .then(response => {
                    console.log('Perfil Agendamento Prestador: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
        else {
            api.get(`agendamento/cliente/${userId}`, config)
                .then(response => {
                    console.log('Perfil Agendamento Cliente: ', response.data);
                    setAgendamentos(response.data)
                })
                .catch(error => console.error('Erro ao carregar agendamentos:', error));
        }
    };

    const loadServicos = () => {
        api.get(`servico/Prestador/${userId}`, config)
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
        api.put(`agendamento/UpdateStatus`, data, config)
        .then((response) => {
            loadUserData();
            console.log(`Status atualizado com sucesso! ${data}`);
        })
        .catch((error) => {
            console.error('Erro ao atualizar o status do agendamento:', error);
        });
    }

    const cancelarServico = (servicoId) => {
        api.delete(`servico/${servicoId}`, config)
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

    const adicionarDadosServico = () => {
        // L�gica para adicionar dados do servi�o
        console.log('Adicionar dados do servi�o');
    };

    //const handleShowServicoModal = () => setShowServicoModal(true);
    //const handleCloseServicoModal = () => setShowServicoModal(false);

    const [mostrarModal, setMostrarModal] = useState(false);

    const handleMostrarModal = () => setMostrarModal(true);

    const handleFecharModal = () => setMostrarModal(false);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
            </Helmet>
            <div>
                <h2>Usu�rio</h2>
                <p>Nome: {usuario.nome}</p>
                <p>Email: {usuario.email}</p>
                <p>Perfil: {usuario.empresa ? 'Empresa' : 'Cliente'}</p>

                {agendamentos.length > 0 ? (
                    <>
                        <h3>Agendamentos</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Data e Hora</th>
                                    <th>Servi�o</th>
                                    <th>Status</th>
                                    <th>A��es</th>
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
                    </>
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
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descri��o</th>
                                            <th>Pre�o</th>
                                            <th>Dura��o Estimada</th>
                                            <th>A��es</th>
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

                        <button className="btn btn-primary" onClick={handleMostrarModal}>
                            Adicionar Novo Servi�o
                        </button>

                        <Link to="/add-service">
                            <button className="btn btn-primary">Adicionar Servi�o</button>
                        </Link>
                        
                    </>
                )}
            </div >
        </>
    );
};

//export const NovoServicoModal = ({ show, handleClose, adicionarDadosServico }) => {
//    const [nomeServico, setNomeServico] = useState('');

//    const handleAdicionarServico = () => {
//        // Fa�a a l�gica necess�ria para adicionar o servi�o com o nomeServico
//        adicionarDadosServico(nomeServico);

//        // Limpe o estado e feche a modal
//        //setNomeServico('');
//        handleClose();
//    };

//    return (
//        <Modal show={show} onHide={handleClose}>
//            <Modal.Header closeButton>
//                <Modal.Title>Adicionar Novo Servi�o</Modal.Title>
//            </Modal.Header>
//            <Modal.Body>
//                <Form>
//                    <Form.Group controlId="formNomeServico">
//                        <Form.Label>Nome do Servi�o</Form.Label>
//                        <Form.Control
//                            type="text"
//                            placeholder="Digite o nome do servi�o"
//                            value={nomeServico}
//                            onChange={(e) => setNomeServico(e.target.value)}
//                        />
//                    </Form.Group>
//                </Form>
//            </Modal.Body>
//            <Modal.Footer>
//                <Button variant="secondary" onClick={handleClose}>
//                    Fechar
//                </Button>
//                <Button variant="primary" onClick={handleAdicionarServico}>
//                    Adicionar Servi�o
//                </Button>
//            </Modal.Footer>
//        </Modal>
//    );
//};


//{categorias.length > 0 ? (
                        //    <>
                        //        <h3>Categorias de Servi�o</h3>
                        //        <table className="table">
                        //            <thead>
                        //                <tr>
                        //                    <th>ID</th>
                        //                    <th>Nome</th>
                        //                </tr>
                        //            </thead>
                        //            <tbody>
                        //                {categorias.map(categoria => (
                        //                    <tr key={categoria.id}>
                        //                        <td>{categoria.id}</td>
                        //                        <td>{categoria.nome}</td>
                        //                    </tr>
                        //                ))}
                        //            </tbody>
                        //        </table>
                        //    </>
                        //) : (
                        //    <p>Nenhum dado de categoria dispon�vel.</p>
                        //)}
                        //<button className="btn btn-primary" onClick={adicionarDadosCategoria}>
                        //    Adicionar Nova Categoria
                        //</button>

//    return (
//        <>
//            <Helmet>
//                <meta charSet="utf-8" />
//            </Helmet>
//            <div>
//                <h2>Usu�rio</h2>
//                <p>Nome: {usuario.nome}</p>
//                <p>Email: {usuario.email}</p>
//                <p>Perfil: {usuario.empresa ? 'Empresa' : 'Cliente'}</p>
//                <>
//                {agendamentos.length > 0 ? (
//                    <>
//                    <h3>Agendamentos</h3>
//                    <table className="table">
//                        <thead>
//                            <tr>
//                                <th>ID</th>
//                                <th>Data e Hora</th>
//                                <th>Servi�o</th>
//                                <th>Status</th>
//                                <th>A��es</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {agendamentos.map(agendamento => (
//                                <tr key={agendamento.id}>
//                                    <td>{agendamento.id}</td>
//                                    <td>{format(new Date(agendamento.dataHora), 'dd/MM/yyyy HH:mm')}</td>
//                                    <td>{agendamento.servico.nome}</td>
//                                    <td>{getStatusByIndex(agendamento.estadoAgendamento)}</td>
//                                    <td>
//                                        <div className="btn-group" role="group" aria-label="A��es">
//                                            <button
//                                                type="button"
//                                                className="btn btn-primary"
//                                                title="Confirmar"
//                                                onClick={() => confirmarAgendamento(agendamento.id)}
//                                            >
//                                                <FontAwesomeIcon icon={faThumbsUp} />
//                                            </button>
//                                            <button
//                                                type="button"
//                                                className="btn btn-success"
//                                                title="Concluir"
//                                                onClick={() => concluirAgendamento(agendamento.id)}
//                                            >
//                                                <FontAwesomeIcon icon={faCheck} />
//                                            </button>
//                                            <button
//                                                type="button"
//                                                className="btn btn-danger"
//                                                title="Cancelar"
//                                                onClick={() => cancelarAgendamento(agendamento.id)}
//                                            >
//                                                <FontAwesomeIcon icon={faTrashAlt} />
//                                            </button>
//                                        </div>
//                                    </td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>
//                    </>
//                ) : (
//                    <p>Nenhum agendamento dispon�vel.</p>
//                )}

//                {empresa && (
//                    <>
//                        {servicos.length > 0 ? (
//                            <>
//                            <h3>Servi�os da Empresa</h3>
//                            <table className="table">
//                                <thead>
//                                    <tr>
//                                        <th>ID</th>
//                                        <th>Nome</th>
//                                        <th>Descri��o</th>
//                                        <th>Pre�o</th>
//                                        <th>Dura��o Estimada</th>
//                                    </tr>
//                                </thead>
//                                <tbody>
//                                    {servicos.map(servico => (
//                                        <tr key={servico.id}>
//                                            <td>{servico.id}</td>
//                                            <td>{servico.nome}</td>
//                                            <td>{servico.descricao}</td>
//                                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco) }</td>
//                                            <td>{servico.duracaoEstimada}</td>
//                                        </tr>
//                                    ))}
//                                </tbody>
//                            </table>
//                            </>
//                        ) : (
//                            <p>Nenhum dado de servi�o dispon�vel.</p>
//                        )}
//                        <button className="btn btn-primary" onClick={handleShowServicoModal}>
//                            Adicionar Novo Servi�o
//                        </button>

//                        <Modal show={showServicoModal} onHide={handleCloseServicoModal}>
//                            <Modal.Header closeButton>
//                                <Modal.Title>Adicionar Novo Servi�o</Modal.Title>
//                            </Modal.Header>
//                            <Modal.Body>
//                                <Form>
//                                    {/* Adicione campos de formul�rio para os dados do servi�o */}
//                                    <Form.Group controlId="formNomeServico">
//                                        <Form.Label>Nome do Servi�o</Form.Label>
//                                        <Form.Control type="text" placeholder="Digite o nome do servi�o" />
//                                    </Form.Group>
//                                    {/* Adicione outros campos conforme necess�rio */}
//                                </Form>
//                            </Modal.Body>
//                            <Modal.Footer>
//                                <Button variant="secondary" onClick={handleCloseServicoModal}>
//                                    Fechar
//                                </Button>
//                                <Button variant="primary" onClick={adicionarDadosServico}>
//                                    Adicionar Servi�o
//                                </Button>
//                            </Modal.Footer>
//                        </Modal>

//                        {categorias.length > 0 ? (
//                            <>
//                                <h3>Categorias de Servi�o</h3>
//                                <table className="table">
//                                    <thead>
//                                        <tr>
//                                            <th>ID</th>
//                                            <th>Nome</th>
//                                        </tr>
//                                    </thead>
//                                    <tbody>
//                                        {categorias.map(categoria => (
//                                            <tr key={categoria.id}>
//                                                <td>{categoria.id}</td>
//                                                <td>{categoria.nome}</td>
//                                            </tr>
//                                        ))}
//                                    </tbody>
//                                </table>
//                            </>
//                        ) : (
//                            <p>Nenhum dado de categoria dispon�vel.</p>
//                        )}
//                        <button className="btn btn-primary" onClick={adicionarDadosCategoria}>
//                            Adicionar Nova Categoria
//                        </button>
//                    </>
//                )}
//                </>
//            </div>
//        </>
//    );
//};