import { useState, useEffect } from 'react';

const SelectTeamForm = (props) => {
    const { teams, onSelectTeam } = props;



  function handleSelectTeam(team) {
    onSelectTeam(team); // invoke the callback function passed as props
  }

  return (
    <div>
      <h3>Select a team:</h3>
      <select onChange={handleSelectTeam}>
        <option value="">Choose a team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTeamForm;
