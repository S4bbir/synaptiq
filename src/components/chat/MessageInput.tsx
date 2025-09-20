'use client'

import { useState, KeyboardEvent } from 'react'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!message.trim() || disabled) return
    onSendMessage(message)
    setMessage('')
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-6">
      <div className="relative">
        {/* Text Area */}
        <div className="relative border border-gray-300 rounded-2xl bg-white focus-within:border-gray-400 focus-within:shadow-sm transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask SynaptiQ anything..."
            disabled={disabled}
            className="w-full px-4 py-4 pr-12 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 text-base leading-relaxed min-h-[60px] max-h-[200px]"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '60px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`
            }}
          />
          
          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            className="absolute right-3 bottom-3 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </div>
        
        {/* Helper Text */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>
            Press Shift + Enter for new line
          </span>
          <span>
            {message.length}/2000
          </span>
        </div>
      </div>
    </div>
  )
}