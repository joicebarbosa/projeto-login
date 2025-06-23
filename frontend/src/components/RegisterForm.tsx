// frontend/src/components/RegisterForm.tsx
import React, { useState } from 'react';
import InputField from './InputField';
import '../styles/Form.css';
import { registerUser } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const [passwordHasMinLength, setPasswordHasMinLength] = useState(false);
  const [passwordHasUpperCase, setPasswordHasUpperCase] = useState(false);
  const [passwordHasSpecialChar, setPasswordHasSpecialChar] = useState(false);

  const navigate = useNavigate();

  // --- FUNÇÃO DE VALIDAÇÃO DE NOME ATUALIZADA ---
  const validateName = (name: string): string | null => {
    // Regex para "nome.sobrenome"
    // Permite letras (maiúsculas/minúsculas, acentuadas) antes e depois do ponto
    // Garante que haja pelo menos um caractere antes e depois do ponto
    // E apenas um ponto para separar nome e sobrenome
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F]+(?:\s[a-zA-ZÀ-ÿ\u00C0-\u017F]+)*\.[a-zA-ZÀ-ÿ\u00C0-\u017F]+(?:\s[a-zA-ZÀ-ÿ\u00C0-\u017F]+)*$/;

    if (!name.trim()) {
      return 'O nome é obrigatório.';
    }
    if (!nameRegex.test(name)) {
      return 'O nome deve estar no formato "nome.sobrenome" (ex: "joice.silva").';
    }
    return null;
  };
  // -----------------------------------------------

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'O email é obrigatório.';
    }
    if (!emailRegex.test(email)) {
      return 'Formato de email inválido.';
    }
    return null;
  };

  const validatePassword = (pwd: string): string | null => {
    const minLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    setPasswordHasMinLength(minLength);
    setPasswordHasUpperCase(hasUpperCase);
    setPasswordHasSpecialChar(hasSpecialChar);

    if (!minLength) {
      return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (!hasUpperCase) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!hasSpecialChar) {
      return 'A senha deve conter pelo menos um caractere especial.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmPassErr = password !== confirmPassword ? 'As senhas não coincidem.' : null;

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passErr);
    setConfirmPasswordError(confirmPassErr);

    const allPasswordRulesMet = passwordHasMinLength && passwordHasUpperCase && passwordHasSpecialChar;

    if (nameErr || emailErr || passErr || confirmPassErr || !allPasswordRulesMet) {
      setFormError('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      const newUser = await registerUser(name, email, password);
      console.log('Usuário registrado com sucesso:', newUser);
      setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para o login...');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordHasMinLength(false);
      setPasswordHasUpperCase(false);
      setPasswordHasSpecialChar(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setFormError(err.response.data.message || 'Erro da API desconhecido.');
      } else if (err instanceof Error) {
        setFormError(err.message || 'Ocorreu um erro inesperado.');
      } else {
        setFormError('Ocorreu um erro desconhecido.');
      }
      console.error('Erro de registro no frontend:', err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Cadastro</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {formError && <p className="form-error-message">{formError}</p>}

      <InputField
        label="Nome"
        id="register-name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(validateName(e.target.value));
        }}
        // --- ATUALIZE O PLACEHOLDER ---
        placeholder="nome.sobrenome (ex: joice.silva)"
        // -----------------------------
        error={nameError}
      />

      <InputField
        label="Email"
        id="register-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(validateEmail(e.target.value));
        }}
        placeholder="seu.email@exemplo.com"
        error={emailError}
      />

      <InputField
        label="Senha"
        id="register-password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(validatePassword(e.target.value));
          if (confirmPassword) {
            setConfirmPasswordError(e.target.value !== confirmPassword ? 'As senhas não coincidem.' : null);
          }
        }}
        placeholder="Mínimo 8 caracteres, 1 maiúscula, 1 especial"
        error={passwordError}
      />

      {/* --- BLOCO DE FEEDBACK VISUAL PARA SENHA (Sem alterações neste bloco) --- */}
      {password && (
        <div className="password-rules">
          <label className={passwordHasMinLength ? 'rule-met' : 'rule-not-met'}>
            <input type="checkbox" checked={passwordHasMinLength} disabled />
            Mínimo 8 caracteres
          </label>
          <label className={passwordHasUpperCase ? 'rule-met' : 'rule-not-met'}>
            <input type="checkbox" checked={passwordHasUpperCase} disabled />
            Pelo menos 1 letra maiúscula
          </label>
          <label className={passwordHasSpecialChar ? 'rule-met' : 'rule-not-met'}>
            <input type="checkbox" checked={passwordHasSpecialChar} disabled />
            Pelo menos 1 caractere especial (!@#$...)
          </label>
        </div>
      )}
      {/* ------------------------------------------------------------- */}

      <InputField
        label="Confirme a Senha"
        id="register-confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(e.target.value !== password ? 'As senhas não coincidem.' : null);
        }}
        placeholder="Confirme sua senha"
        error={confirmPasswordError}
      />

      <button type="submit" className="form-button">Cadastrar</button>

      <p className="form-link-text">
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </form>
  );
};

export default RegisterForm;