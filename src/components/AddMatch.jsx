import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

function AddMatch() {
  const [formData, setFormData] = useState({
    teamA: '',
    teamB: '',
    scoreA: '',
    scoreB: '',
    status: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/matches', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  return (
    <div>
      <h1>Add Match</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="teamA"
          placeholder="Team A Name"
          value={formData.teamA}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="teamB"
          placeholder="Team B Name"
          value={formData.teamB}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="scoreA"
          placeholder="Team A Score"
          value={formData.scoreA}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="scoreB"
          placeholder="Team B Score"
          value={formData.scoreB}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Match</button>
      </form>
    </div>
  );
}

export default AddMatch;