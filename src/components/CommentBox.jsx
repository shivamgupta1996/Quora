import React, { Component } from 'react';
import { firebaseApp } from  '../firebase';
import { connect } from 'react-redux';
import { commentRef } from  '../firebase';

class CommentBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      comment : '',

    }

  }

  componentDidMount() {
    /* firebaseApp.database().ref(`articles/${this.props.key}`)
    .once('value', (shivam) => {
      this.setState({article: shivam.val()});
    }) */
    //console.log("Keyyy", this.props.key);

  }

  submitComment(){

    const { comment } = this.state;
    const { email } = this.props.user;
    if(this.state.comment ==''){
      return alert("Cannot submit blank comment");
    } else {
    commentRef.push({comment, email, commentableId:this.props.serverKey, type:"article"});
    }
  }

  render(){

    return(
      <div className = "form-inline">
        <div className = "form-group">
          <input
            className = "form-control commentBox"
            style={{marginRight:'5px'}}
            type = "text"
            placeholder = "Add a comment"
            onChange = {event => this.setState({comment : event.target.value})} />

          <button
            className = "btn btn-primary"
            type = "button"
            onClick = {() => this.submitComment()}
          >
          Submit
          </button>

        </div>
      </div>
    )

  }

}

function mapStateToProps(state){

  const {user} = state;
  const {serverKey} = state;
  return {
    user,
  }
}
export default connect (mapStateToProps)(CommentBox);
