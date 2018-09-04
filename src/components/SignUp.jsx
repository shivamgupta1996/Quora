import React, { Component } from 'react';
import {firebaseApp} from '../firebase';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import MetaTags from 'react-meta-tags';

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
  firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {this.setState({error});});

}

  render(){
    return(
      <div className="wrapper">
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

              <button
                className = "btn btn-primary"
                type = "button"
                onClick = {() => this.signUp()}>
                Sign Up
                </button>
                <div>{this.state.error.message}</div>
        </div>

        <div>
          Already have an ID? <Link to="/signin" >Sign In </Link>
        </div>

      </div>
      </div>
    );
  }
}

export default SignUp;
