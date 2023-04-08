import React, { useEffect, useState } from 'react';
import './LogIn.scss';
import { Field } from '../Field';
import { Link, useNavigate } from 'react-router-dom';
import { Error, User, Warning } from '../../types';


const initialWarnings = {
  email: '',
  password: '',
  name: '',
  surname: '',
  confirmPassword: ''
}

const initialError = {
  email: '',
  password: '',
}


const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}


export const LogIn: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState<Warning>(initialWarnings)
  const [error, setError] = useState<Error>(initialError)
  const navigate = useNavigate();


  const onPressButton = () => {
  fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        email,
        password
      })
  })
    .then(res => {
      if (res.status === 200) {
        console.log('you are in')
        setUser({
          name: "sdfsdfsd",
          surname: "sdfsd",
          email,
          password,
        })
        navigate('/')
      } else {
        setError(prev => ({
          ...prev,
          email: "Your login is already used",
        }));
      }

    });
}


  useEffect(() => {
    console.log(warning)
  }, [warning])


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!regex.test(email)) {
      setWarning(prev => ({
        ...prev,
        email: 'Your email is invalid!',
      }));
    }

    if (!email) {
      setWarning(prev => ({
        ...prev,
        email: 'You have to fill in this field',
      }));
    }

    if (!password) {
      setWarning(prev => ({
        ...prev,
        password: 'You have to fill in this field',
      }));
    }

    
  }

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className='auth'>
        {/* <input type='button' className='auth__cross' /> */}

        <h2 className="auth__title title-xx-black-700">
          Welcome back!
        </h2>

        <span className='auth__desc text-xx-black-400'>
          Log in to your account
        </span>

        <div className="auth__field">
          <Field
            value={email}
            setValue={setEmail}
            setWarning={setWarning}
            placeholder='Enter your email address'
            error={error.email}
            setError={setError}
            warning={warning.email}
            label='email'
            helper='Invalid email'
          />
        </div>

        <div className="auth__field">
          <Field
            value={password}
            setValue={setPassword}
            setWarning={setWarning}
            placeholder='Enter your password (min 8 chars)'
            error={null}
            setError={setError}
            warning={warning.password}
            label='password'
            helper='Invalid password'
          />
        </div>

        <button
          type='button'
          className="auth__forgot-btn text-xx-blue-500">
          Forgot password?
        </button>


        <button
          onClick={onPressButton}
          type='submit'
          className="auth__login-btn button">
          Log in
        </button>


        <div className='auth__signup-section text-xx-gray-400'>
          Don’t have an account?
          <Link
            to="/signup"
            className="auth__signup-btn text-xx-blue-500">
            Sign Up
          </Link>
        </div>



      </form>
    </div>
  )
};
