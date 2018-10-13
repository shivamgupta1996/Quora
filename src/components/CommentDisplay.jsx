import React, { Component } from 'react';
import { answerRef } from '../firebase';
import {connect} from 'react-redux';
import {postedComments} from '../actions';
import CommentItem from './CommentItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

class CommentDisplay extends Component {

  componentDidMount(){
      answerRef.on('value',snap => {
        let comments = [];
        snap.forEach(commentObj => {
          const {commentableId} = commentObj.val();
            if(commentableId == this.props.serverKey){
              const { email, comment, commentableId, type } = commentObj.val();
              const commentKey = commentObj.key;
              comments.push({email, comment, commentableId, commentKey, type}) }
        })
        this.props.postedComments(comments);
        })
    }

  render(){
    const transitionOptions = {
      transitionName : "fade",
      transitionEnterTimeOut: 500,
      transitionLeaveTimeOut: 500
    };
    if (this.props.comments.length < 1) {
      return <div />;
    }
    const {comments, serverKey}= this.props;
    const filterComments = _.filter(comments, { 'commentableId': serverKey, 'type' : 'article' });

    return(
      <div>
      <h3><u>Answers</u></h3>
      <ReactCSSTransitionGroup {...transitionOptions}>
      {
          filterComments.map((comment,index) => {
            return (<div key={index}><CommentItem key={index} index={index} comment = {comment} /><hr /></div>) })

      }
      </ReactCSSTransitionGroup>
      </div>
    )
  }

}

function mapStateToProps(state){

  const {comments} = state;
  return {
    comments
  }
}
export default connect (mapStateToProps, {postedComments})(CommentDisplay);
