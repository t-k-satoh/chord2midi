import styled from 'styled-components'

export const Main = styled.button<{ S_width: number }>`
  display: flex;
  height: 100%;
  width: ${(props) => `${props.S_width}%`};
  box-sizing: border-box;
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  box-sizing: border-box;
  font-weight: normal;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.5;
  }
`

export const Error = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 20, 60, 0.5);
  overflow: hidden;
`
