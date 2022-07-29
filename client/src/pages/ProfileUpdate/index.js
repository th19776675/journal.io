import React, { useState } from 'react';
import './profile-update.css'
import Leader from '../../components/Leader';
import { createCanvas } from "canvas"
import { Link } from 'react-router-dom';

import { updateUser } from "../../utils/API";
import Auth from "../../utils/auth";

import { validateEmail, checkPassword  } from '../../utils/helpers';
import { useCurrentUser } from "../../utils/CurrentUserContext";


const ProfileUpdate = () => {

  const { currentUser, fetchCurrentUser } = useCurrentUser()

  const [username, setUsername] = useState(currentUser ? currentUser.username: "");
  const [email, setEmail] = useState(currentUser ? currentUser.email: "");
  const [password, setPassword] = useState('');
  const [pfpInput, setPfpInput] = useState('');
  const [pfp, setPfp] = useState(currentUser ? currentUser.pfp: "");
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'username') {
      setUsername(inputValue);
    } else if (inputType === 'password'){
      setPassword(inputValue);
    } else if (inputType === 'email'){
      setEmail(inputValue);
    } else {
      setPfpInput(inputValue);
      if (target.files) {
        let imageFile = target.files[0];
        console.log(imageFile)
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image;
          img.onload = function (event) {
            // Dynamically create a canvas element
            console.log("Test")
                const canvas = createCanvas();
                // const canvas = document.getElementById("canvas");
                const ctx = canvas.getContext("2d");
                const MAX_WIDTH = 100;
                const MAX_HEIGHT = 100;
                
                let width = img.width;
                let height = img.height;
                
                // Change the resizing logic
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = width * (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const dataurl = canvas.toDataURL(imageFile.type);
                console.log(dataurl)
                setPfp(dataurl)
              }
              console.log(e.target.result)
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    let formData = {};
    if (username) {
      formData.username = username;
    }
    if (email) {
      formData.email = email;
    }
    if (password) {
      formData.password = password;
    }
    if (pfp) {
      formData.pfp = pfp;
    }
    

    try {
      if (email && !validateEmail(email)) {
        throw new Error("Enter a valid email!");
      }
      if (password && !checkPassword(password)) {
        throw new Error("Enter a valid password!");
      }
      if(!formData) {
        throw new Error("You need to update something!");
      }
      const token = Auth.getToken()
      const response = await updateUser(token, formData);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      fetchCurrentUser()
    } catch (e) {
      setErrorMessage(`${e}`)
    }

    setUsername('');
    setPassword('');
    setPfp('');
    setPfpInput("");
    setEmail("");
  };

  return (
    <div className="update-outer-wrapper">
      <div className="update-form-wrapper">
        <form className='update-form'>
          <Leader>
            <h3>Update</h3>
            <h3>0</h3>
          </Leader>
        <input
          value={username}
          name="username"
          type="text"
          onChange={handleInputChange}
          placeholder={`Current Username : ${currentUser ? currentUser.username: ""}`}
        />
        <input
          value={email}
          name="email"
          type="email"
          onChange={handleInputChange}
          placeholder={`Current Email : ${currentUser ? currentUser.email: ""}`}
        />
        <input
          value={password}
          name="password"
          type="password"
          onChange={handleInputChange}
          placeholder="Choose a password!"
        />
        <div>
        <div className="image-wrapper">
          <input
            value={pfpInput}
            
            accept="image/*"
            className='signup-file'
            name="pfp"
            type="file"
            onChange={handleInputChange}
            placeholder="Password"
          />
          <div className="form-img">
            <img src={pfp ? pfp : ""} />
          </div>
        </div>

        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Link to="/profile">
        <button type="submit" onClick={handleFormSubmit}>Update</button>
        </Link>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate;