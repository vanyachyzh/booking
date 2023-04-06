import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { HotelPage } from './pages/HotelPage';
import { PaymentPage } from './pages/PaymentPage';

function App() {

  // useEffect(() => {
  //   fetch("http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/hotels/1/reviews", {
  //     method: "POST",
  //     body: {
  //       "authorName": "John Doe",
  //       "date": "2023-03-27T12:30:00",
  //       "rating": 4,
  //       "text": "Nice hotel, would stay again"
  //   }
  //   })
  // }, [])
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
