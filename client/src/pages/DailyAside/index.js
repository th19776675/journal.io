import AsideCard from "../../components/AsideCard"
import Leader from "../../components/Leader"
import Button from "../../components/Button"
import { useState, useEffect } from "react"
import Auth from "../../utils/auth"
import { getDailyPages } from "../../utils/API"
import "./daily-aside.css"


import {PDFDownloadLink} from "@react-pdf/renderer";
import JournalDoc from "../../components/JournalDoc";

import { Link } from "react-router-dom"


const DailyAside = () => {
  const [dailyJournalPages, setDailyJournalPages] = useState("")

  const getDailyPageData = async () => {
    const token = Auth.getToken()
    try {
      const response = await getDailyPages(token)
      console.log(response)
      const data = await response.json()
      setDailyJournalPages(data)
    } catch (e) {

    }
  }

  useEffect(() => {
    getDailyPageData()
  },[])

  if (!dailyJournalPages) {
    return (
      <></>
    )
  }
  
  return (
    <div>
      <AsideCard height="300px">
        <div className="daside-card-wrapper">
          <div className="daside-journal-cover">
            <img src={dailyJournalPages.coverImage} alt="" className="daside-img" />
          </div>
        </div>
      </AsideCard>
      <AsideCard height="auto">
        <div className="daside-card-wrapper">
          <Leader>
            <p>Journal Description</p>
            <p>0</p>
          </Leader>
          <div className="daside-card-desc">
            <p>
              A journal by me!
            </p>
          </div>
        </div>
      </AsideCard>
      <AsideCard height="auto">
        <PDFDownloadLink document={dailyJournalPages ? <JournalDoc data={dailyJournalPages}/ > : <JournalDoc />} fileName={`${dailyJournalPages._id}.pdf`}>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : (
          <Button>Download Journal</Button>
          ))}
        </PDFDownloadLink>
      </AsideCard>
      {dailyJournalPages.pages.map((page, index) => {
        return (
          <AsideCard >
          <div className="daside-card-wrapper">
            <div className="daside-header">
              <Leader>
                <p>Page</p>
                <p>{index+1}</p>
              </Leader>
  
            </div>
            <div className="daside-card-body">
              <p>
                {page.content}
              </p>
            </div>
            <Link className="daside-button" to={`/journal/${dailyJournalPages._id}/page/${page._id}`}>
              <Button width="100%">View Page</Button>
            </Link>
          </div>
        </AsideCard>
        )
      })}

    </div>
  )
}

export default DailyAside