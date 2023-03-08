import { useState } from 'react';
import PlayerSearchForm from './PlayerSearchForm';
import PlayerSearchResult from './PlayerSearchResult';
import MaxPlayersWarning from './MaxPlayersWarning';

const CreateTeamForm = ({ onCreateTeam, currentUser, allPlayers, onEditTeam, selectedTeam }) => {
  const [name, setName] = useState('');
  const [roster, setRoster] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [positionFilter, setPositionFilter] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    onEditTeam(name)
    console.log(name)
  };

  const handleSelectPlayer = (player) => {
    if (roster.length >= 15) {
      setMaxPlayers(true);
      return;
    }

    setRoster([...roster, player]);
  };

  const handleRemovePlayer = (playerToRemove) => {
    setRoster(roster.filter((player) => player !== playerToRemove));
    setMaxPlayers(false);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results.filter((player) => !roster.includes(player)));
  };

  const handlePositionFilter = (event) => {
    setPositionFilter(event.target.value);
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
    <form onSubmit={handleSubmit}>
      <h2>Create a new team</h2>
      <label>
        Team name:
        <input type="text" value={name} onChange={handleNameChange} required ></input>
      </label>
      <PlayerSearchForm allPlayers={allPlayers} onSearchResults={handleSearchResults} onPositionFilter={handlePositionFilter} />
      <PlayerSearchResult results={searchResults} onSelectPlayer={handleSelectPlayer} positionFilter={positionFilter} />
      {maxPlayers && <MaxPlayersWarning />}
      {roster.length > 0 && (
        <>
          <h3>Selected players:</h3>
          <ul>
            {roster.map((player) => (
              <li key={player.id}>
                {player.first_name} {player.last_name} ({player.position})
                <button type="button" onClick={() => handleRemovePlayer(player)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button type="submit">Create Team</button>
    </form>
  );
};

export default CreateTeamForm;
