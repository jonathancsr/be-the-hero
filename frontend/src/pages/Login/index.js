import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form>
          <h1>Faça seu login</h1>
          <form onSubmit={handleLogin}>
            <input placeholder="Sua Id" value={id} onChange={e => setId(e.target.value)} />
            <button type="submit" className="button">
              Entrar
            </button>
          </form>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heros" />
    </div>
  );
}
