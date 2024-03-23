import { useEffect, useState } from "react"
import { useContext } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthContext'
import { Input } from "../Input"
import { Spinner } from "../Spinner";
import { UserAdd } from '../LoginMenu';
import api from "../../api";

export const UserList = ({ children, ...props }) => {
  const [reload, setReload] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [userOut, setUserOut] = useState(false)
  const [userAdd, setUserAdd] = useState('')
  const [userNew, setUserNew] = useState(false)
  const [userList, setUserList] = useState([])
  const [userName, setUserName] = useState(null)
  const [userMail, setUserMail] = useState(null)
  const [userPass, setUserPass] = useState('')

  const [userAddMail, setUserAddMail] = useState('')
  const [userAddName, setUserAddName] = useState('')
  const [userAddPass, setUserAddPass] = useState('')

  const { authCheck, authMessage, setAuthMessage } = useContext(AuthContext)

  const handleBack = () => {
    setUserMail(null);
    setUserName(null);
    setUserPass('');
    setUserOut(false)
    setUserAdd('')
    setAuthMessage(' ')
  }

  const handleNext = () => {
    if (userOut) {
      setSpinner(true)
      api.post('validuser', { mail: userAdd })
        .then(e => {
          const { name } = e.data
          let achou = false
          let userListNew = userList.slice()
          userList.forEach(e => achou = achou || (e.mail === userAdd))
          if (!achou)
            userListNew.push({ name, mail: userAdd })
          setUserAdd('')
          setUserOut(false)
          setUserList(userListNew)
          localStorage.setItem('@countonme/userlist', JSON.stringify(userListNew))
          setSpinner(false)
        })
        .catch(e => {
          if (e.response && e.response.data && e.response.data.message)
            setAuthMessage(e.response.data.message)
          setSpinner(false)
        })
    } else {
      authCheck({ mail: userMail, pass: userPass, setSpinner: value => setSpinner(value) })
    }
  }

  const handleGetPass = (e) => {
    setAuthMessage(' ')
    const nome = e.name.split(' ')
    setUserMail(e.mail)
    setUserName(nome[0])
  }

  const handleOutList = () => {
    setUserOut(true)
    setReload(!reload)
  }

  const loadUserAdd = () => {
    return (
      <>
        <div style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px' }} onClick={() => setUserNew(false)}></div>
        <div
          style={{ position: 'absolute', left: '25%', top: '10%', right: '25%', bottom: '10%', minWidth: '350px' }}
          action=""
          method="post"
          autoComplete='off'
        >
          <Input autoComplete="off" id="nameAdd" type='text' placeholder='nome' autoFocus value={userAddName} onChange={e => setUserAddName(e.target.value)} />
          <Input autoComplete="off" id="mailAdd" type='text' placeholder='e-mail' value={userAddMail} onChange={e => setUserAddMail(e.target.value)} />
          <Input autoComplete="off" id="passAdd" type='password' placeholder='senha' value={userAddPass} onChange={e => setUserAddPass(e.target.value)} />
          <div className='formButton'>
            <button className='btn formButtonStyle' onClick={handleSubmitUserAdd}>Ok</button>
            <button className='btn formButtonStyle' onClick={handleCleanUserAdd}>Limpar</button>
            <button className='btn formButtonStyle' onClick={handleCancelUserAdd}>Cancelar</button>
          </div>
          <p className="divLogin" style={{ justifyContent: 'center' }}>{authMessage}</p>
        </div>
      </>
    )
  }

  const loadUserList = () => {
    return (
      <>
        {userList && userList.length > 0 ?
          userList.map((e, i) => {
            return (
              <button
                key={'login' + i.toString()}
                className='divLogin nameLogin'
                style={{ position: 'relative' }}
                onClick={() => handleGetPass(e)}
              >
                <img src={require('../../assets/user.png')} alt="Usuário" />
                <p>{e.name}</p>
              </button>
            )
          })
          : null
        }
        <div
          className="divOutList"
          tabIndex="0"
          onClick={handleOutList}
          onKeyUp={(key) => { if (key.code === 'Space') handleOutList() }}
        >
          Seu usuário não está listado?
        </div>
      </>
    )
  }

  const loadUserOut = () => {
    return (
      <>
        <p className="divLogin" style={{ justifyContent: 'center', fontSize: '18px' }}>Informe seu usuário</p>
        <div className='navLogin'>
          <button className='btn buttonNav' onClick={handleBack}>
            <FaArrowLeft size='25px' style={{ backgroundColor: 'transparent' }} />
          </button>
          <Input type='text' placeholder='e-mail' autoFocus value={userAdd} onChange={e => setUserAdd(e.target.value)} />
          <button className='btn buttonNav' onClick={handleNext}>
            <FaArrowRight size='25px' style={{ backgroundColor: 'transparent' }} />
          </button>
        </div>
        <p className="divLogin" style={{ justifyContent: 'center' }}>{authMessage}</p>
      </>
    )
  }

  const loadSendPass = () => {
    return (
      <>
        <p className="divLogin" style={{ marginLeft: '60px', fontSize: '18px' }}>{userName} ({userMail})</p>
        <div className='navLogin'>
          <button className='btn buttonNav' onClick={handleBack}>
            <FaArrowLeft size='25px' style={{ backgroundColor: 'transparent' }} />
          </button>
          <Input type='password' placeholder='senha' autoFocus value={userPass} onChange={e => setUserPass(e.target.value)} />
          <button className='btn buttonNav' onClick={handleNext}>
            <FaArrowRight size='25px' style={{ backgroundColor: 'transparent' }} />
          </button>
        </div>
        <p className="divLogin" style={{ justifyContent: 'center' }}>{authMessage}</p>
      </>
    )
  }

  useEffect(() => {
    const userData = localStorage.getItem('@countonme/userlist')
    if (userData) {
      const userJSON = JSON.parse(userData)
      if (userJSON)
        setUserList(userJSON)
    } else
      setUserList([])
  }, [reload])


  useEffect(() => {
    handleCleanUserAdd()
  }, [userNew])

  const handleSubmitUserAdd = () => {
    setSpinner(true)
    api.post('user', { name: userAddName, email: userAddMail, phone: '9999999999', password: userAddPass })
      .then(e => {
        let achou = false
        let userListNew = userList.slice()
        userList.forEach(e => achou = achou || (e.mail === userAddMail))
        if (!achou)
          userListNew.push({ name: userAddName, mail: userAddMail })
        setUserList(userListNew)
        localStorage.setItem('@countonme/userlist', JSON.stringify(userListNew))
        setSpinner(false)
        setUserNew(false)
      })
      .catch(e => {
        if (e.response && e.response.data && e.response.data.message)
          setAuthMessage(e.response.data.message)
        setSpinner(false)
      })
  }

  const handleCancelUserAdd = () => {
    setUserNew(false)
  }

  const handleCleanUserAdd = () => {
    setUserAddMail('')
    setUserAddName('')
    setUserAddPass('')
    const nameAdd = document.querySelector('#nameAdd')
    if (nameAdd)
      nameAdd.focus()
  }

  return (
    <>
      {userNew
        ? loadUserAdd()
        : <>
          <div className="userlist">
            {!userName && !userOut ? loadUserList() : userOut ? loadUserOut() : loadSendPass()}
          </div>
          <UserAdd setReload={setReload} reload={reload} setUserNew={setUserNew} />
        </>
      }
      {spinner ? Spinner() : null}
    </>

  )
}