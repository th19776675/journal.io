import Leader from "../../components/Leader";
import Button from "../../components/Button";
import Logo from "../../components/Header/Logo";
import Auth from "../../utils/auth";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../utils/CurrentUserContext";
import { getUser, addFriend } from "../../utils/API";

import './user-profile.css'


const UserProfile = () => {
  const {username} = useParams()
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    try {
      const response = await getUser(username)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
      setUserData(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserData()
  },[])

  const addFriendHandler = async () => {
    try {
      const token = Auth.getToken();
      const response = await addFriend(token, username)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      alert("Added a friend!")
    } catch (e) {
    alert(e)
    }
  }

  const getPagesPublished = () => {
    let pagesPublished = 0;
    for (let i = 0; i < userData.journals.length; i++) {
      pagesPublished = pagesPublished + userData.journals[i].pageCount;
    }
    return pagesPublished;
  }

  
  return (
    <>
    <div className="user-profile-full-container">

      <Leader>
        <h3>Profile</h3>
        <p>0</p>
      </Leader>
      <div className="user-profile-list-container">
        <div className="user-profile-list-image">
          <img className="user-profile-img" src={userData ? userData.pfp : ""}alt="Profile Picture" />
        </div>
        <div className="user-profile-list">
          <Leader>
            <h3>Username</h3>
            <p>{userData ?userData.username : ""}</p>
          </Leader>
          <Leader>
            <h3>Email</h3>
            <p>{userData ? userData.email : ""}</p>
          </Leader>
          <Leader>
            <h3>Pages Published</h3>
            <p>{userData ? getPagesPublished() : ""}</p>
          </Leader>
          <Leader>
            <h3>Friends</h3>
            <p>{userData ? userData.friends.length : ""}</p>
          </Leader>
        </div>
      </div>
      <Leader>
        <h3>Journals</h3>
        <p>{userData ? userData.journals.length : ""}</p>
      </Leader>
      <div className="user-profile-journal-container">
        {userData ? userData.journals.map((journal) => (
          <Link to={`/journal/${journal._id}`}>
            <div className="user-profile-journal-icons">
              <img src={journal.coverImage} alt="JournalImage" className="user-profile-img" />
            </div>
          </Link>
        )) : ""}
      </div>
      <div className="profile-button-container">
        <Button onClick={addFriendHandler}>Add Friend</Button>
      </div>
      <Leader>
        <p className="user-profile-footer">journ . al</p>
        <p className="user-profile-footer">v1.0</p>
      </Leader>
    </div>
    
    </>
  )
}

export default UserProfile;