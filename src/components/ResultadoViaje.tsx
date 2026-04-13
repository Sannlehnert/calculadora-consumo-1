interface Props {
  html: string
}

function ResultadoViaje({ html }: Props) {
  if (!html) return null
  
  return (
    <div
      className="text-sm text-gray-500 italic"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default ResultadoViaje