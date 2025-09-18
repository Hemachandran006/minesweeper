/**
 * Response Formatter Utility
 * Handles formatting of device specifications into readable responses
 */

import promptTemplate from '../config/prompt-template.json';
import specCategories from '../templates/spec-categories.json';

export class ResponseFormatter {
  constructor() {
    this.promptTemplate = promptTemplate;
    this.categories = specCategories.specification_categories;
    this.categoryOrder = specCategories.category_order;
  }

  /**
   * Format device specifications into a structured response
   * @param {Object} deviceData - Device specification data
   * @param {Object} options - Formatting options
   * @returns {string} Formatted response
   */
  formatDeviceSpecs(deviceData, options = {}) {
    const { showRumored = true, includeComparison = false, compact = false } = options;
    
    if (!deviceData || !deviceData.name) {
      return this.formatError('device_not_found', { device_name: 'Unknown Device' });
    }

    let response = `${this.promptTemplate.response_templates.device_specs.intro.replace('{device_name}', deviceData.name)}\n\n`;

    // Add device overview if available
    if (deviceData.overview) {
      response += `📋 **Overview**: ${deviceData.overview}\n\n`;
    }

    // Process each category in order
    this.categoryOrder.forEach(categoryKey => {
      const category = this.categories[categoryKey];
      const categoryData = deviceData.specifications?.[categoryKey];
      
      if (categoryData && Object.keys(categoryData).length > 0) {
        response += this.formatCategory(category, categoryData, { showRumored, compact });
      }
    });

    // Add additional info
    if (deviceData.pros && deviceData.pros.length > 0) {
      response += this.formatProsAndCons(deviceData.pros, deviceData.cons);
    }

    if (deviceData.notes && deviceData.notes.length > 0) {
      response += this.formatNotes(deviceData.notes);
    }

    return response.trim();
  }

  /**
   * Format a specification category
   * @param {Object} category - Category definition
   * @param {Object} categoryData - Category data
   * @param {Object} options - Formatting options
   * @returns {string} Formatted category
   */
  formatCategory(category, categoryData, options = {}) {
    const { showRumored = true, compact = false } = options;
    
    let categoryOutput = `${category.icon} **${category.category_name}**\n`;
    
    Object.keys(category.fields).forEach(fieldKey => {
      const field = category.fields[fieldKey];
      const fieldData = categoryData[fieldKey];
      
      if (fieldData !== undefined && fieldData !== null) {
        const isRumored = fieldData.rumored || false;
        const value = fieldData.value || fieldData;
        
        // Skip rumored specs if not requested
        if (isRumored && !showRumored) return;
        
        const prefix = isRumored ? '⚠️ ' : '• ';
        const formattedValue = this.formatFieldValue(value, field);
        
        if (!compact) {
          categoryOutput += `${prefix}**${field.label}**: ${formattedValue}\n`;
        } else {
          categoryOutput += `${prefix}${field.label}: ${formattedValue}\n`;
        }
      }
    });
    
    return categoryOutput + '\n';
  }

  /**
   * Format individual field values based on their type
   * @param {*} value - Field value
   * @param {Object} field - Field definition
   * @returns {string} Formatted value
   */
  formatFieldValue(value, field) {
    if (value === null || value === undefined) return 'Not specified';
    
    switch (field.format) {
      case 'array':
        return Array.isArray(value) ? value.join(', ') : value;
      
      case 'boolean':
        return value ? 'Yes' : 'No';
      
      case 'detailed_object':
        return this.formatDetailedObject(value);
      
      case 'price_range':
        return this.formatPriceRange(value);
      
      case 'date':
        return this.formatDate(value);
      
      case 'integer':
      case 'decimal':
        return field.unit ? `${value} ${field.unit}` : value.toString();
      
      default:
        return field.unit && typeof value === 'number' ? `${value} ${field.unit}` : value.toString();
    }
  }

  /**
   * Format detailed camera/sensor objects
   * @param {Object} obj - Detailed object
   * @returns {string} Formatted string
   */
  formatDetailedObject(obj) {
    if (typeof obj === 'string') return obj;
    if (!obj || typeof obj !== 'object') return 'Not specified';
    
    const parts = [];
    
    if (obj.megapixels) parts.push(`${obj.megapixels}MP`);
    if (obj.aperture) parts.push(`${obj.aperture}`);
    if (obj.sensor_size) parts.push(`${obj.sensor_size} sensor`);
    if (obj.zoom) parts.push(`${obj.zoom}`);
    if (obj.field_of_view) parts.push(`${obj.field_of_view} FOV`);
    if (obj.features && Array.isArray(obj.features)) {
      parts.push(`Features: ${obj.features.join(', ')}`);
    }
    
    return parts.join(', ') || 'Details not specified';
  }

  /**
   * Format price ranges
   * @param {*} price - Price value
   * @returns {string} Formatted price
   */
  formatPriceRange(price) {
    if (typeof price === 'string') return price;
    if (typeof price === 'number') return `$${price}`;
    if (price.min && price.max) return `$${price.min} - $${price.max}`;
    return 'Price not available';
  }

  /**
   * Format dates
   * @param {*} date - Date value
   * @returns {string} Formatted date
   */
  formatDate(date) {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return date.toString();
  }

  /**
   * Format pros and cons
   * @param {Array} pros - Pros array
   * @param {Array} cons - Cons array
   * @returns {string} Formatted pros and cons
   */
  formatProsAndCons(pros, cons) {
    let output = '\n✅ **Pros**:\n';
    pros.forEach(pro => output += `• ${pro}\n`);
    
    if (cons && cons.length > 0) {
      output += '\n❌ **Cons**:\n';
      cons.forEach(con => output += `• ${con}\n`);
    }
    
    return output + '\n';
  }

  /**
   * Format additional notes
   * @param {Array} notes - Notes array
   * @returns {string} Formatted notes
   */
  formatNotes(notes) {
    let output = '\n📝 **Additional Notes**:\n';
    notes.forEach(note => output += `• ${note}\n`);
    return output + '\n';
  }

  /**
   * Format comparison between two devices
   * @param {Object} device1 - First device data
   * @param {Object} device2 - Second device data
   * @param {Object} options - Formatting options
   * @returns {string} Formatted comparison
   */
  formatComparison(device1, device2, options = {}) {
    const { highlightDifferences = true, compact = false } = options;
    
    const intro = this.promptTemplate.response_templates.device_specs.comparison_intro
      .replace('{device1}', device1.name)
      .replace('{device2}', device2.name);
    
    let response = `${intro}\n\n`;
    
    // Create side-by-side comparison
    this.categoryOrder.forEach(categoryKey => {
      const category = this.categories[categoryKey];
      const data1 = device1.specifications?.[categoryKey];
      const data2 = device2.specifications?.[categoryKey];
      
      if (data1 || data2) {
        response += this.formatCategoryComparison(category, data1, data2, device1.name, device2.name, options);
      }
    });
    
    return response.trim();
  }

  /**
   * Format category comparison
   * @param {Object} category - Category definition
   * @param {Object} data1 - First device category data
   * @param {Object} data2 - Second device category data
   * @param {string} name1 - First device name
   * @param {string} name2 - Second device name
   * @param {Object} options - Formatting options
   * @returns {string} Formatted category comparison
   */
  formatCategoryComparison(category, data1, data2, name1, name2, options = {}) {
    const { highlightDifferences = true } = options;
    
    let output = `${category.icon} **${category.category_name}**\n`;
    
    // Create table-like format
    output += `| Feature | ${name1} | ${name2} |\n`;
    output += `|---------|${'-'.repeat(name1.length)}|${'-'.repeat(name2.length)}|\n`;
    
    Object.keys(category.fields).forEach(fieldKey => {
      const field = category.fields[fieldKey];
      const value1 = data1?.[fieldKey];
      const value2 = data2?.[fieldKey];
      
      if (value1 !== undefined || value2 !== undefined) {
        const formatted1 = value1 ? this.formatFieldValue(value1.value || value1, field) : 'N/A';
        const formatted2 = value2 ? this.formatFieldValue(value2.value || value2, field) : 'N/A';
        
        const isDifferent = formatted1 !== formatted2;
        const marker = highlightDifferences && isDifferent ? '**' : '';
        
        output += `| ${field.label} | ${marker}${formatted1}${marker} | ${marker}${formatted2}${marker} |\n`;
      }
    });
    
    return output + '\n';
  }

  /**
   * Format error messages
   * @param {string} errorType - Type of error
   * @param {Object} context - Error context
   * @returns {string} Formatted error message
   */
  formatError(errorType, context = {}) {
    const errorTemplates = this.promptTemplate.response_templates.error_handling;
    const template = errorTemplates[errorType] || 'An error occurred while processing your request.';
    
    let message = template;
    Object.keys(context).forEach(key => {
      message = message.replace(`{${key}}`, context[key]);
    });
    
    return `❌ ${message}`;
  }

  /**
   * Format recommendation response
   * @param {Array} recommendations - Array of recommended devices
   * @param {Object} criteria - Recommendation criteria
   * @returns {string} Formatted recommendations
   */
  formatRecommendations(recommendations, criteria = {}) {
    let response = `${this.promptTemplate.response_templates.device_specs.recommendation_intro}\n\n`;
    
    if (criteria.budget) {
      response += `💰 **Budget**: ${criteria.budget}\n`;
    }
    if (criteria.use_case) {
      response += `🎯 **Use Case**: ${criteria.use_case}\n`;
    }
    if (criteria.priorities && criteria.priorities.length > 0) {
      response += `⭐ **Priorities**: ${criteria.priorities.join(', ')}\n`;
    }
    
    response += '\n🏆 **Recommended Devices**:\n\n';
    
    recommendations.forEach((device, index) => {
      response += `**${index + 1}. ${device.name}**\n`;
      response += `💰 Price: ${device.price || 'Price varies'}\n`;
      response += `⭐ Match Score: ${device.matchScore}%\n`;
      response += `📝 Why: ${device.reason}\n`;
      
      if (device.keyFeatures && device.keyFeatures.length > 0) {
        response += `🔑 Key Features: ${device.keyFeatures.join(', ')}\n`;
      }
      
      response += '\n';
    });
    
    return response.trim();
  }
}

export default ResponseFormatter;