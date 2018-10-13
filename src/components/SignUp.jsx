import React, { Component } from 'react';
import {firebaseApp, userRef} from '../firebase';
import { Link } from 'react-router-dom';
import logo from './Double Ring-4s-200px.svg';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',
      fname:'',
      lname:'',
      error : {
        message : ''
      }
    }
  }
signUp(){

  const {email, password} = this.state;
  ReactDOM.render(<img src={logo} />, document.getElementById('rat'))
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
              .then((response) =>{
                const { uid } = response.user;
                const { email, fname, lname } = this.state;

                userRef.child(`${uid}`).set({
                  username: fname +" "+ lname,
                  email: email,
                })
                history.push("/");
                window.location.reload();
              })
              .catch(error => {
                this.setState({error});
                ReactDOM.render(
                  <div id="rat"><button
                    className = "btn btn-primary"
                    type = "button"
                    style={{marginBottom:'5px'}}
                    onClick = {() => this.signUp()}>
                    Sign Up
                  </button></div>, document.getElementById('rat'))
              });

}

showErrorMessage(){
  if(this.state.error.message){
  return(<div className="errorBox">{this.state.error.message}</div>)
} else {
    return <div></div>
  }
}

  render(){
    return(
      <div className="form-container suBox">
        <div className="formContents">
          <form>
            <div>

              <div style={{marginBottom:'5px'}}>
                <label>First Name</label>
                <input
                  className="form-control"
                  required
                  type="text"
                  placeholder = "First Name"
                  onChange = {event => this.setState({fname : event.target.value})}
                />
              </div>

              <div style={{marginBottom:'5px'}}>
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder = "Last Name"
                  onChange = {event => this.setState({lname : event.target.value})}
                />
              </div>

              <div style={{marginBottom:'5px'}}>
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder = "Username"
                  onChange = {event => this.setState({email : event.target.value})}
                />
              </div>

              <div style={{marginBottom:'5px'}}>
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder = "Password"
                  onChange = {event => this.setState({password : event.target.value})}
                />
              </div>

              <div id="rat">
                <button
                  className = "btn btn-primary"
                  type = "button"
                  onClick = {() => this.signUp()}
                >
                Sign Up
                </button>
              </div>

              <div>{this.showErrorMessage()}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
