import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validatePassword } from '../utils/validations';
import { registerUser } from '../service/nativeAPIRequest';
import { setUser } from '../utils/localstorage';
import '../styles/register.css';
import logoMarvel from '../images/logoM.jpg';

export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
      setUser(name, email, password);
    }
  }, [email, password, name]);

  const setUserOnAPI = async () => {
    const requestAPI = await registerUser(name, email, password);
    return requestAPI;
  };

  const timeMessage = () => {
    setTimeout(function () {
      history.push('/')
    }, 1300)
  }

  const handleClick = async () => {
    await setUserOnAPI();
    setMessage('Registration successful! Please log in');
    timeMessage();
  }

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    if (field === 'Name') return setName(value);
    return setPassword(value);
  };

  return (
    <div className="register-container">
      <img className='logo-marvel-register' src={logoMarvel} alt='logo marvel' />
    <form className="register-form">
      <Input
        title="Nome"
        type="text"
        value={name}
        onChange={setField}
        placeholder="nome usuário"
      />
      <Input
        title="E-mail"
        type="text"
        value={email}
        onChange={setField}
        placeholder="e-mail usuário"
      />
      <Input
        title="Senha"
        type="password"
        value={password}
        onChange={setField}
        placeholder="senha usuário"
      />
      <Button
        className="button-register button"
        title="Register"
        isDisabled={isDisabled}
        onClick={() => handleClick() }
      />
    </form>
      {message ? <span>{message}</span> : null}
    </div>
  );
}