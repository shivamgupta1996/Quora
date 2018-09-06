import React, {Component} from 'react';
import {connect} from 'react-redux';
import { articleRef } from '../firebase';
import { firebaseApp } from '../firebase';
import { browserHistory } from 'react-router';
class ArticleEdit extends Component {

  constructor(props){
    super(props);

    this.state = {
      title : '',
      body : ''
    }
  }
  componentWillMount(){
    firebaseApp.database().ref(`articles/${this.props.skey}`).on('value',article => {
      const {title, body} = article.val();
      this.setState({title, body});
    })
  }

  editArticle(){

    const {title, body} = this.state;
    const { email } = this.props.user;
    firebaseApp.database().ref(`articles/${this.props.skey}`).on('value',article => {

      const articleAuthorEmail = article.val().email;
      if (email == articleAuthorEmail){
        articleRef.child(`${this.props.skey}`)
        .set({ email, title, body });

      } else {
        return(<span>Only Author is allowed to edit this article</span>);
      }

    })

    browserHistory.push('/app');
  }

  render(){



    return(
      <div>
        <div className = "form-group">
          <input
            className = "form-control"
            type = "text"
            value = {this.state.title}
            placeholder = "Enter Title"
            onChange ={event => this.setState({title : event.target.value})} />

          <input
            className = "form-control"
            type = "text"
            style={{marginTop:'10px'}}
            value = {this.state.body}
            placeholder = "Type in your article content here"
            onChange ={event => this.setState({body : event.target.value})} />

            <button
              type = "button"
              className = "btn btn-primary"
              style={{marginTop:'10px'}}
              onClick = {() => this.editArticle()}
              >Update
              </button>

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
export default connect (mapStateToProps, null)(ArticleEdit);
