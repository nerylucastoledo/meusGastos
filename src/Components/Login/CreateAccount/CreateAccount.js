import React from 'react'
import Input from '../../Forms/Input'
import Button from '../../Forms/Button'

import styles from './CreateAccount.module.css'

import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database"

import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firebaseConfig';

function CreateAccount() {
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [repeatPassword, setRepeatPassword] = React.useState()
  const [usuario, setUsuario] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  function create(event) {
    event.preventDefault()
    let userExists = false
    const formatUser = usuario.replace(' ', '')
    setLoading(true)

    const database = ref(db, formatUser)
    onValue(database, (snapshot) => userExists = snapshot.exists())

    if (verifyPasswords() && !userExists) {
      createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: formatUser })
        .then(() => {
          localStorage.setItem('displayName', formatUser)
          localStorage.setItem('login', true)
          setLoading(false)
          setError(false)
          navigate('/')
        })
      })
      .catch(() => {
        setError('Tente com outro e-mail ou usuário')
        setLoading(false)
      })
    }
  }

  function verifyPasswords() {
    if (password !== repeatPassword) {
      setError('Senha não conferem!')
      setLoading(false)
    }
    return password === repeatPassword
  }

  return (
    <div className='container'>
      <h1 className='title'>Crie sua conta</h1>
      <form className={styles.formLogin} onSubmit={create}>
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
          label="Usuário" 
          id="usuario" 
          type="text" 
          placeholder="Seu usuário"
          required
          onChange={({target}) => setUsuario(target.value)}
        />

        <Input
          label="Senha"
          id="password"
          type="password"
          placeholder="Sua senha"
          required
          onChange={({ target }) => setPassword(target.value)}
        />

        <Input
          label="Senha novamente"
          id="passwordRepeat"
          type="password"
          placeholder="Digite novamente a senha"
          required
          onChange={({ target }) => setRepeatPassword(target.value)}
        />

        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button> }
      </form>

      <div className={styles.haveAccount}>
        <p>Já tem uma conta?</p>

        <Link to={'/login'}>
          <Button>Faça o login</Button>
        </Link>
      </div>
    </div>
  )
}

export default CreateAccount