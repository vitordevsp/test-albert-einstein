import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import './style.css'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`button ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
