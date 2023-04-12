import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { HotelPage } from './pages/HotelPage';
import { PaymentPage } from './pages/PaymentPage';
import { SignUp } from './components/SignUp';
import { HotelInfo, User } from './types';
import { ErrorPage } from './pages/ErrorPage';
import { SuccesPage } from './pages/SuccessPage';
import { LogIn } from './components/LogIn';
import { PhotoPage } from './pages/PhotoPage';

interface userContext {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  hotel: HotelInfo | null,
  setHotel: React.Dispatch<React.SetStateAction<HotelInfo | null>>,
}

export const AuthContext = React.createContext<userContext | null>(null);

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [hotel, setHotel] = useState<HotelInfo | null>(null);

  const authContextValue = {
    user,
    setUser,
    hotel,
    setHotel
  };

  return (
    <>
      <AuthContext.Provider value={authContextValue}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage setUser={setUser} />} />
            <Route path="login" element={<LogIn setUser={setUser}/>} />
            <Route path="signup" element={<SignUp setUser={setUser} />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="photos" element={<PhotoPage setUser={setUser} />} />
            <Route path="success" element={<SuccesPage setUser={setUser} />} />
            <Route path="hotel" element={<HotelPage setUser={setUser} />} />
            <Route path="*" element={<ErrorPage setUser={setUser}/>} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </>
  );
}

export default App;
