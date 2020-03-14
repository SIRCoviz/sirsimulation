import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'

import {
  Container,
  Header,
  TopRow,
  TopPane,
  TopPaneHeader,
  BottomRow,
  TopPaneRow,
  MapGraphContainer,
  Map,
  Graph,
  SubHeader,
  Subtext,
} from './styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Merriweather',
  },
  overrides: {
    MuiInput: {
      text: {
        // Some CSS
        color: 'white',
      },
    },
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>COVID-19 SIRmulation</Header>
        <SubHeader>
          This tool allows you to simulate the progression of the COVID19 virus
          using the SIR model.
        </SubHeader>
        <TopRow>
          <TopPane>
            <TopPaneHeader>Initial Data</TopPaneHeader>
            <TopPaneRow>
              <TextField
                id="filled-basic"
                variant="filled"
                placeholder="Location"
                size="small"
                margin="dense"
              />
            </TopPaneRow>
            <Subtext>population which you would like to simulate</Subtext>
            <TopPaneRow>
              <TextField
                id="filled-basic"
                variant="filled"
                placeholder="Current Cases"
              />
            </TopPaneRow>
            <Subtext>as of today, March 14th, 2019</Subtext>
            <TopPaneHeader>Behavior Adjustments</TopPaneHeader>
            <TopPaneRow>
              <TextField
                id="filled-basic"
                variant="filled"
                placeholder="Pre-COVID Interactions"
                size="small"
              />
            </TopPaneRow>
            <Subtext>social interactions per day, week, or month</Subtext>
            <TopPaneRow>
              <TextField
                id="filled-basic"
                variant="filled"
                placeholder="Current Interactions"
                size="small"
              />
            </TopPaneRow>
            <Subtext>social interactions per day, week, or month</Subtext>
            <Button>Start</Button>
          </TopPane>
          <TopPane>
            <TopPaneHeader>Projected Outcomes</TopPaneHeader>
            <TopPaneRow>Date hospitals overloaded</TopPaneRow>
            <TopPaneRow>Total Infections</TopPaneRow>
            <TopPaneRow>Total Deaths</TopPaneRow>
          </TopPane>
        </TopRow>
        <BottomRow>
          <MapGraphContainer>
            <Map></Map>
            <Graph></Graph>
          </MapGraphContainer>
        </BottomRow>
      </Container>
    </ThemeProvider>
  )
}
