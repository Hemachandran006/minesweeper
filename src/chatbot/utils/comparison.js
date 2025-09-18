/**
 * Device Comparison Utility
 * Handles logic for comparing mobile devices across different specifications
 */

import specCategories from '../templates/spec-categories.json';

export class DeviceComparison {
  constructor() {
    this.categories = specCategories.specification_categories;
    this.categoryWeights = specCategories.comparison_weights;
    this.categoryOrder = specCategories.category_order;
  }

  /**
   * Compare two devices and return detailed comparison
   * @param {Object} device1 - First device data
   * @param {Object} device2 - Second device data
   * @param {Object} options - Comparison options
   * @returns {Object} Comparison result
   */
  compareDevices(device1, device2, options = {}) {
    const { 
      focusCategories = [], 
      includeScoring = true, 
      userPriorities = {} 
    } = options;

    const comparison = {
      device1: device1.name,
      device2: device2.name,
      summary: this.generateComparisonSummary(device1, device2),
      categories: {},
      overall: {},
      recommendations: []
    };

    // Compare each category
    this.categoryOrder.forEach(categoryKey => {
      if (focusCategories.length === 0 || focusCategories.includes(categoryKey)) {
        const categoryComparison = this.compareCategorySpecs(
          categoryKey,
          device1.specifications?.[categoryKey],
          device2.specifications?.[categoryKey]
        );
        
        if (categoryComparison.hasData) {
          comparison.categories[categoryKey] = categoryComparison;
        }
      }
    });

    // Calculate overall scores if requested
    if (includeScoring) {
      comparison.overall = this.calculateOverallScores(comparison.categories, userPriorities);
    }

    // Generate recommendations
    comparison.recommendations = this.generateComparisonRecommendations(device1, device2, comparison);

    return comparison;
  }

  /**
   * Compare specifications within a category
   * @param {string} categoryKey - Category identifier
   * @param {Object} specs1 - First device category specs
   * @param {Object} specs2 - Second device category specs
   * @returns {Object} Category comparison result
   */
  compareCategorySpecs(categoryKey, specs1, specs2) {
    const category = this.categories[categoryKey];
    const comparison = {
      category: category.category_name,
      icon: category.icon,
      hasData: false,
      fields: {},
      winner: null,
      advantages: { device1: [], device2: [] }
    };

    let device1Score = 0;
    let device2Score = 0;
    let totalFields = 0;

    Object.keys(category.fields).forEach(fieldKey => {
      const field = category.fields[fieldKey];
      const value1 = specs1?.[fieldKey];
      const value2 = specs2?.[fieldKey];

      if (value1 !== undefined || value2 !== undefined) {
        comparison.hasData = true;
        const fieldComparison = this.compareFieldValues(
          fieldKey,
          value1,
          value2,
          field
        );
        
        comparison.fields[fieldKey] = fieldComparison;
        
        // Track advantages
        if (fieldComparison.winner === 'device1') {
          comparison.advantages.device1.push(field.label);
          device1Score++;
        } else if (fieldComparison.winner === 'device2') {
          comparison.advantages.device2.push(field.label);
          device2Score++;
        }
        
        totalFields++;
      }
    });

    // Determine category winner
    if (device1Score > device2Score) {
      comparison.winner = 'device1';
    } else if (device2Score > device1Score) {
      comparison.winner = 'device2';
    } else {
      comparison.winner = 'tie';
    }

    comparison.scores = {
      device1: totalFields > 0 ? (device1Score / totalFields) * 100 : 0,
      device2: totalFields > 0 ? (device2Score / totalFields) * 100 : 0
    };

    return comparison;
  }

  /**
   * Compare individual field values
   * @param {string} fieldKey - Field identifier
   * @param {*} value1 - First device value
   * @param {*} value2 - Second device value
   * @param {Object} field - Field definition
   * @returns {Object} Field comparison result
   */
  compareFieldValues(fieldKey, value1, value2, field) {
    const comparison = {
      field: field.label,
      value1: this.extractValue(value1),
      value2: this.extractValue(value2),
      winner: null,
      difference: null,
      notes: []
    };

    // Handle missing values
    if (comparison.value1 === null && comparison.value2 === null) {
      comparison.winner = 'tie';
      comparison.notes.push('Not available for either device');
      return comparison;
    }
    
    if (comparison.value1 === null) {
      comparison.winner = 'device2';
      comparison.notes.push('Only available on device 2');
      return comparison;
    }
    
    if (comparison.value2 === null) {
      comparison.winner = 'device1';
      comparison.notes.push('Only available on device 1');
      return comparison;
    }

    // Type-specific comparisons
    switch (field.format) {
      case 'integer':
      case 'decimal':
        comparison.winner = this.compareNumericValues(
          comparison.value1, 
          comparison.value2, 
          fieldKey
        );
        comparison.difference = Math.abs(comparison.value1 - comparison.value2);
        break;

      case 'array':
        comparison.winner = this.compareArrayValues(
          comparison.value1, 
          comparison.value2
        );
        break;

      case 'boolean':
        comparison.winner = this.compareBooleanValues(
          comparison.value1, 
          comparison.value2, 
          fieldKey
        );
        break;

      case 'detailed_object':
        comparison.winner = this.compareDetailedObjects(
          comparison.value1, 
          comparison.value2, 
          fieldKey
        );
        break;

      default:
        comparison.winner = this.compareStringValues(
          comparison.value1, 
          comparison.value2
        );
    }

    return comparison;
  }

  /**
   * Extract value from potentially complex data structure
   * @param {*} data - Data to extract value from
   * @returns {*} Extracted value
   */
  extractValue(data) {
    if (data === undefined || data === null) return null;
    if (typeof data === 'object' && data.value !== undefined) {
      return data.value;
    }
    return data;
  }

  /**
   * Compare numeric values (higher is generally better)
   * @param {number} value1 - First value
   * @param {number} value2 - Second value
   * @param {string} fieldKey - Field identifier for context
   * @returns {string} Winner ('device1', 'device2', or 'tie')
   */
  compareNumericValues(value1, value2, fieldKey) {
    // Some fields where lower is better
    const lowerIsBetter = ['weight', 'charging_time'];
    
    if (value1 === value2) return 'tie';
    
    if (lowerIsBetter.includes(fieldKey)) {
      return value1 < value2 ? 'device1' : 'device2';
    } else {
      return value1 > value2 ? 'device1' : 'device2';
    }
  }

  /**
   * Compare array values (more options generally better)
   * @param {Array} array1 - First array
   * @param {Array} array2 - Second array
   * @returns {string} Winner
   */
  compareArrayValues(array1, array2) {
    if (!Array.isArray(array1)) array1 = [array1];
    if (!Array.isArray(array2)) array2 = [array2];
    
    if (array1.length === array2.length) return 'tie';
    return array1.length > array2.length ? 'device1' : 'device2';
  }

  /**
   * Compare boolean values (true generally better)
   * @param {boolean} value1 - First value
   * @param {boolean} value2 - Second value
   * @param {string} fieldKey - Field identifier for context
   * @returns {string} Winner
   */
  compareBooleanValues(value1, value2, fieldKey) {
    if (value1 === value2) return 'tie';
    
    // For most boolean fields, true is better
    return value1 ? 'device1' : 'device2';
  }

  /**
   * Compare detailed objects (camera specs, etc.)
   * @param {Object} obj1 - First object
   * @param {Object} obj2 - Second object
   * @param {string} fieldKey - Field identifier
   * @returns {string} Winner
   */
  compareDetailedObjects(obj1, obj2, fieldKey) {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return this.compareStringValues(obj1, obj2);
    }

    let score1 = 0;
    let score2 = 0;

    // Compare megapixels if available
    if (obj1.megapixels && obj2.megapixels) {
      const mp1 = parseFloat(obj1.megapixels);
      const mp2 = parseFloat(obj2.megapixels);
      if (mp1 > mp2) score1++;
      else if (mp2 > mp1) score2++;
    }

    // Compare aperture (lower f-number is better)
    if (obj1.aperture && obj2.aperture) {
      const f1 = parseFloat(obj1.aperture.replace('f/', ''));
      const f2 = parseFloat(obj2.aperture.replace('f/', ''));
      if (f1 < f2) score1++;
      else if (f2 < f1) score2++;
    }

    // Compare features count
    if (obj1.features && obj2.features) {
      if (obj1.features.length > obj2.features.length) score1++;
      else if (obj2.features.length > obj1.features.length) score2++;
    }

    if (score1 === score2) return 'tie';
    return score1 > score2 ? 'device1' : 'device2';
  }

  /**
   * Compare string values (basic comparison)
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {string} Winner
   */
  compareStringValues(str1, str2) {
    // Basic string comparison - this could be enhanced with more sophisticated logic
    if (str1 === str2) return 'tie';
    
    // For now, just return tie for different strings
    // This could be enhanced with version comparison, feature detection, etc.
    return 'tie';
  }

  /**
   * Calculate overall scores across all categories
   * @param {Object} categoryComparisons - Category comparison results
   * @param {Object} userPriorities - User priority weights
   * @returns {Object} Overall scores
   */
  calculateOverallScores(categoryComparisons, userPriorities = {}) {
    let weightedScore1 = 0;
    let weightedScore2 = 0;
    let totalWeight = 0;

    Object.keys(categoryComparisons).forEach(categoryKey => {
      const comparison = categoryComparisons[categoryKey];
      const weight = userPriorities[categoryKey] || this.categoryWeights[categoryKey] || 0.1;
      
      weightedScore1 += comparison.scores.device1 * weight;
      weightedScore2 += comparison.scores.device2 * weight;
      totalWeight += weight;
    });

    const finalScore1 = totalWeight > 0 ? (weightedScore1 / totalWeight) : 0;
    const finalScore2 = totalWeight > 0 ? (weightedScore2 / totalWeight) : 0;

    return {
      device1: Math.round(finalScore1 * 100) / 100,
      device2: Math.round(finalScore2 * 100) / 100,
      winner: finalScore1 > finalScore2 ? 'device1' : 
              finalScore2 > finalScore1 ? 'device2' : 'tie',
      margin: Math.abs(finalScore1 - finalScore2)
    };
  }

  /**
   * Generate comparison summary
   * @param {Object} device1 - First device
   * @param {Object} device2 - Second device
   * @returns {Object} Summary
   */
  generateComparisonSummary(device1, device2) {
    return {
      device1Name: device1.name,
      device2Name: device2.name,
      device1Release: device1.specifications?.pricing?.release_date?.value || 'Unknown',
      device2Release: device2.specifications?.pricing?.release_date?.value || 'Unknown',
      device1Price: device1.specifications?.pricing?.current_price?.value || 'Unknown',
      device2Price: device2.specifications?.pricing?.current_price?.value || 'Unknown',
      generationGap: this.calculateGenerationGap(device1, device2)
    };
  }

  /**
   * Calculate generation gap between devices
   * @param {Object} device1 - First device
   * @param {Object} device2 - Second device
   * @returns {string} Generation gap description
   */
  calculateGenerationGap(device1, device2) {
    const date1 = device1.specifications?.pricing?.release_date?.value;
    const date2 = device2.specifications?.pricing?.release_date?.value;
    
    if (!date1 || !date2) return 'Unknown';
    
    const year1 = new Date(date1).getFullYear();
    const year2 = new Date(date2).getFullYear();
    const gap = Math.abs(year1 - year2);
    
    if (gap === 0) return 'Same generation';
    if (gap === 1) return '1 year apart';
    return `${gap} years apart`;
  }

  /**
   * Generate comparison recommendations
   * @param {Object} device1 - First device
   * @param {Object} device2 - Second device
   * @param {Object} comparison - Comparison results
   * @returns {Array} Recommendations
   */
  generateComparisonRecommendations(device1, device2, comparison) {
    const recommendations = [];
    
    // Analyze overall performance
    if (comparison.overall.winner && comparison.overall.winner !== 'tie') {
      const winnerDevice = comparison.overall.winner === 'device1' ? device1 : device2;
      const loserDevice = comparison.overall.winner === 'device1' ? device2 : device1;
      
      recommendations.push({
        type: 'overall_winner',
        device: winnerDevice.name,
        reason: `${winnerDevice.name} scores higher overall (${comparison.overall[comparison.overall.winner]}% vs ${comparison.overall[comparison.overall.winner === 'device1' ? 'device2' : 'device1']}%)`,
        confidence: this.calculateConfidence(comparison.overall.margin)
      });
    }

    // Category-specific recommendations
    Object.keys(comparison.categories).forEach(categoryKey => {
      const categoryComparison = comparison.categories[categoryKey];
      if (categoryComparison.winner && categoryComparison.winner !== 'tie') {
        const winnerDevice = categoryComparison.winner === 'device1' ? device1 : device2;
        
        recommendations.push({
          type: 'category_leader',
          category: categoryComparison.category,
          device: winnerDevice.name,
          reason: `Better ${categoryComparison.category.toLowerCase()} specifications`,
          advantages: categoryComparison.advantages[categoryComparison.winner]
        });
      }
    });

    // Use case recommendations
    recommendations.push(...this.generateUseCaseRecommendations(device1, device2, comparison));

    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  }

  /**
   * Generate use case specific recommendations
   * @param {Object} device1 - First device
   * @param {Object} device2 - Second device
   * @param {Object} comparison - Comparison results
   * @returns {Array} Use case recommendations
   */
  generateUseCaseRecommendations(device1, device2, comparison) {
    const recommendations = [];
    
    // Photography enthusiasts
    if (comparison.categories.camera) {
      const cameraWinner = comparison.categories.camera.winner;
      if (cameraWinner !== 'tie') {
        const winnerDevice = cameraWinner === 'device1' ? device1 : device2;
        recommendations.push({
          type: 'use_case',
          useCase: 'Photography',
          device: winnerDevice.name,
          reason: 'Superior camera system and features'
        });
      }
    }

    // Gaming performance
    if (comparison.categories.performance) {
      const performanceWinner = comparison.categories.performance.winner;
      if (performanceWinner !== 'tie') {
        const winnerDevice = performanceWinner === 'device1' ? device1 : device2;
        recommendations.push({
          type: 'use_case',
          useCase: 'Gaming',
          device: winnerDevice.name,
          reason: 'Better performance specifications'
        });
      }
    }

    // Battery life
    if (comparison.categories.battery) {
      const batteryWinner = comparison.categories.battery.winner;
      if (batteryWinner !== 'tie') {
        const winnerDevice = batteryWinner === 'device1' ? device1 : device2;
        recommendations.push({
          type: 'use_case',
          useCase: 'Long battery life',
          device: winnerDevice.name,
          reason: 'Superior battery capacity and efficiency'
        });
      }
    }

    return recommendations;
  }

  /**
   * Calculate confidence level for recommendations
   * @param {number} margin - Score margin
   * @returns {string} Confidence level
   */
  calculateConfidence(margin) {
    if (margin > 20) return 'High';
    if (margin > 10) return 'Medium';
    if (margin > 5) return 'Low';
    return 'Very Low';
  }

  /**
   * Find similar devices for comparison suggestions
   * @param {Object} device - Target device
   * @param {Array} deviceDatabase - Available devices
   * @returns {Array} Similar devices
   */
  findSimilarDevices(device, deviceDatabase) {
    // This would implement logic to find similar devices
    // Based on release date, brand, price range, etc.
    // For now, return empty array as this requires a device database
    return [];
  }
}

export default DeviceComparison;