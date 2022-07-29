import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import Leader from "../../components/Leader"
import Button from "../../components/Button";
import "./page-creator.css"
import { createPage } from "../../utils/API";
import TextEditor from "../../components/TextEditor";


const PageCreator = () => {


  const {journalId} = useParams();

  const [plainText, setPlainText] = useState()
  const [isPlain, setIsPlain] = useState(true)

  const plainHandler = (e) => {
    const {target} = e;
    setPlainText(target.value);
    target.name === "rich" ?  setIsPlain(false) : setIsPlain(true)
  }

  const clickPlainHandler = async (e) => {
    const token = Auth.getToken()
    try {
      const response = await createPage(token, plainText, isPlain, journalId);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      window.location.reload(false);
      setPlainText("")
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
    <div className="daily-wrapper">
      <Leader>
        <h3>Journal</h3>
        <h3>0</h3>
      </Leader>
      <div className="daily-editor">
        <TextEditor textState={plainText} textHandler={plainHandler} placeholder="Write an entry for your journal!"/>
      </div>
      <div className="page-creator-button">
        <Link to={`/journal/${journalId}`}>
          <Button width="100%" onClick={clickPlainHandler}>Publish</Button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default PageCreator;