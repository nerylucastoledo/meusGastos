import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../Forms/Button'
import Input from '../../Forms/Input'

import styles from '../CreateAccount/CreateAccount.module.css'

function SignIn() {
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  async function login(event) {
    event.preventDefault()
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      localStorage.setItem('displayName', userCredential.user.displayName)
      localStorage.setItem('login', true)
      navigate('/')
      setLoading(false)
      setError(false)
    })
    .catch(() => {
      setError('Login ou senha incorretos')
      setLoading(false)
    })
  }

  return (
    <div className='container'>
      <h1 className='title'>Faça o login</h1>
      <form className={styles.formLogin} onSubmit={login}>
        {error && <p className={styles.error}>{error}</p>}

        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="Seu e-mail"
          required
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          label="Senha"
          id="password"
          type="password"
          placeholder="Sua senha"
          required
          onChange={({ target }) => setPassword(target.value)}
        />

        {loading ? <Button disabled>Entrando...</Button> : <Button>Entrar</Button> }
      </form>

      <div className={styles.haveAccount}>
        <p>Não possui conta?</p>

        <Link to={'/login/criar'}>
          <Button>Cadastre-se</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignIn