import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/src/collapse';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from 'util/history';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

const Navbar = () => {
  const {authContextData, setAuthContextData} = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: isAuthenticated(),
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        <div className='nav-login-logout'>
          {authContextData.authenticated ? (
              <button className='navbar-logout-button' type='button' onClick={handleLogoutClick}>
                SAIR
              </button>
          ) : (
            <></>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
