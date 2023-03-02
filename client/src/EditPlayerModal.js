import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditPlayerModal(props) {
  const [playerName, setPlayerName] = useState(props.player.name);
  const [playerPosition, setPlayerPosition] = useState(props.player.position);

  const handleSave = () => {
    // Send an API request to update the player
    // with new name and position

    // Close the modal
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPlayerName">
            <Form.Label>Player Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPlayerPosition">
            <Form.Label>Player Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter player position"
              value={playerPosition}
              onChange={(event) => setPlayerPosition(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPlayerModal;
