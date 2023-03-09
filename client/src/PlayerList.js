import { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList({onAddClick}) {
  const [players, setPlayers] = useState([]);
 

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get('http://localhost:3000/players');
      setPlayers(response.data);
    };

    fetchPlayers();
  }, []);




  return (
    <div>
      <h2>All Players</h2>
     
      <ul>
        {players.map((player) => (
            
          <li key={player.id}>{player.name} {player.position}  <button onClick={() => onAddClick(player)}>Add Player</button></li>
          
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
