import './style.css'

export function CloseIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className='stroke-white'
    >
      <path
        d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
