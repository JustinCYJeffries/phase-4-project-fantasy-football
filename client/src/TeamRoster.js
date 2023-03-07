import React from 'react';
import Player from './Player';

const TeamRoster = ({ players, onRemovePlayer, onEditPlayer }) => {
  return (
    <div>
      <h3>Roster</h3>
      {players.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <Player key={player.id} player={player} onRemovePlayer={onRemovePlayer} onEditPlayer={onEditPlayer} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players on roster.</p>
      )}
    </div>
  );
};

export default TeamRoster;
