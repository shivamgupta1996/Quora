import { SIGNED_IN } from '../actions';

let user ={
  email : null,
  uid: null,
};
export default (state = user, action) => {
  let userName;
  switch (action.type){
    case SIGNED_IN:
      const { email,uid } = action;

      return user = {
        email,
        uid
      }
      return user;
      default :
        return state;
  }
}
