import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags';

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
  firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(
    error => {
    this.setState({error});
  });

}

  render(){
    return(
      <div className="wrapper">
          <MetaTags>
            <title>Sign In</title>
            <meta property="og:title" content="Mini Facebook App Sign in" />
            <meta property="og:type" content="social" />
            <meta property="og:url" content="https://minifb.herokuapp.com/signin" />
            <meta property="og:image" content="https://image.ibb.co/fKbPXp/mini_facebook.png" />
            <meta property="og:description" content="Sign In" />
          </MetaTags>
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

              <button
                className = "btn btn-primary"
                type = "button"
                onClick = {() => this.signIn()}>
                Sign In
                </button>
                <div>{this.state.error.message}</div>
        </div>
        <div>
          Do not have an ID? <Link to="/signup" >Sign Up </Link>
        </div>


      </div>
      </div>
    );
  }
}


export default SignIn;
