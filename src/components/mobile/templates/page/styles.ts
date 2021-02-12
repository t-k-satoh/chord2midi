import styled from 'styled-components'

export const Main = styled.main<{ S_height: number }>`
  width: 100%;
  height: ${(props) => `${props.S_height}px`};
  position: relative;
`

export const Header = styled.div`
  padding: 8px;
`

export const Layer = styled.button<{ S_isShow: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9998;
  display: ${(props) => (props.S_isShow ? 'block' : 'none')};
`

export const Settings = styled.div<{ S_isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 60%;
  height: 100%;
  display: ${(props) => (props.S_isShow ? 'block' : 'none')};
`
