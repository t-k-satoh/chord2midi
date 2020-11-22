import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: scroll;
`

export const Bars = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Bar = styled.div`
  display: flex;
  height: 96px;
  width: calc(100% / 4);
  position: relative;
  margin-bottom: 20px;
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
