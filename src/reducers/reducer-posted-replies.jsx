import {POSTED_REPLIES} from '../actions';
import _ from 'lodash';
export default (state = [], action) => {

  switch(action.type){
    case POSTED_REPLIES:
      const {replies} = action;
      return _.values(_.uniqBy([...state, ...replies], 'commentKey'));

    default:
      return state;
  }
}
