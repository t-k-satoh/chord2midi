import styled from 'styled-components'

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

export const Bar = styled.div`
  height: 96px;
  width: calc(100% / 4);
  position: relative;
  margin-bottom: 16px;
  box-sizing: border-box;
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 2px;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
  }
  &:nth-child(4n),
  &:last-child {
    &::after {
      content: '';
      display: block;
      height: 100%;
      width: 2px;
      background: rgba(0, 0, 0, 0.7);
      position: absolute;
      top: 0;
      right: 0;
      z-index: 4;
    }
  }
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
  background-color: rgba(255, 255, 25, 0.3);
  bottom: ${(props) => props.position}px;
  width: ${(props) => `calc(100% / ${props.duration})`};
  height: 4px;
  left: ${(props) => props.left}%;
  z-index: 2;
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

export const NoteText = styled.p``
