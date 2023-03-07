import React from 'react';
import TeamItem from './TeamItem';

function TeamList(props) {
    const { teams, onSelectTeam, onDeleteTeam, onEditTeam, onAddPlayer } = props;
  
    return (
      <div>
        <h3>My Teams</h3>
        <ul>
          {teams.map((team) => (
            <TeamItem
              key={team.id}
              team={team}
              onSelectTeam={onSelectTeam}
              onDeleteTeam={onDeleteTeam}
              onEditTeam={onEditTeam}
              onAddPlayer={onAddPlayer}
            />
          ))}
        </ul>
      </div>
    );
  }

export default TeamList;
