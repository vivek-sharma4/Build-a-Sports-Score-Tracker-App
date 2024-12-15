import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios  from "axios"
import '../App.css'


function EditMatch() {
    const {id} =useParams();
    const navigate = useNavigate();
    const [formData ,setFormData] = useState({
    teamA: '',
    teamB: '',
    scoreA: '',
    scoreB: '',
    status: '',
    });
    useEffect(()=>{
        fetchMatchDetails();
  }, []);

const fetchMatchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/matches/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/matches/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <div>
      <h1>Edit Match</h1>
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
        <button type="submit">Update Match</button>
      </form>
    </div>
  );
}

export default EditMatch;

