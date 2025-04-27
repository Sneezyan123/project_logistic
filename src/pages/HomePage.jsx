import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate('/storage');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-title-card">
          <h1 className="hero-title">Вітаємо!</h1>
          <p className="hero-subtitle">З'єднуємо потребу з допомогою</p>
        </div>
        
        <div className="hero-text-card">
          <p>"Забезпечено" — це сучасна логістична платформа, яка об'єднує військових, державу і логістів задля швидкого та ефективного постачання всього необхідного на фронт.</p>
        </div>

        <div className="hero-buttons">
          <button onClick={handleStartClick} className="primary-button">
            Почати роботу
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <Link to="/about" className="secondary-button">
            Дізнатися більше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;