import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import Leader from "../../components/Leader"
import "./daily-journal.css"
import { getDaily, postPlainDaily } from "../../utils/API";
import TextEditor from "../../components/TextEditor";

const DailyJournal = () => {

  const [dailyJournalData, setDailyJournalData] = useState("")

  
  const untilMidnight = () => {
    const midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    return Math.floor((midnight.getTime() - new Date().getTime() ) / 1000 / 60);
  }
  const [nextEdit, setNextEdit] = useState(untilMidnight())
  
  const timeUntilEdit = () => {
    setInterval(() => {
      setNextEdit(untilMidnight()) 
    }, 60000);
  }

  const getDailyData = async () => {
    const token = Auth.getToken()
    try {
      const response = await getDaily(token)
      const data = await response.json()
      setDailyJournalData(data)
    } catch (e) {

    }
  }

  useEffect(() => {
    timeUntilEdit()
    getDailyData()
  },[])

  const [dailyPlainText, setDailyPlainText] = useState()
  const [isPlain, setIsPlain] = useState(true)

  const dailyPlainHandler = (e) => {
    const {target} = e;
    setDailyPlainText(target.value);
    target.name === "rich" ?  setIsPlain(false) : setIsPlain(true)
  }

  const clickPlainHandler = async (e) => {
    const token = Auth.getToken()
    e.preventDefault();
    try {
      const response = await postPlainDaily(token, dailyPlainText, isPlain, true, dailyJournalData._id);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      setDailyPlainText("")
      getDailyData()
    } catch (e) {
      alert(e)
    }
  }

  if (dailyJournalData.isEditable === false) {
    return (
      <>
        <div className="daily-unavailable-wrapper">
          <p>{nextEdit} minutes until your next entry!</p> 
        </div>
      </>
    )
  }

  return (
    <>
    <div className="daily-wrapper">
      <Leader>
        <h3>Journal</h3>
        <h3>Daily</h3>
      </Leader>
      <div className="daily-editor">
        <TextEditor textState={dailyPlainText} textHandler={dailyPlainHandler} placeholder="Write an entry for your daily journal!"/>
      </div>
      <button className="daily-button" onClick={clickPlainHandler}>Publish</button>
    </div>
    </>
  )
}

export default DailyJournal;