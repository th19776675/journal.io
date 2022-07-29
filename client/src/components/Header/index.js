import React, { useState, useEffect } from 'react'; 
import Auth from '../../utils/auth';
import './header.css'
import Logo from './Logo'
import ProfilePicture from "./ProfilePicture"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className='header-wrapper'>
        <Link to=""><Logo /></Link>
        <ProfilePicture />
      </header>
    </>
  )
}

export default Header;
