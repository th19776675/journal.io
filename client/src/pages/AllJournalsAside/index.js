import AsideCard from "../../components/AsideCard"
import Leader from "../../components/Leader"
import Button from "../../components/Button"
import { useState, useEffect } from "react"
import Auth from "../../utils/auth"
import { getAllJournals } from "../../utils/API"

import { Link, useParams } from "react-router-dom"


const AllJournalsAside = () => {
  const [journalPages, setJournalPages] = useState("")

  
  const getPageData = async () => {
    try {
      const response = await getAllJournals()
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
    <>
    {journalPages.map((journal) => {
        return (
          <>
            <Link to={`/journal/${journal._id}`}>
              <AsideCard height="300px">
                <div className="daside-card-wrapper">
                  <div className="daside-journal-cover">
                    <img src={journal.coverImage} alt="" className="daside-img" />
                  </div>
                </div>
              </AsideCard>
              <AsideCard height="auto">
                <div className="daside-card-wrapper">
                  <Leader>
                    <p className="journal-user-text">Journal Description</p>
                    <p className="journal-user-text">0</p>
                  </Leader>
                  <div className="daside-card-desc">
                    <p className="journal-user-text">
                      {journal.desc}
                    </p>
                  </div>
                  <Leader>
                    <p className="journal-user-text">Author</p>
                    <p className="journal-user-text">{journal.authorName}</p>
                  </Leader>
                  <Leader>
                    <p className="journal-user-text">Page Count</p>
                    <p className="journal-user-text">{journal.pageCount}</p>
                  </Leader>
                </div>
              </AsideCard>
            </Link>
          </>
        )
      })}

      <AsideCard height="auto">
        <div className="daside-card-wrapper">
          <Link to="/journals/create">
            <Button>Create A Journal</Button>
          </Link>
        </div>
      </AsideCard>
    </>
  )
}

export default AllJournalsAside