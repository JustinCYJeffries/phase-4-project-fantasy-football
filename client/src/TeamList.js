
import React from 'react';

function TeamList({ teams, onSelectTeam }) {
  return (
    <div className="team-list">
      <h2>Your Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id} onClick={() => onSelectTeam(team)}>
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;