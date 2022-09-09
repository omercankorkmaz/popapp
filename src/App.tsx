import React from 'react';
import './App.css';
import Popup from './components/Popup';
import Settings from './components/Settings';

const App = () => {

  return (
    <div className="App">
      <div className="container">
        <Settings />
        <Popup />
      </div>
    </div>
  );
}

export default App;
