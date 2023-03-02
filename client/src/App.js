import { useState, useEffect } from 'react';
import { Switch, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';
import Sidebar from './Sidebar';
import TeamList from './TeamList';
import CreateTeamForm from './CreateTeamForm';
import SelectTeamForm from './SelectTeamForm';

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // fetch user data from API and set to state
    fetch('/api/users/current')
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.error(error));

    // fetch team data from API and set to state
    fetch('/api/teams')
      .then((response) => response.json())
      .then((data) => setTeams(data.teams))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateTeam = (newTeam) => {
    // send POST request to API to create new team
    fetch('/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTeam),
    })
      .then((response) => response.json())
      .then((data) => setTeams([...teams, data.team]))
      .catch((error) => console.error(error));
  };

  const handleSelectTeam = (selectedTeam) => {
    // set selected team to state
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login">
          <Auth />
        </Route>
        <PrivateRoute path="/">
          <div className="container">
            <div className="row">
              <Sidebar user={user} />
              <div className="col-md-8">
                <Routes>
                  <Route path="/" exact>
                    <TeamList teams={teams} />
                  </Route>
                  <Route path="/create-team">
                    <CreateTeamForm onCreateTeam={handleCreateTeam} />
                  </Route>
                  <Route path="/select-team">
                    <SelectTeamForm teams={teams} onSelectTeam={handleSelectTeam} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </PrivateRoute>
      </Routes>
    </div>
  );
}

export default App;