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

const switchBackgroundColor = (S_isDarkMode: boolean): string =>
  S_isDarkMode ? '255, 255, 255, 0.2' : '0, 0, 0, 0.2'

const switchBorderColor = (S_isDarkMode: boolean): string => (S_isDarkMode ? '#ffffff' : '#000000')

export const Main = styled.div<{ S_isLoading: boolean }>`
  display: ${(props) => (props.S_isLoading ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  position: relative;
`

export const LoaderWrap = styled.div`
  position: absolute;
  top: calc(40vh - ${LoaderSize / 2}em);
  left: calc(50vw - ${LoaderSize / 2}em);
`

export const Loader = styled.div<{ S_isDarkMode: boolean }>`
  border-radius: 50%;
  width: ${LoaderSize}em;
  height: ${LoaderSize}em;
  position: relative;
  text-indent: -9999em;
  border-top: ${LoaderSize * 0.1}em solid
    rgba(${({ S_isDarkMode }) => switchBackgroundColor(S_isDarkMode)});
  border-right: ${LoaderSize * 0.1}em solid
    rgba(${({ S_isDarkMode }) => switchBackgroundColor(S_isDarkMode)});
  border-bottom: ${LoaderSize * 0.1}em solid
    rgba(${({ S_isDarkMode }) => switchBackgroundColor(S_isDarkMode)});
  border-left: ${LoaderSize * 0.1}em solid ${({ S_isDarkMode }) => switchBorderColor(S_isDarkMode)};
  transform: translateZ(0);
  animation: ${rotate} 1.1s infinite linear;
  &::after {
    border-radius: 50%;
    width: ${LoaderSize}em;
    height: ${LoaderSize}em;
  }
`
