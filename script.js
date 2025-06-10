const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Simple brain — keyword-based logic
const knowledgeBase = {
  greetings: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon"],
  goodbye: ["bye", "goodbye", "see you", "farewell"],
  thanks: ["thanks", "thank you"],
  creator: ["who made you", "who created you"],
  abilities: ["what can you do", "your abilities", "help"],
  name: ["your name", "who are you"],
  joke: ["joke", "make me laugh"],
  time: ["what time is it", "current time"],
  date: ["what date is it", "today's date"]
};

const responses = {
  greetings: ["Hi there! 😊", "Hello! How can I help?", "Hey! What’s up?"],
  goodbye: ["Goodbye! 👋", "See you soon!", "Take care!"],
  thanks: ["You're welcome!", "No problem!", "Happy to help!"],
  creator: ["I was created by Ayanda Mabasa 💻"],
  abilities: ["I can chat with you, answer basic questions, and make you smile 😄"],
  name: ["I'm your chatbot assistant!", "You can call me ChatBuddy!"],
  joke: [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "I told a joke about construction... but I'm still working on it. 😅"
  ],
  time: [new Date().toLocaleTimeString()],
  date: [new Date().toLocaleDateString()],
  default: ["Hmm, I’m not sure. Try asking something else! 🤔"]
};

// Show message in chat
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}-message`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Bot typing effect
function showTyping() {
  const typing = document.createElement("div");
  typing.id = "typing";
  typing.className = "typing";
  typing.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
  chatLog.appendChild(typing);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// Smart matching
function getResponse(message) {
  const msg = message.toLowerCase();
  for (let key in knowledgeBase) {
    if (knowledgeBase[key].some(phrase => msg.includes(phrase))) {
      const possible = responses[key];
      return possible[Math.floor(Math.random() * possible.length)];
    }
  }
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

// Handle user input
function handleMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  showTyping();
  setTimeout(() => {
    removeTyping();
    const reply = getResponse(input);
    appendMessage("bot", reply);
  }, 700);
}

// Listeners
sendBtn.addEventListener("click", handleMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") handleMessage();
});

