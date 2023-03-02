import { useState } from "react";

function ConfirmAddPlayerModal({ player, onAddPlayer }) {
  const [showModal, setShowModal] = useState(false);

  function handleAddPlayer() {
    onAddPlayer(player);
    setShowModal(false);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add to Roster</button>
      {showModal && (
        <div>
          <p>Are you sure you want to add {player.name} to your roster?</p>
          <button onClick={handleAddPlayer}>Add Player</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default ConfirmAddPlayerModal