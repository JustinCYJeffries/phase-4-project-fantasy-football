import React from 'react';

const TeamItem = ({ team, onSelectTeam }) => {
  const handleSelectTeam = () => {
    onSelectTeam(team);
  };

  return (
    <div className="team-item" onClick={handleSelectTeam}>
      <h3>{team.name}</h3>
      <p>{team.description}</p>
      <p>Players: {team.players.length}</p>
    </div>
  );
};

export default TeamItem;
