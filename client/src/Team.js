import React from 'react';
import Player from './Player';

function Team({ team, players, onAddPlayerToTeam, onRemovePlayerFromTeam }) {
  

  const handleAddPlayer = (playerId) => {
    onAddPlayerToTeam(playerId, team.id);
  }

  const handleRemovePlayer = (playerId) => {
    onRemovePlayerFromTeam(playerId, team.id);
  }

  return (
    <div className="team">
      <h2>{team.name}</h2>
      <ul className="team-players">
        {players.map(player => (
          <Player
            key={`${player.id}${team.id}`}
            player={player}
            onRemovePlayer={() => handleRemovePlayer(player.id)}
          />
        ))}
      </ul>
      <select onChange={(e) => handleAddPlayer(e.target.value)}>
        <option value="">Select a player to add</option>
        {players.filter(player => player.team_id === null).map(player => (
          <option key={player.id} value={player.id}>{player.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Team;
