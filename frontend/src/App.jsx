// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import WorkingPage from './pages/WorkingPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage'; // NEW
import { StockProvider } from './context/StockContext';
import Navbar from './components/Navbar';


function App() {
  return (
    <StockProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/working" element={<WorkingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* NEW */}
        </Routes>
      </Router>
    </StockProvider>
  );
}

export default App;
