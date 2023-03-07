import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const EditPlayerModal = (props) => {
  const [playerName, setPlayerName] = useState(props.player.name);
  const [playerPosition, setPlayerPosition] = useState(props.player.position);

  const handleSave = () => {
    props.onSave({
      id: props.player.id,
      name: playerName,
      position: playerPosition,
    });
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <Modal show={props.show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="playerName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="playerPosition">
          <Form.Label>Position:</Form.Label>
          <Form.Control
            as="select"
            value={playerPosition}
            onChange={(e) => setPlayerPosition(e.target.value)}
          >
            <option value="QB">Quarterback</option>
            <option value="RB">Running Back</option>
            <option value="WR">Wide Receiver</option>
            <option value="TE">Tight End</option>
            <option value="K">Kicker</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditPlayerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditPlayerModal;