import { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [name, setName] = useState(null)
  const [token, setToken] = useState(null)
  const [authMessage, setAuthMessage] = useState(' ')

  const logout = () => {
    setAuth(false)
    setName(null)
    setToken(null)
    localStorage.removeItem('@countonme/user')
  }

  const authCheck = ({ mail, pass, setSpinner }) => {
    try {
      let userJSON = { token: null, name: null }
      const userData = localStorage.getItem('@countonme/user')
      if (userData)
        userJSON = JSON.parse(userData)

      if (mail && pass && (!userData || !userJSON)) {
        console.log('setSpinner', setSpinner)
        if (setSpinner) setSpinner(true)
        api.post('session', { user: mail, password: pass })
          .then(e => {
            const { token, name } = e.data
            setAuth(token ? true : false)
            setName(name)
            setToken(token)
            localStorage.setItem('@countonme/user', JSON.stringify({ name, token }))
            if (setSpinner) setSpinner(false)
          })
          .catch(e => {
            setAuthMessage(e.response.data.message)
            if (setSpinner) setSpinner(false)
          })
      } else {
        const { token, name } = userJSON
        setAuth(token ? true : false)
        setName(name)
        setToken(token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, name, token, authCheck, logout, authMessage, setAuthMessage }}>
      {children}
    </AuthContext.Provider>
  )
}

