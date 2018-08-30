import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router';

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
  //console.log("credentials", this.state);
  const {email, password} = this.state;
  firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(
    error => {
    this.setState({error});
  });

}

  render(){
    return(

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

    );
  }
}


export default SignIn;
