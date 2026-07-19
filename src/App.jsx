import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './pages/Portfolio';
import Archive from './Archive';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/proyectos" element={<Archive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}
