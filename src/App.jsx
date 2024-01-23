import "./input.css";
import React from 'react';
import Form from './Form.jsx';
import Home from './Home.jsx';
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Test from './Test.jsx';
import Instructions from './Home/Instructions.jsx'; 
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const App = () =>{
  return(
    <Router>
      <Switch>
        <Route path='/display-questions/:link?'>
           <Test/>
        </Route>
        <Route path='/instructions'>
            <Instructions/>
        </Route>
        <Route path="/form">
          <Form/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
