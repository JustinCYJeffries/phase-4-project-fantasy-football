import { useState } from 'react';

const ConfirmAddPlayerModal = ({ player, onConfirm, onCancel }) => {
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleConfirm = () => {
    if (!position) {
      setError('Please select a position');
      return;
    }

    onConfirm({ ...player, position });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="modal">
      <h2>Add Player</h2>
      <div className="modal-content">
        <p>Are you sure you want to add {player.Name} to your team?</p>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <select id="position" value={position} onChange={handlePositionChange}>
            <option value="">Choose a position</option>
            <option value="QB">Quarterback</option>
            <option value="RB">Running Back</option>
            <option value="WR">Wide Receiver</option>
            <option value="TE">Tight End</option>
            <option value="K">Kicker</option>
            <option value="DEF">Defense</option>
          </select>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      <div className="modal-buttons">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleConfirm}>Add</button>
      </div>
    </div>
  );
};

export default ConfirmAddPlayerModal;
