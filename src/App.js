import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CareerPage from "./pages/CareerPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Roadmap from './pages/Roadmap';
import Quiz from './pages/QuizPage';
import Gaming from './pages/Gaming';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/quiz" element={<Quiz />} />
         
          {/* <Route path="/log-in" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

