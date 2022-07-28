import React, { useState, useEffect } from 'react'; 
import Auth from '../../utils/auth';
import './header.css'
import Logo from './Logo'
import ProfilePicture from "./ProfilePicture"

const Header = () => {
  return (
    <>
      <header className='header-wrapper'>
        <Logo />
        <ProfilePicture />
      </header>
    </>
  )
}

export default Header;
