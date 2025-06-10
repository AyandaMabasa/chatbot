const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const knowledgeBase = {
  greetings: ["hi", "hello", "hey", "good morning", "good afternoon"],
  goodbye: ["bye", "goodbye", "see you", "farewell"],
  thanks: ["thanks", "thank you", "appreciate it"],
  creator: ["who made you", "who created you", "who built you"],
  abilities: ["what can you do", "your abilities", "how can you help"],
  name: ["your name", "who are you"],
  joke: ["tell me a joke", "make me laugh", "funny"],
  time: ["what time is it", "current time", "time now"],
  date: ["what's the date", "today's date", "date now"]
};

const responses = {
  greetings: ["Hello. How can I assist you today?", "Hi there. What can I help you with?"],
  goodbye: ["Goodbye. Let me know if you need anything else.", "Take care. I'm here if you have more questions."],
  thanks: ["You're welcome.", "I'm here to help."],
  creator: ["I was developed by Ayanda Mabasa."],
  abilities: ["I can answer basic questions, provide information, and assist with tasks within my scope."],
  name: ["I'm your virtual assistant chatbot."],
  joke: ["I'm currently focused on providing helpful answers. Let me know how I can assist."],
  time: [new Date().toLocaleTimeString()],
  date: [new Date().toLocaleDateString()],
  default: [
    "I'm not certain I understand. Could you clarify your question?",
    "Let me look into that. Can you rephrase or add more detail?",
    "That's a valid question. I may not have the full answer, but I'm here to assist."
  ]
};

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", `${sender}-message`);
  message.innerText = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  for (const [category, triggers] of Object.entries(knowledgeBase)) {
    if (triggers.some(trigger => lower.includes(trigger))) {
      const options = responses[category];
      return options[Math.floor(Math.random() * options.length)];
    }
  }
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;
  appendMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(input);
    appendMessage("bot", response);
  }, 500);
}

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage();
});

window.addEventListener("DOMContentLoaded", () => {
  appendMessage("bot", "Welcome. I'm your assistant. How can I help you?");
});


