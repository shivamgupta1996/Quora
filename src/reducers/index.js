import { combineReducers } from 'redux';
import user from './reducer-user';
import articles from './reducer-posted-articles';
import comments from './reducer-posted-comments';
import key from './reducer-key';
import replies from './reducer-posted-replies';

export default combineReducers({
user,
articles,
comments,
key,
replies
})
