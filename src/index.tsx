import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import store from './store/store';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading... </div>}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
