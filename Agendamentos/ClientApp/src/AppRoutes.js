import { Agendamento } from "./components/Agendamento/Agendamento";
import { Login } from "./components/Login/Login";
import { Registro } from "./components/Login/Registro";
import { Perfil } from "./components/Perfil/Perfil";
import { Home } from "./components/Home/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
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
        path: '/login',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Registro />
    },
];

export default AppRoutes;
