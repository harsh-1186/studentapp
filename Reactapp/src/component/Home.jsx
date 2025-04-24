import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/registration">Registrattion</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/logout">Logout</Link></li> */}
        </ul>
      </nav>
      <Outlet /> 
    </div>
  );
}

export default Home;
