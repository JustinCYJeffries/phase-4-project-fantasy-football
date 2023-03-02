import React from 'react';

const Player = ({ player, onEditClick, onDeleteClick }) => {
  const { name, position, team, id } = player;

  return (
    <div className="player">
      <p>{name} - {position} - {team}</p>
      <button onClick={() => onEditClick(player)}>Edit</button>
      <button onClick={() => onDeleteClick(id)}>Delete</button>
    </div>
  );
};

export default Player;
