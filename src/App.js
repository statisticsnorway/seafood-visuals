import React from 'react'
import { Grid } from 'semantic-ui-react'

import Footer from './components/Footer'
import Seafood from './components/Seafood'
import SeafoodHistory from './components/SeafoodHistory'

function App () {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', background: '#f0f8f9' }}>
      <div style={{ flex: 1 }}>
        <Grid textAlign='center'>
          <Grid.Column mobile={16} tablet={12} computer={8} style={{ marginTop: '2em' }}>
            <Seafood />
          </Grid.Column>
        </Grid>
        <Grid textAlign='center'>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <SeafoodHistory />
          </Grid.Column>
        </Grid>
      </div>
      <Footer />
    </div>
  )
}

export default App
