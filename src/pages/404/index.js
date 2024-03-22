import { useContext } from 'react';
import { Hover } from '../../components/Hover'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function NotFound404() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <div>
      <Hover onClick={() => {
        logout()
        navigate('/')
      }}>404 - Not found</Hover>
    </div>
  );
}