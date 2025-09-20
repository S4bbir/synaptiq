'use client'

import { Message } from './ChatInterface'

interface UserMessageProps {
  message: Message
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="bg-white border-b border-gray-100 transition-all duration-300 hover:bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex space-x-4">
          {/* User Avatar */}
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          
          {/* Message Content */}
          <div className="flex-1">
            <div className="prose prose-sm max-w-none">
              <div 
                className="text-gray-800 whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}