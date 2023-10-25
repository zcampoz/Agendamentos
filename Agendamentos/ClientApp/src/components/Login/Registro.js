import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export const Registro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function registrar(e) {
        e.preventDefault();

        const data = { nome, email, senha };

        try {
            const response = await api.post('/auth/register', data);

            console.log(response);
            if (response.status === 200) {
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                navigate('/perfil');
            } else {
                localStorage.clear();
                if (response.status === 401) {
                    console.log('Email e/ou Senha inválidos.');
                }
            }
        } catch (e) {
            console.log('Falha ao registrar! Tente nonamente!' + e);
        }
    }

    return (
        <div className="registro-container">
            <h2>Criar Conta</h2>
            <form type="form" onSubmit={registrar}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
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
                        id="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit" className="registro-button">Registrar</button>
            </form>
        </div>
    );
}