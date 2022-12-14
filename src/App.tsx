import React from 'react';
import IndexRouter from "./router/IndexRouter";
import './App.css'
import {Provider} from 'react-redux'
import store from './redux/store'
import './util/server'

function App() {
  return (
    <div>
      <Provider store={store}>
        <IndexRouter/>
      </Provider>
    </div>
  );
}

export default App;
