import './style.css'

interface SpinnerProps extends React.HTMLProps<HTMLSpanElement> {
}

export function Spinner({ className, ...rest }: SpinnerProps) {
  return (
    <span
      className={`spinner ${className}`}
      {...rest}
    >
    </span>
  )
}
