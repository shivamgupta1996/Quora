import { SEND_UID } from '../actions';

let userUid ={
  uid : null
};

export default (state = userUid, action) => {

  switch (action.type){
    case SEND_UID:
      const { uid } = action;
      return userUid = {
        uid,
      }
      return userUid;

      default :
        return state;
  }
}
