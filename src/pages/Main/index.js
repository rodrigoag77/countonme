"use client"
import { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import NotFound404 from '../404';
import Details from '../Details';
import Login from '../Login';
import '../../styles/app.css';

export const Main = (props) => {
  const { auth, authCheck } = useContext(AuthContext)

  const Start = () => {
    if (auth === false)
      return <Navigate to="/login" />;
    if (window.location.pathname === '/' || window.location.pathname === '/login')
      return <Navigate to="/details" />;
  };

  useEffect(() => {
    authCheck({})
  }, [authCheck])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div></div>} />
          <Route path='/login' Component={Login} />
          <Route path='/details' Component={Details} />
          <Route path='*' Component={NotFound404} />
        </Routes>
        {Start()}
      </BrowserRouter>
    </div>
  );
}