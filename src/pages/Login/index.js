import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'

import ButtonComponent from '../../components/Button'

import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../../services/firebase'
import notify from '../../utils/notifyToast'
import { isValidEmail } from '../../utils'
import { userLogged } from '../../redux/actions/AuthActions'

import './Login.scss'

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      navigate('/home')
      dispatch(userLogged())
    }
  }, [user, loading])

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
    } else {
      signInWithEmailAndPassword(email, password)
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
          action={signInWithGoogle}
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
