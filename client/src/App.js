import React from 'react'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'

import {
  Container,
  StyledH1,
  StyledH2,
  StyledH3,
  MapPane,
  GraphPane,
  StyledButton,
  LeftPane,
  RightPane,
  StyledTextField,
  CenterPanesContainer,
  PanesContainer,
  Capacity,
  Infected,
  Deceased,
} from './styles'

import StateMap from './components/StateMap'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Merriweather',
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledH1>COVID-19 SIR Simulation</StyledH1>
        <StyledH2>
          This tool allows you to simulate the progression of the COVID19 virus
          using the SIR model.
        </StyledH2>
        <PanesContainer>
          <LeftPane>
            <StyledH3>Initial Data</StyledH3>
            <StyledTextField
              id="filled-basic"
              variant="filled"
              placeholder="Location"
              helperText="population which you would like to simulate"
              size="small"
            />
            <StyledTextField
              id="filled-basic"
              variant="filled"
              placeholder="Current Cases"
              helperText="as of today, March 14th, 2019"
              size="small"
            />
            <StyledH3>Behavior Adjustments</StyledH3>
            <StyledTextField
              id="filled-basic"
              variant="filled"
              placeholder="Pre-COVID Interactions"
              helperText="social interactions per day, week, or month"
              size="small"
            />
            <StyledTextField
              id="filled-basic"
              variant="filled"
              placeholder="Current Interactions"
              helperText="social interactions per day, week, or month"
              size="small"
            />
            <StyledButton>Simulate</StyledButton>
          </LeftPane>
          <CenterPanesContainer>
            <MapPane>
              <StyledH3>Spatial SIR Simulation</StyledH3>
              <StateMap />
            </MapPane>
            <GraphPane>
              <StyledH3>Cases Over Time</StyledH3>
            </GraphPane>
          </CenterPanesContainer>
          <RightPane>
            <StyledH3>Date Hospitals Over Capacity</StyledH3>
            <Capacity>09.18.2020</Capacity>
            <StyledH3>Total Infected</StyledH3>
            <Infected>2,298,982</Infected>
            <StyledH3>Total Deceased</StyledH3>
            <Deceased>4,298,982</Deceased>
          </RightPane>
        </PanesContainer>
      </Container>
    </ThemeProvider>
  )
}
