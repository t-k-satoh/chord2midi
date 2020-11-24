import styled from 'styled-components'
import { HeaderHight } from '../../components/constants'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
`

export const InputArea = styled.div`
  width: 100%;
  height: calc(20% - ${HeaderHight}px / 3);
`
export const ViewArea = styled.div`
  width: 100%;
  height: calc(60% - ${HeaderHight}px / 3);
`

export const ButtonArea = styled.div`
  width: 100%;
  height: calc(20% - ${HeaderHight}px / 3);
  display: flex;
  justify-content: center;
`
