import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Search from './Search.js';
import Title from './Title.js';
import RecipesPage from './RecipesPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
         <header className="App-header">
           <Route exact path="/" component={Title}/>
           <Route exact path="/search" component={Search}/>
           <Route exact path="/recipes" component={RecipesPage}/>
           {this.props.children}
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
