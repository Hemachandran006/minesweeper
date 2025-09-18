import type { Device } from '../types/device';

/**
 * Device class with methods for formatting and displaying device information
 */
export class DeviceSpec implements Device {
  id: string;
  general: Device['general'];
  display: Device['display'];
  performance: Device['performance'];
  camera: Device['camera'];
  audio: Device['audio'];
  battery: Device['battery'];
  connectivity: Device['connectivity'];
  osFeatures: Device['osFeatures'];
  specialFeatures: Device['specialFeatures'];
  prosAndCons: Device['prosAndCons'];

  constructor(device: Device) {
    this.id = device.id;
    this.general = device.general;
    this.display = device.display;
    this.performance = device.performance;
    this.camera = device.camera;
    this.audio = device.audio;
    this.battery = device.battery;
    this.connectivity = device.connectivity;
    this.osFeatures = device.osFeatures;
    this.specialFeatures = device.specialFeatures;
    this.prosAndCons = device.prosAndCons;
  }

  /**
   * Get formatted device name
   */
  getDeviceName(): string {
    return `${this.general.brand} ${this.general.model}`;
  }

  /**
   * Get formatted general information with emojis
   */
  getGeneralInfo(): string {
    return `📱 **${this.getDeviceName()}**
🏷️ **Brand:** ${this.general.brand}
📅 **Release Date:** ${this.general.releaseDate}
💰 **Price Range:** ${this.general.priceRange}`;
  }

  /**
   * Get formatted display information with emojis
   */
  getDisplayInfo(): string {
    return `🖥️ **Display**
📺 **Type:** ${this.display.type}
📏 **Size:** ${this.display.size}
🎯 **Resolution:** ${this.display.resolution}
⚡ **Refresh Rate:** ${this.display.refreshRate}
🛡️ **Protection:** ${this.display.protection}`;
  }

  /**
   * Get formatted performance information with emojis
   */
  getPerformanceInfo(): string {
    return `⚡ **Performance**
🧠 **Chipset:** ${this.performance.chipset}
🔧 **CPU:** ${this.performance.cpu}
🎮 **GPU:** ${this.performance.gpu}
🏃 **RAM:** ${this.performance.ram.join(', ')}
💾 **Storage:** ${this.performance.storage.join(', ')}`;
  }

  /**
   * Get formatted camera information with emojis
   */
  getCameraInfo(): string {
    const rearCameras = Object.entries(this.camera.rear)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return `📸 **Camera**
📷 **Rear:** ${rearCameras}
🤳 **Front:** ${this.camera.front}
✨ **Features:** ${this.camera.features.join(', ')}
🎥 **Video:** ${this.camera.videoRecording}`;
  }

  /**
   * Get formatted audio information with emojis
   */
  getAudioInfo(): string {
    return `🔊 **Audio**
🎵 **Speakers:** ${this.audio.speakers}
🎧 **3.5mm Jack:** ${this.audio.jack}
🎶 **Features:** ${this.audio.features.join(', ')}`;
  }

  /**
   * Get formatted battery information with emojis
   */
  getBatteryInfo(): string {
    const wirelessCharging = this.battery.wirelessCharging ? '✅ Yes' : '❌ No';
    const reverseCharging = this.battery.reverseCharging ? ', 🔄 Reverse Charging' : '';
    
    return `🔋 **Battery**
⚡ **Capacity:** ${this.battery.capacity}
🚀 **Charging Speed:** ${this.battery.chargingSpeed}
📡 **Wireless Charging:** ${wirelessCharging}${reverseCharging}`;
  }

  /**
   * Get formatted connectivity information with emojis
   */
  getConnectivityInfo(): string {
    const nfc = this.connectivity.nfc ? '✅ Yes' : '❌ No';
    
    return `📡 **Connectivity**
📶 **Network:** ${this.connectivity.network.join(', ')}
📶 **Wi-Fi:** ${this.connectivity.wifi}
🔗 **Bluetooth:** ${this.connectivity.bluetooth}
💳 **NFC:** ${nfc}
🔌 **USB:** ${this.connectivity.usb}`;
  }

  /**
   * Get formatted OS and features information with emojis
   */
  getOSFeaturesInfo(): string {
    return `🖥️ **OS & Features**
💻 **Operating System:** ${this.osFeatures.operatingSystem}
🎨 **UI:** ${this.osFeatures.ui}
🔒 **Security:** ${this.osFeatures.security.join(', ')}`;
  }

  /**
   * Get formatted special features with emojis
   */
  getSpecialFeaturesInfo(): string {
    let info = '⭐ **Special Features**\n';
    
    if (this.specialFeatures.gaming?.length) {
      info += `🎮 **Gaming:** ${this.specialFeatures.gaming.join(', ')}\n`;
    }
    
    if (this.specialFeatures.stylus) {
      info += `✏️ **Stylus Support:** ✅ Yes\n`;
    }
    
    if (this.specialFeatures.waterResistance) {
      info += `💧 **Water Resistance:** ${this.specialFeatures.waterResistance}\n`;
    }
    
    info += `🔐 **Biometrics:** ${this.specialFeatures.biometrics.join(', ')}`;
    
    if (this.specialFeatures.other?.length) {
      info += `\n🌟 **Other:** ${this.specialFeatures.other.join(', ')}`;
    }
    
    return info;
  }

  /**
   * Get formatted pros and cons with emojis
   */
  getProsAndConsInfo(): string {
    const pros = this.prosAndCons.pros.map(pro => `✅ ${pro}`).join('\n');
    const cons = this.prosAndCons.cons.map(con => `❌ ${con}`).join('\n');
    
    return `📊 **Pros & Cons**

**👍 Pros:**
${pros}

**👎 Cons:**
${cons}`;
  }

  /**
   * Get complete device specification formatted with emojis
   */
  getCompleteSpecs(): string {
    return [
      this.getGeneralInfo(),
      this.getDisplayInfo(),
      this.getPerformanceInfo(),
      this.getCameraInfo(),
      this.getAudioInfo(),
      this.getBatteryInfo(),
      this.getConnectivityInfo(),
      this.getOSFeaturesInfo(),
      this.getSpecialFeaturesInfo(),
      this.getProsAndConsInfo()
    ].join('\n\n');
  }

  /**
   * Get summary information for quick overview
   */
  getSummary(): string {
    return `📱 **${this.getDeviceName()}**
💰 ${this.general.priceRange} | 📏 ${this.display.size} | 🔋 ${this.battery.capacity}
📷 ${this.camera.rear.main} | 🧠 ${this.performance.chipset}`;
  }

  /**
   * Search in device specs (for search functionality)
   */
  matchesSearch(query: string): boolean {
    const searchTerm = query.toLowerCase();
    const searchableFields = [
      this.general.brand,
      this.general.model,
      this.general.priceRange,
      this.performance.chipset,
      this.osFeatures.operatingSystem,
      ...this.camera.features,
      ...this.specialFeatures.biometrics,
      ...(this.specialFeatures.gaming || []),
      ...(this.specialFeatures.other || [])
    ].join(' ').toLowerCase();

    return searchableFields.includes(searchTerm);
  }
}