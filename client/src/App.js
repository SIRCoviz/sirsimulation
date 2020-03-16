import React from 'react'
import { TextField, makeStyles, withStyles, Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

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
  CenterPanesContainer,
  PanesContainer,
  Capacity,
  Infected,
  Deceased,
} from './styles'

import StateMap from './components/StateMap'

const useStyles = makeStyles({
  root: {
    marginBottom: '16px',
    '& .MuiFormHelperText-contained': {
      marginLeft: '0',
    },
    '& .MuiFilledInput-root': {
      height: '32px',
    },
    '& .MuiFilledInput-input': {
      padding: '6px 12px 7px',
    },
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c4a808',
    },
  },
})

export const App = () => {
  const classes = useStyles()
  console.log(theme)

  return (
    <Container>
      <StyledH1>COVID-19 SIR Simulation</StyledH1>
      <StyledH2>
        This tool allows you to simulate the progression of the COVID-19 virus
        using the SIR model.
      </StyledH2>
      <PanesContainer>
        <LeftPane>
          <StyledH3>Initial Data</StyledH3>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Location"
            helperText="population which you would like to simulate"
            classes={{
              root: classes.root,
              input: classes.input,
            }}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Current Cases"
            helperText="as of today, March 14th, 2019"
            size="small"
            classes={{
              root: classes.root,
            }}
          />
          <StyledH3>Behavior Adjustments</StyledH3>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Pre-COVID Interactions"
            helperText="social interactions per day, week, or month"
            size="small"
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Current Interactions"
            helperText="social interactions per day, week, or month"
            size="small"
            classes={{
              root: classes.root,
            }}
          />
          {/* <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" disableElevation>
              Simulate
            </Button>
          </ThemeProvider> */}
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
  )
}
