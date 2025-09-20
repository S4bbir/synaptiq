import { Message } from './ChatInterface'

interface AIMessageProps {
  message: Message
}

export default function AIMessage({ message }: AIMessageProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-100 transition-all duration-300 hover:bg-gray-100/50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 mb-1">SynaptiQ</div>
            <div 
              className="text-gray-700 whitespace-pre-wrap prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}