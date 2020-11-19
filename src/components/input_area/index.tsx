import { TextArea } from '@adobe/react-spectrum'
import * as Styles from './styles'

export const InputArea: React.FC = () => {
  return (
    <Styles.Main>
      <TextArea width={'100%'} height={'100%'} />
    </Styles.Main>
  )
}
