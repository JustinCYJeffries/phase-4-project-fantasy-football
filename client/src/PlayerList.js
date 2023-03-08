import { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get('http://localhost:3000/players');
      setPlayers(response.data);
    };

    fetchPlayers();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Players</h2>
      <input type="text" placeholder="Search Players" value={searchTerm} onChange={handleSearchTermChange} />
      <ul>
        {filteredPlayers.map((player) => (
          <li key={player.id}>{player.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
