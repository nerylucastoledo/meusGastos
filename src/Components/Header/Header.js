import { getAuth } from 'firebase/auth'
import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

function Header() {
    const [mobileMenu, setMobileMenu] = React.useState(false)
    const pathname = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    const logged = localStorage.getItem('login') || null

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
        <Link to="/" aria-label='Dogs - Home'>
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
          {logged && <p onClick={signOut}>Sair</p>}
        </nav>
      </header>
    )
}

export default Header