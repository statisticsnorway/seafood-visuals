import React from 'react'
import { Container, Divider, List } from 'semantic-ui-react'
import { Divider as SSBDivider } from '@statisticsnorway/ssb-component-library'

import { UI } from '../enums/UI'

function Footer () {
  return (
    <Container fluid textAlign='center'>
      <SSBDivider light />
      <Divider hidden />
      <List horizontal divided link size='small'>
        <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }} />
        <List.Item content={`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`} />
      </List>
      <Divider hidden />
    </Container>
  )
}

export default Footer
