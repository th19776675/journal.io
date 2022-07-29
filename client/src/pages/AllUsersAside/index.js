import AsideCard from "../../components/AsideCard"
import Leader from "../../components/Leader"
import Button from "../../components/Button"
import { useState, useEffect } from "react"
import Auth from "../../utils/auth"
import { getAllUsers } from "../../utils/API"
import "./all-users-aside.css"

import { Link, useParams } from "react-router-dom"


const AllUsersAside = () => {
  const [users, setUsers] = useState("")

  
  const getPageData = async () => {
    try {
      const response = await getAllUsers()
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);      
      }
      const data = await response.json()
      setUsers(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPageData()
  },[])

  if (!users) {
    return (
      <></>
    )
  }
  
  return (
    <>
    {users.map((user) => {
        return (
          <>
            <Link to={`/user/${user.username}`}>
              <AsideCard height="113px">
                <div className="daside-card-wrapper">
                <div className="ausers-card-wrapper">
                  <img src={user.pfp} alt="PFP" className="ausers-img"/>
                  <div className="auser-info">
                    <Leader>
                      <p>Username</p>
                      <p>{user.username}</p>
                    </Leader>
                    <Leader>
                      <p>Email</p>
                      <p>{user.email}</p>
                    </Leader>
                    <Leader>
                      <p>Journals Created</p>
                      <p>{user.journals.length}</p>
                    </Leader>
                    <Leader>
                      <p>Friends</p>
                      <p>{user.friends.length}</p>
                    </Leader>
                  </div>
                </div>
                </div>
              </AsideCard>
            </Link>
          </>
        )
      })}
    </>
  )
}

export default AllUsersAside