import React, {Component} from 'react';
import {connect} from 'react-redux';
import { questionRef } from '../firebase';
import { firebaseApp } from '../firebase';

class ArticleEdit extends Component {

  constructor(props){
    super(props);

    this.state = {
      title : '',
    }
  }
  componentDidMount(){
    questionRef.child(`${this.props.skey}`).on('value',article => {
      const {title, body} = article.val();
      this.setState({title});
    })
  }

  editArticle(){

    const {title} = this.state;
    const { email } = this.props.user;
    firebaseApp.database().ref(`question/${this.props.skey}`).on('value',snap => {

      const quesAuthorEmail = snap.val().email;
      if (email == quesAuthorEmail){
        questionRef.child(`${this.props.skey}`)
        .set({ email, title });
        window.location.reload();
      } else {
        return(<span>Only Author is allowed to edit this article</span>);
      }

    })


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
