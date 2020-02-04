import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import AnimatedNumber from 'animated-number-react'
import { Divider } from 'semantic-ui-react'
import { KeyFigures, Text } from '@statisticsnorway/ssb-component-library'

import Fish from '../media/Fish.svg'
import ErrorMessage from './ErrorMessage'
import { getCurrentTime, useInterval } from '../utilities/Utilities'
import { API } from '../enums/API'
import { UI } from '../enums/UI'

function Seafood () {
  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_API}${API.SEAFOOD}`, { cache: false }
  )
  const [lastSyncronized, setLastSyncronized] = useState(getCurrentTime())
  const [previousValue, setPreviousValue] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  const [runningValue, setRunningValue] = useState(0)

  useInterval(() => {
    if (!loading && !error) {
      refetch()
      setPreviousValue(currentValue)
      setCurrentValue(data)
      setLastSyncronized(getCurrentTime())
    }
  }, 10000)

  useInterval(() => {
    if (previousValue !== currentValue) {
      setRunningValue(runningValue + ((currentValue - previousValue) / 20))
    }
  }, 500)

  return (
    <>
      <Divider hidden />
      <>
        <KeyFigures
          number={
            <AnimatedNumber
              value={runningValue}
              formatValue={value => value.toFixed(0)}
            />
          }
          title={UI.TITLE}
          numberDescription={UI.NUMBER_DESCRIPTION}
          time={UI.TIME}
          size="large"
          icon={<img alt={UI.TITLE} src={Fish} />}
          glossary={UI.GLOSSARY}
        />
        <Divider hidden />
        <Text small>{lastSyncronized}</Text>
        <Divider hidden />
      </>
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default Seafood
