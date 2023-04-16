import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.scss';

import { Field } from '../Field';
import { Error, User, Warning } from '../../types';
import { logIn } from '../../api/booking';
import { Header } from '../Header';


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

function areAllFieldsEmpty(obj: Warning) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].trim() !== "") {
      return false;
    }
  }
  return true;
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


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!regex.test(email) || !email || !password) {
      if (!regex.test(email)) {
        setWarning(prev => ({
          ...prev,
          email: 'Your email is incorrect!',
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

      return;
    }

    logIn(email, password)
      .then(res => {
        console.log(res.status, warning, areAllFieldsEmpty(warning))
        if (res.status === 200 && areAllFieldsEmpty(warning)) {
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
            email: "Check email",
          }));
        }
      });
  }

  return (
    <div className="login-page">
      <section className="login-page__section">
        <Header setUser={setUser} />
      </section>

      <section className="login-page__section">
        <div className="container">
        <Link
          className='login-page__btn text-xx-black-500'
          to='/'
        >
          Back
        </Link>
        </div>
      </section>

      <section className="login-page__section">
        <form
          onSubmit={onSubmit}
          className='login-page__form'
        >
          <h2 className="login-page__title title-xx-black-700">
            Welcome back!
          </h2>

          <span className='login-page__desc text-xx-black-400'>
            Log in to your account
          </span>

          <div className="login-page__field">
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

          <div className="login-page__field">
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
            className="login-page__forgot-btn text-xx-blue-500">
            Forgot password?
          </button>

          <button
            type='submit'
            className="login-page__login-btn button">
            Log in
          </button>

          <div className='login-page__signup-section text-xx-gray-400'>
            Don’t have an account?
            <Link
              to="/signup"
              className="login-page__signup-btn text-xx-blue-500">
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
};
