import React, { useState, useEffect } from 'react'; 
import Auth from '../../utils/auth';

const Header = () => {
  return (
    <>
      <header>
        <div className="header-logo">
          <img src="./img/site-logo.jpg" alt="Journ.al Logo" className='header-img'/>
        </div>
        <nav>
          <div className="nav-item">
            {/* <NewBtn /> */}
          </div>
          <div className="nav-item">
            {/* <LoginBtn /> */}
          </div>
          <div className="nav-item">
            {/* <ProfileIcon /> */}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header;
