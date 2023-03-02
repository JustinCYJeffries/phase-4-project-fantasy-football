import React, { useState } from 'react';

const CreateTeamForm = ({ onSubmit }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(teamName);
    setTeamName('');
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team Name:
        <input type="text" value={teamName} onChange={handleTeamNameChange} />
      </label>
      <button type="submit">Create Team</button>
    </form>
  );
};

export default CreateTeamForm;
