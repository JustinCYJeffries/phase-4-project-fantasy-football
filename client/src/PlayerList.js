import { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList({onAddClick, players, onSelectedPlayer}) {
  
 





  return (
    <div>
      <h2>All Players</h2>
     
      <ul>
        {players.map((player) => (
            
          <li  key={player.id}><span onClick={()=>onSelectedPlayer(player)}>{player.name} {player.position}  </span><button onClick={() => onAddClick(player)}>Add Player</button></li>
          
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
