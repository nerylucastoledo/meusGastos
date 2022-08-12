import React from 'react'
import styles from './TotalUser.module.css'

function TotalUser({ data }) {
    const [valueTotal, setValueTotal] = React.useState(0)

    React.useEffect(() => {
        setValueTotal(0)
        filterCards()

        function filterCards() {
            Object.keys(data).forEach(card => filterPeople(card))
        }
    
        function filterPeople(card) {
            Object.keys(data[card]).forEach(people => {
                if (people !== 'cor' && people === 'Eu') getValueTotal(card, people)
            })
        }
    
        function getValueTotal(card, people) {
            Object.keys(data[card][people]).forEach(item => {
                const valor = data[card][people][item]['valor']
                console.log(valor)
                setValueTotal((last) => last + valor)
            })
        }
    }, [data])

  return (
    <div className={styles.totalUser}>
        <p>Sua parte: <strong>R$ {valueTotal}</strong></p>
    </div>
  )
}

export default TotalUser