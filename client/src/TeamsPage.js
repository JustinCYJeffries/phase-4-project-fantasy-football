import './App.css';
import React, {useEffect, useState} from "react"
import CreateTeamForm from './CreateTeamForm'


function TeamsPage() {
    const handleCreateTeam = (teamName) => {
      function createTeam(teamData) {
        fetch('http://localhost:3000/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(teamData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to create team');
            }
            return response.json();
          })
          .then(data => {
            console.log('Team created successfully', data);
            // Do something with the newly created team data
          })
          .catch(error => {
            console.error('Error creating team', error);
            // Handle the error appropriately
          });
      }
      
      console.log(`Creating team with name "${teamName}"`);
    };
  
    return (
      <div>
        <h1>Teams</h1>
        <CreateTeamForm onCreateTeam={handleCreateTeam} />
        {/* Here you can display the list of teams */}
      </div>
    );
  }
  
export default TeamsPage