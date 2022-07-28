import React, { useState, useEffect } from 'react'; 
import "./profile-picture.css"
import { useCurrentUser } from "../../utils/CurrentUserContext"


const ProfilePicture = () => {
  const { currentUser, fetchCurrentUser } = useCurrentUser()

  useEffect(() => {fetchCurrentUser()}, [])

  return (
    <>
      <div className="profile-container">
        <img src={currentUser ? currentUser.pfp : ""} alt="Profile Picture" />
      </div>
    </>
  )
}

export default ProfilePicture;