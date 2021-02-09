import gradient from 'gradient-color'
import styled from 'styled-components'
import { POSITION_LIMIT } from './constants'

const colors: string[] = gradient(['#ff2f00', '#6495ED', '#001aff'], POSITION_LIMIT + 1)

export const Main = styled.div<{ S_position: number }>`
  position: absolute;
  background-color: ${(props) => `${colors[props.S_position]}`};
  bottom: ${(props) => props.S_position * 2}px;
  width: 100%;
  height: 2px;
  left: 0;
`
