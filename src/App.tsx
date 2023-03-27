import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <>
      <div className="App">
        <div id='signInButton'>nl</div>
      </div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          const userObject = jwtDecode(credentialResponse.credential || "");
          console.log(userObject)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
}

export default App;
