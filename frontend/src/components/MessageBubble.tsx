import { useState } from 'react';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    message_type: string;
    sender_type: 'user' | 'ai';
    agent_name?: string;
    agent_type?: string;
    timestamp: string;
    metadata?: any;
  };
}

const agentColors: { [key: string]: string } = {
  sales: 'agent-alex',
  marketing: 'agent-riley',
  finance: 'agent-morgan',
  operations: 'agent-jordan',
  hr: 'agent-sam',
  research: 'agent-taylor',
  'customer_success': 'agent-casey',
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  const isUser = message.sender_type === 'user';
  const agentColor = agentColors[message.agent_type || ''] || 'bg-gray-500';

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatContent = (content: string) => {
    // Simple line break handling
    return content.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-[70%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Agent Avatar */}
        {!isUser && message.agent_name && (
          <div className={`agent-avatar ${agentColor} mr-3 flex-shrink-0`}>
            {message.agent_name[0]}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
          {/* Agent Name */}
          {!isUser && message.agent_name && (
            <div className="text-xs text-gray-600 mb-1 font-medium">
              {message.agent_name} • {message.agent_type?.replace('_', ' ') || 'Assistant'}
            </div>
          )}

          {/* Message Content */}
          <div
            className={`message-bubble ${isUser ? 'founder' : 'ai'} relative`}
            onClick={() => !isUser && setShowMetadata(!showMetadata)}
          >
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>

            {/* Timestamp */}
            <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {formatTimestamp(message.timestamp)}
            </div>

            {/* Metadata Indicator */}
            {!isUser && message.metadata && Object.keys(message.metadata).length > 0 && (
              <div className={`absolute -bottom-1 ${isUser ? '-left-6' : '-right-6'}`}>
                <button className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-400">
                  i
                </button>
              </div>
            )}
          </div>

          {/* Metadata Panel */}
          {!isUser && showMetadata && message.metadata && Object.keys(message.metadata).length > 0 && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <div className="font-medium text-gray-700 mb-2">Message Details</div>
              <div className="space-y-1">
                {message.metadata.intent && (
                  <div>
                    <span className="font-medium">Intent:</span> {message.metadata.intent}
                  </div>
                )}
                {message.metadata.confidence && (
                  <div>
                    <span className="font-medium">Confidence:</span> {(message.metadata.confidence * 100).toFixed(0)}%
                  </div>
                )}
                {message.metadata.entities && (
                  <div>
                    <span className="font-medium">Entities:</span>
                    <ul className="ml-4 mt-1">
                      {Object.entries(message.metadata.entities).map(([key, value]) => (
                        <li key={key}>
                          {key}: {String(value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}