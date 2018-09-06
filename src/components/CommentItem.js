import React, { Component } from 'react';
import ReplyBox from './ReplyBox';
import ReplyDisplay from './ReplyDisplay';

class CommentItem extends Component {



  render(){
     const {email, comment, commentKey} = this.props.comment;
    return(
      <div className="cmbox">

        <div><strong><u>{email}</u></strong></div>
        <span>{comment}</span>

        <div className="container" style={{marginTop:'10px'}}>
          <ReplyBox cId={commentKey} />
          <ReplyDisplay cId={commentKey} />



        </div>


      </div>
    )
  }
}

export default CommentItem;
