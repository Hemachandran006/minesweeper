# Mobile Device Specification Chatbot

A comprehensive chatbot application that provides detailed mobile device specifications with an intuitive chat interface, built with React, TypeScript, and Vite.

## 🌟 Features

### Core Features
- **Interactive Chat Interface**: Real-time conversation with emoji-rich responses
- **Comprehensive Device Database**: Detailed specifications for popular mobile devices
- **Smart Query Processing**: Intelligent intent detection and query understanding
- **Input Validation**: Robust error handling and user guidance
- **Visual Design**: Modern UI with emoji integration for better user experience

### Device Information Categories
- **General**: Brand, Model, Release Date, Price Range
- **Display**: Type, Size, Resolution, Refresh Rate, Protection
- **Performance**: Chipset, CPU, GPU, RAM, Storage options
- **Camera**: Rear/Front cameras, Features, Video capabilities
- **Audio**: Speakers, Headphone jack, Audio features
- **Battery**: Capacity, Charging speeds, Wireless charging
- **Connectivity**: 5G/4G, Wi-Fi, Bluetooth, NFC, USB
- **OS & Features**: Operating System, UI, Security features
- **Special Features**: Gaming capabilities, Stylus support, Water resistance
- **Pros & Cons**: Comprehensive evaluation summary

### Available Commands
- **Search**: `"iPhone 15 Pro"`, `"Samsung"`, `"gaming phone"`
- **Device Info**: `"iPhone specs"`, `"Galaxy S24 details"`
- **List Devices**: `"list"`, `"show all devices"`
- **Help**: `"help"` - Display comprehensive usage guide

## 🏗️ Architecture

### Project Structure
```
src/
├── components/
│   └── Chatbot.tsx          # Main chatbot interface component
├── data/
│   └── deviceDatabase.ts    # Device data store and sample devices
├── types/
│   └── device.ts           # TypeScript type definitions
├── utils/
│   ├── DeviceSpec.ts       # Device class with formatting methods
│   └── queryProcessor.ts   # Input validation and query processing
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

### Key Classes and Components

#### `DeviceSpec` Class
- Implements comprehensive device specification formatting
- Provides methods for different information categories
- Includes emoji-rich display formatting
- Supports search functionality

#### `DeviceDataStore` Class
- Manages device database operations
- Provides search and filtering capabilities
- Supports device suggestions and brand filtering
- Extensible for adding new devices

#### `QueryProcessor` Utility
- Handles intent detection (search, list, help, specs)
- Provides input validation and error handling
- Generates helpful error messages and suggestions

#### `Chatbot` Component
- Main React component with chat interface
- Manages conversation state and message history
- Handles user input and bot responses
- Provides quick suggestion buttons

## 📱 Device Database

Currently includes specifications for:
- **Apple iPhone 15 Pro** - Premium flagship with A17 Pro chip
- **Samsung Galaxy S24 Ultra** - Feature-rich with S Pen support
- **Google Pixel 8 Pro** - AI-powered photography and pure Android
- **OnePlus 12** - Performance-focused with fast charging
- **Xiaomi 14 Ultra** - Camera-centric with Leica partnership

Each device includes complete specifications across all categories with detailed pros and cons analysis.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Development
The application runs on `http://localhost:5173` in development mode with hot reloading enabled.

## 🎯 Usage Examples

### Search by Device Name
```
User: "iPhone 15 Pro"
Bot: Returns complete specifications with emojis
```

### Search by Brand
```
User: "Samsung"
Bot: Shows Samsung Galaxy S24 Ultra details
```

### List All Devices
```
User: "list"
Bot: Displays all available devices organized by brand
```

### Get Help
```
User: "help"
Bot: Shows comprehensive command guide and usage tips
```

### Feature Search
```
User: "gaming phone"
Bot: Returns devices with gaming capabilities
```

## 🔧 Customization

### Adding New Devices
Add new device objects to the `deviceDatabase` array in `src/data/deviceDatabase.ts`:

```typescript
{
  id: 'device-id',
  general: { /* device info */ },
  display: { /* display specs */ },
  // ... other categories
}
```

### Extending Functionality
- Add new categories to `Device` interface in `src/types/device.ts`
- Implement formatting methods in `DeviceSpec` class
- Update query processing for new search patterns

### UI Customization
- Modify styles object in `Chatbot.tsx`
- Update emoji usage and formatting
- Customize color scheme and layout

## 🎨 Design Principles

- **User-Friendly**: Intuitive chat interface with quick suggestions
- **Comprehensive**: Complete device specifications with detailed analysis
- **Visual Appeal**: Emoji integration for better information hierarchy
- **Responsive**: Works well on different screen sizes
- **Extensible**: Easy to add new devices and features
- **Error Handling**: Helpful error messages and user guidance

## 🧪 Testing

The application includes:
- TypeScript type checking
- ESLint code quality checks
- Build validation
- Manual testing of all core features

### Running Tests
```bash
# Type checking
npm run build

# Linting
npm run lint
```

## 📝 Future Enhancements

- **Device Comparison**: Side-by-side device comparison feature
- **Advanced Filters**: Price range, brand, and feature filtering
- **Search History**: Save and recall previous searches
- **Favorites**: Bookmark devices for quick access
- **Export Features**: Share or export device specifications
- **Expanded Database**: More devices and regular updates
- **Voice Interface**: Voice input and text-to-speech output

## 🤝 Contributing

1. Follow existing code style and TypeScript patterns
2. Add comprehensive device specifications when adding new devices
3. Update documentation for new features
4. Test thoroughly before submitting changes
5. Use meaningful commit messages

## 📄 License

This project is part of the minesweeper repository and follows the same licensing terms.