import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';





import TeamList from './TeamList';
import LoginForm from './LoginForm';
import Logout from './Logout';
import SignupForm from './SignupForm';
import PlayerSearchForm from './PlayerSearchForm';
import PlayerSearchResult from './PlayerSearchResult';
import PlayerList from './PlayerList';
import Team from './Team';
import CreatePlayerForm from './CreatePlayerForm';
import ErrorMessage from './ErrorMessage';
import PlayerCard from './PlayerCard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null)
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
  }, [currentUser]);

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
        setTotalPlayers(response.data);
      })
      .catch((error) => console.log(error));
  };
  handleLoadAllPlayers()
}, []);


  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/sessions", { username, password });
      setError(null);
      Cookies.set("user", response.data,  { sameSite: 'none', secure: true })
      setCurrentUser(response.data);
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  };

  const handleLogout = async () => {
    // Send login request to server
    const response = await axios.delete("http://localhost:3000/sessions", { withCredentials: true });
    // Update current user state
    Cookies.remove("user",  { sameSite: 'none', secure: true })
    setCurrentUser(null);
    setTeams([])
    navigate("/");
  };

  const handleSignup = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users", { username, password });
      setError(null);
      Cookies.set("user", response.data,  { sameSite: 'none', secure: true })
      setCurrentUser(response.data);
      navigate("/");
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
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

  const handleEditTeam = async (teamId, thisName ) => {

    // Send edit team request to server
    const response = await axios.patch(`http://localhost:3000/teams/${teamId}`, { team:{name: thisName} });

    // Update teams state
    setTeams((prevTeams) => {
      const index = prevTeams.findIndex((team) => team.id === teamId);
      const updatedTeam = { ...prevTeams[index], name: response.data.name };
      return [...prevTeams.slice(0, index), updatedTeam, ...prevTeams.slice(index + 1)];
    });
    setSelectedTeam(null)
  };





  const handleEditTeamName = (name) =>{
      setNewName(name)
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };
  const handleSelectPlayer = async (player) => {
    const playerID = player.player_api_key
    const response = await axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/Player/${playerID}?key=f96ee404946b4896b5691149c6e8e1bc`, {
  withCredentials: false
});

    const playerInfo = response.data;
    setSelectedPlayer(playerInfo)
    console.log(playerInfo)
    
  };

  const handleShowPlayerList = ()=> {
    setShowPlayerList(true);
    setShowResults(false)
  }

  const handleDismiss = ()=> {
    setError(null)
  }
  const handleClose = ()=> {
    setSelectedPlayer(null)
  }

  const handleAddPlayer = async (player) => {
    try {
      const response = await axios.post(`http://localhost:3000/teams/${selectedTeam.id}/player_teams`, {player_id: player.id});
      setError(null);
      setPlayers(response.data);
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  };

  const handleNewPlayer = async (player) => {
    const response = await axios.post("http://localhost:3000/players", { player:{name: player.name, position: player.position, nflteam: player.team }});
   setTotalPlayers([...totalPlayers, response.data]);
    console.log(totalPlayers)

  };

  const handlePlayerSearch = async (term, position) => {
    // Send search request to server
    const response = await axios.get(`http://localhost:3000/players?term=${term}&position=${position}`);
    const playerList = response.data;

    // Filter players based on search query


    // Update filtered players state
    setSearchResults(playerList);
    setShowResults(true)
  };



  const handleDeletePlayer = async (player_id, team_id) => {
    // Send delete player request to server
    await axios.delete(`http://localhost:3000/teams/${team_id}/player_teams/${player_id}`);

    // Remove player from players state
    setPlayers(players.filter((p) => p.id !== player_id));
  };

  const handleMakeStarter = async (player_id, team_id) => {
    await axios.patch(`http://localhost:3000/teams/${team_id}/player_teams/${player_id}`, {starter: 1});
  };
  const handleBenchStarter = async (player_id, team_id) => {
    await axios.patch(`http://localhost:3000/teams/${team_id}/player_teams/${player_id}`, {starter: 0});
  };

  return (
    <div className="App">
      <h2>Fantasy Football Team Builder</h2>
        {error ? <ErrorMessage message={error} handleDismiss={handleDismiss} /> : null}
        {selectedPlayer ? <PlayerCard selectedPlayer={selectedPlayer} handleClose={handleClose}/> : null}
        <Routes>
          <Route exact path="/logout" element= {<Logout onLogout={handleLogout} />}/>
          <Route exact path="/" element=
            {currentUser ? (
              <>
               <a href='/logout'>Logout</a>

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
    {selectedTeam ? <Team team={selectedTeam} onSelectedPlayer={handleSelectPlayer} players={players} onRemovePlayerFromTeam={handleDeletePlayer} onMakeTeamStarter={handleMakeStarter} onEditTeam={handleEditTeam} onBenchTeamStarter={handleBenchStarter}/> : null}

  </div>
  </div>
<div className='column2'>
  {showPlayerList && (
    <div className="player-container">
      <PlayerSearchForm onPlayerSearch={handlePlayerSearch} />
      {showResults ?  <PlayerSearchResult onSelectedPlayer={handleSelectPlayer} players={searchResults} onAddClick={handleAddPlayer} /> : <PlayerList players={totalPlayers} onSelectedPlayer={handleSelectPlayer} onAddClick={handleAddPlayer}/> }

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
