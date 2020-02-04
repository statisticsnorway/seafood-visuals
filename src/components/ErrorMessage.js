import React from 'react'
import { Dialog } from '@statisticsnorway/ssb-component-library'

import { getNestedObject } from '../utilities/Utilities'
import { API } from '../enums/API'
import { UI } from '../enums/UI'

function ErrorMessage ({ error }) {
  const resolveError = getNestedObject(error, API.NESTED_ERROR)

  return (
    <Dialog type='warning' title={UI.ERROR}>
      {resolveError === undefined ? error.toString() : resolveError}
    </Dialog>
  )
}

export default ErrorMessage
