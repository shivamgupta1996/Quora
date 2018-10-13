import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import logo from './Double Ring-4s-200px.svg';
import createHistory from "history/createBrowserHistory";
import SignUp from './SignUp';

const history = createHistory();


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
  ReactDOM.render(<img src={logo} />, document.getElementById('rat1'))
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    history.push("/");
    window.location.reload();
  })
  .catch(
    error => {
    this.setState({error});
    ReactDOM.render(
      <div id="rat1"><button
        className = "btn btn-primary"
        type = "button"
        style={{marginBottom:'5px'}}
        onClick = {() => this.signIn()}>
        Sign In
      </button></div>, document.getElementById('rat1'))
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
      <div className="wrapper">
        <div className="bg-container">
          <div className="formBox">
            <div className="logoBox">
            </div>
            <div className="tagLine">
              <h2>A place to share knowledge and better understand the world.</h2>
            </div>
            <div className="form-container">
              <div className="signUpBox formContents">
                <SignUp />
              </div>

              <div className="formContents login">
                <form>
                  <div>
                    <div>
                      <label>Email</label>
                      <input
                        className="form-control"
                        style={{marginBottom:'5px'}}
                        type="text"
                        placeholder = "Username"
                        onChange = {event => this.setState({email : event.target.value})}
                      />
                    </div>
                    <div>
                      <label>Password</label>
                      <input
                        className="form-control"
                        style={{marginBottom:'5px'}}
                        type="password"
                        placeholder = "Password"
                        onChange = {event => this.setState({password : event.target.value})}
                      />
                    </div>

                    <div id="rat1">
                      <button
                        className = "btn btn-primary"
                        type = "button"
                        onClick = {() => this.signIn()}
                      >
                      Sign In
                      </button>
                    </div>
                    <div>{this.showErrorMessage()}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SignIn;
