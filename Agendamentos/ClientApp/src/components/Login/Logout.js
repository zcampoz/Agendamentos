import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, []);

    async function logout() {
        const response = await api.get('/auth/revoke')
        .then(response => {
            console.log('Response:', response.data);
            if (response.status === 204) {
                localStorage.clear();
                navigate('/');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return;
}