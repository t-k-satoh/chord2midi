import { ActionButton } from '@adobe/react-spectrum'
import Pause from '@spectrum-icons/workflow/Pause'
import Play from '@spectrum-icons/workflow/Play'
import Refresh from '@spectrum-icons/workflow/Refresh'
import Rewind from '@spectrum-icons/workflow/Rewind'
import React from 'react'
import { BUTTON_HEIGHT } from './constants'
import * as Styles from './styles'
import { Props } from './types'

const Player: (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => JSX.Element = (
  {
    canPause,
    canPlay,
    canRewind,
    canSetLoop,
    isSetLoop,
    isPlay,
    onPause,
    onPlay,
    onRewind,
    onSetLoop,
  },
  ref
) => {
  const fallbackRef = React.useRef<HTMLDivElement | null>(null)
  const domRef = ref || fallbackRef

  const onHandleRewind = React.useCallback(() => {
    onRewind()
  }, [onRewind])

  const onHandlePause = React.useCallback(() => {
    onPause()
  }, [onPause])

  const onHandlePlay = React.useCallback(() => {
    onPlay()
  }, [onPlay])

  const onHandleSetLoop = React.useCallback(() => {
    onSetLoop()
  }, [onSetLoop])

  return (
    <Styles.Main ref={domRef}>
      <ActionButton isQuiet height={BUTTON_HEIGHT} isDisabled={!canRewind} onPress={onHandleRewind}>
        <Rewind height={BUTTON_HEIGHT} />
      </ActionButton>
      {isPlay ? (
        <ActionButton isQuiet height={BUTTON_HEIGHT} isDisabled={!canPause} onPress={onHandlePause}>
          <Pause height={BUTTON_HEIGHT} />
        </ActionButton>
      ) : (
        <ActionButton isQuiet height={BUTTON_HEIGHT} isDisabled={!canPlay} onPress={onHandlePlay}>
          <Play height={BUTTON_HEIGHT} />
        </ActionButton>
      )}
      <ActionButton
        isQuiet
        height={BUTTON_HEIGHT}
        isDisabled={!canSetLoop}
        onPress={onHandleSetLoop}
      >
        <Refresh height={BUTTON_HEIGHT} color={isSetLoop ? 'informative' : ''} />
      </ActionButton>
    </Styles.Main>
  )
}

const _Player = React.memo(React.forwardRef(Player))
export { _Player as Player }
