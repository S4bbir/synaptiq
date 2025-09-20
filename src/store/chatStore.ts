'use client'

import { create } from 'zustand'
import { Message } from '../components/chat/ChatInterface'
import { getAIResponse } from '../services/aiService'

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  currentConversationId: string | null
  
  // Actions
  addMessage: (message: Message) => void
  setLoading: (loading: boolean) => void
  clearMessages: () => void
  setCurrentConversation: (id: string | null) => void
  
  // AI Integration
  sendMessageToAI: (content: string) => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  currentConversationId: null,

  addMessage: (message: Message) => 
    set((state) => ({ messages: [...state.messages, message] })),

  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),

  clearMessages: () => 
    set({ messages: [] }),

  setCurrentConversation: (id: string | null) => 
    set({ currentConversationId: id }),

  sendMessageToAI: async (content: string) => {
    const { addMessage, setLoading } = get()
    
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    }
    
    addMessage(userMessage)
    setLoading(true)

    try {
      // Get response from AI service
      const aiResponse = await getAIResponse(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        role: 'assistant',
        timestamp: new Date()
      }
      
      addMessage(aiMessage)
    } catch (error) {
      console.error('Error sending message to AI:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      addMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }
}))