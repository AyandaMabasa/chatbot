const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// Simple responses
const responses = {
  "hi": ["Hello! 😊", "Hey there!"],
  "how are you": ["I'm just a bot, but I'm fine!", "Doing great, thanks!"],
  "what is your name": ["I'm your friendly chatbot."],
  "tell me a joke": ["Why did the computer go to the doctor? It had a virus! 🤣"],
  "bye": ["Goodbye! 👋", "See you later!"]
};

const fallbackResponses = [
  "Interesting! Tell me more.",
  "I'm still learning, but let's chat!",
  "Could you rephrase that?"
];

function getBotResponse(input) {
  const cleaned = input.toLowerCase();
  for (const key in responses) {
    if (cleaned.includes(key)) {
      const options = responses[key];
      const response = options[Math.floor(Math.random() * options.length)];
      return response;
    }
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  chatBox.innerHTML += `<div class="user-msg">You: ${input}</div>`;
  const response = getBotResponse(input);
  chatBox.innerHTML += `<div class="bot-msg">Bot: ${response}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
  userInput.value = "";
});
