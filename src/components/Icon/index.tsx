import { ClipboardIcon } from './icons/ClipboardIcon'
import { CloseIcon } from './icons/CloseIcon'
import { SendIcon } from './icons/SendIcon'
import { TerminalIcon } from './icons/TerminalIcon'
import './style.css'

type IconName = 'clipboard' | 'close' | 'send' | 'terminal'

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
  }

  return (
    <div className='icon' onClick={onClick}>
      {icons[name]}
    </div>
  )
}
