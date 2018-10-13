import React, { Component } from 'react';
import { firebaseApp } from  '../firebase';
import { connect } from 'react-redux';
import { answerRef } from  '../firebase';

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
    const {name, serverKey} = this.props;
    if(this.state.comment ==''){
      return alert("Cannot submit blank answer");
    } else {
    answerRef.push({comment, email, name, commentableId:serverKey, type:"article"});
    this.setState({comment:''})
    }
  }

  render(){

    return(
      <div className = "form-inline">
        <div className = "form-group">
          <textarea
            cols="100"
            className = "form-control commentBox"
            style={{marginRight:'5px', marginBottom:'5px'}}
            placeholder = "Add an answer"
            onChange = {event => this.setState({comment : event.target.value})}>
          </textarea>

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
