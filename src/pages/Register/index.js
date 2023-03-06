import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import ButtonComponent from '../../components/Button';

import { auth, registerWithEmailAndPassword } from '../../services/firebase';
import notify from '../../utils/notifyToast';
import { userLogged } from '../../redux/actions/AuthActions';
import { isValidEmail } from '../../utils';

import './Register.scss';

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/home/characters');
      dispatch(userLogged());
    }
  }, [user, loading]);

  const handleSubmit = () => {
    if (password.length < 6) {
      notify(
        'error',
        '!Hola, por favor valida que tu contraseña tenga 6 o más carácteres!',
        'error_pwd'
      );
    } else if (!isValidEmail(email)) {
      notify(
        'error',
        '!Hola, por favor escribe un correo válido!',
        'error_pwd'
      );
    } else if (name.length < 1) {
      notify(
        'error',
        '!Hola, por favor escribe tu nombre completo!',
        'error_name'
      );
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

  return (
    <div className='register'>
      <h1>Rick & Morty Test</h1>
      <div className='register__container'>
        <input
          type='text'
          className='register__textBox'
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder='Full Name'
        />
        <input
          type='text'
          className='register__textBox'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder='E-mail Address'
        />
        <input
          type='password'
          className='register__textBox'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder='Password'
        />
        <ButtonComponent
          id='register-btn'
          type='button'
          className='register__btn'
          action={() => handleSubmit()}
          text='Register'
        />
        <span>
          Already have an account? <Link to='/'>Login</Link> now.
        </span>
      </div>
    </div>
  );
}
export default Register;
