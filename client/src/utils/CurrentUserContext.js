import { createContext, useState, useContext } from "react"
import Auth from './auth'

export const CurrentUserContext = createContext({})

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = async () => {
    let response = await fetch(`/api/user/${Auth.getProfile().data._id}`)
    response = await response.json()
    setCurrentUser(response)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)