'use client'

import { useEffect, useRef, useState } from 'react'
import UserMessage from './UserMessage'
import AIMessage from './AIMessage'
import MessageInput from './MessageInput'
import { useChatStore } from '@/store/chatStore'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatInterface() {
  const { messages, isLoading, sendMessageToAI } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [newMessageId, setNewMessageId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Set new message ID when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setNewMessageId(messages[messages.length - 1].id)
      // Clear the new message ID after animation
      const timer = setTimeout(() => {
        setNewMessageId(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    await sendMessageToAI(content)
  }

  return (
    <div className="flex flex-col h-full rounded-t-2xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-2xl animate-slide-in-bottom">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-white/70 backdrop-blur-sm rounded-t-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">SynaptiQ</h1>
            <p className="text-sm text-gray-600">AI Research Assistant</p>
          </div>
          <div className="flex items-center space-x-3">

          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-transparent">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full py-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100/80 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">How can I help you today?</h3>
                  <p className="text-gray-600 mt-2">Ask me anything about your research or any topic you&apos;d like to explore.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`transition-all duration-500 ease-out ${
                    newMessageId === message.id 
                      ? 'translate-y-2 opacity-0 animate-fadeInUp' 
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  {message.role === 'user' ? (
                    <UserMessage message={message} />
                  ) : (
                    <AIMessage message={message} />
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="bg-gray-50/80 border-b border-gray-100/80 transition-all duration-500 ease-out animate-fadeInUp translate-y-2 opacity-0">
                  <div className="max-w-4xl mx-auto px-6 py-6">
                    <div className="flex space-x-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}