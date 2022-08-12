import React from 'react'
import styles from './DashboardCards.module.css'

function DashboardCards({ data, card }) {
    const [valueInvoice, setValueInvoice] = React.useState()

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

    return (
        <div className={styles.cardBox} style={{ backgroundColor: data['cor']}}>
            <h1>{card}</h1>
            <p>R$ {valueInvoice}</p>
        </div>
    )
}

export default DashboardCards