import {POSTED_COMMENTS} from '../actions';
import _ from 'lodash';
export default (state = [], action) => {

  switch(action.type){
    case POSTED_COMMENTS:
      const {comments} = action;
      return _.values(_.uniqBy([...state, ...comments], 'commentKey'));

    default:
      return state;
  }
}
