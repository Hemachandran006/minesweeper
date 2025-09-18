/**
 * Demonstration of the Mobile Device Specifications Chatbot
 * This file shows practical examples of how to use the system
 */

import MobileSpecChatbot from './index.js';
import { sampleDevice, sampleDevice2, mockDeviceDatabase } from './test.js';

// Create chatbot instance
const chatbot = new MobileSpecChatbot();

// Load sample device database
chatbot.setDeviceDatabase(mockDeviceDatabase);

// Demonstration function
async function demonstrateChatbot() {
  console.log("🤖 Mobile Device Specifications Chatbot Demo\n");
  console.log("=" * 50);
  
  // Test 1: Device Specifications Query
  console.log("\n📱 Test 1: Device Specifications Query");
  console.log("Query: 'Tell me about iPhone 15 Pro'");
  const specs = await chatbot.processQuery("Tell me about iPhone 15 Pro");
  console.log("Response preview:", specs.substring(0, 200) + "...");
  
  // Test 2: Device Comparison Query
  console.log("\n⚖️ Test 2: Device Comparison Query");
  console.log("Query: 'Compare iPhone 15 Pro vs Samsung Galaxy S24 Ultra'");
  const comparison = await chatbot.processQuery("Compare iPhone 15 Pro vs Samsung Galaxy S24 Ultra");
  console.log("Response preview:", comparison.substring(0, 200) + "...");
  
  // Test 3: Recommendation Query
  console.log("\n🎯 Test 3: Recommendation Query");
  console.log("Query: 'Best phone for photography under $1200'");
  const recommendation = await chatbot.processQuery("Best phone for photography under $1200");
  console.log("Response preview:", recommendation.substring(0, 200) + "...");
  
  // Test 4: Help Query
  console.log("\n❓ Test 4: Help Query");
  console.log("Query: 'help'");
  const help = await chatbot.processQuery("help");
  console.log("Response preview:", help.substring(0, 200) + "...");
  
  // Test 5: Unknown Query
  console.log("\n❔ Test 5: Unknown Query");
  console.log("Query: 'What is the weather today?'");
  const unknown = await chatbot.processQuery("What is the weather today?");
  console.log("Response preview:", unknown.substring(0, 200) + "...");
  
  console.log("\n✅ All demonstrations completed successfully!");
  console.log("\nAvailable devices in database:", chatbot.getAvailableDevices());
}

// Example usage patterns
function showUsageExamples() {
  console.log("\n📚 Common Usage Patterns:");
  
  const examples = [
    {
      category: "Device Information",
      queries: [
        "iPhone 15 Pro specifications",
        "Tell me about Samsung Galaxy S24 Ultra",
        "What are the camera specs of Pixel 8 Pro?"
      ]
    },
    {
      category: "Device Comparisons", 
      queries: [
        "iPhone 15 vs Samsung S24",
        "Compare Pixel 8 Pro vs iPhone 15 Pro camera",
        "Galaxy S24 Ultra vs iPhone 15 Pro Max performance"
      ]
    },
    {
      category: "Personalized Recommendations",
      queries: [
        "Best camera phone under $800",
        "Recommend a gaming phone with good battery",
        "Budget phone for seniors",
        "Phone for content creators under $1000"
      ]
    },
    {
      category: "Specific Feature Inquiries",
      queries: [
        "Phones with wireless charging under $600",
        "Best battery life smartphones",
        "Phones with headphone jack",
        "Waterproof phones for outdoor use"
      ]
    }
  ];
  
  examples.forEach(example => {
    console.log(`\n${example.category}:`);
    example.queries.forEach(query => {
      console.log(`  • "${query}"`);
    });
  });
}

// Advanced configuration examples
function showAdvancedConfig() {
  console.log("\n⚙️ Advanced Configuration Examples:");
  
  console.log(`
// Custom recommendation criteria
const customCriteria = {
  useCase: "content_creator",
  budget: { min: 600, max: 1200 },
  priorities: ["camera", "performance", "display"],
  requirements: {
    video_recording: "4K@60fps",
    storage: "256GB+",
    wireless_charging: true,
    water_resistance: "IP68"
  }
};

// Focused comparison
const comparisonOptions = {
  focusCategories: ["camera", "performance", "battery"],
  userPriorities: {
    camera: 0.4,
    performance: 0.3,
    battery: 0.3
  },
  highlightDifferences: true
};

// Custom formatting
const formatOptions = {
  showRumored: false,
  compact: true,
  maxRecommendations: 3,
  includeAlternatives: true
};
  `);
}

// Run demonstrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateChatbot()
    .then(() => {
      showUsageExamples();
      showAdvancedConfig();
      console.log("\n🎉 Demo completed! The chatbot system is ready for integration.");
    })
    .catch(error => {
      console.error("Demo failed:", error);
    });
}

export { demonstrateChatbot, showUsageExamples, showAdvancedConfig };