import React, { Component } from 'react';

export class Perfil extends Component {
  static displayName = Perfil.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.populateUsuariosData();
  }

  static renderUserTable(users) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.senha}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Perfil.renderUserTable(this.state.users);

    return (
      <div>
        <h1 id="tableLabel">Users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  //async populateUsuariosData() {
  //  const response = await fetch('api/usuario');
  //  const data = await response.json();
  //  this.setState({ users: data, loading: false });
  //}
    populateUsuariosData() {
        fetch('api/usuario')
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                this.setState({ users: dados, loading: false });
            })
    }
}
