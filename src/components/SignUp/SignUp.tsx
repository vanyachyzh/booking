import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import { Field } from '../Field';
import { Link, useNavigate } from 'react-router-dom';
import { Warning, Error, User } from '../../types';


const initialWarnings = {
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const initialError = {
  email: '',
  password: '',
}

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
const nameRegex = new RegExp("^[a-zA-Z]{4,}$");




export const SignUp: React.FC<Props> = ({ setUser }) => {
  const [warning, setWarning] = useState<Warning>(initialWarnings);
  const [error, setError] = useState<Error>(initialError)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();
  const thesame = password === confirmPassword;
  console.log(thesame)



  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
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

    if (!surname) {
      setWarning(prev => ({
        ...prev,
        surname: 'You have to fill in this field',
      }));
    }

    if (!name) {
      setWarning(prev => ({
        ...prev,
        name: 'You have to fill in this field',
      }));
    }

    if (!password) {
      setWarning(prev => ({
        ...prev,
        password: 'You have to fill in this field',
      }));
    }

    if (!confirmPassword) {
      setWarning(prev => ({
        ...prev,
        password: 'You have to fill in this field',
      }));
    }

    if (confirmPassword !== password) {
      setWarning(prev => ({
        ...prev,
        password: 'Passwords are not the same',
      }));

      setWarning(prev => ({
        ...prev,
        password: 'Passwords are not the same',
      }));
    }

    if (name && email && password && confirmPassword
      && password && confirmPassword && surname && password && emailRegex.test(email)) {
        fetch('http://travelers-env.eba-udpubcph.eu-north-1.elasticbeanstalk.com/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              firstName: name,
              lastName: surname,
              email: email,
              telephone: "3123123",
              password
            })
        })
          .then(res => {
            if (res.status === 200) {
              console.log('you are in')

              setUser({
                name,
                surname,
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
    
  }

  

  return (
    <div className="signup-container">
      <form onSubmit={onSubmit} className='signup'>
        {/* <input type='button' className='signup__cross' /> */}

        <h2 className="signup__title title-xx-black-700">
        Hi, there!
        </h2>

        <span className='signup__desc text-xx-black-400'>
        Create an account
        </span>

        <div className="signup__field">
          <Field
            placeholder='Enter your first name'
            error={null}
            warning={warning.name}
            label='name'
            helper='Invalid email'
            value={name}
            setValue={setName}
            setWarning={setWarning}
            pattern={nameRegex}
          />
        </div>

        <div className="signup__field">
          <Field
            placeholder='Enter your last name'
            error={null}
            warning={warning.surname}
            label='surname'
            helper='Invalid email'
            value={surname}
            setValue={setSurname}
            setWarning={setWarning}
            pattern={nameRegex}
          />
        </div>

        <div className="signup__field">
          <Field
            placeholder='Enter your email address'
            pattern={emailRegex}
            error={error.email}
            warning={warning.email}
            label='email'
            helper='Invalid email'
            value={email}
            setValue={setEmail}
            setWarning={setWarning}
            setError={setError}
          />
        </div>

        <div className="signup__field">
          <Field
            placeholder='Create a password (min 8 chars)'
            error={null}
            warning={warning.password}
            label='password'
            helper='Invalid email'
            value={password}
            setValue={setPassword}
            setWarning={setWarning}
            pattern={passwordRegex}
            password={thesame}
          />
        </div>


        <div className="signup__field">
          <Field
            placeholder='Repeat the password'
            error={null}
            warning={warning.password}
            label='password'
            helper='Invalid password'
            value={confirmPassword}
            setValue={setConfirmPassword}
            setWarning={setWarning}
            pattern={passwordRegex}
            password={thesame}
          />
        </div>

        <button className="signup__login-btn button">
          Sign Up
        </button>


        <div className='signup__signup-section text-xx-gray-400'>
        Already have an account?
          <Link
            to="/login"
            className="signup__signup-btn text-xx-blue-500">
            Log In
          </Link>
        </div>



      </form>
    </div>
  )
};
