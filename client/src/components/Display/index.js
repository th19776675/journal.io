import {  BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import Leader from "../Leader"
import "./display.css"
import DailyJournal from "../../pages/DailyJournal";
import Profile from "../../pages/Profile";
import ProfileUpdate from "../../pages/ProfileUpdate";

const Display = () => {
  return (
    <section className="display-wrapper">
      <Routes>
        <Route
          path='/daily' 
          element={<DailyJournal />} 
        />
        <Route
          path='/profile' 
          element={<Profile />} 
        />
        <Route
          path='/profile/update' 
          element={<ProfileUpdate />} 
        />



      </Routes>
    </section>
  )


}

export default Display;