import React from 'react';

const Player = ({ player,  onDeleteClick }) => {
  const { name, position, team, id } = player;

  return (
    <div className="player">
      <p>{name} - {position} - {team}</p>
      <button onClick={() => onDeleteClick(id)}>Remove From Team</button>
    </div>
  );
};

export default Player;
