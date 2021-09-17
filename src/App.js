import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";
import axiosWithAuth from "./helpers/axiosWithAuth";
function App() {
  const logOut = () =>{
    axiosWithAuth().post('api/logout')
      .then(res =>{
        localStorage.removeItem('token')
        window.location.href='login';
      }).catch(err => console.error(err))
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" onClick={logOut}>logout</a>
        </header>
      </div>
      <Switch>
      <PrivateRoute exact path="/bubbles" component={BubblePage} />
        <Route path = '/login' component ={Login}/>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>

  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.