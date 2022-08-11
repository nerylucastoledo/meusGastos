import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../../Forms/Button'
import Input from '../../Forms/Input'

import styles from '../CreateAccount/CreateAccount.module.css'

function LostPassword() {
  const [email, setEmail] = React.useState()
  const [emailSending, setEmailSending] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const auth = getAuth()

  function resetPassword(event) {
    event.preventDefault()
    setLoading(true)

    sendPasswordResetEmail(auth, email)
    .then(() => {
      setEmailSending(true)
      setTimeout(() => setLoading(false), 500)
    })
    .catch(() => {
      setError('E-mail não encontrado')
      setLoading(false)
    })
  }

  return (
    <div className='container'>
      <h1 className='title'>Resetar senha</h1>
      <form className={styles.formLogin} onSubmit={resetPassword}>
        {error && <p className={styles.error}>{error}</p>}

        {emailSending ? 
          <>
            <p className='send-password'>E-mail enviado com sucesso!</p>
            <Link to={'/login'}>
              <Button>Fazer login</Button>
            </Link>
          </>
          :
          <>
            <Input
              label="E-mail"
              id="email"
              type="email"
              placeholder="Seu e-mail"
              required
              onChange={({ target }) => setEmail(target.value)}
            />
            {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button> }
          </>
          }
      </form>

      {!emailSending &&
        <div className={styles.haveAccount}>
          <p>Faça o login</p>
          <Link to={'/login'}>
            <Button>Acessar conta</Button>
          </Link>
        </div>
      }
    </div>
  )
}

export default LostPassword