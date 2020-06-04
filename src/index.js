import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import userReducer from './reducers/userReducer';
import alertaReducer from './reducers/alertaReducer';

import './temas/Orgamec.scss';
import './items/customStyle.css';
import './items/animista.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import * as serviceWorker from './serviceWorker';


const allReducers = combineReducers({
  user: userReducer,
  alerta: alertaReducer
});

const store = createStore(allReducers, {
  user: {},
  alerta: [
    {id: 0, tipo: 'success', destaque: 'Bem Vindo!',msg: 'Nossa ferramenta Gestor Fiscal te deseja um bom serviço.'}
  ]
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
