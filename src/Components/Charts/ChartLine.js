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

            const dateModified = `${month}20${year}`
            Object.keys(allData[dateModified]).forEach(card => {
                if (allData[dateModified][card]['Eu']) {
                    Object.keys(allData[dateModified][card]['Eu']).forEach(item => {
                        SumValue += allData[dateModified][card]['Eu'][item]['valor']
                    })
                }
            })
            setValuesTotal((last) => [...last, SumValue.toFixed(2)])
        }
    }, [allData, date])

    const state = {
        series: [{
            name: "Gastos",
            data: valuesTotal.reverse()
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
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
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: monthsTotal.reverse()
          }
        },
      }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartLine