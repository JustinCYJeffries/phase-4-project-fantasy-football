import React from 'react';

const PlayerSearchResult = ({ players, onAddClick }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {players && players.map((player) => (
          <li key={player.PlayerID}>
            {player.FirstName} {player.LastName} ({player.Position})
            <button onClick={() => onAddClick(player)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerSearchResult;
