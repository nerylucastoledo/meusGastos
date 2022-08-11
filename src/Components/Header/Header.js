import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

function Header() {
    const [mobileMenu, setMobileMenu] = React.useState(false)
    const pathname = useLocation()

    React.useEffect(() => {
      setMobileMenu(false)
    }, [pathname])

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
          <NavLink to="/novo-cartao">Cadastrar Cartão</NavLink>
        </nav>
      </header>
    )
}

export default Header