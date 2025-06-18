import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './styles/App.css'; // Importe o CSS para o background

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Adicione um contêiner para o background */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Rota padrão para login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;