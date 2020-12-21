import styled from 'styled-components'

export const MobileMain = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`

export const MobileLogo = styled.h1`
  width: 40px;
  height: 40px;
`

export const MobileNav = styled.div`
  position: absolute;
  left: 4px;
  height: 100%;
  display: flex;
  align-items: center;
`

export const MobileRailButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
`

export const Main = styled.div<{ S_isMobile: boolean }>`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

export const Right = styled.div`
  display: flex;
  align-items: baseline;
`

export const Title = styled.h1`
  font-size: 24px;
  margin-right: 8px;
`

export const Version = styled.p``

export const Left = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: auto;
`

export const Icon = styled.div`
  width: 32px;
`
