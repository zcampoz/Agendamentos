import { Agendamento } from "./components/Agendamento/Agendamento";
import { Login } from "./components/Login/Login";
import { Registro } from "./components/Login/Registro";
import { Perfil } from "./components/Perfil/Perfil";
import { Home } from "./components/Home/Home";

const AppRoutes = [
    {
        index: true,
        element: <Login />
    },
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/agendamento',
        element: <Agendamento />
    },
    {
        path: '/perfil',
        element: <Perfil />
    },
    {
        path: '/registro',
        element: <Registro />
    },
];

export default AppRoutes;
