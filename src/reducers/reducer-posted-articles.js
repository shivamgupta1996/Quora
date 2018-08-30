import {POSTED_ARTICLES} from '../actions';

export default (state = [], action) => {

  switch(action.type){
    case POSTED_ARTICLES:
      const { articles } = action;
      return articles;

    default:
      return state;
  }
}
