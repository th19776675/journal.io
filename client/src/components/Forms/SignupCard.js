import React, { useState } from 'react';
import './login-card.css'
import Leader from "../Leader/Leader"
import { createCanvas } from "canvas"

import { loginUser } from "../../utils/API";
import Auth from "../../utils/auth";

import { validateEmail  } from '../../utils/helpers';

const SignupCard = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pfp, setPfp] = useState('');
  const [pfpSrc, setPfpSrc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'user') {
      setUser(inputValue);
    } else if (inputType === 'password'){
      setPassword(inputValue);
    } else if (inputType === 'email'){
      setEmail(inputValue);
    } else {
      setPfp(inputValue);
      if (target.files) {
        let imageFile = target.files[0];
        console.log(imageFile)
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image;
          img.onload = function (event) {
            // Dynamically create a canvas element
            console.log("Test")
                var canvas = createCanvas();
                // var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                var MAX_WIDTH = 100;
                var MAX_HEIGHT = 100;
                
                var width = img.width;
                var height = img.height;
                
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
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Show resized image in preview element
                var dataurl = canvas.toDataURL(imageFile.type);
                setPfpSrc(dataurl)
              }
            img.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData;

    if (!pfp) {
      formData = {
        username,
        email,
        password
      }
    } else {

      
      formData = {
        username,
        email,
        password,
        pfp
      }
    }

    try {
      const response = await loginUser(formData);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      console.log(response)
      const { token, user } = await response.json();
      Auth.login(token);
    } catch (e) {
      setErrorMessage(`${e}`)
    }

    setUser('');
    setPassword('');
  };

  return (
    <>
      <div className="login-form-wrapper">
        <form className='login-form'>
          <Leader>
            <h3>Signup</h3>
            <h3>2</h3>
          </Leader>
        <input
          value={username}
          name="username"
          type="text"
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          value={email}
          name="email"
          type="email"
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          value={password}
          name="password"
          type="text"
          onChange={handleInputChange}
          placeholder="Password"
        />
        <input
          value={pfp}
          
          accept="image/*"
          className='signup-file'
          name="pfp"
          type="file"
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button type="button" onClick={handleFormSubmit}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default SignupCard;