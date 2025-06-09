const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Smart chatbot logic
function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! How can I help you today?";
  }
  if (input.includes("how are you")) {
    return "I'm just a bot, but I'm doing great! Thanks for asking.";
  }
  if (input.includes("your name")) {
    return "I'm your friendly assistant chatbot.";
  }
  if (input.includes("bye")) {
    return "Goodbye! Have a wonderful day.";
  }
  if (input.includes("help")) {
    return "I'm here to answer your questions. Try asking about my features!";
  }
  if (input.includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  }
  if (input.includes("date")) {
    return `Today is ${new Date().toLocaleDateString()}.`;
  }

  return "I'm still learning! Try asking something else.";
}

// Display message
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle user input
function handleUserInput() {
  const input = userInput.value.trim();
  if (input === "") return;

  addMessage(input, "user");
  const botResponse = getBotResponse(input);
  setTimeout(() => addMessage(botResponse, "bot"), 500);

  userInput.value = "";
}

// Event listeners
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserInput();
});

