import React, { useState } from 'react';

function AddPlayerForm({onCreateNewPlayer}) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('QB');
  const [team, setTeam] = useState('ARI');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that name and position are filled in
    if (name.trim() === '' || position.trim() === '') {
      alert('Please enter a name and position for the player.');
      return;
    }

    // Create a new player object
    const newPlayer = {
      name,
      position,
      team,
    };

   
   onCreateNewPlayer(newPlayer)

    // Clear the form
    setName('');
    setPosition('QB');
    setTeam('ARI');
  };

  return (<div className='create-player-form'>
    <h3>Create A New Player</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Player name:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <br />
      <label>
        Position:
        <select value={position} onChange={handlePositionChange}>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
        </select>
      </label>
      <br />
      <label>
        NFL team:
        <select value={team} onChange={handleTeamChange}>
          <option value="ARI">ARI</option>
          <option value="ATL">ATL</option>
          <option value="BAL">BAL</option>
          <option value="BUF">BUF</option>
          <option value="CAR">CAR</option>
          <option value="CHI">CHI</option>
          <option value="CIN">CIN</option>
          <option value="CLE">CLE</option>
          <option value="DAL">DAL</option>
          <option value="DEN">DEN</option>
          <option value="DET">DET</option>
          <option value="GB">GB</option>
          <option value="HOU">HOU</option>
          <option value="IND">IND</option>
          <option value="JAX">JAX</option>
          <option value="KC">KC</option>
          <option value="LAC">LAC</option>
          <option value="LAR">LAR</option>
          <option value="LV">LV</option>
          <option value="MIA">MIA</option>
          <option value="MIN">MIN</option>
          <option value="NE">NE</option>
          <option value="NO">NO</option>
          <option value="NYG">NYG</option>
          <option value="NYJ">NYJ</option>
          <option value="PHI">PHI</option>
          <option value="PIT">PIT</option>
          <option value="SEA">SEA</option>
          <option value="SF">SF</option>
          <option value="TB">TB</option>
          <option value="TEN">TEN</option>
          <option value="WAS">WAS</option>
    </select>
  </label>
      <br />
      <button type="submit">Add player</button>
    </form>
    </div>
  );
}

export default AddPlayerForm;
