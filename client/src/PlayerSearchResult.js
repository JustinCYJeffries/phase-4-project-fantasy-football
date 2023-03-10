import React from 'react';

const PlayerSearchResult = ({ players, onAddClick, onSelectedPlayer }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {players && players.map((player) => (
          <li key={player.id} ><span onClick={()=>onSelectedPlayer(player)}>
            {player.name}  ({player.position})</span>
            <button onClick={() => onAddClick(player)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerSearchResult;
