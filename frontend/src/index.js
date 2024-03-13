import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Board from './Board';
import Login from './Login';
import Register from './Register';

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

function App() {
  const [token, setToken] = useState(() => getToken());

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        {!token ? <Redirect to="/login" /> :
        <Board token={token} />
      }
      </Route>
      <Route path="/login">
          <Login setToken={setToken} />
      </Route>
      <Route path="/register">
          <Register setToken={setToken} />
      </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
