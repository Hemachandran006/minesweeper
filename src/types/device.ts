/**
 * Device specification type definitions for mobile device chatbot
 */

export interface DeviceGeneral {
  brand: string;
  model: string;
  releaseDate: string;
  priceRange: string;
}

export interface DeviceDisplay {
  type: string;
  size: string;
  resolution: string;
  refreshRate: string;
  protection: string;
}

export interface DevicePerformance {
  chipset: string;
  cpu: string;
  gpu: string;
  ram: string[];
  storage: string[];
}

export interface DeviceCamera {
  rear: {
    main: string;
    ultrawide?: string;
    telephoto?: string;
    macro?: string;
    depth?: string;
  };
  front: string;
  features: string[];
  videoRecording: string;
}

export interface DeviceAudio {
  speakers: string;
  jack: string;
  features: string[];
}

export interface DeviceBattery {
  capacity: string;
  chargingSpeed: string;
  wirelessCharging: boolean;
  reverseCharging?: boolean;
}

export interface DeviceConnectivity {
  network: string[];
  wifi: string;
  bluetooth: string;
  nfc: boolean;
  usb: string;
}

export interface DeviceOSFeatures {
  operatingSystem: string;
  ui: string;
  security: string[];
}

export interface DeviceSpecialFeatures {
  gaming?: string[];
  stylus?: boolean;
  waterResistance?: string;
  biometrics: string[];
  other?: string[];
}

export interface DeviceProsAndCons {
  pros: string[];
  cons: string[];
}

export interface Device {
  id: string;
  general: DeviceGeneral;
  display: DeviceDisplay;
  performance: DevicePerformance;
  camera: DeviceCamera;
  audio: DeviceAudio;
  battery: DeviceBattery;
  connectivity: DeviceConnectivity;
  osFeatures: DeviceOSFeatures;
  specialFeatures: DeviceSpecialFeatures;
  prosAndCons: DeviceProsAndCons;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  device?: Device;
  timestamp: Date;
}

export interface SearchFilters {
  brand?: string;
  priceRange?: string;
  category?: 'flagship' | 'mid-range' | 'budget';
}