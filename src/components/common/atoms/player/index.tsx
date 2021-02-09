import { ActionButton } from '@adobe/react-spectrum'
import Pause from '@spectrum-icons/workflow/Pause'
import Play from '@spectrum-icons/workflow/Play'
import Refresh from '@spectrum-icons/workflow/Refresh'
import Rewind from '@spectrum-icons/workflow/Rewind'
import React from 'react'
import * as Styles from './styles'

export type Props = {
  isPlay: boolean
  isSetLoop: boolean
  canPlay: boolean
  canSetLoop: boolean
  canRewind: boolean
  canPause: boolean
  onRewind: () => void
  onPlay: () => void
  onPause: () => void
  onSetLoop: () => void
}

export const Player: React.VFC<Props> = React.memo(function Component({
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
}) {
  const buttonHeight = React.useMemo(() => '100%', [])

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
    <Styles.Main>
      <ActionButton isQuiet height={buttonHeight} isDisabled={!canRewind} onPress={onHandleRewind}>
        <Rewind height={buttonHeight} />
      </ActionButton>
      {isPlay ? (
        <ActionButton isQuiet height={buttonHeight} isDisabled={!canPause} onPress={onHandlePause}>
          <Pause height={buttonHeight} />
        </ActionButton>
      ) : (
        <ActionButton isQuiet height={buttonHeight} isDisabled={!canPlay} onPress={onHandlePlay}>
          <Play height={buttonHeight} />
        </ActionButton>
      )}
      <ActionButton
        isQuiet
        height={buttonHeight}
        isDisabled={!canSetLoop}
        onPress={onHandleSetLoop}
      >
        <Refresh height={buttonHeight} color={isSetLoop ? 'informative' : ''} />
      </ActionButton>
    </Styles.Main>
  )
})
