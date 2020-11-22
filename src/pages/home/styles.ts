import styled from 'styled-components'
import { HeaderHight } from '../../components/constants'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
`

export const Area = styled.div`
  width: 100%;
  height: calc((100% - ${HeaderHight}px) / 2);
`
