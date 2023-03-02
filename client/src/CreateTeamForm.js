import { useState } from 'react';

function CreateTeamForm({ onCreateTeam }) {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateTeam(teamName);
    setTeamName('');
  };

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team name:
        <input type="text" value={teamName} onChange={handleChange} />
      </label>
      <button type="submit">Create team</button>
    </form>
  );
}
export default CreateTeamForm