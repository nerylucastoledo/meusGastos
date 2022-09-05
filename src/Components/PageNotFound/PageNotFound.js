import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Forms/Button'

function PageNotFound() {
  return (
    <div
    style={{textAlign: 'center', marginTop: '40px'}}
    >
      <h1 style={{color: '#aa1'}}>Aonde você pensa que vai o_O</h1>
      <h2 style={{marginTop: '20px', color: '#222'}}>Essa página não existe :(</h2>
      <Link to={"/"}>
        <Button>Página inicial</Button>
      </Link>
    </div>
  )
}

export default PageNotFound