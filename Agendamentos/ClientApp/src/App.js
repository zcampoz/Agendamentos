import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Agendamento } from "./components/Agendamento/Agendamento";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Login/Logout";
import { Registro } from "./components/Login/Registro";
import { Layout } from './components/Menu/Layout';
import { AdicionarServico } from "./components/Perfil/AdicionarServico";
import { AdicionarDisponibilidade } from "./components/Perfil/AdicionarDisponibilidade";
import { Perfil } from "./components/Perfil/Perfil";
import './custom.css';

const PrivateRoute = ({ children }) => {
    var auth = localStorage.getItem('authenticated');
    var authTest = auth !== null;

    if (!authTest) {
        return <Navigate to="/" />;
    }
    return <React.Fragment>{children}</React.Fragment>;
}

const App = () => {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
                    <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
                    <Route path="/add-service" element={<PrivateRoute><AdicionarServico /></PrivateRoute>} />
                    <Route path="/add-disponibilidade" element={<PrivateRoute><AdicionarDisponibilidade /></PrivateRoute>} />
                    <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Layout>
        </div>
    );
};

export default App;

export const NotFound = () => {
    return (
    <div>
        <h1>404 - Page not found.</h1>
    </div>
    );
}