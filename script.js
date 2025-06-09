const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const responses = {
  hello: "Hello! How can I assist you today?",
  hi: "Hi there! What would you like to talk about?",
  hey: "Hey! How may I help you?",
  "how are you": "I'm just a bot, but I'm doing great! Thanks for asking.",
  "what's your name": "I'm your classy chatbot assistant.",
  help: "I'm here to help! Ask me anything.",
  thanks: "You're welcome!",
  bye: "Goodbye! Have a wonderful day!",
};

function getResponse(message) {
  message = message.toLowerCase().trim();

  // Find matching keyword in the responses object
  for (const key in responses) {
    if (message.includes(key)) {
      return responses[key];
    }
  }
  return "Sorry, I don't have an answer for that yet.";
}

function appendMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = text;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight; // auto scroll to bottom
}

function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';
  
  setTimeout(() => {
    const botReply = getResponse(message);
    appendMessage(botReply, 'bot');
  }, 500);
}

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});
