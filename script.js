const chatLog = document.querySelector(".chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const responses = {
  "what is ai": "AI stands for Artificial Intelligence. It refers to machines designed to simulate human intelligence, such as learning, reasoning, and problem-solving.",
  "what is machine learning": "Machine learning is a branch of AI that focuses on building systems that learn from data and improve automatically.",
  "what is your name": "I'm a virtual assistant built to answer your questions clearly and seriously.",
  "what is the capital of france": "The capital of France is Paris.",
  "who is the president of the united states": "As of 2025, the President of the United States is Joe Biden.",
  "what is javascript": "JavaScript is a programming language used to create interactive effects within web browsers.",
  "what is html": "HTML stands for HyperText Markup Language. It's the standard language for creating web pages.",
  "what is css": "CSS stands for Cascading Style Sheets. It is used to style and layout web pages.",
  "tell me a joke": "Why did the developer go broke? Because they used up all their cache.",
  "what is the time": `The current time is ${new Date().toLocaleTimeString()}.`,
  "what is the date": `Today's date is ${new Date().toLocaleDateString()}.`,
  "hello": "Hello! How can I help you today?",
  "hi": "Hi there! What would you like to know?",
  "help": "You can ask me about general topics like programming, AI, world facts, or definitions.",
};

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  message.textContent = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(message) {
  const cleaned = message.toLowerCase().trim();
  return responses[cleaned] || "I'm not sure how to answer that yet, but I'm improving. Try asking something else.";
}

function handleUserInput() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(input);
    addMessage("bot", response);
  }, 500);
}

sendBtn.addEventListener("click", handleUserInput);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

