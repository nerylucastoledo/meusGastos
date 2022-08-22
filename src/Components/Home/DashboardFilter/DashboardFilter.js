import React from 'react'
import styles from './DashboardFilter.module.css'

function DashboardFilter( { setDateFilter, monthToday, yearToday, months, years } ) {
    const [monthFilter, setMonthFilter] = React.useState(monthToday)
    const [yearFilter, setYearFilter] = React.useState(yearToday)

    React.useEffect(() => {
        setDateFilter(monthFilter + yearFilter)
    }, [monthFilter, yearFilter, setDateFilter])

    return (
        <section>
            <form className={styles.filterSelect}>
                <select 
                    defaultValue={monthToday} 
                    onChange={({target}) => setMonthFilter(target.value)}
                    >
                    <option value="" disabled>Selecione o Mês</option>
                    {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
                <select 
                    defaultValue={yearToday} 
                    onChange={({target}) => setYearFilter(target.value)}
                    >
                    <option value="" disabled>Selecione o Ano</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </form>
        </section>
    )
}

export default DashboardFilter