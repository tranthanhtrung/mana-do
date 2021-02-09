import React from 'react'

interface MessageProps {
  message: string;
  className?: string;
}

const Message = ({message, className}: MessageProps) => {
  return(
    <span className={className}>{message}</span>
  )
}

export default Message