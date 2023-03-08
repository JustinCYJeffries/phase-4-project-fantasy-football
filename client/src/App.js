import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";

import Header from './Header';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';
import Sidebar from './Sidebar';
import TeamList from './TeamList';
import CreateTeamForm from './CreateTeamForm';
import SelectTeamForm from './SelectTeamForm';
import TeamRoster from './TeamRoster';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PlayerSearchForm from './PlayerSearchForm';
import PlayerSearchResult from './PlayerSearchResult';
import AddPlayerButton from './AddPlayerButton';
import ConfirmAddPlayerModal from './ConfirmAddPlayerModal';
import EditPlayerModal from './EditPlayerModal';
import MaxPlayersWarning from './MaxPlayersWarning';
import PlayerList from './PlayerList';
import Team from './Team';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [addingPlayer, setAddingPlayer] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [maxPlayersWarning, setMaxPlayersWarning] = useState(false);
  const [newName, setNewName] = useState("");
  const [showPlayerList, setShowPlayerList] = useState(false);
 
 
  useEffect(() => {
    // Fetch teams when the component mounts
    const fetchTeams = async () => {
      const response = await axios.get("http://localhost:3000/teams");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    // Fetch players for selected team when it changes
    const fetchPlayers = async () => {
      if (selectedTeam) {
        const response = await axios.get(`http://localhost:3000/teams/${selectedTeam.id}/players`);
        setPlayers(response.data);
      }
    };
    fetchPlayers();
  }, [selectedTeam]);

  useEffect(() => {
  const handleLoadAllPlayers = () => {
    axios
      .get("http://localhost:3000/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => console.log(error));
  };
  handleLoadAllPlayers()
}, []);


  const handleLogin = async (username, password) => {
    // Send login request to server
    const response = await axios.post("http://localhost:3000/login", { username, password });

    // Update current user state
    setCurrentUser(response.data);
  };

  const handleSignup = async (username, password) => {
    // Send signup request to server
    const response = await axios.post("http://localhost:3000/users", { username, password });

    // Update current user state
    setCurrentUser(response.data);
  };

  const handleCreateTeam = async (name, currentUser) => {
    // Send create team request to server
    console.log(currentUser)
    const response = await axios.post("http://localhost:3000/teams", { name, user_id: currentUser });
  
    // Update teams state
    setTeams([...teams, response.data]);
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const thisTeam = teamId.id
      await axios.delete(`http://localhost:3000/teams/${thisTeam}`);
      setTeams(teams.filter((team) => team.id !== thisTeam));
      setSelectedTeam(null);
      setPlayers([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTeam = async (teamId) => {
    // Send edit team request to server
    const response = await axios.patch(`http://localhost:3000/teams/${teamId.id}`, { team:{name: newName} });
    
    // Update teams state
    setTeams((prevTeams) => {
      const index = prevTeams.findIndex((team) => team.id === teamId.id);
      const updatedTeam = { ...prevTeams[index], name: response.data.name };
      return [...prevTeams.slice(0, index), updatedTeam, ...prevTeams.slice(index + 1)];
    });
  };
  
  
  const handleEditPlayer = async (updatedPlayer) => {
    try {
      const response = await axios.patch(`http://localhost:3000/players/${updatedPlayer.id}`, updatedPlayer);
      const updatedPlayers = players.map((player) =>
        player.id === response.data.id ? response.data : player
      );
      setPlayers(updatedPlayers);
      setEditingPlayer(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEditTeamName = (name) =>{
      setNewName(name)
  };

  const handleSelectTeam = (team) => {
    // Update selected team state
    setSelectedTeam(team);
  };

  const handleAddPlayer = () => {
    setShowPlayerList(true);
    
  };

  const handlePlayerSearch = async (query) => {
    // Send search request to server
    const response = await axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Players?key=f96ee404946b4896b5691149c6e8e1bc&position=${query}`);
    const playerList = response.data;
  
    // Filter players based on search query
    const filteredPlayers = playerList.filter((player) =>
      player.Name.toLowerCase().includes(query.toLowerCase())
    );
  
    // Update filtered players state
    setSearchResults(filteredPlayers);
  };
  


  const handleDeletePlayer = async (player) => {
    // Send delete player request to server
    await axios.delete(`http://localhost:3000/players/${player.id}`);

    // Remove player from players state
    setPlayers(players.filter((p) => p.id !== player.id));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element=
            {currentUser ? (
              <>
                <Sidebar teams={teams} setTeams={setTeams} selectedTeam={selectedTeam} handleNewTeam={handleCreateTeam} handleSelectTeam={handleSelectTeam}/>
                <main>
  <h1>My Teams</h1>
  <TeamList teams={teams}
            onSelectTeam={handleSelectTeam}
            onDeleteTeam={handleDeleteTeam}
            onEditTeam={handleEditTeam}
            onAddPlayer={handleAddPlayer} />
  <CreateTeamForm onCreateTeam={handleCreateTeam} currentUser={currentUser} onEditTeam={handleEditTeamName}/>
  {selectedTeam && (
    <>
      <h2>{selectedTeam.name}</h2>
      <SelectTeamForm teams={teams} onSelectTeam={handleSelectTeam} />
      <MaxPlayersWarning players={players} />
    </>
  )}
  {showPlayerList && (
    <div className="player-container">
      <PlayerSearchForm onPlayerSearch={handlePlayerSearch} />
      <PlayerSearchResult
        players={searchResults}
        onSelectPlayer={setAddingPlayer}
      />
    </div>
  )}
  <div className="team-container">
    {selectedTeam ? <Team team={selectedTeam} players={players} /> : null}
    {showPlayerList ? <PlayerList players={players} /> : null}
  </div>
</main>

                
              </>
              
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <a href='/signup'>Signup for a new account</a>
              </>
            )}/>
          <Route path="/signup" element={
            <SignupForm onSignup={handleSignup} />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;