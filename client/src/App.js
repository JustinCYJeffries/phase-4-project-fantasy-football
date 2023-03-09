import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';

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
import CreatePlayerForm from './CreatePlayerForm';

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
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(() => {
    // Check for session token cookie on page load
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setCurrentUser(userCookie);
    }
  }, []);

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
  }, [selectedTeam ]);

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
    const response = await axios.post("http://localhost:3000/sessions", { username, password });

    // Update current user state
    Cookies.set("user", response.data)
    setCurrentUser(response.data);
  };

  const handleSignup = async (username, password) => {
    // Send signup request to server
    const response = await axios.post("http://localhost:3000/users", { username, password });

    // Update current user state
    setCurrentUser(response.data);
    navigate("/");
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

  const handleShowPlayerList = ()=> {
    setShowPlayerList(true);
  }

  const handleAddPlayer = async (player) => {
    
    const response = await axios.post(`http://localhost:3000/teams/${selectedTeam.id}/player_teams`, {player_id: player.id});
    setPlayers(response.data);
  };

  const handleNewPlayer = async (player) => {
    const response = await axios.post("http://localhost:3000/players", { player:{name: player.name, position: player.position, nflteam: player.team }});
 
  setPlayers([...players, response.data]);


  };

  const handlePlayerSearch = async (query) => {
    // Send search request to server
    const response = await axios.get(`http://localhost:3000/players=${query}`);
    const playerList = response.data;

    // Filter players based on search query
    const filteredPlayers = playerList.filter((player) =>
      player.Name.toLowerCase().includes(query.toLowerCase())
    );

    // Update filtered players state
    setSearchResults(filteredPlayers);
  };



  const handleDeletePlayer = async (player_id, team_id) => {
    // Send delete player request to server
    await axios.delete(`http://localhost:3000/teams/${team_id}/player_teams/${player_id}`);

    // Remove player from players state
    setPlayers(players.filter((p) => p.id !== player_id));
  };

  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element=
            {currentUser ? (
              <>


                <div className="columns-container">
                  <div className='column1'>
  <h1>My Teams</h1>
  <TeamList teams={teams}
            onSelectTeam={handleSelectTeam}
            onDeleteTeam={handleDeleteTeam}

            onAddPlayer={handleShowPlayerList}
            selectedTeam={selectedTeam} onCreateTeam={handleCreateTeam} currentUser={currentUser} onEditTeam={handleEditTeamName} />



</div>
<div className='column3'>
  <div className="team-container">
    {selectedTeam ? <Team team={selectedTeam} players={players} onRemovePlayerFromTeam={handleDeletePlayer} /> : null}

  </div>
  </div>
<div className='column2'>
  {showPlayerList && (
    <div className="player-container">
      <PlayerSearchForm onPlayerSearch={handlePlayerSearch} />
      {searchResults ? <PlayerList players={players} onAddClick={handleAddPlayer}/> : <PlayerSearchResult players={searchResults} onAddClick={handleAddPlayer} />}

    </div>
  )}
  </div>
  <div className='column2'>
    <CreatePlayerForm onCreateNewPlayer={handleNewPlayer} />
  </div>

  </div>



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
    </div>
  );
}

export default App;
