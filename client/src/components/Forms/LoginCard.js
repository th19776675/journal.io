import React, { useState } from 'react';
import './login-card.css'
import Leader from "../Leader/Leader"

import { loginUser } from "../../utils/API";
import Auth from "../../utils/auth";

import { validateEmail  } from '../../utils/helpers';

const LoginCard = (props) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'user') {
      setUser(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData;
    if (validateEmail(user)) {
      formData = {
        email: user,
        password: password
      }
    } else {
      formData = {
        username: user,
        password: password
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
            <h3>Login</h3>
            <h3>1</h3>
          </Leader>
        <input
          value={user}
          name="user"
          type="text"
          onChange={handleInputChange}
          placeholder="Username or Email"
        />
        <input
          value={password}
          name="password"
          type="password"
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

export default LoginCard;