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
  height: 72px;
  width: calc(100% / ${(props) => props.beat});
  position: relative;
  margin-bottom: 16px;
  box-sizing: border-box;
`

export const Layer = styled.div<{ zIndex: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${(props) => props.zIndex};
`

export const Chord = styled.div<{ duration: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${(props) => `calc(100% / ${props.duration})`};
  font-size: 30px;
  color: rgba(255, 255, 255, 0.4);
`

export const Note = styled.div<{ position: number; duration: number; left: number }>`
  position: absolute;
  background-color: ${(props) => `${colors[props.position]}`};
  bottom: ${(props) => props.position * 2}px;
  width: ${(props) => `calc(100% / ${props.duration})`};
  height: 2px;
  left: ${(props) => props.left}%;
  z-index: 2;
  opacity: 0.5;
`
export const NoteButton = styled.button<{ duration: number }>`
  height: 100%;
  width: ${(props) => `calc(100% / ${props.duration})`};
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
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
