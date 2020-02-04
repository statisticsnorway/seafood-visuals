import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Line } from 'react-chartjs-2'
import { Divider } from 'semantic-ui-react'

import ErrorMessage from './ErrorMessage'
import { useInterval } from '../utilities/Utilities'
import { API } from '../enums/API'
import { UI } from '../enums/UI'

function SeafoodHistory () {
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_API}${API.SEAFOOD_HISTORY}`, { cache: false }
  )
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: UI.ACCUMULATED,
      data: [],
      backgroundColor: UI.SSB_LIGHT_GREEN,
      borderColor: UI.SSB_GREEN
    }]
  })
  const [previousData, setPreviousData] = useState([])
  const [currentData, setCurrentData] = useState([])

  useInterval(() => {
    if (!loading && !error) {
      refetch()
      setPreviousData(currentData)
      setCurrentData(data)
    }
  }, 10000)

  useEffect(() => {
    if (previousData.length !== 0 && !loading && !error) {
      const statisticalValues = previousData.map(element => element[API.VALUE])
      const statisticalValuesAccumulated = []

      statisticalValues.reduce(function (a, b, i) {
        return statisticalValuesAccumulated[i] = a + b
      }, 0)

      const parsedChartData = {
        labels: previousData.map(element =>
          `${new Date(element[API.LOADED]).toLocaleDateString().slice(0, -5)} - ${new Date(element[API.LOADED])
            .toLocaleTimeString()
          }`
        ),
        datasets: [{
          label: UI.ACCUMULATED,
          data: statisticalValuesAccumulated,
          backgroundColor: UI.SSB_LIGHT_GREEN,
          borderColor: UI.SSB_GREEN
        }]
      }

      setChartData(parsedChartData)
    }
  }, [previousData, error, loading])

  return (
    <>
      {!error &&
      <>
        <Line data={chartData} />
        <Divider hidden />
      </>
      }
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default SeafoodHistory
