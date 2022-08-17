import React from 'react'
import { Link } from 'react-router-dom'
import { DatabaseContext } from '../../../DatabaseContext'

import DashboardFilter from '../DashboardFilter/DashboardFilter'
import Button from '../../Forms/Button'

import styles from './Dashboard.module.css'
import DashboardCards from '../DashboardCards/DashboardCards'
import TotalUser from '../TotalUser/TotalUser'

const months = [
  'janeiro', 
  'fevereiro', 
  'março', 
  'abril', 
  'maio', 
  'junho', 
  'julho', 
  'agosto', 
  'setembro', 
  'outubro', 
  'novembro', 
  'dezembro'
]
const years = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

function Dashboard() {
  const date = new Date()
  const { setDate, data, cards } = React.useContext(DatabaseContext)
  const [dateFilter, setDateFilter] = React.useState(months[date.getMonth()] + date.getFullYear())
  console.log(data)
  React.useEffect(() => {
    setDate(dateFilter)
  }, [dateFilter, setDate])

  return (
    <section className='container'>
      <DashboardFilter 
        setDateFilter={setDateFilter} 
        monthToday={months[date.getMonth()]}
        yearToday={date.getFullYear()}
        months={months}
        years={years}
      />
      {Object.keys(data).length ?
        <>
          {cards.map((card) => (
            <DashboardCards 
              key={card} 
              data={data[card]} 
              card={card}k
            />
          ))}

          <TotalUser data={data}/>
        </>
        :
        <div className={`container ${styles.notFound}`}>
          <p>Nenhum dado encontrado :(</p>
          <Link to={'/new-card'}><Button>Cadastrar cartão</Button></Link>
        </div>
      }
    </section>
  )
}

export default Dashboard