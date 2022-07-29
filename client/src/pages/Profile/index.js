import Leader from "../../components/Leader";
import Button from "../../components/Button";
import Logo from "../../components/Header/Logo";
import Auth from "../../utils/auth";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { useCurrentUser } from "../../utils/CurrentUserContext";

import './profile.css'


const Profile = () => {

  const { currentUser, fetchCurrentUser } = useCurrentUser()

  const getPagesPublished = () => {
    let pagesPublished = 0;
    for (let i = 0; i < currentUser.journals.length; i++) {
      pagesPublished = pagesPublished + currentUser.journals[i].pageCount;
    }
    return pagesPublished;
  }

  const logoutHandler = () => {
    Auth.logout();
  }
  
  return (
    <>
    <div className="profile-full-container">

      <Leader>
        <h3>Profile</h3>
        <p>0</p>
      </Leader>
      <div className="profile-list-container">
        <div className="profile-list-image">
          <img className="profile-img" src={currentUser ? currentUser.pfp : ""}alt="Profile Picture" />
        </div>
        <div className="profile-list">
          <Leader>
            <h3>Username</h3>
            <p>{currentUser ?currentUser.username : ""}</p>
          </Leader>
          <Leader>
            <h3>Email</h3>
            <p>{currentUser ? currentUser.email : ""}</p>
          </Leader>
          <Leader>
            <h3>Pages Published</h3>
            <p>{currentUser ? getPagesPublished() : ""}</p>
          </Leader>
          <Leader>
            <h3>Friends</h3>
            <p>{currentUser ? currentUser.friends.length : ""}</p>
          </Leader>
        </div>
      </div>
      <Leader>
        <h3>Journals</h3>
        <p>0</p>
      </Leader>
      <div className="profile-journal-container">
        {currentUser ? currentUser.journals.map((journal) => (
          <Link to={`/journal/${journal._id}`}>
            <div className="profile-journal-icons">
              <img src={journal.coverImage} alt="JournalImage" className="profile-img" />
            </div>
          </Link>
        )) : ""}
      </div>
      <div className="profile-button-container">
        <Button onClick={logoutHandler}>Logout</Button>
        <Link to="./update">
          <Button >Update Profile</Button>
        </Link>
      </div>
      <Leader>
        <p className="profile-footer">journ . al</p>
        <p className="profile-footer">v1.0</p>
      </Leader>
    </div>
    
    </>
  )
}

export default Profile;