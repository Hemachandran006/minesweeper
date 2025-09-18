import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Device } from '../types/device';
import { DeviceDataStore } from '../data/deviceDatabase';
import { DeviceSpec } from '../utils/DeviceSpec';
import { InputValidator, QueryProcessor } from '../utils/queryProcessor';

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `🤖 **Welcome to the Mobile Device Specification Chatbot!**

I can help you find detailed specifications for popular mobile devices.

**Quick Start:**
• Type a device name (e.g., "iPhone 15 Pro")
• Search by brand (e.g., "Samsung")
• Look for features (e.g., "gaming phone")
• Type "help" for more commands

What device would you like to know about? 📱`,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dataStore = new DeviceDataStore();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const response = processUserQuery(userMessage.content);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 500);
  };

  const processUserQuery = (query: string): ChatMessage => {
    // Validate input
    const validation = InputValidator.validateSearchQuery(query);
    if (!validation.isValid) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: validation.error || 'Invalid input',
        timestamp: new Date()
      };
    }

    // Process query to determine intent
    const processed = QueryProcessor.processQuery(validation.cleanedQuery);
    
    let responseContent: string;
    let foundDevice: Device | undefined;

    switch (processed.intent) {
      case 'help':
        responseContent = QueryProcessor.generateHelpMessage();
        break;

      case 'list':
        responseContent = generateDeviceListResponse();
        break;

      case 'specs':
      case 'search': {
        const searchResults = dataStore.searchDevices(validation.cleanedQuery);
        
        if (searchResults.length === 0) {
          const suggestions = dataStore.getSuggestions(validation.cleanedQuery);
          responseContent = QueryProcessor.formatDeviceNotFoundResponse(validation.cleanedQuery, suggestions);
        } else if (searchResults.length === 1) {
          foundDevice = searchResults[0];
          const deviceSpec = new DeviceSpec(foundDevice);
          responseContent = `📱 **Found: ${deviceSpec.getDeviceName()}**\n\n${deviceSpec.getCompleteSpecs()}`;
        } else if (searchResults.length <= 5) {
          responseContent = generateMultipleResultsResponse(searchResults);
        } else {
          responseContent = `${QueryProcessor.generateErrorMessage('too_many_results')}\n\n**Found ${searchResults.length} devices matching "${validation.cleanedQuery}"**\n\nTry being more specific with your search.`;
        }
        break;
      }

      case 'compare':
        responseContent = '🆚 **Compare Feature Coming Soon!**\n\nFor now, you can search for individual devices and compare their specs manually.\n\nExample: Search for "iPhone 15 Pro" and then "Galaxy S24 Ultra"';
        break;

      default:
        responseContent = `🤔 I'm not sure what you're looking for.\n\n${QueryProcessor.generateHelpMessage()}`;
        break;
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: responseContent,
      device: foundDevice,
      timestamp: new Date()
    };
  };

  const generateDeviceListResponse = (): string => {
    const devices = dataStore.getAllDevices();
    const brands = dataStore.getAvailableBrands();
    
    let response = `📋 **Available Devices in Database**\n\n`;
    
    brands.forEach(brand => {
      const brandDevices = dataStore.getDevicesByBrand(brand);
      response += `**${brand}:**\n`;
      brandDevices.forEach(device => {
        const deviceSpec = new DeviceSpec(device);
        response += `• ${deviceSpec.getDeviceName()} (${device.general.priceRange})\n`;
      });
      response += '\n';
    });
    
    response += `**Total: ${devices.length} devices**\n\n`;
    response += `💡 **Quick Search Tips:**\n`;
    response += `• Type device name: "iPhone 15 Pro"\n`;
    response += `• Search by brand: "Samsung"\n`;
    response += `• Find by feature: "gaming", "camera"`;
    
    return response;
  };

  const generateMultipleResultsResponse = (devices: Device[]): string => {
    let response = `🔍 **Found ${devices.length} devices:**\n\n`;
    
    devices.forEach((device, index) => {
      const deviceSpec = new DeviceSpec(device);
      response += `**${index + 1}. ${deviceSpec.getSummary()}**\n\n`;
    });
    
    response += `💡 **For detailed specs, search for a specific device name.**`;
    
    return response;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const formatMessageContent = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`chatbot-container ${className}`} style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📱 Mobile Device Specs Chatbot</h1>
        <p style={styles.subtitle}>Get detailed specifications for popular mobile devices</p>
      </div>
      
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div key={message.id} style={styles.messageWrapper}>
            <div 
              style={{
                ...styles.message,
                ...(message.type === 'user' ? styles.userMessage : styles.botMessage)
              }}
            >
              <div style={styles.messageHeader}>
                <span style={styles.messageType}>
                  {message.type === 'user' ? '👤 You' : '🤖 Bot'}
                </span>
                <span style={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div 
                style={styles.messageContent}
                dangerouslySetInnerHTML={{ 
                  __html: formatMessageContent(message.content) 
                }}
              />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={styles.messageWrapper}>
            <div style={{...styles.message, ...styles.botMessage}}>
              <div style={styles.messageHeader}>
                <span style={styles.messageType}>🤖 Bot</span>
                <span style={styles.timestamp}>thinking...</span>
              </div>
              <div style={styles.loadingContent}>
                <span style={styles.loadingText}>🔍 Searching device database...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} style={styles.inputForm}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type device name, brand, or feature (e.g., 'iPhone 15 Pro', 'Samsung', 'gaming phone')"
            style={styles.input}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            style={{
              ...styles.sendButton,
              ...(isLoading ? styles.sendButtonDisabled : {})
            }}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? '⏳' : '🔍'}
          </button>
        </div>
        
        <div style={styles.quickSuggestions}>
          <span style={styles.suggestionsLabel}>Quick try:</span>
          {['iPhone 15 Pro', 'Samsung Galaxy S24', 'gaming phone', 'list', 'help'].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              style={styles.suggestionButton}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    padding: '20px',
    backgroundColor: '#2563eb',
    color: 'white',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    opacity: 0.9
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
    backgroundColor: '#ffffff'
  },
  messageWrapper: {
    marginBottom: '16px'
  },
  message: {
    maxWidth: '85%',
    padding: '12px 16px',
    borderRadius: '18px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  userMessage: {
    backgroundColor: '#2563eb',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 0
  },
  botMessage: {
    backgroundColor: '#e5e7eb',
    color: '#374151',
    marginLeft: 0,
    marginRight: 'auto'
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '12px',
    opacity: 0.8
  },
  messageType: {
    fontWeight: 'bold'
  },
  timestamp: {
    fontSize: '11px'
  },
  messageContent: {
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap' as const
  },
  loadingContent: {
    fontStyle: 'italic'
  },
  loadingText: {
    animation: 'pulse 1.5s ease-in-out infinite'
  },
  inputForm: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb'
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '24px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  sendButton: {
    padding: '12px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
    minWidth: '48px',
    minHeight: '48px'
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  },
  quickSuggestions: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    alignItems: 'center'
  },
  suggestionsLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginRight: '8px'
  },
  suggestionButton: {
    padding: '6px 12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '16px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: '#374151'
  }
};

export default Chatbot;