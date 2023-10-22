import React, { Component } from 'react';

export class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        };
    }

    handleNomeChange = (e) => {
        this.setState({ nome: e.target.value });
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleRegistrar = () => {
        // Implemente a lógica de registro aqui, por exemplo, enviar os dados para o servidor.
    };

    render() {
        return (
            <div className="registro-container">
                <h2>Criar Conta</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Seu nome"
                            value={this.state.nome}
                            onChange={this.handleNomeChange}
                        />
                    </div>
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
                    <button type="button" onClick={this.handleRegistrar} className="registro-button">
                        Registrar
                    </button>
                </form>
            </div>
        );
    }
}