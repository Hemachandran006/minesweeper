# Mobile Device Specifications Chatbot

A comprehensive chatbot system that provides detailed mobile device specifications, comparisons, and recommendations similar to GSM Arena. This system is designed to help users make informed decisions about mobile devices based on their specific needs and preferences.

## 🚀 Features

### Core Functionality
- **Detailed Device Specifications**: Comprehensive specs organized in categories (Display, Performance, Camera, Battery, etc.)
- **Device Comparisons**: Side-by-side comparisons with intelligent scoring
- **Smart Recommendations**: Personalized device suggestions based on user preferences and budget
- **Use Case Profiles**: Optimized recommendations for different user types (Photography, Gaming, Business, etc.)
- **Rumored vs. Confirmed Specs**: Clear distinction between confirmed and rumored specifications
- **Budget Analysis**: Price-aware recommendations and filtering

### Advanced Features
- **Intelligent Scoring**: Multi-factor scoring system with customizable weights
- **Alternative Suggestions**: Find similar devices in comparable price ranges
- **Requirement Matching**: Filter devices based on specific user requirements
- **Category-wise Analysis**: Deep dive into specific aspects like camera quality or performance

## 📁 Project Structure

```
src/chatbot/
├── config/
│   └── prompt-template.json     # Core chatbot configuration and prompts
├── templates/
│   └── spec-categories.json     # Device specification categories and structure
└── utils/
    ├── formatter.js             # Response formatting utilities
    ├── comparison.js            # Device comparison logic
    └── recommendations.js       # Recommendation system
```

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd minesweeper

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📚 Usage Examples

### Basic Device Information

```javascript
import { ResponseFormatter } from './src/chatbot/utils/formatter.js';

const formatter = new ResponseFormatter();

// Sample device data structure
const deviceData = {
  name: "iPhone 15 Pro",
  overview: "Apple's flagship smartphone with titanium design and A17 Pro chip",
  specifications: {
    display: {
      screen_size: { value: "6.1", rumored: false },
      resolution: { value: "1179 x 2556", rumored: false },
      display_type: { value: "Super Retina XDR OLED", rumored: false },
      refresh_rate: { value: "120", rumored: false }
    },
    performance: {
      chipset: { value: "Apple A17 Pro (3 nm)", rumored: false },
      ram: { value: "8", rumored: false },
      storage_options: { value: ["128", "256", "512", "1TB"], rumored: false }
    },
    camera: {
      main_camera: { 
        value: {
          megapixels: "48",
          aperture: "f/1.78",
          features: ["sensor-shift OIS", "PDAF"]
        }, 
        rumored: false 
      }
    },
    pricing: {
      current_price: { value: "$999 - $1499", rumored: false },
      release_date: { value: "September 22, 2023", rumored: false }
    }
  },
  pros: [
    "Excellent camera system with Pro features",
    "Premium titanium build quality",
    "Powerful A17 Pro performance"
  ],
  cons: [
    "High price point",
    "No USB-C to Lightning adapter included"
  ]
};

// Format device specifications
const formattedSpecs = formatter.formatDeviceSpecs(deviceData, {
  showRumored: true,
  compact: false
});

console.log(formattedSpecs);
```

### Device Comparison

```javascript
import { DeviceComparison } from './src/chatbot/utils/comparison.js';

const comparison = new DeviceComparison();

// Compare two devices
const comparisonResult = comparison.compareDevices(
  iphone15ProData,
  samsungS24UltraData,
  {
    focusCategories: ['camera', 'performance', 'display'],
    includeScoring: true,
    userPriorities: {
      camera: 0.4,
      performance: 0.3,
      display: 0.3
    }
  }
);

// Format comparison result
const formattedComparison = formatter.formatComparison(
  iphone15ProData,
  samsungS24UltraData,
  { highlightDifferences: true }
);
```

### Smart Recommendations

```javascript
import { DeviceRecommendations } from './src/chatbot/utils/recommendations.js';

const recommender = new DeviceRecommendations();

// Define user criteria
const userCriteria = {
  useCase: "I love taking photos and videos for social media",
  budget: "800-1200",
  priorities: ["camera quality", "battery life", "display"],
  requirements: {
    good_camera: true,
    long_battery: true,
    wireless_charging: true
  }
};

// Get recommendations
const recommendations = recommender.generateRecommendations(
  userCriteria,
  deviceDatabase, // Array of device objects
  {
    maxRecommendations: 5,
    includeAlternatives: true
  }
);

// Format recommendations
const formattedRecs = formatter.formatRecommendations(
  recommendations.recommendations,
  userCriteria
);
```

## 🎯 Use Case Profiles

The system includes optimized profiles for different user types:

### Photography Enthusiast
- **Focus**: Camera quality (40%), Display accuracy (15%), Performance (15%)
- **Priorities**: Camera megapixels, multiple lenses, pro features
- **Keywords**: photo, camera, photography, pictures

### Mobile Gamer
- **Focus**: Performance (35%), Display (20%), Battery (15%)
- **Priorities**: High refresh rate, powerful processor, cooling
- **Keywords**: gaming, games, performance, fps

### Business Professional
- **Focus**: Battery life (25%), Performance (20%), Connectivity (15%)
- **Priorities**: Long battery, productivity features, security
- **Keywords**: work, business, productivity, office

### Content Creator
- **Focus**: Camera (30%), Performance (20%), Display (15%)
- **Priorities**: Video recording, editing performance, color accuracy
- **Keywords**: video, content, creator, editing, streaming

### Budget Conscious
- **Focus**: Price (30%), Battery (20%), Performance (15%)
- **Priorities**: Value for money, essential features, durability
- **Keywords**: cheap, budget, affordable, value

## 📊 Specification Categories

The system organizes device specifications into 10 main categories:

1. **📱 Display**: Screen size, resolution, type, refresh rate
2. **⚡ Performance**: Chipset, CPU, GPU, RAM, storage
3. **📷 Camera**: Main, ultra-wide, telephoto, front cameras
4. **🔋 Battery**: Capacity, charging speeds, battery life
5. **📡 Connectivity**: Network, Wi-Fi, Bluetooth, NFC
6. **🎨 Design**: Dimensions, weight, materials, colors
7. **💻 Software**: OS, UI, update policy, features
8. **🎵 Audio**: Speakers, headphone jack, audio features
9. **🔍 Sensors**: Biometric, sensors list, special sensors
10. **💰 Pricing**: Launch price, current price, availability

## 🔧 Configuration

### Prompt Template Configuration

The `prompt-template.json` file contains:
- System prompts and persona definition
- Response templates for different scenarios
- Error handling messages
- Conversation flow guidelines

### Specification Categories

The `spec-categories.json` file defines:
- Category structures and field definitions
- Display formatting rules
- Comparison weights for scoring
- Field validation and examples

## 🎨 Response Formatting

### Device Specifications
```
📋 **Overview**: Apple's flagship smartphone with titanium design

📱 **Display**
• **Screen Size**: 6.1 inches
• **Resolution**: 1179 x 2556 pixels
• **Display Type**: Super Retina XDR OLED
• **Refresh Rate**: 120 Hz

⚡ **Performance**
• **Chipset**: Apple A17 Pro (3 nm)
• **RAM**: 8 GB
• **Storage Options**: 128, 256, 512, 1TB GB

✅ **Pros**:
• Excellent camera system with Pro features
• Premium titanium build quality
• Powerful A17 Pro performance

❌ **Cons**:
• High price point
• No USB-C to Lightning adapter included
```

### Device Comparison
```
Here's a detailed comparison between iPhone 15 Pro and Samsung Galaxy S24 Ultra:

📱 **Display**
| Feature | iPhone 15 Pro | Samsung Galaxy S24 Ultra |
|---------|---------------|---------------------------|
| Screen Size | **6.1 inches** | **6.8 inches** |
| Resolution | 1179 x 2556 | **1440 x 3120** |
| Refresh Rate | 120 Hz | 120 Hz |
```

### Recommendations
```
🏆 **Recommended Devices**:

**1. iPhone 15 Pro**
💰 Price: $999 - $1499
⭐ Match Score: 92%
📝 Why: Excellent choice for photography enthusiast with strong camera specifications
🔑 Key Features: 48MP main camera, Apple A17 Pro, 6.1" display, 3279mAh battery
```

## 🤖 Error Handling

The system gracefully handles various error scenarios:
- **Device Not Found**: Clear error message with suggestions
- **Incomplete Specifications**: Shows available data with notes about missing info
- **Comparison Errors**: Falls back to individual device information
- **Invalid Requirements**: Provides guidance on proper format

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm test -- formatter
npm test -- comparison
npm test -- recommendations
```

## 📈 Performance Considerations

- **Caching**: Device data should be cached for better performance
- **Pagination**: Large device databases should implement pagination
- **Lazy Loading**: Load specification categories on demand
- **Debouncing**: Implement search debouncing for real-time queries

## 🔮 Future Enhancements

- **Machine Learning**: Improve recommendation accuracy with ML models
- **Real-time Data**: Integration with live specification databases
- **Voice Interface**: Add voice interaction capabilities
- **Visual Comparisons**: Image-based specification comparisons
- **User Profiles**: Persistent user preferences and history
- **Market Analysis**: Price tracking and market trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by GSM Arena's comprehensive device specification system
- Built with modern web technologies for optimal performance
- Designed with user experience and accessibility in mind
