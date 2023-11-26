import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://agendamentoserver.azurewebsites.net/',
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const data = {
                    userId: parseInt(localStorage.getItem('userId'), 10),
                    authenticated: (localStorage.getItem('authenticated') === 'true'),
                    created: "",
                    expiration: "",
                    refreshToken: localStorage.getItem('refreshToken'),
                    accessToken: localStorage.getItem('accessToken')
                }

                const response = await api.post('auth/refresh', data);

                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('authenticated', response.data.authenticated);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Erro ao renovar token:', refreshError);
                localStorage.clear();
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);