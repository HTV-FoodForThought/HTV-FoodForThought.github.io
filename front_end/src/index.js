import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import './index.css';
import App from './App';
import Search from './Search';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Router>
        <Route path="/" component={ App } />,
        <Route path="/search" component={ Search }/>
    </Router>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
