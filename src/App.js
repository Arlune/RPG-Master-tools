import React from 'react';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Creation from './components/Creation';
import Digicode from './components/Digicode';


function App() {
  return (
    <div className="App">
      <header>
        RPG Master Tools
      </header>
      <div className="menu">
          <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/digicode">Digicode</Link> </li>
            <li> <Link to="/creation">Creation</Link> </li>
          </ul>
      </div>
      <div className="App-intro">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/digicode" component={Digicode}/>
          <Route path="/creation" component={Creation}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
