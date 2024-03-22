import { AuthProvider } from './context/AuthContext'
import {Main} from './pages/Main/index.js'
import './styles/app.css';

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}