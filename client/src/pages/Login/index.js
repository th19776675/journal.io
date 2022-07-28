import React, { useState, useEffect } from 'react'; 
import Logo from '../../components/Header/Logo'
import LoginCard from "../../components/Forms/LoginCard"
import SignupCard from "../../components/Forms/SignupCard"
import './login.css';

const Login = () => {
  return (
    <>
      <main className='login-main'>
        <section className='login-section'>
          <Logo />
        </section>
        <section className='login-section'>
          <div className="login-wrapper">
            <LoginCard />
          </div>
          <div className="signup-wrapper">
            <SignupCard />

          </div>
        </section>
      </main>
     </>
  )
}

export default Login;