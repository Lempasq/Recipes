import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// COMPONENTS
import Header from './components/header/header'
import Main from './components/main/main'
import Ingredients from './components/main/ingredients'

export default () => {
  return (
    <Router>
      <div className="Container">
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/ingredients/:ingredient/:number" component={Ingredients} />
        </Switch>
      </div>
    </Router>
  );
};
