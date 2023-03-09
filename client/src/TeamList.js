import React from 'react';
import TeamItem from './TeamItem';
import { useState } from 'react';

function TeamList(props) {
    const { teams, onSelectTeam, onDeleteTeam, onEditTeam, onAddPlayer, onCreateTeam, currentUser } = props;
    const [name, setName] = useState('');
    const [roster, setRoster] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
        onEditTeam(name)
        console.log(name)
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await onCreateTeam(name, currentUser.id, roster.map((player) => player.id));
        if (response.status === 201) {
          setName('');
          setRoster([]);
        }
      };
  

      
    return (
      <div>
        <ul>
          {teams.map((team) => (
            <TeamItem
              key={team.id}
              team={team}
              onSelectTeam={onSelectTeam}
              onDeleteTeam={onDeleteTeam}
              onEditTeam={onEditTeam}
            
            />
          ))}
        </ul>
        <button className="btn btn-default btn-sm" onClick={onAddPlayer}>
          Add Players
        </button>
        <form onSubmit={handleSubmit}>
      <h2>Create a new team</h2>
      <label>
        Team name:
        <input type="text" value={name} onChange={handleNameChange} required ></input>
      </label>
      <button type="submit">Create Team</button>
    </form>
      </div>
    );
  }

export default TeamList;
