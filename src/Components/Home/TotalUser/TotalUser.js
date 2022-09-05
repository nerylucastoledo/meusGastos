import React from 'react'
import PropTypes from 'prop-types'

import { convert } from '../../Helpers'
import styles from './TotalUser.module.css'

function TotalUser({ data }) {
    const [valueTotal, setValueTotal] = React.useState(0)

    React.useEffect(() => {
        setValueTotal(0)
        filterCards()

        function filterCards() {
            Object.keys(data).forEach(card => getValueTotal(card))
        }

        function getValueTotal(card) {
            if (data[card]['Eu']) {
                Object.keys(data[card]['Eu']).forEach(item => {
                    const valor = data[card]['Eu'][item]['valor']
                    setValueTotal((last) => last + valor)
                })
            }
        }
    }, [data])

  return (
    <div className={styles.totalUser}>
        <p>Sua parte: <strong>{convert(valueTotal)}</strong></p>
    </div>
  )
}

export default TotalUser
TotalUser.propTypes = {
    data: PropTypes.object,
}