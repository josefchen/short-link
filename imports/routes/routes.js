import { Meteor }  from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login'

export const history = createBrowserHistory();


const unauthenticatedPages = [
  '/',
  '/signup'
];

const authenticatedPages = [
  '/links'
];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    <Redirect to="/links"/>
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    <Redirect to="/"/>
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} render={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} render={onEnterPublicPage}/>
      <Route path="/links" component={Link} render={onEnterPrivatePage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export const onAuthChange = (isAuthenticated) => {
    const pathname = location.pathname;
    const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPages = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPages && isAuthenticated) {
    return history.replace('/links')
    } else if (isAuthenticatedPages && !isAuthenticated) {
    return history.replace('/');
    }
}
