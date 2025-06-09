const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Simple responses dictionary
const responses = {
  "hello": "Hi there! How can I assist you today?",
  "hi": "Hello! What can I do for you?",
  "how are you": "I’m just a bot, but I’m here to help you!",
  "what is your name": "I’m your friendly chatbot.",
  "help": "Sure! Ask me anything you want.",
  "what can you do": "I can chat with you and answer simple questions.",
  "bye": "Goodbye! Have a great day.",
  "thank you": "You’re welcome!",
  // Add more phrases/responses here
};

function getResponse(message) {
  message = message.toLowerCase();
  for (let key in responses) {
    if (message.includes(key)) {
      return responses[key];
    }
  }
  return "Sorry, I don't understand that. Could you please rephrase?";
}

function appendMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;
  
  appendMessage(message, "user");
  
  // Simulate bot response delay
  setTimeout(() => {
    const botReply = getResponse(message);
    appendMessage(botReply, "bot");
  }, 500);
  
  userInput.value = "";
  userInput.focus();
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    handleSend();
  }
});
