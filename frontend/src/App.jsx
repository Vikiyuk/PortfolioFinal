import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WorkingPage from './pages/WorkingPage';
import WelcomePage from './pages/WelcomePage';
import PortfolioPage from './pages/PortfolioPage';
import { StockProvider } from './context/StockContext'  // context provider


function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Welcome</Link>
        <Link to="/working">Working</Link>
        <Link to="/portfolio">Portfolio</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/working" element={<WorkingPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
