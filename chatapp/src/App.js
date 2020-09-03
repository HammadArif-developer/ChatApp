import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  return (
    <div className="App">
      <div className="appBody">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
