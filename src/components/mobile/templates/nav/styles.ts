import styled from 'styled-components'

export const Main = styled.nav`
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  position: relative;
`

export const NavWrap = styled.ul`
  width: 100%;
  height: 100%;
`
export const NavChild = styled.li`
  width: 100%;
  height: 60px;
`

export const NavChildContents = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  color: #c8c8c8;
`

export const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`

export const Label = styled.p`
  display: flex;
  align-items: center;
`

export const Version = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 0;
`

export const VersionText = styled.p`
  font-size: 12px;
  text-align: center;
`
