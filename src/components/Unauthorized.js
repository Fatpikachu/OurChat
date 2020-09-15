import React from 'react';
import { Link } from 'react-router-dom';
// import 'styles.css';

const Unauthorized = () => {
  return (
    <div className='container'>
      This page is unauthorized. Please login.
      <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default Unauthorized;