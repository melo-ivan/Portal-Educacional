import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  CheckCheck,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  };
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    role: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: '2',
      name: 'Maria Silva',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
      online: true,
      role: 'Professora'
    },
    lastMessage: 'Ótimo trabalho no projeto! Você pode melhorar...',
    timestamp: '2024-01-15T14:30:00Z',
    unreadCount: 2,
    messages: [
      {
        id: '1',
        sender: {
          id: '2',
          name: 'Maria Silva',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
          online: true
        },
        content: 'Olá! Como está o progresso do seu projeto React?',
        timestamp: '2024-01-15T10:00:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '2',
        sender: {
          id: '1',
          name: 'Você',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
          online: true
        },
        content: 'Está indo bem! Consegui implementar os hooks que você ensinou.',
        timestamp: '2024-01-15T10:30:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '3',
        sender: {
          id: '2',
          name: 'Maria Silva',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
          online: true
        },
        content: 'Ótimo trabalho no projeto! Você pode melhorar a parte de gerenciamento de estado.',
        timestamp: '2024-01-15T14:30:00Z',
        read: false,
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    participant: {
      id: '3',
      name: 'João Santos',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100&h=100&fit=crop',
      online: false,
      role: 'Professor'
    },
    lastMessage: 'A prova será na próxima sexta-feira',
    timestamp: '2024-01-14T16:45:00Z',
    unreadCount: 0,
    messages: []
  },
  {
    id: '3',
    participant: {
      id: '4',
      name: 'Ana Costa',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
      online: true,
      role: 'Colega'
    },
    lastMessage: 'Vamos formar um grupo de estudos?',
    timestamp: '2024-01-14T12:20:00Z',
    unreadCount: 1,
    messages: []
  }
];

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: '1',
        name: 'Você',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
        online: true
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
      type: 'text'
    };

    // In a real app, you would update the conversation in state/context
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mensagens</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.participant.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {conversation.participant.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-b border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConversation.participant.avatar}
                    alt={selectedConversation.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConversation.participant.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedConversation.participant.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.participant.online ? 'Online' : 'Offline'} • {selectedConversation.participant.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages.map((message, index) => {
                const isOwnMessage = message.sender.id === '1';
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                      {!isOwnMessage && (
                        <div className="flex items-center space-x-2 mb-1">
                          <img
                            src={message.sender.avatar}
                            alt={message.sender.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-gray-500">{message.sender.name}</span>
                        </div>
                      )}
                      
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center space-x-1 mt-1 ${
                        isOwnMessage ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {isOwnMessage && (
                          message.read ? (
                            <CheckCheck className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Clock className="w-3 h-3 text-gray-400" />
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-t border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecione uma conversa
              </h3>
              <p className="text-gray-600">
                Escolha uma conversa da lista para começar a conversar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;