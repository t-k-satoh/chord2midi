import gradient from 'gradient-color'
import styled from 'styled-components'

const colors: string[] = gradient(['#00FF00', '#6495ED', '#ADD8E6'], 48)

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  overflow: scroll;
`

export const Bars = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Bar = styled.div<{ beat: number }>`
  display: flex;
  height: 72px;
  width: calc(100% / ${(props) => props.beat});
  position: relative;
  margin-bottom: 16px;
  box-sizing: border-box;
`

export const Layer = styled.div<{ zIndex: number }>`
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.zIndex};
`

export const Chord = styled.button<{ duration: number }>`
  display: flex;
  height: 100%;
  width: ${(props) => `${props.duration}%`};
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

export const Note = styled.div<{ position: number }>`
  position: absolute;
  background-color: ${(props) => `${colors[props.position]}`};
  bottom: ${(props) => props.position * 2}px;
  width: 100%;
  height: 2px;
  left: 0;
  z-index: 2;
  opacity: 0.5;
`

export const Error = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 20, 60, 0.5);
  margin: 0 10px;
  overflow: hidden;
  padding: 10px;
`

export const NoteText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
