import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentPage.scss'

export const PaymentPage: React.FC = () => {
  return (
    <div className='payment-page'>
      <div>
        <h1>PAYMENT</h1>
      </div>

      <div>
        <Link to="/home">go home</Link>
      </div>

      <div>
        <Link to="/auth">AUTH</Link>
      </div>
    </div>
  )
};
