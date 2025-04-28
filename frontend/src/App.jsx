// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApplyPage from './pages/ApplyPage';
import MyApplications from './pages/MyApplications';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ApplyPage} />
          <Route path="/my-applications" component={MyApplications} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
