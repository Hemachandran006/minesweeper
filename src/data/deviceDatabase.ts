import type { Device } from '../types/device';

/**
 * Sample data store for popular mobile devices
 */
export const deviceDatabase: Device[] = [
  {
    id: 'iphone-15-pro',
    general: {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      releaseDate: 'September 2023',
      priceRange: '$999 - $1,499'
    },
    display: {
      type: 'Super Retina XDR OLED',
      size: '6.1 inches',
      resolution: '2556 x 1179 pixels',
      refreshRate: '120Hz ProMotion',
      protection: 'Ceramic Shield front'
    },
    performance: {
      chipset: 'Apple A17 Pro',
      cpu: 'Hexa-core (2x3.78 GHz + 4x2.11 GHz)',
      gpu: 'Apple GPU (6-core graphics)',
      ram: ['8GB'],
      storage: ['128GB', '256GB', '512GB', '1TB']
    },
    camera: {
      rear: {
        main: '48MP f/1.78',
        ultrawide: '13MP f/2.2',
        telephoto: '12MP f/2.8 (3x optical zoom)'
      },
      front: '12MP f/1.9',
      features: ['Night mode', 'Portrait mode', 'Cinematic mode', 'Action mode'],
      videoRecording: '4K at 24/25/30/60fps, ProRes, ProRAW'
    },
    audio: {
      speakers: 'Stereo speakers',
      jack: 'No 3.5mm jack',
      features: ['Spatial Audio', 'Dolby Atmos']
    },
    battery: {
      capacity: '3274 mAh',
      chargingSpeed: '27W wired, 15W MagSafe wireless',
      wirelessCharging: true,
      reverseCharging: false
    },
    connectivity: {
      network: ['5G', '4G LTE'],
      wifi: 'Wi-Fi 6E',
      bluetooth: 'Bluetooth 5.3',
      nfc: true,
      usb: 'USB-C (USB 3.0)'
    },
    osFeatures: {
      operatingSystem: 'iOS 17',
      ui: 'iOS',
      security: ['Face ID', 'Secure Enclave']
    },
    specialFeatures: {
      waterResistance: 'IP68',
      biometrics: ['Face ID'],
      other: ['MagSafe', 'Action Button', 'Dynamic Island']
    },
    prosAndCons: {
      pros: [
        'Premium build quality with titanium frame',
        'Excellent camera system with versatile lenses',
        'Powerful A17 Pro chipset',
        'Great ecosystem integration',
        'Long software support'
      ],
      cons: [
        'Very expensive',
        'No 3.5mm headphone jack',
        'Limited customization options',
        'No always-on display',
        'Lightning to USB-C transition issues'
      ]
    }
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    general: {
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      releaseDate: 'January 2024',
      priceRange: '$1,299 - $1,659'
    },
    display: {
      type: 'Dynamic AMOLED 2X',
      size: '6.8 inches',
      resolution: '3120 x 1440 pixels',
      refreshRate: '120Hz adaptive',
      protection: 'Corning Gorilla Glass Armor'
    },
    performance: {
      chipset: 'Snapdragon 8 Gen 3',
      cpu: 'Octa-core (1x3.39 GHz + 3x3.1 GHz + 2x2.9 GHz + 2x2.2 GHz)',
      gpu: 'Adreno 750',
      ram: ['12GB'],
      storage: ['256GB', '512GB', '1TB']
    },
    camera: {
      rear: {
        main: '200MP f/1.7',
        ultrawide: '12MP f/2.2',
        telephoto: '10MP f/2.4 (3x zoom)',
        depth: '50MP f/3.4 (5x zoom)'
      },
      front: '12MP f/2.2',
      features: ['Night mode', 'Expert RAW', 'Super Steady video', 'AI Photo editing'],
      videoRecording: '8K at 24/30fps, 4K at 60fps'
    },
    audio: {
      speakers: 'Stereo speakers tuned by AKG',
      jack: 'No 3.5mm jack',
      features: ['Dolby Atmos', 'Samsung 360 Audio']
    },
    battery: {
      capacity: '5000 mAh',
      chargingSpeed: '45W wired, 15W wireless',
      wirelessCharging: true,
      reverseCharging: true
    },
    connectivity: {
      network: ['5G', '4G LTE'],
      wifi: 'Wi-Fi 7',
      bluetooth: 'Bluetooth 5.3',
      nfc: true,
      usb: 'USB-C 3.2'
    },
    osFeatures: {
      operatingSystem: 'Android 14',
      ui: 'One UI 6.1',
      security: ['Ultrasonic fingerprint', 'Samsung Knox']
    },
    specialFeatures: {
      gaming: ['Game Booster', 'Vapor cooling'],
      stylus: true,
      waterResistance: 'IP68',
      biometrics: ['Ultrasonic fingerprint', 'Face unlock'],
      other: ['S Pen support', 'DeX mode', 'Galaxy AI features']
    },
    prosAndCons: {
      pros: [
        'Excellent camera system with versatile zoom',
        'S Pen functionality built-in',
        'Large, high-quality display',
        'Great battery life',
        'Comprehensive feature set'
      ],
      cons: [
        'Very expensive',
        'Large and heavy',
        'Bloatware in software',
        'Shorter software support than iPhone',
        'No headphone jack'
      ]
    }
  },
  {
    id: 'google-pixel-8-pro',
    general: {
      brand: 'Google',
      model: 'Pixel 8 Pro',
      releaseDate: 'October 2023',
      priceRange: '$999 - $1,299'
    },
    display: {
      type: 'LTPO OLED',
      size: '6.7 inches',
      resolution: '2992 x 1344 pixels',
      refreshRate: '120Hz adaptive',
      protection: 'Corning Gorilla Glass Victus 2'
    },
    performance: {
      chipset: 'Google Tensor G3',
      cpu: 'Octa-core (1x3.0 GHz + 4x2.45 GHz + 4x2.15 GHz)',
      gpu: 'Mali-G715 MC10',
      ram: ['12GB'],
      storage: ['128GB', '256GB', '512GB', '1TB']
    },
    camera: {
      rear: {
        main: '50MP f/1.68',
        ultrawide: '48MP f/1.95',
        telephoto: '48MP f/2.8 (5x optical zoom)'
      },
      front: '10.5MP f/2.2',
      features: ['Night Sight', 'Magic Eraser', 'Photo Unblur', 'Real Tone'],
      videoRecording: '4K at 60fps, 10-bit HDR'
    },
    audio: {
      speakers: 'Stereo speakers',
      jack: 'No 3.5mm jack',
      features: ['Spatial Audio', 'Now Playing']
    },
    battery: {
      capacity: '5050 mAh',
      chargingSpeed: '30W wired, 23W wireless',
      wirelessCharging: true,
      reverseCharging: true
    },
    connectivity: {
      network: ['5G', '4G LTE'],
      wifi: 'Wi-Fi 7',
      bluetooth: 'Bluetooth 5.3',
      nfc: true,
      usb: 'USB-C 3.2'
    },
    osFeatures: {
      operatingSystem: 'Android 14',
      ui: 'Pixel UI',
      security: ['Titan M security chip', 'Pixel security updates']
    },
    specialFeatures: {
      waterResistance: 'IP68',
      biometrics: ['Fingerprint scanner', 'Face unlock'],
      other: ['Pure Android experience', 'AI photography features', 'Live Translate']
    },
    prosAndCons: {
      pros: [
        'Excellent camera with AI features',
        'Pure Android experience',
        'Fast security updates',
        'Great AI integration',
        'Competitive pricing for flagship'
      ],
      cons: [
        'Battery life could be better',
        'Tensor chip not as powerful as competitors',
        'Limited availability globally',
        'No telephoto on regular Pixel 8',
        'Occasional software bugs'
      ]
    }
  },
  {
    id: 'oneplus-12',
    general: {
      brand: 'OnePlus',
      model: '12',
      releaseDate: 'January 2024',
      priceRange: '$799 - $999'
    },
    display: {
      type: 'LTPO AMOLED',
      size: '6.82 inches',
      resolution: '3168 x 1440 pixels',
      refreshRate: '120Hz adaptive',
      protection: 'Corning Gorilla Glass Victus 2'
    },
    performance: {
      chipset: 'Snapdragon 8 Gen 3',
      cpu: 'Octa-core (1x3.3 GHz + 3x3.2 GHz + 2x3.0 GHz + 2x2.3 GHz)',
      gpu: 'Adreno 750',
      ram: ['12GB', '16GB'],
      storage: ['256GB', '512GB']
    },
    camera: {
      rear: {
        main: '50MP f/1.6',
        ultrawide: '64MP f/2.5',
        telephoto: '64MP f/2.6 (3x optical zoom)'
      },
      front: '32MP f/2.4',
      features: ['Hasselblad partnership', 'Master mode', 'Portrait mode'],
      videoRecording: '8K at 24fps, 4K at 60fps'
    },
    audio: {
      speakers: 'Stereo speakers',
      jack: 'No 3.5mm jack',
      features: ['Dolby Atmos']
    },
    battery: {
      capacity: '5400 mAh',
      chargingSpeed: '100W wired, 50W wireless',
      wirelessCharging: true,
      reverseCharging: false
    },
    connectivity: {
      network: ['5G', '4G LTE'],
      wifi: 'Wi-Fi 7',
      bluetooth: 'Bluetooth 5.4',
      nfc: true,
      usb: 'USB-C 3.2'
    },
    osFeatures: {
      operatingSystem: 'Android 14',
      ui: 'OxygenOS 14',
      security: ['In-display fingerprint', 'Face unlock']
    },
    specialFeatures: {
      gaming: ['Gaming mode', 'HyperBoost'],
      waterResistance: 'IP65',
      biometrics: ['In-display fingerprint', 'Face unlock'],
      other: ['Alert slider', 'SuperVOOC charging']
    },
    prosAndCons: {
      pros: [
        'Incredibly fast charging (100W)',
        'Flagship performance at lower price',
        'Clean OxygenOS experience',
        'Great display quality',
        'Solid camera system with Hasselblad tuning'
      ],
      cons: [
        'No wireless charging in base model',
        'Limited water resistance (IP65)',
        'No expandable storage',
        'Shorter software support',
        'Camera could be better in low light'
      ]
    }
  },
  {
    id: 'xiaomi-14-ultra',
    general: {
      brand: 'Xiaomi',
      model: '14 Ultra',
      releaseDate: 'February 2024',
      priceRange: '$1,299 - $1,499'
    },
    display: {
      type: 'LTPO AMOLED',
      size: '6.73 inches',
      resolution: '3200 x 1440 pixels',
      refreshRate: '120Hz adaptive',
      protection: 'Corning Gorilla Glass Victus'
    },
    performance: {
      chipset: 'Snapdragon 8 Gen 3',
      cpu: 'Octa-core (1x3.3 GHz + 3x3.2 GHz + 2x3.0 GHz + 2x2.3 GHz)',
      gpu: 'Adreno 750',
      ram: ['12GB', '16GB'],
      storage: ['256GB', '512GB', '1TB']
    },
    camera: {
      rear: {
        main: '50MP f/1.63',
        ultrawide: '50MP f/1.8',
        telephoto: '50MP f/1.8 (3.2x zoom)',
        depth: '50MP f/2.5 (5x zoom)'
      },
      front: '32MP f/2.0',
      features: ['Leica partnership', 'Professional mode', 'HyperOIS'],
      videoRecording: '8K at 24fps, 4K at 60fps'
    },
    audio: {
      speakers: 'Quad speakers tuned by Harman Kardon',
      jack: 'No 3.5mm jack',
      features: ['Dolby Atmos', 'Hi-Res Audio']
    },
    battery: {
      capacity: '5300 mAh',
      chargingSpeed: '90W wired, 80W wireless',
      wirelessCharging: true,
      reverseCharging: true
    },
    connectivity: {
      network: ['5G', '4G LTE'],
      wifi: 'Wi-Fi 7',
      bluetooth: 'Bluetooth 5.4',
      nfc: true,
      usb: 'USB-C 3.2'
    },
    osFeatures: {
      operatingSystem: 'Android 14',
      ui: 'MIUI 15',
      security: ['In-display fingerprint', 'Face unlock']
    },
    specialFeatures: {
      gaming: ['Game Turbo', 'Liquid cooling'],
      waterResistance: 'IP68',
      biometrics: ['Ultrasonic fingerprint', 'Face unlock'],
      other: ['Photography grip accessory', 'Leica filters']
    },
    prosAndCons: {
      pros: [
        'Exceptional camera system with Leica partnership',
        'Premium build quality',
        'Fast charging speeds',
        'Excellent display',
        'Comprehensive feature set'
      ],
      cons: [
        'MIUI can be overwhelming',
        'Limited global availability',
        'Expensive for the brand',
        'Heavy device',
        'Software updates inconsistent'
      ]
    }
  }
];

/**
 * Device data access utilities
 */
export class DeviceDataStore {
  private devices: Device[] = deviceDatabase;

  /**
   * Get all devices
   */
  getAllDevices(): Device[] {
    return this.devices;
  }

  /**
   * Get device by ID
   */
  getDeviceById(id: string): Device | undefined {
    return this.devices.find(device => device.id === id);
  }

  /**
   * Search devices by query
   */
  searchDevices(query: string): Device[] {
    if (!query.trim()) {
      return this.devices;
    }

    const searchTerm = query.toLowerCase();
    return this.devices.filter(device => {
      const searchableText = [
        device.general.brand,
        device.general.model,
        device.general.priceRange,
        device.performance.chipset,
        device.osFeatures.operatingSystem,
        ...device.camera.features,
        ...device.specialFeatures.biometrics,
        ...(device.specialFeatures.gaming || []),
        ...(device.specialFeatures.other || [])
      ].join(' ').toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  /**
   * Get devices by brand
   */
  getDevicesByBrand(brand: string): Device[] {
    return this.devices.filter(device => 
      device.general.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  /**
   * Get devices by price range
   */
  getDevicesByPriceRange(minPrice: number, maxPrice: number): Device[] {
    return this.devices.filter(device => {
      // Extract price from price range string (simplified)
      const priceMatch = device.general.priceRange.match(/\$(\d+)/);
      if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        return price >= minPrice && price <= maxPrice;
      }
      return false;
    });
  }

  /**
   * Get device suggestions based on partial query
   */
  getSuggestions(query: string): string[] {
    if (!query.trim()) {
      return [];
    }

    const suggestions = new Set<string>();
    const searchTerm = query.toLowerCase();

    this.devices.forEach(device => {
      // Add brand suggestions
      if (device.general.brand.toLowerCase().includes(searchTerm)) {
        suggestions.add(device.general.brand);
      }
      
      // Add model suggestions
      if (device.general.model.toLowerCase().includes(searchTerm)) {
        suggestions.add(`${device.general.brand} ${device.general.model}`);
      }
      
      // Add feature suggestions
      device.camera.features.forEach(feature => {
        if (feature.toLowerCase().includes(searchTerm)) {
          suggestions.add(feature);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }

  /**
   * Add new device to the store
   */
  addDevice(device: Device): void {
    this.devices.push(device);
  }

  /**
   * Get available brands
   */
  getAvailableBrands(): string[] {
    return Array.from(new Set(this.devices.map(device => device.general.brand)));
  }
}