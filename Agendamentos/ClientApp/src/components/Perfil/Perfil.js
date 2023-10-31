import React, { useEffect, useState } from 'react';
import { api } from '../../services/api'

export function Perfil() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        populateUsuariosData();
    }, []);

    const renderUserTable = (users) => {
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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>{user.senha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const populateUsuariosData = () => {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        api.get('usuario', config)
            .then((response) => {
                const dados = response.data;
                console.log(dados);
                setUsers(dados);
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
            });
    };

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 id="tableLabel">Users</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {renderUserTable(users)}
        </div>
    );
}
