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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch teams when the component mounts
    const fetchTeams = async () => {
      const response = await axios.get("/api/teams");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    // Fetch players for selected team when it changes
    const fetchPlayers = async () => {
      if (selectedTeam) {
        const response = await axios.get(`/api/teams/${selectedTeam.id}/players`);
        setPlayers(response.data);
      }
    };
    fetchPlayers();
  }, [selectedTeam]);

  const handleLogin = async (username, password) => {
    // Send login request to server
    const response = await axios.post("/api/auth/login", { username, password });

    // Update current user state
    setCurrentUser(response.data);
  };

  const handleSignup = async (username, password, email) => {
    // Send signup request to server
    const response = await axios.post("/api/users", { username, password, email });

    // Update current user state
    setCurrentUser(response.data);
  };

  const handleCreateTeam = async (name) => {
    // Send create team request to server
    const response = await axios.post("/api/teams", { name });

    // Update teams state
    setTeams([...teams, response.data]);
  };

  const handleSelectTeam = (team) => {
    // Update selected team state
    setSelectedTeam(team);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/">
            {currentUser ? (
              <>
                <Sidebar />
                <main>
                  <h1>My Teams</h1>
                  <TeamList teams={teams} onSelectTeam={handleSelectTeam} />
                  <CreateTeamForm onCreateTeam={handleCreateTeam} />
                  {selectedTeam && (
                    <>
                      <h2>{selectedTeam.name}</h2>
                      <SelectTeamForm team={selectedTeam} />
                      <TeamRoster players={players} />
                    </>
                  )}
                </main>
              </>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/signup">
            <SignupForm onSignup={handleSignup} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;