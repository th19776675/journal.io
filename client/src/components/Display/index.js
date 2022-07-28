import {  BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import Leader from "../Leader"
import "./display.css"
import DailyJournal from "../../pages/DailyJournal";

const Display = () => {
  return (
    <section className="display-wrapper">
      <Routes>
        <Route
          path='/' 
          element={<DailyJournal />} 
        />
        {/* <Route
          path='/profile' 
          element={<ProfileJournal />} 
        /> */}



      </Routes>
    </section>
  )


}

export default Display;