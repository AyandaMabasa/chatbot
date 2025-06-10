const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Knowledge base for the chatbot
const knowledgeBase = {
  greetings: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon"],
  farewells: ["bye", "goodbye", "see you", "farewell"],
  thanks: ["thanks", "thank you", "appreciate it"],
  feelings: ["how are you", "how's it going", "how do you feel"],
  creator: ["who made you", "who created you", "who built you"],
  capabilities: ["what can you do", "help", "your abilities"],
  name: ["your name", "who are you"],
  ai: ["are you ai", "are you human", "are you real"],
  jokes: ["tell me a joke", "make me laugh", "funny"],
  time: ["what time is it", "current time", "what's the time"],
  date: ["today's date", "what's today", "current date"]
};

// Responses for different categories
const responses = {
  greetings: ["Hello there! 😊", "Hi! How can I help you today?", "Greetings! What's on your mind?"],
  farewells: ["Goodbye! Come back anytime.", "See you later! 👋", "Farewell! Have a great day!"],
  thanks: ["You're welcome! 😊", "My pleasure!", "Happy to help!"],
  feelings: ["I'm just a program, but I'm functioning perfectly!", "I don't have feelings, but I'm here to help!", "All systems operational! How about you?"],
  creator: ["I was created by a talented developer using JavaScript!", "My creator is a programmer who loves building chatbots.", "I'm the product of some clever coding!"],
  capabilities: [
    "I can answer questions, have conversations, and even tell jokes!",
    "I'm a general purpose chatbot. Try asking me anything!",
    "I can discuss various topics, but my knowledge is limited to what I've been programmed with."
  ],
  name: ["I'm ChatBot, your virtual assistant!", "You can call me ChatBot!", "I'm known as ChatBot, nice to meet you!"],
  ai: ["I'm an AI chatbot, not a real person.", "I'm a computer program designed to simulate conversation.", "100% artificial intelligence here!"],
  jokes: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
    "Why don't skeletons fight each other? They don't have the guts!"
  ],
  time: [`The current time is ${new Date().toLocaleTimeString()}.`],
  date: [`Today is ${new Date().toLocaleDateString()}.`],
  default: [
    "I'm not sure I understand. Could you rephrase that?",
    "Interesting! Could you tell me more?",
    "I'm still learning. Could you ask me something else?",
    "Let me think about that... Can you ask differently?",
    "That's a good question. What else would you like to know?"
  ]
};

// Context memory variables
let lastUserMessage = "";
let lastBotResponse = "";

// Add welcome message when page loads
window.addEventListener("DOMContentLoaded", () => {
  appendMessage("bot", "Hello! I'm your AI assistant. How can I help you today?");
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender === "user" ? "user-message" : "bot-message");
  message.innerText = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTypingIndicator() {
  const typingElement = document.createElement("div");
  typingElement.id = "typing-indicator";
  typingElement.className = "typing";
  typingElement.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;
  chatLog.appendChild(typingElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTypingIndicator() {
  const typingElement = document.getElementById("typing-indicator");
  if (typingElement) typingElement.remove();
}

function getBotResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();

  // Use compromise.js NLP to detect greetings
  const doc = nlp(lowerCaseMessage);

  if (doc.has("#Greeting")) {
    const greetingsResponses = responses.greetings;
    lastUserMessage = lowerCaseMessage;
    lastBotResponse = greetingsResponses[Math.floor(Math.random() * greetingsResponses.length)];
    return lastBotResponse;
  }

  // Context-aware example for name questions
  if (lowerCaseMessage.includes("your name")) {
    if (lastBotResponse && lastBotResponse.includes("ChatBot")) {
      lastUserMessage = lowerCaseMessage;
      lastBotResponse = "Yep, still ChatBot! What else would you like to know?";
      return lastBotResponse;
    }
  }

  // Check knowledge base triggers
  for (const [category, triggers] of Object.entries(knowledgeBase)) {
    for (const trigger of triggers) {
      if (lowerCaseMessage.includes(trigger)) {
        const possibleResponses = responses[category];
        const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        lastUserMessage = lowerCaseMessage;
        lastBotResponse = response;
        return response;
      }
    }
  }

  // Default fallback
  const defaultResponse = responses.default[Math.floor(Math.random() * responses.default.length)];
  lastUserMessage = lowerCaseMessage;
  lastBotResponse = defaultResponse;
  return defaultResponse;
}

async function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  showTypingIndicator();

  // Simulate thinking time
  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(input);
    appendMessage("bot", response);
  }, 700 + Math.random() * 800

