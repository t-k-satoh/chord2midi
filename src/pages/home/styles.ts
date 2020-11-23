import styled from 'styled-components'
import { HeaderHight } from '../../components/constants'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
`

export const InputArea = styled.div`
  width: 100%;
  height: calc(30% - ${HeaderHight}px / 2);
`
export const ViewArea = styled.div`
  width: 100%;
  height: calc(70% - ${HeaderHight}px / 2);
`
