import { useState, useEffect } from 'react'
import {AuthService} from 'auth-oidc';

const authService = new AuthService({
  authority: 'https://accounts.universitywithme.org.ua/realms/KhPI',
  clientId: 'student-lab',
});

function App() {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async() => {
      const loggedIn = await authService.isLoggedIn();
      setIsAuthenticated(loggedIn);

      if (loggedIn) {
        const token = await authService.getToken();
        const name = await authService.getUserInfo('name');
        
        setToken(token);
        setUserName(name);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    authService.login();
  }

  const handleLogout = () => {
    authService.logout();
  }

  return (
    <>
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <h1>Hello, {userName}</h1>
          <p>Token:{token}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
    </>
  );
}

export default App
