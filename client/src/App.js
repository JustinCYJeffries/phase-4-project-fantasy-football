import './App.css';
import React, {useEffect, useState} from "react"
import Login from './Login'
import TeamsPage from './TeamsPage'
import SignUp from './SignUp'

function App() {
  const [team, setTeam] = useState([])
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    fetch("http://localhost:3000/team")
      .then((r) => r.json())
      .then(setTeam);
  }, []);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (user) {
    return <div><h2>Welcome, {user.username}!</h2><TeamsPage setTeam={setTeam} team={team}/></div> ;
  } else {
    return <div>
    <table>
      <tr>
        <td width='50%'>
          <h2>Create a User</h2>
          <SignUp/>
          </td>
          <td>
            <h2>Login</h2><Login onLogin={setUser} />
          </td>
          </tr></table>
          
    
    </div>
  }
}


export default App;