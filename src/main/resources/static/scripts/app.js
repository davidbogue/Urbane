'use strict';

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import Home from './components/Home';
import Article from './components/Article';

/*
  Routes
*/
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Home}/>
    <Route path="/page/:pageNumber" component={Home}/>
    <Route path="/article/:articleId" component={Article}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('react'));