import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './i18n';
import * as serviceWorker from './serviceWorker';
import { LIST_USER } from './contants/ListUser';

if (!localStorage.getItem('list_user')) {
  localStorage.setItem('list_user', JSON.stringify(LIST_USER));
}
console.warn = () => {};
ReactDOM.render(
  <BrowserRouter basename="/demo/">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
