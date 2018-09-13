import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import ArticleIndex from './ArticleIndex';
import AddArticle from './AddArticle';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import {Helmet} from "react-helmet";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Glyphicon} from 'react-bootstrap';

class App extends Component {

  signout(){

      firebaseApp.auth().signOut().then(browserHistory.push("/signin"));
    }

renderAddArticle(){
  if (this.props.user.email != null) {
    return (<AddArticle />);
  } else {
    return (<div>Please Login to Add a Post</div>);
  }

}

signinAction(){
  browserHistory.push('/signin');
}

renderButton(){
    if(this.props.user.email!=null){
      return(<a href={`/signin`}><button className="btn btn-danger" onClick={()=>this.signout()}>Sign Out</button></a>);
    } else {
      return(<a href={`/signin`}><button className="btn btn-warning" onClick={()=>this.signinAction()}>Sign in</button></a>);
    }
}

  render(){
    return(
      <div className="wrapper transition-item">
      <Helmet>
        <title>Home-Mini Facebook</title>
        <meta property="og:title" content="Home-Mini Facebook" />
        <meta property="og:type" content="social" />
        <meta property="og:image" content="https://image.ibb.co/fKbPXp/mini_facebook.png" />
        <meta property="og:description" content="Homepage" />
      </Helmet>
      <div className="imgBox container-fluid"><h1>Mini Facebook</h1></div>
      <div style={{margin:'25px'}} className="container cont">

        <div className ="text-left userBox">Hello, {this.props.user.email}
        </div>
        <div className = "signoutBox">
          {this.renderButton()}
        </div>
        <hr />
        <div>
          {this.renderAddArticle()}
        </div>
        <hr />
        <h2>Articles</h2>
        <ArticleIndex />
      </div>
      <div className="container-fluid foot">By: Shivam Gupta <br />
        <a href="https://github.com/shivamgupta1996" target="_BLANK"><img src={require('../GitHub-Logos/GitHub_Logo.png')} className="img-responsive gitlogo" /></a>
      </div>
      </div>
      )
    }
  }

  function mapStateToProps(state){

    const {user} = state;
    return {
      user
    }

  }
  export default connect (mapStateToProps)(App);
