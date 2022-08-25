import React from 'react'

import { getAuth } from 'firebase/auth'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../assets/logo.png'
import styles from './Header.module.css'

function Header() {
  const pathname = useLocation()
  const navigate = useNavigate()
  const auth = getAuth()

  const logged = localStorage.getItem('login') || null
  const [mobileMenu, setMobileMenu] = React.useState(false)

  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  function signOut() {
    localStorage.clear()
    auth.signOut(auth)
    .then(() => navigate('/login'))
  }

  return (
    <header className={`${styles.header} container`}>
      <Link to="/" aria-label='Meus Gastos - Home'>
        <img src={logo} alt="Logo do site" />
      </Link>

      <button 
        aria-label='Menu'
        className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
        onClick={() => setMobileMenu(!mobileMenu)}>
      </button>

      <nav className={`${styles.navMobile} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="new-expense">Inserir Gasto</NavLink>
        <NavLink to="new-card">Cadastrar Cartão</NavLink>
        <NavLink to="debts">Empréstimos</NavLink>
        {logged ? 
          <p onClick={signOut}>Sair</p> 
          : 
          <NavLink to="login">Login</NavLink>
        }
      </nav>
    </header>
  )
}

export default Header