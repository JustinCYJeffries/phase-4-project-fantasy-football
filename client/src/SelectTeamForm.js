import { useState, useEffect } from 'react';

function SelectTeamForm({ onSelectTeam }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/teams') // make a GET request to the server to retrieve all the teams
      .then(res => res.json()) // parse the response as JSON
      .then(data => setTeams(data)); // update the state with the retrieved teams
  }, []);

  function handleSelectTeam(team) {
    onSelectTeam(team); // invoke the callback function passed as props
  }

  return (
    <div>
      <h2>Select a Team:</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <button onClick={() => handleSelectTeam(team)}>{team.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectTeamForm;
