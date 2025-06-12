const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// Optional basic response logic
function getBotResponse(input) {
  const message = input.toLowerCase();

  if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
    return "Hello! How can I assist you?";
  } else if (message.includes("how are you")) {
    return "I'm just code, but I'm here to help you!";
  } else if (message.includes("bye")) {
    return "Goodbye! Come back if you need more help.";
  } else if (message.includes("thank")) {
    return "You're welcome!";
  } else {
    // Fallback for unknown inputs
    return "Interesting! Tell me more.";
  }
}

function addMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `chat-message ${className}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, 'user');

  const botReply = getBotResponse(input);
  setTimeout(() => addMessage(botReply, 'bot'), 500);

  userInput.value = '';
});


