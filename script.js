// script.js

const responses = {
  // Greetings
  "hello": "Hi there! How can I assist you today?",
  "hi": "Hello! What would you like to talk about?",
  "hey": "Hey! How can I help you?",
  "good morning": "Good morning! Wishing you a productive day.",
  "good night": "Good night! Sleep well.",
  "how are you": "I'm just code, but I'm functioning perfectly!",

  // Time and date
  "what time is it": () => new Date().toLocaleTimeString(),
  "what's the time": () => new Date().toLocaleTimeString(),
  "what day is it": () => new Date().toLocaleDateString(),
  "what is today's date": () => new Date().toDateString(),

  // Emotions
  "i'm sad": "I'm sorry to hear that. Want to talk about it?",
  "i'm happy": "That's great to hear!",
  "i feel tired": "Maybe a little rest would help. You've got this!",
  "i'm bored": "Let’s find something fun to do or talk about!",
  "i feel lonely": "I'm here for you. Want to chat?",

  // Learning & study
  "how to focus": "Try the Pomodoro technique: 25 min work, 5 min break!",
  "study tips": "Set clear goals, eliminate distractions, and take breaks.",
  "best way to learn": "Practice, repetition, and teaching others really help!",
  "how to read fast": "Try skimming for main ideas first, then dive deeper.",

  // Technology
  "what is ai": "AI stands for Artificial Intelligence—machines that learn!",
  "what is coding": "Coding is giving instructions to computers to do tasks.",
  "what's javascript": "JavaScript is a language used to make websites interactive.",
  "what is html": "HTML is the structure of web pages using markup tags.",
  "what is css": "CSS styles the look and layout of web pages.",

  // Lifestyle
  "how to be productive": "Start with a to-do list and tackle small tasks first.",
  "how to stay healthy": "Eat well, sleep enough, move daily, and hydrate!",
  "how to be happy": "Gratitude, goals, and connection often help!",
  "how to stay fit": "Exercise regularly, even if it's just walking daily.",

  // Fun
  "tell me a joke": "Why don’t scientists trust atoms? Because they make up everything!",
  "make me laugh": "Why did the computer go to therapy? It had too many bytes of trauma!",
  "sing me a song": "🎶 Twinkle twinkle little code, running through the data mode...",
  "tell me something funny": "Why was the math book sad? It had too many problems!",

  // Motivation
  "motivate me": "You’re capable of amazing things. Keep going! 💪",
  "inspire me": "Every expert was once a beginner. Don’t give up.",
  "can i do it": "Absolutely. Believe in yourself!",
  "i need encouragement": "You're doing better than you think! Keep going.",

  // General
  "what is your name": "I'm your AI assistant, always here for you.",
  "who made you": "I was crafted with love and logic!",
  "do you sleep": "Nope! I’m awake 24/7 just for you.",
  "what can you do": "I can answer your questions and chat with you anytime!",
  "are you real": "I’m real in this digital world!",

  // Gratitude & Goodbyes
  "thank you": "You’re welcome!",
  "thanks": "Glad I could help!",
  "bye": "Goodbye! Talk to you soon.",
  "see you": "See you later!",
  "ok": "Alright!",
  "cool": "Cool indeed!"
};

// Generate more placeholder responses for demo (up to 1000)
for (let i = 0; i < 950; i++) {
  responses["custom-response-" + i] = "This is response number " + (i + 1) + ". You can customize me!";
}

function getBotResponse(input) {
  input = input.toLowerCase();
  for (let key in responses) {
    if (input.includes(key)) {
      const res = responses[key];
      return typeof res === "function" ? res() : res;
    }
  }
  return "That’s interesting! Tell me more.";
}

document.getElementById("chatForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("userInput").value;
  if (!input.trim()) return;

  addMessage("user", input);

  setTimeout(() => {
    const response = getBotResponse(input);
    addMessage("bot", response);
  }, 500);

  document.getElementById("userInput").value = "";
});

document.getElementById("micButton").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
  };
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

window.onscroll = () => {
  const scrollBtn = document.getElementById("scrollTop");
  scrollBtn.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
};

document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function addMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

