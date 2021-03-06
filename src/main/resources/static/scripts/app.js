'use strict';

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import Home from './components/Home';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import SignIn from './components/SignIn';

function requireAuth(nextState, replaceState) {
  if (!localStorage.getItem('authtoken')) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signin')
  }
}

/*
  Routes
*/
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Home}/>
    <Route path="/page/:pageNumber" component={Home}/>
    <Route path="/article/:articleId" component={Article}/>
    <Route path="/editarticle/:articleId" component={EditArticle} onEnter={requireAuth}/>
    <Route path="/addarticle" component={EditArticle} onEnter={requireAuth}/>
    <Route path="/signin" component={SignIn}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('react'));