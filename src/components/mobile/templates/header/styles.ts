import styled from 'styled-components'

export const Main = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`

export const Logo = styled.h1`
  width: 40px;
  height: 40px;
`

export const Nav = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

export const DownLoad = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

export const ToolTipField = styled.div`
  display: flex;
  width: 100%;
`

export const ToolTipText = styled.p`
  font-size: 10px;
`
