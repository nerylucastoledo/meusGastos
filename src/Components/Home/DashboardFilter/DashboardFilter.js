import React from 'react'
import PropTypes from 'prop-types'

import styles from './DashboardFilter.module.css'

function DashboardFilter({ setDateFilter, monthToday, yearToday, months, years }) {
    const [monthFilter, setMonthFilter] = React.useState(monthToday)
    const [yearFilter, setYearFilter] = React.useState(yearToday)

    React.useEffect(() => {
        setDateFilter(monthFilter + yearFilter)
    }, [monthFilter, yearFilter, setDateFilter])

    return (
        <section>
            <form className={styles.filterSelect}>
                <select
                    data-testid='selectMonth'
                    defaultValue={monthToday}
                    onChange={({target}) => setMonthFilter(target.value)}
                    >
                    <option value="" disabled>Selecione o Mês</option>
                    {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
                <select
                    data-testid='selectYear'
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

DashboardFilter.propTypes = {
    setDateFilter: PropTypes.func,
    monthToday: PropTypes.string,
    yearToday: PropTypes.number,
    months: PropTypes.array,
    years: PropTypes.array,
}