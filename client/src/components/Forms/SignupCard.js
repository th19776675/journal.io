import React, { useState } from 'react';
import './login-card.css'
import Leader from "../Leader"
import { createCanvas } from "canvas"

import { createUser } from "../../utils/API";
import Auth from "../../utils/auth";

import { validateEmail, checkPassword  } from '../../utils/helpers';

const SignupCard = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pfpInput, setPfpInput] = useState('');
  const [pfp, setPfp] = useState('');
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
      if (!username) {
        throw new Error("Enter a valid username!");
      }
      if (!validateEmail(email)) {
        throw new Error("Enter a valid email!");
      }
      if (!checkPassword(password)) {
        throw new Error("Enter a valid password!");
      }
      const response = await createUser(formData);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      console.log(response)
      const { token } = await response.json();
      Auth.login(token);
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
        <button type="submit" onClick={handleFormSubmit}>Signup</button>
        </form>
      </div>
    </>
  )
}

export default SignupCard;