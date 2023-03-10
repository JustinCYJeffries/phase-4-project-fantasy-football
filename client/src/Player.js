import React, { useState } from 'react';

const Player = ({ player, onDeleteClick, onMakeStarter, onBenchStarter }) => {
  const { name, position, nflteam, id, starter } = player;

  const [isStarter, setIsStarter] = useState(starter);

  const handleMakeStarterClick = () => {
    setIsStarter(true);
    onMakeStarter(id);
  };

  const handleRemoveStarterClick = () => {
    setIsStarter(false);
    onBenchStarter(id);
  };

  return (
    <div className="player">
      <p>{name} - {position} - {nflteam}{isStarter ? ' - Starter' : ''}</p>
      <button onClick={() => onDeleteClick(id)}>Remove From Team</button>
      {isStarter ? (
        <button onClick={handleRemoveStarterClick}>Remove Starter</button>
      ) : (
        <button onClick={handleMakeStarterClick}>Make Starter</button>
      )}
    </div>
  );
};

export default Player;