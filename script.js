const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const responses = {
  "hi": ["Hello! 😊", "Hey there!", "Hi, how can I help you today?"],
  "how are you": ["I'm just a bot, but I'm doing great! 🤖", "Fantastic, thanks for asking!"],
  "what is your name": ["I'm your Chatbot."],
  "what is ai": ["AI stands for Artificial Intelligence. It's how machines mimic human intelligence."],
  "tell me a joke": ["Why did the computer go to the doctor? It had a virus! 🤣"],
  "what time is it": [() => `It's ${new Date().toLocaleTimeString()}`],
  "what date is it": [() => `Today is ${new Date().toLocaleDateString()}`],
  "i'm bored": ["Want to hear a joke? Or ask me anything!", "Let's play 20 questions! You start!"],
  "thank you": ["You're welcome! 🙌", "Anytime!"],
  "bye": ["Goodbye! 👋", "See you later!"],
  "sure": ["Great! Let's do it!", "Alright, sounds good!"],
  "okay": ["Got it! ✅", "Okay, what's next?"]
};

const fallbackResponses = [
  "That's interesting! Tell me more.",
  "I'm still learning, but I’d love to hear more.",
  "Hmm, I'm not sure yet—but I'm here to chat!",
  "Could you rephrase that? I'm curious.",
  "That's beyond my current knowledge, but I’m learning fast!"
];

function getBotResponse(input) {
  const cleaned = input.toLowerCase();
  for (const key in responses) {
    if (cleaned.includes(key)) {
      const possible = responses[key];
      const response = possible[Math.floor(Math.random() * possible.length)];
      return typeof response === "function" ? response() : response;
    }
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  chatBox.innerHTML += `<div class="chat-message user">${input}</div>`;
  const response = getBotResponse(input);
  chatBox.innerHTML += `<div class="chat-message bot">${response}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
  userInput.value = "";
});

