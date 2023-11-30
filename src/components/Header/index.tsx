import './style.css'

interface HeaderProps {
  children: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      {children}
    </header>
  )
}
