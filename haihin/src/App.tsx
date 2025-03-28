import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import TopPage from './pages/TopPage';
import PricePage from './pages/PricePage';
import EstimatePage from './pages/EstimatePage';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/price" element={<PricePage />} />
            <Route path="/estimate" element={<EstimatePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App; 