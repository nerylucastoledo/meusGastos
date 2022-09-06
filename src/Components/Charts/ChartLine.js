import React from 'react'
import Chart from 'react-apexcharts'

import { DatabaseContext } from '../../DatabaseContext'

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

function ChartLine() {
    const { allData, date } = React.useContext(DatabaseContext)
    const [valuesTotal, setValuesTotal] = React.useState([])
    const [monthsTotal, setMonthsTotal] = React.useState([])

    React.useEffect(() => {
      setValuesTotal([])
      setMonthsTotal([])

      var [currentMonth, currentYear] = date.split(20)
      var indexOfMonth = months.indexOf(currentMonth)

      for (let i = indexOfMonth; i >= 0; i--) {
        setMonthsTotal((last) => [...last, months[i]])
        filterCards(months[i], currentYear)
      }

      function filterCards(month, year) {
        let SumValue = 0
        const monthAndYear = `${month}20${year}`

        if (allData[monthAndYear]) {
          Object.keys(allData[monthAndYear]).forEach(card => {
            const dataFromCardToMe = allData[monthAndYear][card]['Eu']

            if (dataFromCardToMe) {
              Object.keys(dataFromCardToMe).forEach(item => {
                SumValue += dataFromCardToMe[item]['valor']
              })
            }
          })
        }
        if(SumValue) setValuesTotal((last) => [...last, SumValue.toFixed(2)])
      }
    }, [allData, date])

    const state = {
      series: [{
        name: "Gastos",
        data: valuesTotal.reverse()
      }],
      options: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Gastos por meses do ano',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: monthsTotal.reverse()
        }
      },
    }

  return (
    <div className="chartLine">
      {valuesTotal.length && monthsTotal.length ? (
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={250}
            />
          </div>
        </div>
      ) : <p></p>}
    </div>
  )
}

export default ChartLine