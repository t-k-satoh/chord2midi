import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
`

export const TextArea = styled.div`
  width: 100%;
  height: calc(100% - 20px);
  box-sizing: border-box;
`

export const ErrorArea = styled.div`
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

export const ErrorText = styled.p`
  color: red;
`
