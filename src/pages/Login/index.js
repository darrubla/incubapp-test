import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ButtonComponent from '../../components/Button'

import notify from '../../utils/notifyToast'
import { isValidEmail } from '../../utils'

import './Login.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (password.length < 6) {
      notify(
        'error',
        '!Hola, por favor valida que tu contraseña tenga 6 o más carácteres!',
        'error_pwd'
      )
    } else if (!isValidEmail(email)) {
      notify(
        'error',
        '!Hola, por favor escribe un correo válido!',
        'error_email'
      )
    }
  }

  return (
    <div className="login">
      <h1>Rick & Morty Test</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        <ButtonComponent
          type="button"
          id="Login-btn"
          className="login__btn"
          action={() => handleSubmit()}
          text="Login"
        />
        <ButtonComponent
          secondary
          id="Login-google-btn"
          type="button"
          className="login__btn login__google"
          action={() => {}}
          text="Login with Google"
        />
        <span>
          Don&apos;t have an account? <Link to="/register">Register</Link> now.
        </span>
      </div>
    </div>
  )
}
export default Login
