import React from 'react'
import PropTypes from 'prop-types'

import Chart from 'react-apexcharts'

function ChartPie({ data, categorys }) {
  const [labelCategory, setLabelCategory] = React.useState([])
  const [seriesCategory, setSeriesCategory] = React.useState([])

  React.useEffect(() => {
    setLabelCategory([])
    setSeriesCategory([])
    var objetAux = {}

    Object.keys(data).forEach(card => filterPeople(card))

    function filterPeople(card) {
      if (data[card]['Eu']) {
        Object.keys(data[card]['Eu']).forEach(item => {
          const nameCategory = data[card]['Eu'][item]['categoria']
          const valor = data[card]['Eu'][item]['valor']

          if (objetAux[nameCategory]) {
            objetAux[nameCategory] += valor
          } else {
            objetAux[nameCategory] = valor
          }
        })
      }
    }

    categorys.forEach((item) => {
      if(objetAux[item] !== undefined) {
        setLabelCategory((last) => [...last, item])
        setSeriesCategory((last) => [...last, objetAux[item]])
      }
    })

  }, [data, categorys])

  const state = {
    series: [...seriesCategory],
    chartOptions: {
      labels: [...labelCategory],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        options: {
          legend: {
            position: 'center'
          }
        }
      }]
    }
  }

  return (
    <div className="chartPie">
      {labelCategory.length && seriesCategory.length ? (
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.chartOptions}
              series={state.series}
              type="donut"
            />
          </div>
        </div>
      ) : <p></p>}
    </div>
  )
}

export default ChartPie

ChartPie.propTypes = {
  data: PropTypes.object,
  categorys: PropTypes.array,
}