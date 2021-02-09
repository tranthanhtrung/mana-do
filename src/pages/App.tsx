import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateComponent from './../components/privateComponent'
import SignIn from './signin';
import ToDo from './todo';

import './App.css';

const App = () => {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn}/>
          <PrivateComponent>
            <Route path="/todo" component={ToDo}/>
          </PrivateComponent>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
