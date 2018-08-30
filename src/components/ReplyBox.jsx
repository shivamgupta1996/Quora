import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commentRef } from '../firebase';

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
      commentRef.push({email, comment: reply, commentableId:cId, type:"comment"});
      this.setState({reply: ''})
    }
}
  render(){


    return(

      <div>
        <div className= "form-group">

          <input
            type="text"
            className="form-control"
            style={{marginRight:'5px'}}
            onChange={(e)=> this.setState({reply: e.target.value})}
            placeholder="Add a reply"
            value={this.state.reply}
            />

          <button
            type="button"
            className="btn btn-default"
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
