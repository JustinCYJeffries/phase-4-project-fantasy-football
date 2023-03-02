import React from 'react';

const PlayerSearchResult = ({ player, handleAddPlayer }) => {
  return (
    <div>
      <h4>{player.name}</h4>
      <p>{player.position}</p>
      <button onClick={() => handleAddPlayer(player)}>Add to Team</button>
    </div>
  );
};

export default PlayerSearchResult;