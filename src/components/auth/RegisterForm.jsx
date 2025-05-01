import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { validateRegistrationForm } from '../../utils/validation';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === 'confirmPassword' || (name === 'password' && userData.confirmPassword)) {
      if (name === 'password' && value !== userData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Паролі не співпадають' }));
      } else if (name === 'confirmPassword' && value !== userData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Паролі не співпадають' }));
      } else {
        const newErrors = { ...errors };
        delete newErrors.confirmPassword;
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Паролі не співпадають' }));
      return;
    }

    try {
      const validationResult = validateRegistrationForm(userData);
      console.log(validationResult);
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        return;
      }

      const { confirmPassword, ...registrationData } = userData;
      console.log("here")
      console.log(registrationData);
      const response = await register(registrationData);
      console.log(response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        authLogin(response.user);
        navigate('/profile');
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Помилка реєстрації' });
    }
  };

  return (
    <div className="register-form">
      <h2 className="text-2xl mb-4 text-center">Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Електронна пошта"
          value={userData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          type="password"
          name="password"
          label="Пароль"
          value={userData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Підтвердження паролю"
          value={userData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Роль
          </label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="user">Військовослужбовець</option>
            <option value="logistician">Логіст</option>
          </select>
        </div>

        {errors.submit && <p className="text-red-500 mb-4">{errors.submit}</p>}
        <Button type="submit" className="w-full bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-md transition-colors">
          Зареєструватися
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;