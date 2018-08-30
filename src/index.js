import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ArticleShow from './components/ArticleShow';
import promise from 'redux-promise';


const store = createStore(reducer);
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {

    browserHistory.push('/app');
    const { email } = user;
    store.dispatch(logUser(email));
  } else {
    // browserHistory.replace('/signin');

  }
});


ReactDOM.render(
  <Provider store={store} >
    <Router path="/" history={browserHistory}>

      <Route path="/app" component={App} />
      <Route path="/" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/articleShow/:serverKey" component={ArticleShow} />

    </Router>
  </Provider>, document.getElementById('root')
)
