import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css';
import Search from './Search.js';
import title from './resources/title-image.jpg';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
         <header className="App-header">
           <h1>Food for Thought</h1>
           {/*image from https://nypost.com/2018/04/04/youre-likely-eating-tiny-chunks-of-plastic-in-home-cooked-meals/*/}
           <img src={title} alt="Tasty food being cooked."/>
           <Link to="/search">Begin</Link>
           <Route path="/search" component={Search}/>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
