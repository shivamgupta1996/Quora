import React, { Component } from 'react';
import { articleRef } from '../firebase';
import { connect } from 'react-redux';
import { postedArticles } from '../actions';
import ArticleShow from './ArticleShow';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ArticleIndex extends Component {

  componentWillMount(){
      articleRef.on('value',snap => {
        let articles = [];
        snap.forEach(article => {
          const { email, title, body } = article.val();
          const serverKey = article.key;
          articles.push({email, title, body, serverKey})
        })
        this.props.postedArticles(articles);
        })

    }

    renderArticles(){
      let listItems = this.props.articles.map((t,index) => {

        return( <li className = "list-group-item" key={index}><Link to={`/articleShow/${t.serverKey}`}>{index+1}) {t.title}</Link></li>);

      });
      return <div className="transition-item list-items">{listItems}</div>;
    }
  render(){

    const transitionOptions = {
      transitionName : "fade",
      transitionEnterTimeOut: 500,
      transitionLeaveTimeOut: 500
    };
    return(

      <div>
        <ul className = "list-group">
        <ReactCSSTransitionGroup {...transitionOptions}>
          {this.renderArticles()}
        </ReactCSSTransitionGroup>
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state){
  const { articles } = state;
  return {
    articles
  }
}

export default connect (mapStateToProps, { postedArticles })(ArticleIndex);
