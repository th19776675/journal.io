import "./page.css"
import { useParams, Link } from "react-router-dom";
import { getPage, getCleanJournal } from "../../utils/API";
import { useState, useEffect } from "react";
import Auth from "../../utils/auth"

import Button from "../../components/Button";
import Leader from "../../components/Leader";


const Page = () => {
  let {pageId, journalId} = useParams();
  
  const [page, setPage] = useState("")
  const [journal, setJournal] = useState("")

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

  useEffect(() => {
    getPageData()
    getJournalData()
  },[pageId])

  if (!page || !journal) {
    return (
      <></>
    )
  }
  return (
    <>
      <Leader>
        <h3>Journal</h3>
        <h3>{journal.journalName}</h3>
      </Leader>
      <div className="page-content">
        {page.content}
      </div>
      <div className="page-buttons">
        <Button>Add Page</Button>
        <Button>Delete Page</Button>
        <Link to={`/user/${journal.authorName}`}>
        <Button>View Author</Button>
        </Link>

      </div>
    </>
  )
}

export default Page;


