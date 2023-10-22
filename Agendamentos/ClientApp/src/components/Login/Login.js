import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLogin = () => {
        // Implemente a lógica de autenticação aqui, por exemplo, fazer uma requisição para um servidor.
    };

    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Seu email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Sua senha"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <button type="button" onClick={this.handleLogin} className="login-button">
                        Login
                    </button>
                </form>
                <div className="create-account">
                    <p>Não possui uma conta?</p>
                    <Link to="/registro"  className="create-account-button">
                        Criar Conta
                    </Link>
                </div>
            </div>
        );
    }
}