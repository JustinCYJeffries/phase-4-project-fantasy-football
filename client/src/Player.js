import React from 'react';

const Player = ({ player,  onDeleteClick, onMakeStarter }) => {
  const { name, position, team, id } = player;

  return (
    <div className="player">
      <p>{name} - {position} - {team}</p>
      <button onClick={() => onDeleteClick(id)}>Remove From Team</button>
      <button onClick={() => onMakeStarter(id)}>Make Starter</button>
    </div>
  );
};

export default Player;
