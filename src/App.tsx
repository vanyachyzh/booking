import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { HotelPage } from './pages/HotelPage';
import { PaymentPage } from './pages/PaymentPage';
import { SignUp } from './components/SignUp';
import { User } from './types';
import { ErrorPage } from './pages/ErrorPage';
import { SuccesPage } from './pages/SuccessPage';
import { LogIn } from './components/LogIn';
import { PhotoPage } from './pages/PhotoPage';

export const AuthContext = React.createContext<User | null>(null);

function App() {

  const [user, setUser] = useState<User | null>(null);

  // const handleLogin = (userData) => {
  //   setUser(userData);
  // }

  // const handleLogout = () => {
  //   setUser(null);
  // }

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
      <AuthContext.Provider value={user}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage setUser={setUser} />} />
            <Route path="hotel" element={<HotelPage />} />
            <Route path="login" element={<LogIn setUser={setUser}/>} />
            <Route path="signup" element={<SignUp setUser={setUser} />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="photos" element={<PhotoPage setUser={setUser} />} />
            <Route path="success" element={<SuccesPage setUser={setUser} />} />
            <Route path="*" element={<ErrorPage setUser={setUser}/>} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </>
  );
}

export default App;
