import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { UserContext } from "../../app/context/UserContext";

import { loginService } from "../../services/Auth/loginService";
import { registrationService } from "../../services/Auth/registrationService";
import { recoveryService } from "../../services/Auth/recoveryService";

import { LoginRegisterCard } from "../../components/organism/LoginRegisterCard/LoginRegisterCard";

import './Login.css'

function Login() {
  const { setTokenSession, urlBackend } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [formStatus, setFormStatus] = useState({
    values: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validations: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) {
      return 'Email obligatorio';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Email inválido';
    } else {
      return '';
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Contraseña obligatoria';
    }
    return null;
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      return 'Confirma contraseña obligatorio';
    }
    if (formStatus.values.password !== value) {
      return 'Confirmacion de contraseña y contraseña deben ser iguales ';
    }
    return null;
  };

  const validateOne = (e) => {
    const { name } = e.target
    const value = formStatus.values[name];
    let message = '';

    switch (name) {
      case 'email':
        message = validateEmail(value);
        break;
      case 'password':
        message = validatePassword(value);
        break;
      case 'confirmPassword':
        message = validateConfirmPassword(value);
        break;
      default:
        break;
    }

    const newFormStatus = { ...formStatus };
    newFormStatus.validations[name] = message;
    setFormStatus(newFormStatus)
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormStatus = { ...formStatus };
    newFormStatus.values[name] = value;
    setFormStatus(newFormStatus)
  };

  const validateAll = (action) => {
    const { email, password } = formStatus.values;
    const validations = { email: '', password: '' };

    validations.email = validateEmail(email)
    validations.password = validatePassword(password)

    if (action !== 'login') {
      validations.confirmPassword = validateConfirmPassword(password)
    }

    const validationMesages = Object.values(validations).filter(
      (validationMessage) => {
        if (validationMessage) {
          return validationMessage.length > 0;
        }
      }
    )

    const isValid = !validationMesages.length;

    if (!isValid) {
      const newFormStatus = { ...formStatus };
      newFormStatus.validations = validations;
      setFormStatus(newFormStatus);
      return;
    }

    if (isValid && action === 'login') {
      setIsLogin(true);
    } else if (isValid && action !== 'login') {
      setIsRegistering(true);
    }

  };

  useEffect(() => {
    async function loginUser() {
      const data = await loginService(urlBackend, formStatus.values.email, formStatus.values.password);
      if (data) {
        if (data.token) {
          setError(null);
          setIsLogin(false);
          setTokenSession(data);
          navigate('/todo-app');
        } else {
          setIsLogin(false);
          setError('Error en correo o contraseña');
        }
      }
    }
    if (isLogin) {
      loginUser();
    }
  }, [isLogin]);

  useEffect(() => {
    async function recoveryUser() {
      const data = await recoveryService(urlBackend, formStatus.values.email);
      setIsRecovering(false);
    }
    if (isRecovering) {
      recoveryUser();
    }
  }, [isRecovering]);

  useEffect(() => {
    async function fetchRegister() {
      const data = await registrationService(urlBackend, formStatus.values.email, formStatus.values.password);
      if (data) {
        if (data.message === 'user created') {
          setError(data.message);
          setIsRegistering(false);
          setIsLogin(true);
        } else {
          setError("No se pudo realizar el registro");
          setIsRegistering(false);
        }
      }
    }
    if (isRegistering) {
      fetchRegister();
    }
  }, [isRegistering]);

  if (isLogin) {
    return (
      <div>
        <h1>Iniciando Sesion...</h1>
      </div>
    );
  }

  return (
    <div className="loginRegisterCard-Container">
      <LoginRegisterCard
        formStatus={formStatus}
        handleChange={handleChange}
        validateOne={validateOne}
        validateAll={validateAll}
        error={error}
      />
    </div>

  );
}

export { Login };