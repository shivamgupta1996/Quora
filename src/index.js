import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { firebaseApp } from './firebase';
import { Provider } from 'react-redux';
import { logUser } from './actions';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import SignIn from './components/SignIn';
import ArticleShow from './components/ArticleShow';
import promise from 'redux-promise';
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const store = createStore(reducer);
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {
    history.push("/app");
    const { email,uid } = user;
    store.dispatch(logUser(email,uid));
  } else {
    // browserHistory.replace('/signin');

  }
});


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/app" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignIn} />
          <Route path="/articleShow/:serverKey" component={ArticleShow} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)
