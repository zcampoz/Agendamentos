import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { validateEmail, validateName, validatePassword } from '../../services/validationForm';

export const Registro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        e.preventDefault();
        setNome(e.target.value);
        setIsNameValid(true);
    };

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        setIsEmailValid(true);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setSenha(e.target.value);
        setIsPasswordValid(true);
    };

    async function registrar(e) {
        e.preventDefault();

        if (!validateName(nome)) {
            setIsNameValid(false);
            return;
        }

        if (!validateEmail(email)) {
            setIsEmailValid(false);
            return;
        }

        if (!validatePassword(senha)) {
            setIsPasswordValid(false);
            return;
        }

        try {
            const data = { nome, email, senha };
            const response = await api.post('/auth/register', data)
            .then(response => {
                console.log('Response:', response.data);
                if (response.status === 200) {
                    localStorage.clear();
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('authenticated', response.data.authenticated);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);

                    navigate('/perfil');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                localStorage.clear();
                if (response.status === 401) {
                    console.log('Email e/ou Senha inválidos.');
                }
            });
        } catch (e) {
            console.log('Falha ao registrar! Tente nonamente!' + e);
        }
    }

    const handleBotaoVoltar = () => {
        navigate('/');
    }

    return (
        <div className="padrao-container">
            <form type="form" className="needs-validation" noValidate onSubmit={registrar}>
                <h2>Criar Conta</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        id="nome"
                        className={`form-control ${isNameValid ? '' : 'is-invalid'}`}
                        placeholder="Seu nome"
                        value={nome}
                        onChange={handleNameChange}
                        required
                    />
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <div className="invalid-feedback">
                        O nome deve conter entre 2 e 15 caracteres.
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        id="email"
                        className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
                        placeholder="Seu email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="invalid-feedback">
                        Por favor, insira um endereço de e-mail válido.
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${isPasswordValid ? '' : 'is-invalid'}`}
                        placeholder="Sua senha"
                        value={senha}
                        onChange={handlePasswordChange}
                        required
                    />
                    <label htmlFor="password" className="form-label">Senha</label>
                    <div className="invalid-feedback">
                        A senha deve ter entre 8 e 30 caracteres, incluindo maiúsculas,
                        minúsculas, números e os seguintes caracteres especiais: !@#$%^&*(),.?":{ }|.
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onClick={() => handleBotaoVoltar()} className="btn btn-danger">Voltar</button>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
            </form>
        </div>
    );
}