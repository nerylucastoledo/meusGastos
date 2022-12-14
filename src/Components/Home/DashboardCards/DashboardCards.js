import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'
import { convert } from '../../Helpers'
import styles from './DashboardCards.module.css'

function DashboardCards({ data, card }) {
    const [valueInvoice, setValueInvoice] = React.useState()
    const navigate = useNavigate()

    React.useEffect(() => {
        setValueInvoice(0)
        Object.keys(data).forEach(people => {
            if (people !== 'cor') {
                Object.keys(data[people]).forEach(item => {
                    const valor = data[people][item]['valor']
                    setValueInvoice((last) => last + valor)
                })
            }
        })
    }, [data])

    function acessInvoice() {
        navigate(`/invoice/${card}`)
    }

    return (
        <div
            className={styles.cardBox}
            style={{ backgroundColor: data['cor'] }}
            onClick={acessInvoice}
            >
            <h1>{card}</h1>
            <p>{convert(valueInvoice)}</p>
        </div>
    )
}

export default DashboardCards

DashboardCards.propTypes = {
    data: PropTypes.object,
    card: PropTypes.string,
  }