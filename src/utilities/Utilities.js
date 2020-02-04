import { useEffect, useRef } from 'react'
import { UI } from '../enums/UI'

// eslint-disable-next-line no-extend-native
Date.prototype.today = function () {
  return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '/' + (((this.getMonth() + 1) < 10) ? '0' : '') +
    (this.getMonth() + 1) + '/' + this.getFullYear()
}

// eslint-disable-next-line no-extend-native
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') +
    this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
}

export const getCurrentTime = () => {
  return `${UI.LAST_SYNCRONIZED}: ${new Date().today()} @ ${new Date().timeNow()}`
}

export const getNestedObject = (nestedObject, pathArray) => {
  return pathArray.reduce((object, key) =>
      (object && object[key] !== 'undefined') ? object[key] : undefined,
    nestedObject
  )
}

export function useInterval (callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick () {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
