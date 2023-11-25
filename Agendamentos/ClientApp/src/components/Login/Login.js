import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { validateEmail, validatePassword } from '../../services/validationForm'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEmailValid(true);
    };

    const handlePasswordChange = (e) => {
        setSenha(e.target.value);
        setIsPasswordValid(true);
    };

    async function login(e) {
        e.preventDefault();

        if (!validateEmail(email)) {
            setIsEmailValid(false);
            return;
        }

        if (!validatePassword(senha)) {
            setIsPasswordValid(false);
            return;
        }

        try {
            const data = { email, senha };
            await api.post('/auth/signin', data)
            .then(response => {
                console.log('Response:', response.data);
                if (response.status === 200) {
                    localStorage.clear();
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('authenticated', response.data.authenticated);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);

                    navigate('/home');
                }
            })
            .catch(error => {
                localStorage.clear();
            });
        } catch (ex) {
            localStorage.clear();
            console.error('Error:', ex);
            alert('Falha ao fazer login! Tente novamente!' + ex);
        }
    };

    return (
        <div className="padrao-container">
            <form type="form" className="needs-validation" noValidate onSubmit={login} >
                <h2>Login</h2>
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
                    />
                    <label htmlFor="password" className="form-label">Senha</label>
                    <div className="invalid-feedback">
                        A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas,
                        minúsculas, números e os seguintes caracteres especiais: !@#$%^&*(),.?":{ }|.
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>

                <div className="col-12 padrao-container-registro">
                    <p>Não possui uma conta?</p>
                    <Link to="/registro" className="padrao-container-criar" >Criar Conta</Link>
                </div>
            </form>
        </div>
    );
}