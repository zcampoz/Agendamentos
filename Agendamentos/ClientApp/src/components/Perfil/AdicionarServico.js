import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { validateDescricao, validateDuracao, validatePreco, validateServiceName } from '../../services/validationForm';

export const AdicionarServico = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [duracaoEstimada, setDuracaoEstimada] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('1');

    const [isNameValid, setIsNameValid] = useState(true);
    const [isDescricaoValid, setIsDescricaoValid] = useState(true);
    const [isPrecoValid, setIsPrecoValid] = useState(true);
    const [isDuracaoValid, setIsDuracaoValid] = useState(true);

    const userId = parseInt(localStorage.getItem('userId'), 10);

    const navigate = useNavigate();
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
        navigate('/perfil');
    }

    const loadCategorias = () => {
        api.get('categoriaservico')
            .then((response) => setCategorias(response.data))
            .catch((error) => {
                alert('Erro ao carregar categorias de serviço!');
                console.error('Erro ao carregar categorias de serviço:', error)
            });
    }

    const salvarServico = (e) => {
        e.preventDefault();

        if (!validateServiceName(nome)) {
            setIsNameValid(false);
            return;
        }

        if (!validateDescricao(descricao)) {
            setIsDescricaoValid(false);
            return;
        }

        if (!validatePreco(preco)) {
            setIsPrecoValid(false);
            return;
        }

        if (!validateDuracao(duracaoEstimada)) {
            setIsDuracaoValid(false);
            return;
        }

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
            .catch((error) => {
                alert('Erro ao adicionar serviço!');
                console.error('Erro ao adicionar serviço:', error)
            });
    }

    const handleChangeCategoria = (event) => setCategoriaSelecionada(event.target.value);

    const handleNameChange = (e) => {
        e.preventDefault();
        setNome(e.target.value);
        setIsNameValid(true);
    };

    const handleDescricaoChange = (e) => {
        e.preventDefault();
        setDescricao(e.target.value);
        setIsDescricaoValid(true);
    };

    const handlePrecoChange = (e) => {
        e.preventDefault();
        setPreco(e.target.value);
        setIsPrecoValid(true);
    };

    const handleDuracaoChange = (e) => {
        e.preventDefault();
        setDuracaoEstimada(e.target.value);
        setIsDuracaoValid(true);
    };

    return (
        <div className="padrao-container">
            <form type="form" className="needs-validation" noValidate onSubmit={salvarServico}>
                <h2>Adicionar Serviço</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="nome"
                        className={`form-control ${isNameValid ? '' : 'is-invalid'}`}
                        placeholder="Nome do Serviço"
                        value={nome}
                        onChange={handleNameChange}
                    />
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <div className="invalid-feedback">
                        O nome deve conter entre 2 e 100 caracteres.
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <textarea 
                        type="text"
                        id="descricao"
                        placeholder="Descrição do serviço"
                        className={`form-control ${isDescricaoValid ? '' : 'is-invalid'}`}
                        value={descricao}
                        onChange={handleDescricaoChange}
                    />
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <div className="invalid-feedback">
                        Descrição deve conter entre 2 e 300 caracteres.
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        step="0.01"
                        id="preco"
                        className={`form-control ${isPrecoValid ? '' : 'is-invalid'}`}
                        placeholder="Preço"
                        value={preco}
                        onChange={handlePrecoChange}
                    />
                    <label htmlFor="preco" className="form-label">Preço</label>
                    <div className="invalid-feedback">
                        Preço deve conter valores acima de zero.
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        step="10"
                        id="duracaoEstimada"
                        className={`form-control ${isDuracaoValid ? '' : 'is-invalid'}`}
                        placeholder="Duração Estimada"
                        value={duracaoEstimada}
                        onChange={handleDuracaoChange}
                    />
                    <label htmlFor="duracaoEstimada" className="form-label">Duracao Estimada (em minutos)</label>
                    <div className="invalid-feedback">
                        Duração estimada somente adiciona a cada 10min.(Ex. 10min, 20min...).
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <select id="categorias"
                        className="form-select"
                        value={categoriaSelecionada}
                        onChange={(e) => handleChangeCategoria(e)}>
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