import gradient from 'gradient-color'
import styled from 'styled-components'

const colors: string[] = gradient(['#ff2f00', '#6495ED', '#001aff'], 48)

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  overflow: scroll;
  position: relative;
`

export const Bars = styled.div`
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

export const Handle = styled.div`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 3;
`

export const ErrorBar = styled.button`
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

export const Chord = styled.button<{ S_duration: number }>`
  display: flex;
  height: 100%;
  width: ${(props) => `${props.S_duration}%`};
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
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const Symbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 30px;
  z-index: 0;
  color: rgba(255, 255, 255, 0.4);
`

export const Note = styled.div<{ S_position: number; S_isIdling: boolean }>`
  position: absolute;
  background-color: ${(props) => `${colors[props.S_position]}`};
  bottom: ${(props) => props.S_position * 2}px;
  width: 100%;
  height: 2px;
  left: 0;
  z-index: 2;
  opacity: ${(props) => (props.S_isIdling ? 0.3 : 1)};
  transition: opacity 0.5s;
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
