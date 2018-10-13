import React, { Component } from 'react';
import { questionRef } from '../firebase';
import { connect } from 'react-redux';
import { postedArticles } from '../actions';
import ArticleShow from './ArticleShow';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ArticleIndex extends Component {

  componentWillMount(){
      questionRef.on('value',snap => {
        let articles = [];
        snap.forEach(article => {
          const { email, title, name } = article.val();
          const serverKey = article.key;
          articles.push({email, title, name, serverKey})
        })
        this.props.postedArticles(articles);
        })

    }

    renderArticles(){
      let listItems = this.props.articles.map((t,index) => {

        return( <Link to={`/articleShow/${t.serverKey}`} key={index}><li className = "list-group-item">{index+1}) {t.title}  <small><em>    -{t.name}</em></small></li></Link>);

      });
      return <div className="transition-item list-page">{listItems}</div>;
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
