import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/login'
import SignUp from './components/register/signup'
import Category from './components/category'
import Product from './components/product'

import {BrowserRouter, Link, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div><center>
        <h1 className="header" style={{textAlign: "center", fontFamily: "Comic Sans MS", color: "white"}}>The Lunch Box</h1>
       
       <br/>
         <Link to="/login"><Button color="primary">Sign In</Button></Link>{' '}
         <Link to="/register"><Button color="danger">Sign Up</Button></Link>
       <br/>
       
       <Route path="/login" component={Login} exact/>
       <Route path="/register" component={SignUp} exact />
       <Route path="/categories" component={Category} exact />
       <Route path={`/categories/:id`} component={Product} />
      </center>
        
      </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
