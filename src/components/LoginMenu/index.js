import { useEffect, useState } from 'react'
import './index.css'

export const UserAdd = ({ children, setUserNew, setReload, reload, ...props }) => {
  const [menuShow, setMenuShow] = useState(false)

  useEffect(() => {
    if (!menuShow)
      setReload(!reload)
  }, [menuShow])

  const Menu = () => {
    const handleNewAccount = () => {
      setUserNew(true)
      handleBack()
    }

    const handleClearList = () => {
      localStorage.removeItem('@countonme/userlist')
      handleBack()
    }

    const handleBack = () => {
      setMenuShow(false)
    }

    return (
      <>
        <div className="formOver" onClick={() => setMenuShow(false)} />
        <div className='menuUser pad-i5'>
          <button className='btn nameLogin mi10' onClick={handleNewAccount}>
            <p>Criar uma conta</p>
          </button>
          <button className='btn nameLogin mi10' onClick={handleClearList}>
            <p>Limpar lista</p>
          </button>
          <button className='btn nameLogin mi10' onClick={handleBack}>
            <p>Voltar</p>
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='iconUser'>
        <img src={require('../../assets/user.png')} alt="Usuário" onClick={() => setMenuShow(!menuShow)} />
      </div>
      {menuShow ? Menu() : null}
    </>
  )
}