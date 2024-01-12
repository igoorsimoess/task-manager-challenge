// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import TaskViewer from './TaskViewer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/tasks" component={TaskViewer} />
      </Switch>
    </Router>
  );
};

export default App;
