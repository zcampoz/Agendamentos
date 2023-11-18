import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export const AdicionarServico = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [duracaoEstimada, setDuracaoEstimada] = useState('');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    useEffect(() => {
        loadCategorias()
    }, []);

    const loadCategorias = () => {
        api.get('categoriaservico', config)
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

        api.post('servico', data, config)
            .then((response) => {
                console.log('Adicionou serviço', response.data);
                navigate('/perfil');
            })
            .catch((error) => console.error('Erro ao adicionar serviço:', error));
    }

    const handleChangeCategoria = (event) => setCategoriaSelecionada(event.target.value);

    return (
        <div className="login-container">
            <h2>Adicionar Serviço</h2>
            <form type="form" onSubmit={salvarServico}>
                <div className="form-group">
                    <label htmlFor="email">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        placeholder="Nome do Serviço"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        placeholder="Descrição do serviço"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        id="preco"
                        placeholder="Preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duracaoEstimada">Duracao Estimada</label>
                    <input
                        type="number"
                        step="0"
                        id="duracaoEstimada"
                        placeholder="Duração Estimada"
                        value={duracaoEstimada}
                        onChange={e => setDuracaoEstimada(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categorias">Categoria</label>
                    <select id="categorias" value={categoriaSelecionada} onChange={handleChangeCategoria}>
                        <option value="">Selecione</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                        </select>
                </div>
                <button type="submit" className="save-button">Salvar</button>
            </form>
        </div>
    );
}