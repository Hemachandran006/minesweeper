/**
 * Device Recommendation System
 * Provides personalized device recommendations based on user preferences, budget, and use cases
 */

import specCategories from '../templates/spec-categories.json';

export class DeviceRecommendations {
  constructor() {
    this.categories = specCategories.specification_categories;
    this.categoryWeights = specCategories.comparison_weights;
    this.useCaseProfiles = this.initializeUseCaseProfiles();
    this.priceRanges = this.initializePriceRanges();
  }

  /**
   * Initialize use case profiles with category weights
   * @returns {Object} Use case profiles
   */
  initializeUseCaseProfiles() {
    return {
      photography: {
        name: 'Photography Enthusiast',
        weights: {
          camera: 0.40,
          display: 0.15,
          performance: 0.15,
          battery: 0.10,
          design: 0.08,
          connectivity: 0.05,
          software: 0.05,
          audio: 0.02
        },
        priorities: ['camera quality', 'display accuracy', 'storage capacity'],
        keywords: ['photo', 'camera', 'photography', 'pictures', 'shots']
      },
      gaming: {
        name: 'Mobile Gamer',
        weights: {
          performance: 0.35,
          display: 0.20,
          battery: 0.15,
          camera: 0.10,
          audio: 0.08,
          connectivity: 0.07,
          design: 0.05
        },
        priorities: ['high refresh rate', 'powerful processor', 'cooling system'],
        keywords: ['gaming', 'games', 'performance', 'fps', 'graphics']
      },
      business: {
        name: 'Business Professional',
        weights: {
          battery: 0.25,
          performance: 0.20,
          connectivity: 0.15,
          software: 0.15,
          display: 0.10,
          camera: 0.08,
          design: 0.07
        },
        priorities: ['battery life', 'productivity features', 'security'],
        keywords: ['work', 'business', 'productivity', 'office', 'professional']
      },
      content_creator: {
        name: 'Content Creator',
        weights: {
          camera: 0.30,
          performance: 0.20,
          display: 0.15,
          battery: 0.12,
          audio: 0.10,
          design: 0.08,
          connectivity: 0.05
        },
        priorities: ['video recording', 'editing performance', 'color accuracy'],
        keywords: ['video', 'content', 'creator', 'editing', 'streaming', 'vlog']
      },
      budget_conscious: {
        name: 'Budget Conscious',
        weights: {
          pricing: 0.30,
          battery: 0.20,
          performance: 0.15,
          camera: 0.12,
          display: 0.10,
          connectivity: 0.08,
          design: 0.05
        },
        priorities: ['value for money', 'essential features', 'durability'],
        keywords: ['cheap', 'budget', 'affordable', 'value', 'price']
      },
      senior_friendly: {
        name: 'Senior User',
        weights: {
          software: 0.25,
          display: 0.20,
          battery: 0.18,
          design: 0.15,
          camera: 0.10,
          audio: 0.07,
          performance: 0.05
        },
        priorities: ['ease of use', 'large display', 'simple interface'],
        keywords: ['senior', 'elderly', 'simple', 'easy', 'basic']
      },
      tech_enthusiast: {
        name: 'Tech Enthusiast',
        weights: {
          performance: 0.25,
          software: 0.18,
          connectivity: 0.15,
          camera: 0.12,
          display: 0.12,
          sensors: 0.10,
          design: 0.08
        },
        priorities: ['latest features', 'cutting-edge technology', 'customization'],
        keywords: ['tech', 'latest', 'features', 'innovation', 'advanced']
      }
    };
  }

  /**
   * Initialize price range categories
   * @returns {Object} Price ranges
   */
  initializePriceRanges() {
    return {
      budget: { min: 0, max: 300, label: 'Budget ($0-$300)' },
      mid_range: { min: 300, max: 700, label: 'Mid-range ($300-$700)' },
      premium: { min: 700, max: 1200, label: 'Premium ($700-$1200)' },
      flagship: { min: 1200, max: 2000, label: 'Flagship ($1200+)' }
    };
  }

  /**
   * Generate device recommendations based on user criteria
   * @param {Object} criteria - User criteria
   * @param {Array} deviceDatabase - Available devices
   * @param {Object} options - Recommendation options
   * @returns {Array} Recommended devices
   */
  generateRecommendations(criteria, deviceDatabase, options = {}) {
    const { maxRecommendations = 5, includeAlternatives = true } = options;
    
    // Analyze user criteria
    const userProfile = this.analyzeUserCriteria(criteria);
    
    // Score all devices
    const scoredDevices = deviceDatabase.map(device => ({
      ...device,
      matchScore: this.calculateDeviceScore(device, userProfile),
      matchReasons: this.generateMatchReasons(device, userProfile)
    }));

    // Filter and sort devices
    let filteredDevices = this.filterDevicesByBudget(scoredDevices, criteria.budget);
    filteredDevices = this.filterDevicesByRequirements(filteredDevices, criteria.requirements);
    filteredDevices = filteredDevices.sort((a, b) => b.matchScore - a.matchScore);

    // Create recommendations
    const recommendations = filteredDevices
      .slice(0, maxRecommendations)
      .map((device, index) => this.createRecommendation(device, userProfile, index + 1));

    // Add alternatives if requested
    if (includeAlternatives) {
      recommendations.forEach(rec => {
        rec.alternatives = this.findAlternatives(rec.device, filteredDevices, 2);
      });
    }

    return {
      recommendations,
      userProfile,
      totalAnalyzed: deviceDatabase.length,
      criteria
    };
  }

  /**
   * Analyze user criteria to create a user profile
   * @param {Object} criteria - User criteria
   * @returns {Object} User profile
   */
  analyzeUserCriteria(criteria) {
    const profile = {
      useCase: 'general',
      weights: { ...this.categoryWeights },
      priorities: [],
      budget: null,
      requirements: {},
      preferences: {}
    };

    // Detect use case from description or keywords
    if (criteria.useCase) {
      profile.useCase = this.detectUseCase(criteria.useCase);
      if (this.useCaseProfiles[profile.useCase]) {
        profile.weights = { ...this.useCaseProfiles[profile.useCase].weights };
        profile.priorities = [...this.useCaseProfiles[profile.useCase].priorities];
      }
    }

    // Set budget constraints
    if (criteria.budget) {
      profile.budget = this.parseBudget(criteria.budget);
    }

    // Process specific requirements
    if (criteria.requirements) {
      profile.requirements = this.processRequirements(criteria.requirements);
    }

    // Adjust weights based on explicitly mentioned priorities
    if (criteria.priorities && Array.isArray(criteria.priorities)) {
      profile.weights = this.adjustWeightsForPriorities(profile.weights, criteria.priorities);
    }

    return profile;
  }

  /**
   * Detect use case from text description
   * @param {string} description - Use case description
   * @returns {string} Detected use case
   */
  detectUseCase(description) {
    const lowerDesc = description.toLowerCase();
    
    for (const [useCase, profile] of Object.entries(this.useCaseProfiles)) {
      if (profile.keywords.some(keyword => lowerDesc.includes(keyword))) {
        return useCase;
      }
    }
    
    return 'general';
  }

  /**
   * Parse budget string or object
   * @param {string|Object|number} budget - Budget input
   * @returns {Object} Parsed budget
   */
  parseBudget(budget) {
    if (typeof budget === 'number') {
      return { max: budget };
    }
    
    if (typeof budget === 'string') {
      const match = budget.match(/(\d+)/g);
      if (match) {
        const numbers = match.map(n => parseInt(n));
        if (numbers.length === 1) {
          return { max: numbers[0] };
        } else if (numbers.length === 2) {
          return { min: Math.min(...numbers), max: Math.max(...numbers) };
        }
      }
    }
    
    if (typeof budget === 'object') {
      return budget;
    }
    
    return null;
  }

  /**
   * Process specific requirements
   * @param {Object} requirements - User requirements
   * @returns {Object} Processed requirements
   */
  processRequirements(requirements) {
    const processed = {};
    
    // Common requirement mappings
    const mappings = {
      'good_camera': { category: 'camera', importance: 'high' },
      'long_battery': { category: 'battery', importance: 'high' },
      'fast_performance': { category: 'performance', importance: 'high' },
      'large_screen': { category: 'display', field: 'screen_size', value: '6.0+' },
      'lightweight': { category: 'design', field: 'weight', value: '180-' },
      'wireless_charging': { category: 'battery', field: 'wireless_charging', value: true },
      'dual_sim': { category: 'connectivity', field: 'sim', value: 'dual' },
      'headphone_jack': { category: 'audio', field: 'headphone_jack', value: true },
      'water_resistant': { category: 'design', field: 'water_resistance', value: 'IP67+' }
    };

    Object.keys(requirements).forEach(req => {
      if (mappings[req]) {
        processed[req] = mappings[req];
      } else {
        // Try to parse custom requirements
        processed[req] = this.parseCustomRequirement(req, requirements[req]);
      }
    });

    return processed;
  }

  /**
   * Parse custom requirement
   * @param {string} key - Requirement key
   * @param {*} value - Requirement value
   * @returns {Object} Parsed requirement
   */
  parseCustomRequirement(key, value) {
    return {
      category: 'general',
      field: key,
      value: value,
      importance: 'medium'
    };
  }

  /**
   * Adjust category weights based on user priorities
   * @param {Object} weights - Current weights
   * @param {Array} priorities - User priorities
   * @returns {Object} Adjusted weights
   */
  adjustWeightsForPriorities(weights, priorities) {
    const adjusted = { ...weights };
    const boostFactor = 1.5;
    
    // Map priority terms to categories
    const priorityMappings = {
      'camera': 'camera',
      'battery': 'battery',
      'performance': 'performance',
      'speed': 'performance',
      'display': 'display',
      'screen': 'display',
      'price': 'pricing',
      'design': 'design',
      'audio': 'audio',
      'connectivity': 'connectivity'
    };

    priorities.forEach(priority => {
      const lowerPriority = priority.toLowerCase();
      Object.keys(priorityMappings).forEach(key => {
        if (lowerPriority.includes(key)) {
          const category = priorityMappings[key];
          if (adjusted[category]) {
            adjusted[category] *= boostFactor;
          }
        }
      });
    });

    // Normalize weights
    const totalWeight = Object.values(adjusted).reduce((sum, weight) => sum + weight, 0);
    Object.keys(adjusted).forEach(key => {
      adjusted[key] = adjusted[key] / totalWeight;
    });

    return adjusted;
  }

  /**
   * Calculate device score based on user profile
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {number} Device score (0-100)
   */
  calculateDeviceScore(device, userProfile) {
    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(userProfile.weights).forEach(categoryKey => {
      const weight = userProfile.weights[categoryKey];
      const categoryData = device.specifications?.[categoryKey];
      
      if (categoryData && weight > 0) {
        const categoryScore = this.scoreCategoryForUser(categoryKey, categoryData, userProfile);
        totalScore += categoryScore * weight;
        totalWeight += weight;
      }
    });

    // Apply requirement bonuses/penalties
    const requirementScore = this.scoreRequirements(device, userProfile.requirements);
    
    // Apply budget compatibility
    const budgetScore = this.scoreBudgetCompatibility(device, userProfile.budget);

    const baseScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
    const finalScore = Math.min(100, baseScore * requirementScore * budgetScore);

    return Math.round(finalScore * 100) / 100;
  }

  /**
   * Score a device category for user preferences
   * @param {string} categoryKey - Category key
   * @param {Object} categoryData - Category data
   * @param {Object} userProfile - User profile
   * @returns {number} Category score (0-1)
   */
  scoreCategoryForUser(categoryKey, categoryData, userProfile) {
    const category = this.categories[categoryKey];
    if (!category) return 0.5;

    let totalScore = 0;
    let fieldCount = 0;

    Object.keys(category.fields).forEach(fieldKey => {
      const fieldData = categoryData[fieldKey];
      if (fieldData !== undefined && fieldData !== null) {
        const fieldScore = this.scoreFieldForUser(fieldKey, fieldData, userProfile);
        totalScore += fieldScore;
        fieldCount++;
      }
    });

    return fieldCount > 0 ? totalScore / fieldCount : 0.5;
  }

  /**
   * Score individual field for user
   * @param {string} fieldKey - Field key
   * @param {*} fieldData - Field data
   * @param {Object} userProfile - User profile
   * @returns {number} Field score (0-1)
   */
  scoreFieldForUser(fieldKey, fieldData, userProfile) {
    const value = fieldData.value || fieldData;
    
    // Use case specific scoring
    switch (userProfile.useCase) {
      case 'photography':
        return this.scoreForPhotography(fieldKey, value);
      case 'gaming':
        return this.scoreForGaming(fieldKey, value);
      case 'business':
        return this.scoreForBusiness(fieldKey, value);
      case 'budget_conscious':
        return this.scoreForBudget(fieldKey, value);
      default:
        return this.scoreFieldGeneral(fieldKey, value);
    }
  }

  /**
   * Score field for photography use case
   * @param {string} fieldKey - Field key
   * @param {*} value - Field value
   * @returns {number} Score (0-1)
   */
  scoreForPhotography(fieldKey, value) {
    const photographyScoring = {
      main_camera: (val) => this.scoreCameraMegapixels(val),
      ultra_wide: (val) => val ? 0.8 : 0.3,
      telephoto: (val) => val ? 0.9 : 0.4,
      camera_features: (val) => this.scoreCameraFeatures(val),
      display_type: (val) => val.includes('OLED') ? 0.9 : 0.6,
      storage_options: (val) => this.scoreStorageForPhotography(val)
    };

    return photographyScoring[fieldKey] ? photographyScoring[fieldKey](value) : this.scoreFieldGeneral(fieldKey, value);
  }

  /**
   * Score field for gaming use case
   * @param {string} fieldKey - Field key
   * @param {*} value - Field value
   * @returns {number} Score (0-1)
   */
  scoreForGaming(fieldKey, value) {
    const gamingScoring = {
      refresh_rate: (val) => Math.min(1, parseInt(val) / 120),
      ram: (val) => Math.min(1, parseInt(val) / 12),
      antutu_score: (val) => Math.min(1, parseInt(val) / 1000000),
      battery_capacity: (val) => Math.min(1, parseInt(val) / 5000),
      screen_size: (val) => parseFloat(val) >= 6.5 ? 0.9 : 0.6
    };

    return gamingScoring[fieldKey] ? gamingScoring[fieldKey](value) : this.scoreFieldGeneral(fieldKey, value);
  }

  /**
   * Score field for business use case
   * @param {string} fieldKey - Field key
   * @param {*} value - Field value
   * @returns {number} Score (0-1)
   */
  scoreForBusiness(fieldKey, value) {
    const businessScoring = {
      battery_life: (val) => val.includes('24') ? 1.0 : 0.7,
      biometric: (val) => Array.isArray(val) && val.length > 0 ? 0.9 : 0.5,
      water_resistance: (val) => val.includes('IP68') ? 0.9 : 0.6,
      update_policy: (val) => val.includes('5') || val.includes('long') ? 0.9 : 0.6
    };

    return businessScoring[fieldKey] ? businessScoring[fieldKey](value) : this.scoreFieldGeneral(fieldKey, value);
  }

  /**
   * Score field for budget conscious users
   * @param {string} fieldKey - Field key
   * @param {*} value - Field value
   * @returns {number} Score (0-1)
   */
  scoreForBudget(fieldKey, value) {
    // For budget users, penalize premium features and reward value
    const budgetScoring = {
      current_price: (val) => {
        const price = parseInt(val.replace(/[^0-9]/g, ''));
        return price < 400 ? 1.0 : price < 600 ? 0.8 : 0.4;
      },
      battery_capacity: (val) => Math.min(1, parseInt(val) / 4000),
      ram: (val) => parseInt(val) >= 6 ? 0.8 : 0.5
    };

    return budgetScoring[fieldKey] ? budgetScoring[fieldKey](value) : this.scoreFieldGeneral(fieldKey, value);
  }

  /**
   * General field scoring
   * @param {string} fieldKey - Field key
   * @param {*} value - Field value
   * @returns {number} Score (0-1)
   */
  scoreFieldGeneral(fieldKey, value) {
    // Default scoring logic for fields
    if (value === null || value === undefined) return 0;
    if (typeof value === 'boolean') return value ? 0.8 : 0.4;
    if (Array.isArray(value)) return Math.min(1, value.length / 5);
    
    return 0.7; // Default score for present features
  }

  /**
   * Score camera megapixels
   * @param {*} cameraData - Camera data
   * @returns {number} Score (0-1)
   */
  scoreCameraMegapixels(cameraData) {
    if (!cameraData) return 0;
    
    const mp = typeof cameraData === 'object' && cameraData.megapixels ? 
      parseInt(cameraData.megapixels) : parseInt(cameraData);
    
    if (mp >= 48) return 1.0;
    if (mp >= 24) return 0.8;
    if (mp >= 12) return 0.6;
    return 0.4;
  }

  /**
   * Score camera features
   * @param {Array} features - Camera features
   * @returns {number} Score (0-1)
   */
  scoreCameraFeatures(features) {
    if (!Array.isArray(features)) return 0.5;
    
    const premiumFeatures = ['Night mode', 'ProRAW', 'Cinematic mode', 'Portrait mode'];
    const matchCount = features.filter(f => premiumFeatures.some(pf => f.includes(pf))).length;
    
    return Math.min(1, matchCount / premiumFeatures.length);
  }

  /**
   * Score storage for photography
   * @param {Array} storageOptions - Storage options
   * @returns {number} Score (0-1)
   */
  scoreStorageForPhotography(storageOptions) {
    if (!Array.isArray(storageOptions)) return 0.5;
    
    const maxStorage = Math.max(...storageOptions.map(s => parseInt(s.replace(/[^0-9]/g, ''))));
    
    if (maxStorage >= 1000) return 1.0;
    if (maxStorage >= 512) return 0.8;
    if (maxStorage >= 256) return 0.6;
    return 0.4;
  }

  /**
   * Score device against requirements
   * @param {Object} device - Device data
   * @param {Object} requirements - Requirements
   * @returns {number} Requirement score multiplier (0.5-1.2)
   */
  scoreRequirements(device, requirements) {
    if (!requirements || Object.keys(requirements).length === 0) return 1.0;
    
    let satisfiedCount = 0;
    let totalRequirements = 0;
    
    Object.values(requirements).forEach(req => {
      totalRequirements++;
      if (this.checkRequirement(device, req)) {
        satisfiedCount++;
      }
    });
    
    const satisfactionRate = totalRequirements > 0 ? satisfiedCount / totalRequirements : 1;
    
    // Bonus for high satisfaction, penalty for low satisfaction
    if (satisfactionRate >= 0.8) return 1.2;
    if (satisfactionRate >= 0.6) return 1.0;
    if (satisfactionRate >= 0.4) return 0.9;
    return 0.7;
  }

  /**
   * Check if device meets a requirement
   * @param {Object} device - Device data
   * @param {Object} requirement - Requirement object
   * @returns {boolean} Whether requirement is met
   */
  checkRequirement(device, requirement) {
    const categoryData = device.specifications?.[requirement.category];
    if (!categoryData) return false;
    
    if (requirement.field) {
      const fieldValue = categoryData[requirement.field];
      return this.compareRequirementValue(fieldValue, requirement.value);
    }
    
    // General category requirement
    return requirement.importance === 'high' ? Object.keys(categoryData).length > 3 : true;
  }

  /**
   * Compare field value against requirement
   * @param {*} fieldValue - Actual field value
   * @param {*} requiredValue - Required value
   * @returns {boolean} Whether value meets requirement
   */
  compareRequirementValue(fieldValue, requiredValue) {
    if (fieldValue === null || fieldValue === undefined) return false;
    
    const actualValue = fieldValue.value || fieldValue;
    
    if (typeof requiredValue === 'boolean') {
      return actualValue === requiredValue;
    }
    
    if (typeof requiredValue === 'string') {
      if (requiredValue.includes('+')) {
        const threshold = parseFloat(requiredValue.replace('+', ''));
        return parseFloat(actualValue) >= threshold;
      }
      if (requiredValue.includes('-')) {
        const threshold = parseFloat(requiredValue.replace('-', ''));
        return parseFloat(actualValue) <= threshold;
      }
      return actualValue.toString().toLowerCase().includes(requiredValue.toLowerCase());
    }
    
    return actualValue === requiredValue;
  }

  /**
   * Score budget compatibility
   * @param {Object} device - Device data
   * @param {Object} budget - Budget constraints
   * @returns {number} Budget score multiplier (0.3-1.2)
   */
  scoreBudgetCompatibility(device, budget) {
    if (!budget) return 1.0;
    
    const price = this.extractDevicePrice(device);
    if (!price) return 1.0;
    
    if (budget.max && price > budget.max) {
      const overage = (price - budget.max) / budget.max;
      return Math.max(0.3, 1 - overage);
    }
    
    if (budget.min && price < budget.min) {
      // Slightly penalize devices that are too cheap (might lack features)
      return 0.9;
    }
    
    // Bonus for being well within budget
    if (budget.max && price <= budget.max * 0.8) {
      return 1.1;
    }
    
    return 1.0;
  }

  /**
   * Extract device price
   * @param {Object} device - Device data
   * @returns {number|null} Device price
   */
  extractDevicePrice(device) {
    const pricing = device.specifications?.pricing;
    if (!pricing) return null;
    
    const currentPrice = pricing.current_price?.value || pricing.current_price;
    const launchPrice = pricing.launch_price?.value || pricing.launch_price;
    
    const priceStr = currentPrice || launchPrice;
    if (!priceStr) return null;
    
    // Extract first number from price string
    const match = priceStr.toString().match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

  /**
   * Create recommendation object
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @param {number} rank - Recommendation rank
   * @returns {Object} Recommendation
   */
  createRecommendation(device, userProfile, rank) {
    return {
      rank,
      device: device.name,
      matchScore: device.matchScore,
      price: this.extractDevicePrice(device),
      reason: this.generateRecommendationReason(device, userProfile),
      keyFeatures: this.extractKeyFeatures(device, userProfile),
      pros: this.generatePros(device, userProfile),
      cons: this.generateCons(device, userProfile),
      suitableFor: this.generateSuitabilityTags(device, userProfile)
    };
  }

  /**
   * Generate recommendation reason
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {string} Recommendation reason
   */
  generateRecommendationReason(device, userProfile) {
    const topCategory = Object.keys(userProfile.weights)
      .sort((a, b) => userProfile.weights[b] - userProfile.weights[a])[0];
    
    const useCaseName = this.useCaseProfiles[userProfile.useCase]?.name || 'General use';
    
    return `Excellent choice for ${useCaseName.toLowerCase()} with strong ${topCategory} specifications and ${device.matchScore}% match to your requirements.`;
  }

  /**
   * Extract key features for user
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {Array} Key features
   */
  extractKeyFeatures(device, userProfile) {
    const features = [];
    const specs = device.specifications;
    
    // Extract features based on user priorities
    if (userProfile.weights.camera > 0.15 && specs.camera?.main_camera) {
      features.push(`${specs.camera.main_camera.megapixels || specs.camera.main_camera}MP main camera`);
    }
    
    if (userProfile.weights.performance > 0.15 && specs.performance?.chipset) {
      features.push(specs.performance.chipset.value || specs.performance.chipset);
    }
    
    if (userProfile.weights.display > 0.15 && specs.display?.screen_size) {
      features.push(`${specs.display.screen_size.value || specs.display.screen_size}" display`);
    }
    
    if (userProfile.weights.battery > 0.15 && specs.battery?.battery_capacity) {
      features.push(`${specs.battery.battery_capacity.value || specs.battery.battery_capacity}mAh battery`);
    }
    
    return features.slice(0, 4);
  }

  /**
   * Generate pros for user context
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {Array} Pros
   */
  generatePros(device, userProfile) {
    // This would analyze device specs and generate context-aware pros
    return device.pros || ['Strong overall specifications', 'Good value proposition'];
  }

  /**
   * Generate cons for user context
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {Array} Cons
   */
  generateCons(device, userProfile) {
    // This would analyze device specs and generate context-aware cons
    return device.cons || [];
  }

  /**
   * Generate suitability tags
   * @param {Object} device - Device data
   * @param {Object} userProfile - User profile
   * @returns {Array} Suitability tags
   */
  generateSuitabilityTags(device, userProfile) {
    const tags = [];
    
    if (userProfile.useCase !== 'general') {
      tags.push(this.useCaseProfiles[userProfile.useCase].name);
    }
    
    const price = this.extractDevicePrice(device);
    if (price) {
      Object.values(this.priceRanges).forEach(range => {
        if (price >= range.min && price <= range.max) {
          tags.push(range.label);
        }
      });
    }
    
    return tags;
  }

  /**
   * Filter devices by budget
   * @param {Array} devices - Device array
   * @param {Object} budget - Budget constraints
   * @returns {Array} Filtered devices
   */
  filterDevicesByBudget(devices, budget) {
    if (!budget) return devices;
    
    return devices.filter(device => {
      const price = this.extractDevicePrice(device);
      if (!price) return true; // Include devices without price info
      
      if (budget.max && price > budget.max * 1.2) return false; // Allow 20% overage
      if (budget.min && price < budget.min) return false;
      
      return true;
    });
  }

  /**
   * Filter devices by requirements
   * @param {Array} devices - Device array
   * @param {Object} requirements - Requirements
   * @returns {Array} Filtered devices
   */
  filterDevicesByRequirements(devices, requirements) {
    if (!requirements || Object.keys(requirements).length === 0) return devices;
    
    return devices.filter(device => {
      let satisfiedCount = 0;
      const totalRequirements = Object.keys(requirements).length;
      
      Object.values(requirements).forEach(req => {
        if (this.checkRequirement(device, req)) {
          satisfiedCount++;
        }
      });
      
      // Require at least 50% of requirements to be met
      return satisfiedCount / totalRequirements >= 0.5;
    });
  }

  /**
   * Find alternative devices
   * @param {Object} targetDevice - Target device
   * @param {Array} allDevices - All available devices
   * @param {number} count - Number of alternatives
   * @returns {Array} Alternative devices
   */
  findAlternatives(targetDevice, allDevices, count = 2) {
    const targetPrice = this.extractDevicePrice(targetDevice);
    
    return allDevices
      .filter(device => device.name !== targetDevice.name)
      .sort((a, b) => {
        const priceA = this.extractDevicePrice(a);
        const priceB = this.extractDevicePrice(b);
        
        if (!targetPrice) return b.matchScore - a.matchScore;
        
        const diffA = priceA ? Math.abs(priceA - targetPrice) : Infinity;
        const diffB = priceB ? Math.abs(priceB - targetPrice) : Infinity;
        
        return diffA - diffB;
      })
      .slice(0, count)
      .map(device => ({
        name: device.name,
        price: this.extractDevicePrice(device),
        matchScore: device.matchScore,
        reason: 'Similar price range and features'
      }));
  }
}

export default DeviceRecommendations;