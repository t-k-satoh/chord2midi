import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
`

export const Error = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 20, 60, 0.5);
  overflow: hidden;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  box-sizing: border-box;
  font-weight: normal;
`

export const Handle = styled.div<{ S_isDarkMode: boolean }>`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  background: ${(props) =>
    `${props.S_isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}`};
  z-index: 3;
`
