import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Menu/Layout';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false, // Verifique se o usuário está autenticado
            user: null,
            accessToken: null,
        };
    }

    renderApp() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return (
                            <Route
                                key={index}
                                {...rest}
                                element={element}
                                render={(props) => (
                                    <element {...props} />
                                )}
                            />
                        );
                    })}
                </Routes>
            </Layout>
        );
    }

    handleLoginSuccess = (user, accessToken) => {
        this.setState({ isAuthenticated: true, user, accessToken });
    }

    render() {
        return (
            <div>
                {this.renderApp()}
            </div>
        );
    }
}

//export default class App extends Component {
//    static displayName = App.name;

//    renderApp() {
//        return (
//            <Layout>
//                <Routes>
//                    {AppRoutes.map((route, index) => {
//                        const { element, ...rest } = route;
//                        return <Route key={index} {...rest} element={element} />;
//                    })}
//                </Routes>
//            </Layout>
//        );
//    }

//    render() {
//        let contents = true
//            ? <Login/>
//            : App.renderApp();

//        return (
//            <div>
//                {contents}
//            </div>
//        );
//    }
//}
