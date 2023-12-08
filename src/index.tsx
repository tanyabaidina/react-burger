import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from "@reduxjs/toolkit";

import './index.css';
import App from './components/app/app';
import { rootReducer } from "./services/reducers/root-reducer";
import {Provider} from "react-redux";

const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
  </React.StrictMode>
);
