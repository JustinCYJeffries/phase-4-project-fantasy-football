import React from 'react';

const AddPlayerButton = ({ player, onAddPlayer }) => {

  const handleAddPlayer = () => {
    onAddPlayer(player);
  }

  return (
    <button onClick={handleAddPlayer}>
      Add {player.Name} ({player.Position})
    </button>
  );
}

export default AddPlayerButton;
