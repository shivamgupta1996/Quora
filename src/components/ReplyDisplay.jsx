import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postedReplies } from '../actions';
import { commentRef } from '../firebase';
import ReplyDisplayItem from './ReplyDisplayItem';

class ReplyDisplay extends Component{

  componentDidMount(){
      commentRef.on('value',snap => {
        let replies = [];
        snap.forEach(replyObj => {
          const {commentableId} = replyObj.val();
            if(commentableId == this.props.cId){
              const { email, comment, commentableId, type } = replyObj.val();
              const commentKey = replyObj.key;
              replies.push({email, commentKey, comment, commentableId, type}) }

        })
        this.props.postedReplies(replies);
        })

    }

  render(){
    const {replies, cId} = this.props;

    const filterReply = _.filter(replies, { 'commentableId': cId, 'type' : 'comment' });

    if (!filterReply) {
      return <div />;
    }

    return(
      <div>
      {
        filterReply.map((reply, index) => {
          return <ReplyDisplayItem key={index} comment={reply} />;
        })
      }
      </div>
    )
  }
}

function mapStateToProps(state){

  const {replies} = state;
  return {
    replies
  }
}

export default connect(mapStateToProps, {postedReplies})(ReplyDisplay);
