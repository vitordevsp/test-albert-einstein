import { ClipboardIcon } from './icons/ClipboardIcon'
import { CloseIcon } from './icons/CloseIcon'
import { MicrophoneIcon } from './icons/MicrophoneIcon'
import { OutlineMicrophoneIcon } from './icons/OutlineMicrophoneIcon'
import { SendIcon } from './icons/SendIcon'
import { TerminalIcon } from './icons/TerminalIcon'
import './style.css'

type IconName = 'clipboard' | 'close' | 'send' | 'terminal' | 'microphone' | 'outlineMicrophone'

interface IconProps {
  name: IconName
  onClick?: () => void
}

export function Icon({ name, onClick }: IconProps) {
  const icons: Record<IconName, JSX.Element> = {
    clipboard: <ClipboardIcon />,
    close: <CloseIcon />,
    send: <SendIcon />,
    terminal: <TerminalIcon />,
    microphone: <MicrophoneIcon />,
    outlineMicrophone: <OutlineMicrophoneIcon />,
  }

  return (
    <div className='icon' onClick={onClick}>
      {icons[name]}
    </div>
  )
}
