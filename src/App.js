import React from 'react';
import logo from './logo.svg';
import { FeatureList } from './router/index.jsx';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>欢迎来到 React 实验基地！</h2>
      </header>
      <FeatureList />
    </div>
  );
}

export default App;
