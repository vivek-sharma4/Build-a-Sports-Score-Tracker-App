import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Scoreboard from './components/Scoreboard';
import AddMatch from './components/AddMatch';
import EditMatch from './components/EditMatch';
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Scoreboard</Link>
          <Link to="/add">Add Match</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Scoreboard />} />
          <Route path="/add" element={<AddMatch />} />
          <Route path="/edit/:id" element={<EditMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;