import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { HotelPage } from './pages/HotelPage';
import { PaymentPage } from './pages/PaymentPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="hotel" element={<HotelPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
