import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../../services/api'

export const AdicionarServico = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [duracaoEstimada, setDuracaoEstimada] = useState('');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    const location = useLocation();
    const byProfile = location.state?.byProfile;

    
    useEffect(() => {
        validateEnter();
        loadCategorias();
    }, []);

    const validateEnter = () => { 
        if (!byProfile) {
            navigate('/perfil');
        }
    }

    const handleBotaoVoltar = () => {
        debugger
        navigate('/perfil');
    }

    const loadCategorias = () => {
        api.get('categoriaservico')
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error('Erro ao carregar categorias de serviço:', error));
    }

    const salvarServico = (e) => {
        e.preventDefault();

        const data = {
            nome,
            descricao,
            preco: parseFloat(preco),
            duracaoEstimada: parseInt(duracaoEstimada, 10),
            categoriaId: parseInt(categoriaSelecionada, 10),
            prestadorId: userId
        };

        api.post('servico', data)
            .then((response) => {
                console.log('Adicionou serviço', response.data);
                navigate('/perfil');
            })
            .catch((error) => console.error('Erro ao adicionar serviço:', error));
    }

    const handleChangeCategoria = (event) => setCategoriaSelecionada(event.target.value);

    return (
        <div className="padrao-container">
            <form type="form" onSubmit={salvarServico}>
                <h2>Adicionar Serviço</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        placeholder="Nome do Serviço"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <label htmlFor="nome" className="form-label">Nome</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea 
                        type="text"
                        id="descricao"
                        placeholder="Descrição do serviço"
                        className="form-control"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        step="0.01"
                        id="preco"
                        className="form-control"
                        placeholder="Preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    <label htmlFor="preco" className="form-label">Preço</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        step="10"
                        id="duracaoEstimada"
                        className="form-control"
                        placeholder="Duração Estimada"
                        value={duracaoEstimada}
                        onChange={e => setDuracaoEstimada(e.target.value)}
                    />
                    <label htmlFor="duracaoEstimada" className="form-label">Duracao Estimada</label>
                </div>
                <div className="form-floating mb-3">
                    <select id="categorias"
                        className="form-select"
                        value={categoriaSelecionada}
                        onChange={handleChangeCategoria}>
                        <option value="">Selecione</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="categorias" className="form-label">Categoria</label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onClick={() => handleBotaoVoltar()} className="btn btn-danger">Voltar</button>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>                
            </form>
        </div>
    );
}