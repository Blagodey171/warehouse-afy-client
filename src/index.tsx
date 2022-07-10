import React from 'react';
import { createRoot } from 'react-dom/client'

import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './components/app/app';
import Store from './redux/store';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </BrowserRouter>
);

// ReactDOM.render(
//     <BrowserRouter>
//         <Provider store={Store}>
//             <App />
//         </Provider>
//     </BrowserRouter>,
//     document.getElementById('root')
// );
// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App tab="home" />);
