import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            email,
            senha
        };

        console.log(data);

        try {
            const response = await api.post('/auth/signin', data);
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem('email', email);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                navigate('/home');
            }
            else {
                localStorage.clear();
                if (response.status === 401) {
                    console.log('Email e/ou Senha inválidos.');
                }
            }
        } catch (e) {
            console.log('Falha ao fazer login! Tente nonamente!' + e);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form type="form" onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="create-account">
                <p>Não possui uma conta?</p>
                <Link to="/registro" className="create-account-button">Criar Conta</Link>
            </div>
        </div>
    );
}