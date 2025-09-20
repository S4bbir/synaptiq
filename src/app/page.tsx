'use client'

import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import AnimatedBackground from '@/components/AnimatedBackground'
import { useChatStore } from '@/store/chatStore'

export default function Home() {
  const [message, setMessage] = useState('')
  const [animationStage, setAnimationStage] = useState<'initial' | 'titleMoving' | 'contentAppearing'>('initial')
  const inputRef = useRef<HTMLInputElement>(null)
  const { sendMessageToAI, messages } = useChatStore()

  // Detect when the first message is sent
  useEffect(() => {
    if (messages.length > 0 && messages.length <= 2) {
      // Check if this is the first user message (messages array has 1 or 2 items)
      const userMessages = messages.filter(msg => msg.role === 'user')
      if (userMessages.length === 1) {
        setAnimationStage('titleMoving')
        
        // After title moves up, show content
        const titleTimer = setTimeout(() => {
          setAnimationStage('contentAppearing')
        }, 300)
        
        return () => {
          clearTimeout(titleTimer)
        }
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    // Send message and open chat interface
    await sendMessageToAI(message)
    setMessage('')
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Get the latest AI response
  const latestAIResponse = messages.length > 0 ? messages[messages.length - 1] : null
  const isAIResponse = latestAIResponse && latestAIResponse.role === 'assistant'

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo/Brand - Will move up with animation */}
          <div className={`space-y-4 transition-all duration-700 ease-in-out ${
            animationStage !== 'initial' 
              ? 'transform -translate-y-full opacity-0' 
              : 'transform translate-y-0 opacity-100'
          }`}>
            <h1 className="text-6xl font-bold text-foreground tracking-tight animate-pulse-slow">
              SynaptiQ
            </h1>
            <p className="text-xl text-foreground/80 font-light">
              Advanced AI Research Assistant for Academic Excellence
            </p>
          </div>
          
          {/* Content Area - Will appear after title moves up */}
          <div className={`w-full transition-all duration-700 ease-in-out ${
            animationStage === 'contentAppearing' 
              ? 'transform translate-y-0 opacity-100' 
              : animationStage === 'titleMoving'
                ? 'transform translate-y-10 opacity-0'
                : 'transform translate-y-0 opacity-100'
          }`}>
            {messages.length === 0 ? (
              // Initial state with input area
              <div className="mt-16 p-8 bg-card/10 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  <div className="text-left space-y-4">
                    <div className="text-sm text-foreground/70 mb-4">Ready to start your research session</div>
                    
                    {/* Input Area */}
                    <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-2xl border border-border/30">
                      <input 
                        type="text" 
                        placeholder="Ask anything about your research..."
                        className="flex-1 bg-transparent text-foreground placeholder-foreground/50 outline-none text-lg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        ref={inputRef}
                      />
                      <div className="flex space-x-2">
                        <button 
                          className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                            messages.length > 0 
                              ? 'bg-green-500 animate-bounce' 
                              : 'bg-primary hover:bg-primary/90'
                          }`}
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          aria-label="Send message"
                        >
                          <img 
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfklEQVR4nO2Z0UoCQRSGvy70HSofKL0xIumiHsDQp8teoVpKewSF1oKoK/XOYGLhCDK52zbO2WZhPjjgxXjO/68zx+EsRCKRSJ1pAkMgAVaA8RAr4AEYSH41joBnT6JNTkyAQw3xzQrEG4kx0PBtYFiReCNx7dtAYhW4kS3lg2NgZOW/xzNLq0BW1CctK//Cc/4fP7EGRrNGNFACEw14SN4DPoFX4FSphhOzrcTTnDUHwMfWujVwEYqBNpBKnBSse7dE/MWEqWCb/sqZiHYxYUIwkHG+w8QXcFUXA64mzL4GOtZh1Yh1QXfa28BcWfwmUi0DaUUGXrQMtKXH13YL+aSXc4gvC74TjAEX8cEY6Ib6R9aRLjWXs1K2EQRzlZiVuMxlvDmKVzdQNnlX2uRUPmvUcKKKA2aigQKigf+usaj7YCuxCow8mmgBt9qjxYHyJc9Y0dcYr08qEv+oMV5HXjyMlcU/ab3g2NCQ2f3djom1aywlX1/ryUcikQje+AZvWSAsR0YsRwAAAABJRU5ErkJggg==" 
                            alt="Send" 
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isAIResponse ? (
              // Show AI response in the main area
              <div className="mt-8 p-8 bg-card/10 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl animate-fadeIn">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-foreground">Research Response</h2>
                  </div>
                  
                  <div 
                    className="text-left text-foreground/90 whitespace-pre-wrap prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: latestAIResponse.content }}
                  />
                  
                  {/* Input Area for follow-up */}
                  <div className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-2xl border border-border/30 mt-8">
                    <input 
                      type="text" 
                      placeholder="Ask a follow-up question..."
                      className="flex-1 bg-transparent text-foreground placeholder-foreground/50 outline-none text-lg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      ref={inputRef}
                    />
                    <button 
                      className="p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 flex items-center justify-center"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      aria-label="Send follow-up message"
                    >
                      <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfklEQVR4nO2Z0UoCQRSGvy70HSofKL0xIumiHsDQp8teoVpKewSF1oKoK/XOYGLhCDK52zbO2WZhPjjgxXjO/68zx+EsRCKRSJ1pAkMgAVaA8RAr4AEYSH41joBnT6JNTkyAQw3xzQrEG4kx0PBtYFiReCNx7dtAYhW4kS3lg2NgZOW/xzNLq0BW1CctK//Cc/4fP7EGRrNGNFACEw14SN4DPoFX4FSphhOzrcTTnDUHwMfWujVwEYqBNpBKnBSse7dE/MWEqWCb/sqZiHYxYUIwkHG+w8QXcFUXA64mzL4GOtZh1Yh1QXfa28BcWfwmUi0DaUUGXrQMtKXH13YL+aSXc4gvC74TjAEX8cEY6Ib6R9aRLjWXs1K2EQRzlZiVuMxlvDmKVzdQNnlX2uRUPmvUcKKKA2aigQKigf+usaj7YCuxCow8mmgBt9qjxYHyJc9Y0dcYr08qEv+oMV5HXjyMlcU/ab3g2NCQ2f3djom1aywlX1/ryUcikQje+AZvWSAsR0YsRwAAAABJRU5ErkJggg==" 
                        alt="Send" 
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Show loading or user message
              <div className="mt-8 p-8 bg-card/10 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-foreground/70 ml-2">Processing your request...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Feature Pills - Only show in initial state */}
          {messages.length === 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="px-4 py-2 bg-card/10 backdrop-blur-sm rounded-full text-sm text-foreground/80 border border-border/50">
                ✍️ Write
              </span>
              <span className="px-4 py-2 bg-card/10 backdrop-blur-sm rounded-full text-sm text-foreground/80 border border-border/50">
                📊 Summarize
              </span>
              <span className="px-4 py-2 bg-card/10 backdrop-blur-sm rounded-full text-sm text-foreground/80 border border-border/50">
                🔬 Research
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes pulse-and-fade {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-pulse-fade {
          animation: pulse-and-fade 1.5s ease-in-out;
        }
        
        @keyframes send-message {
          0% {
            transform: translateY(0);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: translateY(-10px);
            box-shadow: 0 12px 16px rgba(0, 0, 0, 0.15);
          }
          100% {
            transform: translateY(0);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        }
        
        .animate-send-message {
          animation: send-message 0.8s ease-in-out;
        }
        
        @keyframes background-pulse {
          0% {
            background-color: rgba(255, 255, 255, 0);
          }
          50% {
            background-color: rgba(238, 242, 255, 0.7);
          }
          100% {
            background-color: rgba(255, 255, 255, 0);
          }
        }
        
        .animate-background-pulse {
          animation: background-pulse 2s ease-in-out;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  )
}