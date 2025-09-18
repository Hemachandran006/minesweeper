/**
 * Sample Device Database
 * This file contains examples of how to structure device data for the chatbot system
 */

export const sampleDeviceDatabase = [
  {
    name: "iPhone 15 Pro",
    overview: "Apple's flagship smartphone with titanium design and A17 Pro chip",
    specifications: {
      display: {
        screen_size: { value: "6.1", rumored: false },
        resolution: { value: "1179 x 2556", rumored: false },
        pixel_density: { value: "460", rumored: false },
        display_type: { value: "Super Retina XDR OLED", rumored: false },
        refresh_rate: { value: "120", rumored: false },
        brightness: { value: "2000", rumored: false },
        protection: { value: "Ceramic Shield front, textured matte glass back", rumored: false }
      },
      performance: {
        chipset: { value: "Apple A17 Pro (3 nm)", rumored: false },
        cpu: { value: "Hexa-core (2x3.78 GHz Everest + 4x2.11 GHz Sawtooth)", rumored: false },
        gpu: { value: "Apple GPU (6-core graphics)", rumored: false },
        ram: { value: "8", rumored: false },
        storage_options: { value: ["128", "256", "512", "1TB"], rumored: false },
        expandable_storage: { value: false, rumored: false },
        antutu_score: { value: "1500000", rumored: false }
      },
      camera: {
        main_camera: { 
          value: {
            megapixels: "48",
            aperture: "f/1.78",
            sensor_size: "1/1.28\"",
            features: ["sensor-shift OIS", "PDAF"]
          }, 
          rumored: false 
        },
        ultra_wide: {
          value: {
            megapixels: "12",
            aperture: "f/2.2",
            field_of_view: "120°"
          },
          rumored: false
        },
        telephoto: {
          value: {
            megapixels: "12",
            aperture: "f/2.8",
            zoom: "3x optical"
          },
          rumored: false
        },
        front_camera: {
          value: {
            megapixels: "12",
            aperture: "f/1.9",
            features: ["Face ID", "Portrait mode"]
          },
          rumored: false
        },
        video_recording: { value: ["4K@60fps", "1080p@240fps", "Cinematic mode"], rumored: false },
        camera_features: { value: ["Night mode", "ProRAW", "Smart HDR 4", "Photographic Styles"], rumored: false }
      },
      battery: {
        battery_capacity: { value: "3279", rumored: false },
        wired_charging: { value: "27", rumored: false },
        wireless_charging: { value: "15", rumored: false },
        reverse_charging: { value: true, rumored: false },
        battery_life: { value: "Up to 22 hours video playback", rumored: false },
        charging_time: { value: "50% in 30 minutes", rumored: false }
      },
      connectivity: {
        network: { value: ["5G", "4G LTE", "3G", "2G"], rumored: false },
        wifi: { value: "Wi-Fi 6E (802.11ax)", rumored: false },
        bluetooth: { value: "5.3", rumored: false },
        nfc: { value: true, rumored: false },
        usb: { value: "USB-C 3.0", rumored: false },
        sim: { value: "Dual SIM (nano-SIM + eSIM)", rumored: false }
      },
      design: {
        dimensions: { value: "146.6 x 70.6 x 8.25", rumored: false },
        weight: { value: "221", rumored: false },
        materials: { value: "Titanium frame, Ceramic Shield front, textured matte glass back", rumored: false },
        colors: { value: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"], rumored: false },
        water_resistance: { value: "IP68 (6m for 30 min)", rumored: false },
        durability: { value: ["Ceramic Shield", "Surgical-grade titanium", "Enhanced drop protection"], rumored: false }
      },
      software: {
        operating_system: { value: "iOS 17", rumored: false },
        ui: { value: "iOS with Dynamic Island", rumored: false },
        update_policy: { value: "5+ years of iOS updates", rumored: false },
        pre_installed_apps: { value: ["Safari", "Mail", "Photos", "Camera", "Messages", "FaceTime"], rumored: false },
        unique_features: { value: ["Action Button", "Always-On Display", "Live Activities", "StandBy mode"], rumored: false }
      },
      audio: {
        speakers: { value: "Stereo speakers with Spatial Audio", rumored: false },
        headphone_jack: { value: false, rumored: false },
        audio_features: { value: ["Dolby Atmos", "Spatial Audio", "Audio Zoom", "Hi-Res Audio"], rumored: false },
        microphones: { value: "Triple microphone array with beamforming", rumored: false }
      },
      sensors: {
        biometric: { value: ["Face ID"], rumored: false },
        sensors_list: { value: ["Accelerometer", "Gyroscope", "Proximity", "Ambient light", "Barometer", "Magnetometer"], rumored: false },
        special_sensors: { value: ["LiDAR Scanner", "Ultra Wideband chip"], rumored: false }
      },
      pricing: {
        launch_price: { value: "$999 - $1499", rumored: false },
        current_price: { value: "$999 - $1499", rumored: false },
        release_date: { value: "September 22, 2023", rumored: false },
        availability: { value: "Available worldwide", rumored: false },
        market_status: { value: "Current flagship model", rumored: false }
      }
    },
    pros: [
      "Excellent camera system with Pro features",
      "Premium titanium build quality", 
      "Powerful A17 Pro performance",
      "Long software support",
      "Superior build quality"
    ],
    cons: [
      "High price point",
      "No USB-C to Lightning adapter included",
      "Limited customization options"
    ],
    notes: [
      "First iPhone with titanium construction",
      "Features new Action Button replacing mute switch",
      "Supports ProRAW and ProRes recording"
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    overview: "Samsung's flagship with S Pen, advanced AI features, and 200MP camera",
    specifications: {
      display: {
        screen_size: { value: "6.8", rumored: false },
        resolution: { value: "1440 x 3120", rumored: false },
        pixel_density: { value: "516", rumored: false },
        display_type: { value: "Dynamic AMOLED 2X", rumored: false },
        refresh_rate: { value: "120", rumored: false },
        brightness: { value: "2600", rumored: false },
        protection: { value: "Corning Gorilla Glass Victus 2", rumored: false }
      },
      performance: {
        chipset: { value: "Snapdragon 8 Gen 3 for Galaxy", rumored: false },
        cpu: { value: "Octa-core (1x3.39 GHz Cortex-X4 + 3x3.1 GHz Cortex-A720 + 4x2.2 GHz Cortex-A520)", rumored: false },
        gpu: { value: "Adreno 750", rumored: false },
        ram: { value: "12", rumored: false },
        storage_options: { value: ["256", "512", "1TB"], rumored: false },
        expandable_storage: { value: false, rumored: false },
        antutu_score: { value: "1600000", rumored: false }
      },
      camera: {
        main_camera: { 
          value: {
            megapixels: "200",
            aperture: "f/1.7",
            sensor_size: "1/1.3\"",
            features: ["OIS", "PDAF", "Laser AF"]
          }, 
          rumored: false 
        },
        ultra_wide: {
          value: {
            megapixels: "12",
            aperture: "f/2.2",
            field_of_view: "120°"
          },
          rumored: false
        },
        telephoto: {
          value: {
            megapixels: "50",
            aperture: "f/3.4",
            zoom: "5x optical"
          },
          rumored: false
        },
        front_camera: {
          value: {
            megapixels: "12",
            aperture: "f/2.2",
            features: ["Dual Pixel PDAF"]
          },
          rumored: false
        },
        video_recording: { value: ["8K@30fps", "4K@60fps", "1080p@240fps", "Super Slow-mo"], rumored: false },
        camera_features: { value: ["AI Photo Enhance", "Pro Mode", "Expert RAW", "Galaxy AI"], rumored: false }
      },
      battery: {
        battery_capacity: { value: "5000", rumored: false },
        wired_charging: { value: "45", rumored: false },
        wireless_charging: { value: "15", rumored: false },
        reverse_charging: { value: true, rumored: false },
        battery_life: { value: "Up to 26 hours video playback", rumored: false },
        charging_time: { value: "65% in 30 minutes", rumored: false }
      },
      connectivity: {
        network: { value: ["5G", "4G LTE", "3G", "2G"], rumored: false },
        wifi: { value: "Wi-Fi 7 (802.11be)", rumored: false },
        bluetooth: { value: "5.3", rumored: false },
        nfc: { value: true, rumored: false },
        usb: { value: "USB-C 3.2", rumored: false },
        sim: { value: "Dual SIM (nano-SIM + eSIM)", rumored: false }
      },
      design: {
        dimensions: { value: "162.3 x 79.0 x 8.6", rumored: false },
        weight: { value: "232", rumored: false },
        materials: { value: "Aluminum frame, Gorilla Glass Victus 2 front and back", rumored: false },
        colors: { value: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"], rumored: false },
        water_resistance: { value: "IP68", rumored: false },
        durability: { value: ["Gorilla Glass Victus 2", "Reinforced aluminum frame"], rumored: false }
      },
      software: {
        operating_system: { value: "Android 14", rumored: false },
        ui: { value: "One UI 6.1", rumored: false },
        update_policy: { value: "7 years of Android updates", rumored: false },
        pre_installed_apps: { value: ["Samsung Internet", "Gallery", "Camera", "Messages", "Phone"], rumored: false },
        unique_features: { value: ["S Pen", "Galaxy AI", "Circle to Search", "Live Translate"], rumored: false }
      },
      audio: {
        speakers: { value: "Stereo speakers tuned by AKG", rumored: false },
        headphone_jack: { value: false, rumored: false },
        audio_features: { value: ["Dolby Atmos", "UHQ 32-bit", "DTS:X"], rumored: false },
        microphones: { value: "Quad microphone setup", rumored: false }
      },
      sensors: {
        biometric: { value: ["Fingerprint (under display)", "Face recognition"], rumored: false },
        sensors_list: { value: ["Accelerometer", "Gyroscope", "Proximity", "Ambient light", "Barometer", "Magnetometer"], rumored: false },
        special_sensors: { value: ["S Pen sensors", "Hall sensor"], rumored: false }
      },
      pricing: {
        launch_price: { value: "$1199 - $1599", rumored: false },
        current_price: { value: "$1199 - $1599", rumored: false },
        release_date: { value: "January 24, 2024", rumored: false },
        availability: { value: "Available worldwide", rumored: false },
        market_status: { value: "Current flagship model", rumored: false }
      }
    },
    pros: [
      "Massive 200MP camera with excellent zoom",
      "Large battery with fast charging",
      "S Pen functionality",
      "Bright and vibrant display",
      "AI-powered features"
    ],
    cons: [
      "Very expensive",
      "Large and heavy",
      "Complex UI with learning curve",
      "No microSD slot"
    ],
    notes: [
      "First Galaxy S series with 7 years of updates",
      "Enhanced S Pen with AI features",
      "Galaxy AI integration throughout the system"
    ]
  },
  {
    name: "Google Pixel 8 Pro",
    overview: "Google's flagship with advanced AI photography and pure Android experience",
    specifications: {
      display: {
        screen_size: { value: "6.7", rumored: false },
        resolution: { value: "1344 x 2992", rumored: false },
        pixel_density: { value: "489", rumored: false },
        display_type: { value: "LTPO OLED", rumored: false },
        refresh_rate: { value: "120", rumored: false },
        brightness: { value: "2400", rumored: false },
        protection: { value: "Corning Gorilla Glass Victus 2", rumored: false }
      },
      performance: {
        chipset: { value: "Google Tensor G3", rumored: false },
        cpu: { value: "Octa-core (1x3.0 GHz Cortex-X3 + 4x2.45 GHz Cortex-A715 + 4x2.15 GHz Cortex-A510)", rumored: false },
        gpu: { value: "Immortalis-G715s MC10", rumored: false },
        ram: { value: "12", rumored: false },
        storage_options: { value: ["128", "256", "512", "1TB"], rumored: false },
        expandable_storage: { value: false, rumored: false },
        antutu_score: { value: "1100000", rumored: false }
      },
      camera: {
        main_camera: { 
          value: {
            megapixels: "50",
            aperture: "f/1.68",
            sensor_size: "1/1.31\"",
            features: ["OIS", "PDAF", "Laser AF"]
          }, 
          rumored: false 
        },
        ultra_wide: {
          value: {
            megapixels: "48",
            aperture: "f/1.95",
            field_of_view: "125.5°"
          },
          rumored: false
        },
        telephoto: {
          value: {
            megapixels: "48",
            aperture: "f/2.8",
            zoom: "5x optical"
          },
          rumored: false
        },
        front_camera: {
          value: {
            megapixels: "10.5",
            aperture: "f/2.2",
            features: ["Auto-focus"]
          },
          rumored: false
        },
        video_recording: { value: ["4K@60fps", "1080p@240fps", "Cinematic blur"], rumored: false },
        camera_features: { value: ["Magic Eraser", "Best Take", "Photo Unblur", "Night Sight"], rumored: false }
      },
      pricing: {
        launch_price: { value: "$999 - $1299", rumored: false },
        current_price: { value: "$999 - $1299", rumored: false },
        release_date: { value: "October 12, 2023", rumored: false },
        availability: { value: "Available in select markets", rumored: false },
        market_status: { value: "Current flagship model", rumored: false }
      }
    },
    pros: [
      "Exceptional AI-powered photography",
      "Pure Android experience",
      "Regular and timely updates",
      "Excellent computational photography"
    ],
    cons: [
      "Average battery life",
      "Tensor chip not as powerful as competitors",
      "Limited availability in some regions"
    ]
  }
];

export default sampleDeviceDatabase;