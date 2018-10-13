import React, {Component} from 'react';
import { connect } from 'react-redux';
import { questionRef, firebaseApp } from '../firebase';
import CommentBox from './CommentBox';
import CommentDisplay from './CommentDisplay';
import {Link} from 'react-router-dom';
import ArticleEdit from './ArticleEdit';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Glyphicon} from 'react-bootstrap';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class ArticleShow extends Component {

  state = {
    article: {},
    editable: false,
    currentU:firebaseApp.auth().currentUser
  }

  componentDidMount() {
    questionRef.child(`${this.props.match.params.serverKey}`)
    .once('value', (shivam) => {
      this.setState({article: shivam.val()});
    })
  }

  renderEditBox(){
      if(this.state.editable === true){
        if (this.state.currentU!= null && this.props.user.email==this.state.article.email)
          return (
            <div className="editarticle">
              <div>
                <h2><u>Edit</u></h2>
                <span className="cancelButton" onClick={()=>this.setState({editable: false})}>
                  <a href="#">cancel
                  </a>
                </span>
              </div>
              <ArticleEdit skey={this.props.match.params.serverKey} />
            </div>
          );
       else return (<div>Either you are not Logged in or you are not allowed to Edit this Post</div>)
      } else return(<div></div>)
  }

  renderCommentBox(){
    if (this.state.currentU!= null) {
      return (<CommentBox serverKey={this.props.match.params.serverKey} />);
    } else {
      return (<h4>Please Login to comment on this Post</h4>);
    }
  }

  renderButton(){

    if(this.props.user.email!=null){
      return(<Link to = "/signin"><button className="btn btn-danger" onClick={()=>this.signout()}>Sign Out</button></Link>);
    } else {
      return(<Link to = "/signin"><button className="btn btn-warning">Sign in</button></Link>);
    }
  }

  signout(){
    firebaseApp.auth().signOut();
  }

  back(){
    history.push('/');
    window.location.reload();
  }

  render(){
    const { title, email } = this.state.article;
    const mail = this.props.user.email;
    return(
      <div className="detail-page">
      <div className="container-fluid header">
        <div className="container innerHeader">
          <div className="imgBox col-md-8">
            <a href="/"></a>
          </div>

          <div className="profileBox">
            Hello, {mail}
            <div className="profileOption">
              {this.renderButton()}
            </div>
          </div>
        </div>
      </div>
      <div className="container bodycontainer1">
        <button className="btn btn-default" onClick={()=>this.back()}><Glyphicon title="back" glyph="menu-left" />
          Back
        </button>
        <article>
          <h1>{title}</h1><span className="arti" onClick={()=>this.setState({editable: !this.state.editable})}><a href="#">Edit</a></span>
          <div><em>Author: {email}</em></div>
        </article>
        <hr />
        <div>
          {this.renderEditBox()}
        </div>
        <hr />
        <div>
          <CommentDisplay serverKey={this.props.match.params.serverKey} />
        </div>
        <hr />
        <div>
          {this.renderCommentBox()}
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
  const { articles } = state;
  const { user } = state;
  return {
    articles,
    user
  }
}

export default connect (mapStateToProps, null)(ArticleShow);
