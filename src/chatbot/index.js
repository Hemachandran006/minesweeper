/**
 * Main entry point for the Mobile Device Specifications Chatbot
 * This file demonstrates how to use the chatbot system
 */

import { ResponseFormatter } from './utils/formatter.js';
import { DeviceComparison } from './utils/comparison.js';
import { DeviceRecommendations } from './utils/recommendations.js';

export class MobileSpecChatbot {
  constructor() {
    this.formatter = new ResponseFormatter();
    this.comparison = new DeviceComparison();
    this.recommender = new DeviceRecommendations();
    this.deviceDatabase = []; // This would be populated with actual device data
  }

  /**
   * Process user query and return appropriate response
   * @param {string} query - User query
   * @param {Object} context - Query context
   * @returns {string} Formatted response
   */
  async processQuery(query, context = {}) {
    const queryType = this.analyzeQuery(query);
    
    switch (queryType.type) {
      case 'device_specs':
        return this.handleDeviceSpecsQuery(queryType.deviceName, context);
      
      case 'comparison':
        return this.handleComparisonQuery(queryType.devices, context);
      
      case 'recommendation':
        return this.handleRecommendationQuery(queryType.criteria, context);
      
      case 'help':
        return this.getHelpResponse();
      
      default:
        return this.getDefaultResponse(query);
    }
  }

  /**
   * Analyze user query to determine intent
   * @param {string} query - User query
   * @returns {Object} Query analysis
   */
  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Check for comparison keywords
    if (lowerQuery.includes('vs') || lowerQuery.includes('compare') || lowerQuery.includes('versus')) {
      const devices = this.extractDeviceNames(query);
      return { type: 'comparison', devices };
    }
    
    // Check for recommendation keywords
    if (lowerQuery.includes('recommend') || lowerQuery.includes('suggest') || lowerQuery.includes('best for')) {
      const criteria = this.extractRecommendationCriteria(query);
      return { type: 'recommendation', criteria };
    }
    
    // Check for help keywords
    if (lowerQuery.includes('help') || lowerQuery.includes('how to') || lowerQuery.includes('what can you')) {
      return { type: 'help' };
    }
    
    // Default to device specs if a device name is mentioned
    const deviceName = this.extractDeviceNames(query)[0];
    if (deviceName) {
      return { type: 'device_specs', deviceName };
    }
    
    return { type: 'unknown', query };
  }

  /**
   * Extract device names from query
   * @param {string} query - User query
   * @returns {Array} Extracted device names
   */
  extractDeviceNames(query) {
    // This is a simplified implementation
    // In practice, you'd use NLP or a more sophisticated matching algorithm
    const commonDevices = [
      'iphone 15 pro', 'iphone 15', 'iphone 14',
      'samsung galaxy s24', 'samsung s24 ultra', 'galaxy s23',
      'google pixel 8', 'pixel 8 pro', 'pixel 7',
      'oneplus 12', 'oneplus 11', 'oneplus 10',
      'xiaomi 14', 'xiaomi 13 pro', 'xiaomi 12'
    ];
    
    const lowerQuery = query.toLowerCase();
    return commonDevices.filter(device => lowerQuery.includes(device));
  }

  /**
   * Extract recommendation criteria from query
   * @param {string} query - User query
   * @returns {Object} Recommendation criteria
   */
  extractRecommendationCriteria(query) {
    const criteria = {
      useCase: 'general',
      budget: null,
      priorities: [],
      requirements: {}
    };
    
    const lowerQuery = query.toLowerCase();
    
    // Extract budget
    const budgetMatch = query.match(/\$?(\d+)(?:\s*-\s*\$?(\d+))?/);
    if (budgetMatch) {
      if (budgetMatch[2]) {
        criteria.budget = `${budgetMatch[1]}-${budgetMatch[2]}`;
      } else {
        criteria.budget = parseInt(budgetMatch[1]);
      }
    }
    
    // Extract use case keywords
    const useCaseKeywords = {
      photography: ['photo', 'camera', 'picture', 'photography'],
      gaming: ['game', 'gaming', 'performance', 'fps'],
      business: ['work', 'business', 'professional', 'office'],
      budget: ['cheap', 'budget', 'affordable', 'value']
    };
    
    Object.entries(useCaseKeywords).forEach(([useCase, keywords]) => {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        criteria.useCase = useCase;
      }
    });
    
    // Extract priorities
    if (lowerQuery.includes('camera')) criteria.priorities.push('camera quality');
    if (lowerQuery.includes('battery')) criteria.priorities.push('battery life');
    if (lowerQuery.includes('performance') || lowerQuery.includes('speed')) {
      criteria.priorities.push('performance');
    }
    if (lowerQuery.includes('display') || lowerQuery.includes('screen')) {
      criteria.priorities.push('display quality');
    }
    
    return criteria;
  }

  /**
   * Handle device specifications query
   * @param {string} deviceName - Device name
   * @param {Object} context - Query context
   * @returns {string} Formatted response
   */
  async handleDeviceSpecsQuery(deviceName, context) {
    const device = this.findDevice(deviceName);
    
    if (!device) {
      return this.formatter.formatError('device_not_found', { device_name: deviceName });
    }
    
    return this.formatter.formatDeviceSpecs(device, {
      showRumored: context.showRumored !== false,
      compact: context.compact || false
    });
  }

  /**
   * Handle comparison query
   * @param {Array} devices - Device names to compare
   * @param {Object} context - Query context
   * @returns {string} Formatted response
   */
  async handleComparisonQuery(devices, context) {
    if (devices.length < 2) {
      return "I need at least two devices to compare. Please specify which devices you'd like me to compare.";
    }
    
    const device1 = this.findDevice(devices[0]);
    const device2 = this.findDevice(devices[1]);
    
    if (!device1 || !device2) {
      const missing = [];
      if (!device1) missing.push(devices[0]);
      if (!device2) missing.push(devices[1]);
      return `I don't have information about: ${missing.join(', ')}. Please check the device names.`;
    }
    
    const comparisonResult = this.comparison.compareDevices(device1, device2, {
      focusCategories: context.focusCategories || [],
      includeScoring: true,
      userPriorities: context.userPriorities || {}
    });
    
    return this.formatter.formatComparison(device1, device2, {
      highlightDifferences: true,
      compact: context.compact || false
    });
  }

  /**
   * Handle recommendation query
   * @param {Object} criteria - Recommendation criteria
   * @param {Object} context - Query context
   * @returns {string} Formatted response
   */
  async handleRecommendationQuery(criteria, context) {
    const recommendations = this.recommender.generateRecommendations(
      criteria,
      this.deviceDatabase,
      {
        maxRecommendations: context.maxRecommendations || 5,
        includeAlternatives: context.includeAlternatives !== false
      }
    );
    
    return this.formatter.formatRecommendations(
      recommendations.recommendations,
      criteria
    );
  }

  /**
   * Get help response
   * @returns {string} Help message
   */
  getHelpResponse() {
    return `
🤖 **Mobile Device Specifications Assistant**

I can help you with:

📱 **Device Specifications**
- "Tell me about iPhone 15 Pro"
- "What are the specs of Samsung Galaxy S24?"
- "Show me Pixel 8 Pro features"

⚖️ **Device Comparisons**
- "Compare iPhone 15 vs Samsung S24"
- "iPhone 15 Pro vs Pixel 8 Pro camera"
- "Samsung S24 Ultra vs iPhone 15 Pro Max"

🎯 **Personalized Recommendations**
- "Best phone for photography under $800"
- "Recommend a gaming phone"
- "Business phone with good battery life"
- "Budget phone with good camera"

💡 **Tips:**
- Be specific about models and variants
- Mention your budget range if seeking recommendations
- Specify your priorities (camera, battery, performance, etc.)
- Ask about specific features you care about

What would you like to know about mobile devices?
    `.trim();
  }

  /**
   * Get default response for unrecognized queries
   * @param {string} query - Original query
   * @returns {string} Default response
   */
  getDefaultResponse(query) {
    return `I didn't quite understand your request about "${query}". 

I specialize in mobile device specifications, comparisons, and recommendations. You can ask me about:

• Specific device specs: "Tell me about iPhone 15 Pro"
• Device comparisons: "Compare iPhone 15 vs Samsung S24"  
• Recommendations: "Best camera phone under $800"

Type "help" for more examples of what I can do!`;
  }

  /**
   * Find device in database
   * @param {string} deviceName - Device name to search for
   * @returns {Object|null} Found device or null
   */
  findDevice(deviceName) {
    // This is a simplified search - in practice you'd implement fuzzy matching
    const normalizedName = deviceName.toLowerCase().trim();
    
    return this.deviceDatabase.find(device => 
      device.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(device.name.toLowerCase())
    );
  }

  /**
   * Add device to database
   * @param {Object} device - Device data
   */
  addDevice(device) {
    this.deviceDatabase.push(device);
  }

  /**
   * Set device database
   * @param {Array} devices - Array of device objects
   */
  setDeviceDatabase(devices) {
    this.deviceDatabase = devices;
  }

  /**
   * Get available devices
   * @returns {Array} Available device names
   */
  getAvailableDevices() {
    return this.deviceDatabase.map(device => device.name);
  }
}

export default MobileSpecChatbot;