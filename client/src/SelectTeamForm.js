import { useState } from 'react';

const SelectTeamForm = ({ teams, onSelectTeam }) => {
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const handleChange = (event) => {
    setSelectedTeamId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedTeam = teams.find((team) => team.id === selectedTeamId);
    if (selectedTeam) {
      onSelectTeam(selectedTeam);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="team-select">Select a team:</label>
      <select id="team-select" value={selectedTeamId} onChange={handleChange}>
        <option value="">Choose a team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <button type="submit">Select</button>
    </form>
  );
};

export default SelectTeamForm;
