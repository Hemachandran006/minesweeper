/**
 * Utility functions for input validation and query handling
 */

/**
 * Validate user input for device queries
 */
export class InputValidator {
  /**
   * Clean and validate search query
   */
  static validateSearchQuery(query: string): { isValid: boolean; cleanedQuery: string; error?: string } {
    // Remove extra whitespace and special characters
    const cleaned = query.trim().replace(/[^\w\s-]/g, '');
    
    if (cleaned.length === 0) {
      return {
        isValid: false,
        cleanedQuery: '',
        error: '❌ Please enter a search term (device name, brand, or feature)'
      };
    }
    
    if (cleaned.length < 2) {
      return {
        isValid: false,
        cleanedQuery: cleaned,
        error: '❌ Search term must be at least 2 characters long'
      };
    }
    
    if (cleaned.length > 100) {
      return {
        isValid: false,
        cleanedQuery: cleaned.substring(0, 100),
        error: '❌ Search term is too long (max 100 characters)'
      };
    }
    
    return {
      isValid: true,
      cleanedQuery: cleaned
    };
  }

  /**
   * Validate device ID
   */
  static validateDeviceId(deviceId: string): { isValid: boolean; error?: string } {
    if (!deviceId || typeof deviceId !== 'string') {
      return {
        isValid: false,
        error: '❌ Invalid device ID'
      };
    }
    
    const cleaned = deviceId.trim();
    if (cleaned.length === 0) {
      return {
        isValid: false,
        error: '❌ Device ID cannot be empty'
      };
    }
    
    return { isValid: true };
  }
}

/**
 * Query processing and response formatting
 */
export class QueryProcessor {
  /**
   * Process user query and determine intent
   */
  static processQuery(query: string): {
    intent: 'search' | 'compare' | 'specs' | 'help' | 'list' | 'unknown';
    entities: string[];
    confidence: number;
  } {
    const lowerQuery = query.toLowerCase().trim();
    
    // Help intent
    if (this.matchesPattern(lowerQuery, ['help', 'how', 'what can you', 'commands'])) {
      return { intent: 'help', entities: [], confidence: 0.9 };
    }
    
    // List intent
    if (this.matchesPattern(lowerQuery, ['list', 'show all', 'available', 'brands'])) {
      return { intent: 'list', entities: [], confidence: 0.8 };
    }
    
    // Compare intent
    if (this.matchesPattern(lowerQuery, ['compare', 'vs', 'versus', 'difference'])) {
      const devices = this.extractDeviceNames(query);
      return { intent: 'compare', entities: devices, confidence: 0.8 };
    }
    
    // Specs intent
    if (this.matchesPattern(lowerQuery, ['specs', 'specification', 'details', 'info'])) {
      const devices = this.extractDeviceNames(query);
      return { intent: 'specs', entities: devices, confidence: 0.9 };
    }
    
    // Search intent (default)
    const entities = this.extractSearchTerms(query);
    const confidence = entities.length > 0 ? 0.7 : 0.3;
    
    return { intent: 'search', entities, confidence };
  }

  /**
   * Check if query matches any of the patterns
   */
  private static matchesPattern(query: string, patterns: string[]): boolean {
    return patterns.some(pattern => query.includes(pattern));
  }

  /**
   * Extract device names from query
   */
  private static extractDeviceNames(query: string): string[] {
    const knownDevices = [
      'iphone 15 pro', 'iphone 15', 'iphone',
      'galaxy s24 ultra', 'galaxy s24', 'samsung',
      'pixel 8 pro', 'pixel 8', 'pixel',
      'oneplus 12', 'oneplus',
      'xiaomi 14 ultra', 'xiaomi 14', 'xiaomi'
    ];
    
    const found: string[] = [];
    const lowerQuery = query.toLowerCase();
    
    knownDevices.forEach(device => {
      if (lowerQuery.includes(device)) {
        found.push(device);
      }
    });
    
    return found;
  }

  /**
   * Extract search terms from query
   */
  private static extractSearchTerms(query: string): string[] {
    // Split by common separators and filter out short words
    return query
      .split(/[\s,]+/)
      .map(term => term.trim())
      .filter(term => term.length > 1);
  }

  /**
   * Generate helpful error messages
   */
  static generateErrorMessage(type: 'not_found' | 'invalid_input' | 'too_many_results' | 'no_results'): string {
    switch (type) {
      case 'not_found':
        return `❌ **Device not found!**

I couldn't find that device in my database. Try:
🔍 Searching by brand (e.g., "Apple", "Samsung")
📱 Using the full device name (e.g., "iPhone 15 Pro")
💡 Type "help" to see available commands`;

      case 'invalid_input':
        return `❌ **Invalid input!**

Please check your search term and try again:
✅ Use letters, numbers, and spaces only
📝 Minimum 2 characters required
💡 Type "help" for guidance`;

      case 'too_many_results':
        return `⚠️ **Too many results!**

Please be more specific:
🎯 Add model name (e.g., "iPhone 15 Pro" instead of "iPhone")
🏷️ Include specific features you're looking for
💡 Try searching by exact device name`;

      case 'no_results':
        return `🔍 **No devices found!**

Try these suggestions:
📱 Check device name spelling
🏢 Search by brand name
⭐ Look for popular features (e.g., "camera", "gaming")
📋 Type "list" to see all available devices`;

      default:
        return '❌ Something went wrong. Please try again.';
    }
  }

  /**
   * Generate help message
   */
  static generateHelpMessage(): string {
    return `🤖 **Mobile Device Specification Chatbot Help**

**Available Commands:**
🔍 **Search**: Type device name, brand, or feature
   Examples: "iPhone 15 Pro", "Samsung", "gaming phone"

📱 **Device Info**: Get detailed specifications
   Examples: "iPhone 15 Pro specs", "Pixel 8 Pro details"

📋 **List Devices**: See all available devices
   Command: "list" or "show all devices"

🆚 **Compare**: Compare devices (coming soon)
   Examples: "compare iPhone 15 Pro vs Galaxy S24 Ultra"

**Tips:**
✨ Use specific device names for best results
🎯 Search by features like "camera", "gaming", "battery"
🏷️ Try brand names: Apple, Samsung, Google, OnePlus, Xiaomi

**Sample Queries:**
• "Show me iPhone 15 Pro specifications"
• "Samsung flagship phones"
• "Best camera phone"
• "Gaming phones under $1000"

Need more help? Just ask! 😊`;
  }

  /**
   * Format device not found response with suggestions
   */
  static formatDeviceNotFoundResponse(_query: string, suggestions: string[]): string {
    let response = this.generateErrorMessage('not_found');
    
    if (suggestions.length > 0) {
      response += `\n\n💡 **Did you mean:**\n`;
      suggestions.forEach(suggestion => {
        response += `• ${suggestion}\n`;
      });
    }
    
    return response;
  }
}