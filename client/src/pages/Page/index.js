import "./page.css"
import { useParams, Link } from "react-router-dom";
import { getPage, getCleanJournal, addPage } from "../../utils/API";
import { useState, useEffect } from "react";
import Auth from "../../utils/auth"
import TextEditor from "../../components/TextEditor";

import Button from "../../components/Button";
import Leader from "../../components/Leader";
import { useCurrentUser } from "../../utils/CurrentUserContext";


const Page = () => {
  let {pageId, journalId} = useParams();
  
  const [addPageState, setAddPageState] = useState(false)
  const [page, setPage] = useState("")
  const [journal, setJournal] = useState("")

  const { currentUser, fetchCurrentUser } = useCurrentUser()


  const getPageData = async () => {
    const token = Auth.getToken()
    try {
      const response = await getPage(token, pageId)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
      setPage(data)
    } catch (e) {
      console.log(e)
    }
  }

  const getJournalData = async () => {
    const token = Auth.getToken()
    try {
      const response = await getCleanJournal(token, journalId)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
      setJournal(data)
    } catch (e) {
      console.log(e)
    }
  }

  const addPageStateHandler = async () => {
    setAddPageState(true)
  }

  const revertPageHandler = async () => {
    setAddPageState(false)
  }

  const addPageHandler = async (journalId) => {
    const token = Auth.getToken()
    try {
      const response = await addPage(token, journalId, pageId)
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    setAddPageState(false)
    getPageData()
    getJournalData()
  },[pageId])

  if (!page || !journal  || !currentUser) {
    return (
      <></>
    )
  }

  if (addPageState === true) {
    return (
      <div className="page-full-container">
        <Leader>
          <h3>Add</h3>
          <h3>Page</h3>
        </Leader>
        <div className="page-content">
          {currentUser ? 
          currentUser.journals.map((journal) => {
            return( 
              <>
              <div className="page-journal-links" onClick={addPageHandler(journal._id)}>
                <Link to={`/journal/${journal._id}`} >
                  <Leader>
                    <p  className="page-journal-links">Journal</p>
                    <p  className="page-journal-links">{journal.journalName}</p>
                  </Leader>
                </Link>
              </div>
              </>
            )
          })
          :""}
        </div>
        <div className="page-buttons">
          <Button onClick={revertPageHandler}>Go Back</Button>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="page-full-container">
        <Leader>
          <h3>Journal</h3>
          <h3>{journal.journalName}</h3>
        </Leader>
        <div className="page-content-container">
          <TextEditor textState={page.content} toggleType="View"/>
        </div>
        {/* <div className="page-content">
          {page.content}
        </div> */}
        <div className="page-buttons">
          <Button onClick={addPageStateHandler}>Add Page</Button>
          <Link to={`/user/${journal.authorName}`}>
          <Button>View Author</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page;


