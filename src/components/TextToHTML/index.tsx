import showdown from 'showdown'
import './style.css'

export interface TextToHTMLProps {
  text: string
}

const showdownConverter = new showdown.Converter({
  tables: true,
  tasklists: true,
  simpleLineBreaks: true,
  emoji: true,
  headerLevelStart: 3,
  disableForced4SpacesIndentedSublists: true,
})

export function TextToHTML({ text }: TextToHTMLProps) {
  const htmlTextAnswer = showdownConverter.makeHtml(text)

  return (
    <p
      className='text-to-html'
      dangerouslySetInnerHTML={{
        __html: htmlTextAnswer,
      }}
    />
  )
}
