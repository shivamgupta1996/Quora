import React, { Component } from 'react';
import { firebaseApp, userRef } from '../firebase';
import ArticleIndex from './ArticleIndex';
import AddArticle from './AddArticle';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Glyphicon} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      detail : {},
    }
  }

  componentDidMount(){
  }

  signout(){
    firebaseApp.auth().signOut();
  }

  renderAddArticle(){
    if (this.props.user.email != null) {
      return (<AddArticle />);
    } else {
      return (<div>Please Login to Add a Post</div>);
    }
  }


  renderButton(){

    if(this.props.user.email!=null){
      return(<Link to = "/signin"><button className="btn btn-danger" onClick={()=>this.signout()}>Sign Out</button></Link>);
    } else {
      return(<Link to = "/signin"><button className="btn btn-warning">Sign in</button></Link>);
    }
  }

  render(){
    const {email} = this.props.user;
    console.log("uid",this.props.uid);
    return(
      <div className="wrapper">
        <div className="container-fluid header">
          <div className="container innerHeader">
            <div className="imgBox col-md-8">
              <a href="/"></a>
            </div>

            <div className="profileBox">
              Hello, {email}
              <div className="profileOption">
                {this.renderButton()}
              </div>
            </div>
          </div>
        </div>

        <div className="container bodycontainer">
          <div>
            {this.renderAddArticle()}
          </div>

            <hr />
          <div>
            <h2>Questions</h2>
            <ArticleIndex />
          </div>
        </div>
        <div className="container-fluid foot">By: Shivam Gupta <br />
          <a href="https://github.com/shivamgupta1996" target="_BLANK"><img src={require('../GitHub-Logos/GitHub_Logo.png')} className="img-responsive gitlogo" /></a>
        </div>
      </div>
    )
  }
}

  function mapStateToProps(state){

    const {user, uid} = state;
    return {
      user,
      uid
    }

  }
  export default connect (mapStateToProps, null)(App);
