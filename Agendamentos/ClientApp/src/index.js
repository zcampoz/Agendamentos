import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <>
        <Helmet>
            <meta charSet="utf-8" />
        </Helmet>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </>);

serviceWorkerRegistration.unregister();
reportWebVitals();
