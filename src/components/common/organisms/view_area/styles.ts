import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  overflow: scroll;
  position: relative;
`

export const Bars = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`

export const Bar = styled.div`
  display: flex;
  height: 72px;
  width: calc(100% / 4);
  position: relative;
  margin-bottom: 16px;
  box-sizing: border-box;
`
