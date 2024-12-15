import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-Components'
import axios from 'axios';
import '../App.css'

const MatchCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function Scoreboard() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('http://localhost:3000/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const deleteMatch = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/matches/${id}`);
      fetchMatches();
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const filteredMatches = matches.filter(
    (match) =>
      match.teamA.toLowerCase().includes(search.toLowerCase()) ||
      match.teamB.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Scoreboard</h1>
      <input
        type="text"
        placeholder="Search by team name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredMatches.length === 0 ? (
        <p>No matches currently available</p>
      ) : (
        filteredMatches.map((match) => (
          <MatchCard key={match.id}>
            <h2>{match.teamA} vs {match.teamB}</h2>
            <p>Score: {match.scoreA} - {match.scoreB}</p>
            <p>Status: {match.status}</p>
            <button onClick={() => deleteMatch(match.id)}>Delete</button>
            <Link to={`/edit/${match.id}`}>Edit</Link>
          </MatchCard>
        ))
      )}
    </div>
  );
}

export default Scoreboard;