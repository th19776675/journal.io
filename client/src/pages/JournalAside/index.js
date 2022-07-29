import AsideCard from "../../components/AsideCard"
import Leader from "../../components/Leader"
import Button from "../../components/Button"
import { useState, useEffect } from "react"
import Auth from "../../utils/auth"
import { getJournal } from "../../utils/API"
import "./journal-aside.css"

import { Link, useParams } from "react-router-dom"


const JournalAside = () => {
  const [journalPages, setJournalPages] = useState("")
  const {journalId} = useParams()


  const profileData = Auth.getProfile()
  
  const getPageData = async () => {
    const token = Auth.getToken()
    try {
      const response = await getJournal(token, journalId)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
      setJournalPages(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPageData()
  },[])

  if (!journalPages) {
    return (
      <></>
    )
  }
  
  return (
    <div>
      <AsideCard height="300px">
        <div className="daside-card-wrapper">
          <div className="daside-journal-cover">
            <img src={journalPages.coverImage} alt="" className="daside-img" />
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
              {journalPages.desc}
            </p>
          </div>
        </div>
      </AsideCard>
      {journalPages.pages.map((page, index) => {
        return (
          <AsideCard>
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
            <Link className="daside-button" to={`/journal/${journalPages._id}/page/${page._id}`}>
              <Button width="100%">View Page</Button>
            </Link>
          </div>
        </AsideCard>
        )
      })}
      {profileData.data.username === journalPages.authorName ? 
        <AsideCard height="auto">
         <Link to={`/journal/${journalPages._id}/publish`}><Button>Add Page</Button></Link> 
        </AsideCard>:
        ""
    }


    </div>
  )
}

export default JournalAside