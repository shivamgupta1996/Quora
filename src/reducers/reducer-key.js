import {SEND_KEY} from '../actions';



export default (state=null, action) => {

  switch(action.type){
    case SEND_KEY:
      const { serverKey } = action;
      return serverKey;

    default:
      return state;
  }
}
