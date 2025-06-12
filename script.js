// DOM Elements
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const micButton = document.getElementById("micButton");
const scrollTopBtn = document.getElementById("scrollTop");
const themeToggle = document.getElementById("themeToggle");

// Light/Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.body.classList.remove("light");
}

// Scroll-to-top button
window.onscroll = () => {
  scrollTopBtn.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
};
scrollTopBtn.onclick = () => {
  document.documentElement.scrollTop = 0;
};

// Voice input using Web Speech API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
micButton.addEventListener("click", () => {
  micButton.textContent = "🔴";
  recognition.start();
});
recognition.onresult = (event) => {
  userInput.value = event.results[0][0].transcript;
  micButton.textContent = "🎤";
};
recognition.onerror = () => {
  micButton.textContent = "🎤";
};

// Enhanced responses with categories and multiple triggers
const responses = {
  "greeting": {
    triggers: ["hi", "hello", "hey", "greetings", "howdy", "good morning", "good afternoon"],
    responses: ["Hello! 😊", "Hey there!", "Hi, how can I help you today?", "Greetings! What can I do for you?"]
  },
  "feeling": {
    triggers: ["how are you", "how's it going", "how do you feel", "what's up"],
    responses: ["I'm just a bot, but I'm doing great! 🤖", "Fantastic, thanks for asking!", "All systems operational! 💻"]
  },
  "identity": {
    triggers: ["your name", "who are you", "identify yourself"],
    responses: ["I'm your friendly AI assistant!", "Call me ChatBot 3000!", "I'm your personal chatbot helper!"]
  },
  "ai": {
    triggers: ["what is ai", "artificial intelligence", "explain ai"],
    responses: ["AI stands for Artificial Intelligence. It's how machines mimic human intelligence.", 
               "AI is about creating systems that can perform tasks requiring human-like understanding."]
  },
  "joke": {
    triggers: ["tell me a joke", "make me laugh", "funny joke"],
    responses: ["Why did the computer go to the doctor? It had a virus! 🤣",
               "Why don't scientists trust atoms? Because they make up everything!",
               "I told my wife she was drawing her eyebrows too high. She looked surprised!"]
  },
  "time": {
    triggers: ["what time is it", "current time", "time now"],
    responses: [() => `It's ${new Date().toLocaleTimeString()}`]
  },
  "date": {
    triggers: ["what date is it", "today's date", "current date"],
    responses: [() => `Today is ${new Date().toLocaleDateString()}`]
  },
  "bored": {
    triggers: ["i'm bored", "boring", "nothing to do"],
    responses: ["Want to hear a joke? Or ask me anything!", 
               "Let's play 20 questions! You start!",
               "I can tell you fun facts or jokes!"]
  },
  "thanks": {
    triggers: ["thank you", "thanks", "appreciate it"],
    responses: ["You're welcome! 🙌", "Anytime!", "Happy to help! 😊"]
  },
  "goodbye": {
    triggers: ["bye", "goodbye", "see you", "later"],
    responses: ["Goodbye! 👋", "See you later!", "Have a great day!"]
  },
  "agreement": {
    triggers: ["sure", "okay", "yes", "alright"],
    responses: ["Great! Let's do it!", "Alright, sounds good!", "Awesome! 👍"]
  },
  "help": {
    triggers: ["help", "support", "assistance"],
    responses: ["What can I help you with?", "I'm here to help!", "How can I assist you today?"]
  },
  "weather": {
    triggers: ["weather", "raining", "sunny", "temperature"],
    responses: ["I'm a bot so I don't feel weather, but I can look it up for you!", 
               "You might want to check a weather app for accurate info!"]
  },
  "age": {
    triggers: ["how old", "your age"],
    responses: ["I was born when you loaded this page! 🎉", "Age is just a number for an AI like me!"]
  }
};

const fallbackResponses = [
  "That's interesting! Tell me more.",
  "I'm still learning, but I'd love to hear more.",
  "Hmm, I'm not sure yet—but I'm here to chat!",
  "Could you rephrase that? I'm curious.",
  "That's a new one for me, but it sounds cool!",
  "Let's explore that together!",
  "Tell me more about it!",
  "That's beyond my current knowledge, but I'm learning fast!",
  "I don't have an answer for that, but I'm happy to chat!",
  "Interesting point! What else would you like to discuss?"
];

// Conversation memory
let lastTopic = null;
let conversationHistory = [];

function getRandomResponse(options) {
  return typeof options[0] === "function" 
    ? options[Math.floor(Math.random() * options.length)]()
    : options[Math.floor(Math.random() * options.length)];
}

function normalizeInput(input) {
  const synonyms = {
    "hi": ["hello", "hey", "howdy", "greetings"],
    "bye": ["goodbye", "see you", "later"],
    "thanks": ["thank you", "appreciate it"],
    "joke": ["tell me a joke", "make me laugh"]
  };

  let cleaned = input.toLowerCase();
  for (const [word, alternatives] of Object.entries(synonyms)) {
    if (alternatives.includes(cleaned)) {
      return word;
    }
  }
  return cleaned;
}

function getBotResponse(input) {
  const cleaned = normalizeInput(input);
  
  // Special case for follow-ups
  if (lastTopic === "joke" && (cleaned.includes("another") || cleaned.includes("more"))) {
    return "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾";
  }

  // Check for exact matches first
  for (const [category, data] of Object.entries(responses)) {
    if (data.triggers.some(trigger => cleaned === trigger.toLowerCase())) {
      lastTopic = category;
      conversationHistory.push({user: input, bot: getRandomResponse(data.responses)});
      return getRandomResponse(data.responses);
    }
  }

  // Check for partial matches
  for (const [category, data] of Object.entries(responses)) {
    if (data.triggers.some(trigger => cleaned.includes(trigger.toLowerCase()))) {
      lastTopic = category;
      conversationHistory.push({user: input, bot: getRandomResponse(data.responses)});
      return getRandomResponse(data.responses);
    }
  }

  // Improved fallback that sometimes references previous topics
  let fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  if (lastTopic && Math.random() > 0.5) {
    fallback = `Going back to ${lastTopic}, ` + fallback.toLowerCase();
  }
  
  conversationHistory.push({user: input, bot: fallback});
  return fallback;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  chatBox.innerHTML += `<div class="chat-message user">${input}</div>`;
  const response = getBotResponse(input);
  
  // Simulate typing effect
  const botMessage = document.createElement("div");
  botMessage.className = "chat-message bot";
  chatBox.appendChild(botMessage);
  
  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < response.length) {
      botMessage.innerHTML = response.substring(0, i + 1);
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      clearInterval(typingEffect);
    }
  }, 20);

  userInput.value = "";
  userInput.focus();
});

// Allow sending message with Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatForm.dispatchEvent(new Event("submit"));
  }
});

