import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import ColorSchema from './theme/ColorSchema';
import Theme from './theme/Theme';
import configureStore from './store/config/configureStore';
import i18n from './localization/i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Routing from './route/Routing';

const store = configureStore();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={ColorSchema[Theme.LIGHT]}>
          <Routing />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </I18nextProvider>,
  document.getElementById('root'),
);
