import './style.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`input ${className}`}
      {...rest}
    />
  )
}
