import {  BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import Leader from "../Leader"
import "./display.css"
import DailyJournal from "../../pages/DailyJournal";
import Profile from "../../pages/Profile";
import UserProfile from "../../pages/UserProfile";
import ProfileUpdate from "../../pages/ProfileUpdate";
import Page from "../../pages/Page";
import JournalCreate from "../../pages/JournalCreate";
import PageCreator from "../../pages/PageCreator";
import Home from "../../pages/Home";

const Display = () => {
  return (
    <section className="display-wrapper">
      <Routes>
        <Route
          path='/' 
          element={<Home />} 
        />
        <Route
          path='/daily' 
          element={<DailyJournal />} 
        />
        <Route
          path='/profile' 
          element={<Profile />} 
        />
        <Route
          path='/user/:username' 
          element={<UserProfile />} 
        />
        <Route
          path='/profile/update' 
          element={<ProfileUpdate />} 
        />
        <Route
          path="/journal/:journalId/page/:pageId"
          element={<Page />}
        />
        <Route
          path="/journals/create"
          element={<JournalCreate />}
        />
        <Route 
          path="/journal/:journalId/publish"
          element={<PageCreator />}
        />

      </Routes>
    </section>
  )


}

export default Display;