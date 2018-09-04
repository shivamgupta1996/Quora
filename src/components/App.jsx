import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import ArticleIndex from './ArticleIndex';
import AddArticle from './AddArticle';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import MetaTags from 'react-meta-tags';

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
      return(<button className="btn btn-danger" onClick={()=>this.signout()}>Sign Out</button>);
    } else {
      return(<button className="btn btn-warning" onClick={()=>this.signinAction()}>Sign in</button>);
    }
}

  render(){

    return(
      <div className="wrapper">
      <div style={{margin:'25px'}} className="container">
        <div className="imgBox"><h1>Mini Facebook</h1></div>
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
        <hr />

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
