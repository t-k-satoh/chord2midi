import styled, { keyframes } from 'styled-components'

const LoaderSize = 3

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Main = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`

export const LoaderWrap = styled.main`
  position: absolute;
  top: calc(40vh - ${LoaderSize / 2}em);
  left: calc(50vw - ${LoaderSize / 2}em);
`

export const Loader = styled.div`
  border-radius: 50%;
  width: ${LoaderSize}em;
  height: ${LoaderSize}em;
  position: relative;
  text-indent: -9999em;
  border-top: ${LoaderSize * 0.1}em solid rgba(255, 255, 255, 0.2);
  border-right: ${LoaderSize * 0.1}em solid rgba(255, 255, 255, 0.2);
  border-bottom: ${LoaderSize * 0.1}em solid rgba(255, 255, 255, 0.2);
  border-left: ${LoaderSize * 0.1}em solid #ffffff;
  transform: translateZ(0);
  animation: ${rotate} 1.1s infinite linear;
  &::after {
    border-radius: 50%;
    width: ${LoaderSize}em;
    height: ${LoaderSize}em;
  }
`
