import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: ChatMessage
  isOwnMessage?: boolean
}

export function ChatMessageBubble({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        isOwnMessage && 'flex-row-reverse'
      )}
    >
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
        {message.userImageUrl ? (
          <img
            src={message.userImageUrl}
            alt={message.userName ?? 'User'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
            {(message.userName ?? 'U').charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div
        className={cn(
          'max-w-[70%] space-y-1',
          isOwnMessage && 'items-end text-right'
        )}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">
            {message.userName ?? 'Anonymous'}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm',
            isOwnMessage
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}
