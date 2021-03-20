import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null),
    [accessToken, setAccessToken] = useState(null),
    [refreshToken, setRefreshToken] = useState(null);
  
  const getUser = () => {
    axios
      .get('https://api.planningcenteronline.com/people/v2/me', {
      headers: { Authorization: 'Bearer ' + accessToken }
      })
      .then(res => {
        console.log('user data', res.data)
        setUser(res.data)
      })
      .catch(err => console.log(err))
  };

  const getTokens = () => {
    axios
      .get('/api/tokens')
      .then(res => {
        console.log('tokens', res.data)
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
      })
  };

  useEffect(() => {
    if(!accessToken && !refreshToken){
      getTokens()
    }
  }, [])

  console.log('state user', user);
  return (
    <section className="App">
      <a href='http://localhost:7777/auth/login'>Login with PCO</a>
      <button onClick={ getUser }>Get User</button>
    </section>
  );
}

export default App;
