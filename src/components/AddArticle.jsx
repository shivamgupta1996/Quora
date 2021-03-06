import React, { Component } from 'react';
import { questionRef, firebaseApp } from '../firebase';
import { connect } from 'react-redux';

class AddArticle extends Component {
  constructor(props){
    super(props);

    this.state = {
      title : '',
      name:''
    }
  }

  componentWillMount() {
    const {uid} = this.props.user;
    firebaseApp.database().ref(`users/${uid}`).on('value', snap =>{
      this.setState({name : snap.val().username});
    })
  }

  addArticle(){
    if(this.state.title ==''){
      return alert("Title cannot be left blank");

    } else {
    const { title, name } = this.state;
    const { email } = this.props.user;
    questionRef.push({name, email, title});
    this.setState({title :''})
    }
  }

  render(){
    return(
      <div className="addarticle">
        <h2>What is your question?</h2>
        <div className = "form-group">
          <input
            className = "form-control"
            type = "text"
            placeholder = "Write your question"
            onChange ={event => this.setState({title : event.target.value})} />

            <button
              type = "button"
              style={{marginTop:'10px'}}
              className = "btn btn-primary"
              onClick = {() => this.addArticle()}
              >Add Question
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
export default connect (mapStateToProps, null)(AddArticle);
