import React, { Component } from 'react';
import {firebaseApp} from '../firebase';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import MetaTags from 'react-meta-tags';
import logo from './Double Ring-4s-200px.svg';
import ReactDOM from 'react-dom';

class SignUp extends Component {
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
signUp(){

  const {email, password} = this.state;
  ReactDOM.render(<img src={logo} />, document.getElementById('rat'))
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {this.setState({error});});

}

  render(){
    return(
      <div className="wrapper transition-item">
      <MetaTags>
        <title>Create Account</title>
        <meta property="og:title" content="Create Account" />
        <meta property="og:type" content="social" />
        <meta property="og:image" content="https://image.ibb.co/fKbPXp/mini_facebook.png" />
        <meta property="og:description" content="Sign Up" />
      </MetaTags>
      <div className= "form-inline" style={{margin:'5%'}}>
        <h2>Sign Up</h2>
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
                onClick = {() => this.signUp()}>
                Sign Up
                </button></div>
                <div>{this.state.error.message}</div>
        </div>

        <div>
          Already have an ID? <Link to="/signin" >Sign In </Link>
        </div>
        <div><center></center></div>
      </div>
      </div>
    );
  }
}

export default SignUp;
