import React from 'react';

const Sidebar = ({ teams, selectedTeam, handleSelectTeam, handleNewTeam }) => {
  return (
    <div className="sidebar">
      <h2>My Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id} onClick={() => handleSelectTeam(team)}>
            {team.name} {selectedTeam && selectedTeam.id === team.id && '(Selected)'}
          </li>
        ))}
      </ul>
      <button onClick={handleNewTeam}>Create New Team</button>
    </div>
  );
};

export default Sidebar;