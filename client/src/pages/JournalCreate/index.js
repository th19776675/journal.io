import React, { useState } from 'react';
import './journal-create.css'
import Leader from '../../components/Leader';
import Button from '../../components/Button';

import { useCurrentUser } from "../../utils/CurrentUserContext";

import { Link } from 'react-router-dom';

import { createJournal } from "../../utils/API";
import Auth from "../../utils/auth";

const JournalCreate = () => {

  const { currentUser, fetchCurrentUser } = useCurrentUser()

  const [errorMessage, setErrorMessage] = useState("")
  const [journalName, setJournalName] = useState("")
  const [desc, setDesc] = useState("")

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'journalName') {
      setJournalName(inputValue);
    } else {
      setDesc(inputValue)
    }
  }

  const handleFormSubmit = async (e) => {
    let formData = {}

    if (journalName) {
      formData.journalName = journalName;
    }
    if (desc) {
      formData.desc = desc;
    }

    try {
      if (journalName.length > 20) {
        throw new Error("Enter a shorter journal name!");
      }
      if (!journalName) {
        throw new Error("Fill out all the fields!");
      }
      if (!desc) {
        throw new Error("Fill out all the fields!");
      }
      const token = Auth.getToken()
      const response = await createJournal(token, formData);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      fetchCurrentUser()
    } catch(e){
      setErrorMessage(e)
    }
  }


  return (
    <>
      <div className="update-outer-wrapper">
        <div className="update-form-wrapper">
          <form className='update-form'>
            <Leader>
              <h3>Create a Journal</h3>
              <h3>0</h3>
            </Leader>
          <input
            value={journalName}
            name="journalName"
            type="text"
            onChange={handleInputChange}
            placeholder={`Journal Name (MAX: 20 characters)`}
          />
          <textarea
            value={desc}
            name="desc"
            className='jcreate-textarea'
            type="text"
            onChange={handleInputChange}
            placeholder={`Description`}
          />
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          <div className="jcreate-button-wrapper">
            <Link to="/journals/user">
              <Button onClick={handleFormSubmit}>Create</Button>
              {/* <button type="submit" onClick={handleFormSubmit}>Create</button> */}
            </Link>
          </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default JournalCreate;