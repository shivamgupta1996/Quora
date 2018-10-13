import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerRef } from '../firebase';

class ReplyBox extends Component {

constructor(props){
  super(props);

  this.state = {
    reply:''
  }
}

submitReply(){
  const { email } = this.props.user;
  const { reply } = this.state;
  const { cId} = this.props;
  if(reply ===''){
    return alert("Cannot submit blank reply");
  } else
    if(email===null){
      return alert("You have to sign in first");
    } else {
      answerRef.push({email, comment: reply, commentableId:cId, type:"comment"});
      this.setState({reply: ''})
    }
}
  render(){


    return(

      <div>
        <div className= "form-group form-inline">

          <input
            type="text"
            className="form-control"
            style={{marginRight:'5px', marginBottom:'5px', width:'50%'}}
            onChange={(e)=> this.setState({reply: e.target.value})}
            placeholder="Add a comment"
            value={this.state.reply}
            />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.submitReply()}
          >submit
          </button>
        </div>

      </div>

    )
  }
}

function mapStateToProps(state){

  const {user} = state;

  return {
    user,
  }
}
export default connect (mapStateToProps)(ReplyBox);
