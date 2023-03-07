import React from 'react';

const PlayerSearchResult = ({ players, onAddPlayer }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {players && players.map((player) => (
          <li key={player.PlayerID}>
            {player.FirstName} {player.LastName} ({player.Position})
            <button onClick={() => onAddPlayer(player)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerSearchResult;
