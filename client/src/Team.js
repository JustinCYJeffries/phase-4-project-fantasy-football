import React from 'react';
import Player from './Player';
import { useState, useEffect } from 'react';

function Team({ team, players, onRemovePlayerFromTeam, onEditTeam, onMakeTeamStarter, onBenchTeamStarter, onSelectedPlayer }) {
  const [name, setName] = useState(team.name);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    
    
  };

  useEffect(() => {
    setName(team.name);
  }, [team]);

  const handleSubmit = () => {
   
    onEditTeam(team.id, name);
    console.log(name, team.id)
  };
  const handleMakeStarter = (playerId) => {
   
    onMakeTeamStarter(playerId, team.id);
  };
  const handleBenchStarter = (playerId) => {
   
    onBenchTeamStarter(playerId, team.id);
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
            onMakeStarter={()=> handleMakeStarter(player.id) }
            onBenchStarter={()=> handleBenchStarter(player.id) }
            onSelectedPlayer={onSelectedPlayer}
          />
        ))}
      </ul>
    </div>
  );
}

export default Team;
