import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export const Container = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 32px;
`

export const StyledH1 = styled.h1`
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 44px;
  font-weight: normal;
`

export const StyledH2 = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: normal;
`

export const StyledH3 = styled.h3`
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
`

export const PanesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
`

export const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`

export const StyledButton = styled(Button)`
  background-color: #ffa902;
  color: #ffffff;
  width: 104px;
  border-radius: 0;

  &:hover {
    background-color: #ffa902;
  }
`

export const CenterPanesContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  flex: 2;
  margin: 0 24px;
  padding: 0 32px;
`

export const MapPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const GraphPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Capacity = styled.div`
  font-size: 48px;
  color: #ffa902;
  margin-bottom: 32px;
`

export const Infected = styled.div`
  font-size: 48px;
  color: #e03434;
  margin-bottom: 32px;
`

export const Deceased = styled.div`
  font-size: 48px;
  margin-bottom: 32px;
`
