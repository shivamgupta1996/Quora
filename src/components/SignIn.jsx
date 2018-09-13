import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import logo from './Double Ring-4s-200px.svg';
import {Helmet} from "react-helmet";

class SignIn extends Component {

  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',
      error : {
        message : ''
      }
    }
  }
signIn(){
  const {email, password} = this.state;
  ReactDOM.render(<img src={logo} />, document.getElementById('rat'))
  firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(
    error => {
    this.setState({error});
    ReactDOM.render(
      <div id="rat"><button
        className = "btn btn-primary"
        type = "button"
        style={{marginBottom:'5px'}}
        onClick = {() => this.signIn()}>
        Sign In
      </button></div>, document.getElementById('rat'))
  });

}

  render(){
    return(
      <div className="wrapper transition-item">
      <Helmet>
        <title>Sign In</title>
        <meta property="og:title" content="Sign in" />
        <meta property="og:type" content="social" />
        <meta property="og:image" content="https://image.ibb.co/fKbPXp/mini_facebook.png" />
        <meta property="og:description" content="Sign in to Mini facebook" />
      </Helmet>
      <div className= "form-inline" style={{margin:'5%'}}>
        <h2>Sign In</h2>
        <div className = "form-group">
          <input
            className="form-control"
            style={{marginRight:'5px'}}
            type="text"
            placeholder = "Username"
            onChange = {event => this.setState({email : event.target.value})} />

            <input
              className="form-control"
              style={{marginRight:'5px'}}
              type="password"
              placeholder = "Password"
              onChange = {event => this.setState({password : event.target.value})} />

              <div id="rat"><button
                className = "btn btn-primary"
                type = "button"
                onClick = {() => this.signIn()}>
                Sign In
                </button></div>
                <div>{this.state.error.message}</div>
        </div>
        <div>
          Do not have an ID? <Link to="/signup" >Sign Up </Link>
        </div>
        <span><center></center></span>

      </div>
      </div>
    );
  }
}


export default SignIn;
