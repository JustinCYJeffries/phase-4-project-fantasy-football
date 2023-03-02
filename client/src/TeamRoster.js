import React from 'react';
import Player from './Player';

const TeamRoster = ({ players, onEditPlayer, onDeletePlayer }) => {
  return (
    <div>
      <h2>Team Roster</h2>
      <ul>
        {players.map(player => (
          <Player 
            key={player.id} 
            player={player} 
            onEditPlayer={onEditPlayer} 
            onDeletePlayer={onDeletePlayer} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TeamRoster;