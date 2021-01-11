import { Link } from '@adobe/react-spectrum'
import React from 'react'

export type Props = {
  text: string
  href: string
}

export const BlankLink: React.FC<Props> = ({ text, href }) => {
  return (
    <Link>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    </Link>
  )
}
