import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { extendTheme } from "@chakra-ui/react"
import {DevBoard} from "./styles/theme.js";


const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider theme={DevBoard}>
      <App />
    </ChakraProvider>
    </PersistGate>
  </Provider>
  </BrowserRouter>,
);
