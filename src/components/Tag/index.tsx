import './style.css'

interface TagProps {
  text: string
  onClick?: (text: string) => void
}

export function Tag({ text, onClick }: TagProps) {
  return (
    <div
      className="tag"
      onClick={() => onClick && onClick(text)}
    >
      {text}
    </div>
  )
}
