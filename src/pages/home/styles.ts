import styled from 'styled-components'
import { HeaderHight } from '../../components/constants'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
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

export const Error = styled.div<{ isShow: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  position: absolute;
  top: ${(props) => (props.isShow ? 0 : `-45px`)};
  left: 0;
  background: #fadbda;
  z-index: 1;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  transition: top 0.1s;
`

export const ErrorText = styled.p`
  color: red;
  margin-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
