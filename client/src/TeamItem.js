import React from 'react';
import PropTypes from 'prop-types';

const TeamItem = ({ team, onSelectTeam, onDeleteTeam, onEditTeam, onAddPlayer }) => {
  const handleSelectTeam = () => {
    onSelectTeam(team);
  };

  const handleDeleteTeam = () => {
    onDeleteTeam(team);
  };

  const handleEditTeam = () => {
    onEditTeam(team);
  };

  const handleAddPlayer = () => {
    onAddPlayer(team);
  };

  return (
    <div className="team-item">
      <div className="team-name" onClick={handleSelectTeam}>
        {team.name}
      </div>
      <div className="team-buttons">
        
        <button className="btn btn-default btn-sm" onClick={handleEditTeam}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDeleteTeam}>
          Delete
        </button>
      </div>
    </div>
  );
};

TeamItem.propTypes = {
  team: PropTypes.object.isRequired,
  onSelectTeam: PropTypes.func.isRequired,
  onDeleteTeam: PropTypes.func.isRequired,
  onEditTeam: PropTypes.func.isRequired
  
};

export default TeamItem;
