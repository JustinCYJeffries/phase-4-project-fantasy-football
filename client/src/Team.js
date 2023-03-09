import React from 'react';
import Player from './Player';
import { useState } from 'react';

function Team({ team, players, onRemovePlayerFromTeam, onEditTeam }) {
  const [name, setName] = useState(team.name);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    
    
  };

  const handleSubmit = () => {
   
    onEditTeam(team.id, name);
    console.log(name, team.id)
  };


  const handleRemovePlayer = (playerId) => {
    onRemovePlayerFromTeam(playerId, team.id);
  };

  return (
    <div className="team">
      <h2>{team.name}</h2>
      <form>
        <input type="text" value={name} onChange={handleNameChange} required />
      </form>
      <button type="submit" onClick={handleSubmit}>Edit Team Name</button>
      <ul className="team-players">
        {players.map((player) => (
          <Player
            key={`${player.id}${team.id}`}
            player={player}
            onDeleteClick={() => handleRemovePlayer(player.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Team;
