import { useEffect, useRef, useState, useMemo } from 'react'
import type { ChatMessage } from '@/types'

const clerkEnabled = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function useClerkAuth() {
  if (!clerkEnabled) {
    return { isSignedIn: false, user: null }
  }
  // Dynamic import to avoid errors when Clerk is not configured
  const { useAuth, useUser } = require('@clerk/tanstack-react-start')
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  return { isSignedIn, user }
}
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChatMessageBubble } from './chat-message'
import { ChatInput } from './chat-input'
import { MessageSquare, LogIn } from 'lucide-react'

interface ChatBoxProps {
  eventId: string
  initialMessages?: ChatMessage[]
}

export function ChatBox({ eventId, initialMessages = [] }: ChatBoxProps) {
  const { isSignedIn, user } = useClerkAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      // Poll for new messages (placeholder for Supabase integration)
      // In production, this would fetch from Supabase
    }, 5000)

    return () => clearInterval(interval)
  }, [eventId])

  const handleSendMessage = async (content: string) => {
    if (!user) return

    setIsLoading(true)

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      eventId,
      userId: user.id,
      userName: user.fullName ?? user.username ?? 'Anonymous',
      userImageUrl: user.imageUrl,
      content,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setIsLoading(false)

    // In production, this would send to Supabase
    // await supabase.from('chat_messages').insert(...)
  }

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-4 w-4" />
          Event Chat
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.userId === user?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-3">
        {isSignedIn ? (
          <div className="w-full">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <LogIn className="h-4 w-4" />
            <span>Sign in to join the chat</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
