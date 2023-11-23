import { Agendamento } from "./components/Agendamento/Agendamento";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Login/Logout";
import { Registro } from "./components/Login/Registro";
import { Perfil } from "./components/Perfil/Perfil";
import { AdicionarServico } from "./components/Perfil/AdicionarServico";
import { Home } from "./components/Home/Home";

const AppRoutes = [
    {
        index: true,
        element: <Login />,
        isProtected: false
    },
    {
        path: '/',
        element: <Login />,
        isProtected: false
    },
    {
        path: '/logout',
        element: <Logout />,
        isProtected: true
    },
    {
        path: '/home',
        element: <Home />,
        isProtected: true
    },
    {
        path: '/agendamento',
        element: <Agendamento />,
        isProtected: true
    },
    {
        path: '/perfil',
        element: <Perfil />,
        isProtected: true
    },
    {
        path: '/registro',
        element: <Registro />,
        isProtected: false
    },
    {
        path: '/add-service',
        element: <AdicionarServico />,
        isProtected: true
    },
];

export default AppRoutes;
