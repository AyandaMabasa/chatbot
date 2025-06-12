const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const micButton = document.getElementById('micButton');

// Function to display a message
function addMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `chat-message ${className}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Basic logic to generate a reply
function getBotResponse(input) {
  const message = input.toLowerCase();

  if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
    return "Hello! How can I assist you?";
  } else if (message.includes("how are you")) {
    return "I'm just code, but I'm running perfectly!";
  } else if (message.includes("bye")) {
    return "Goodbye! Come back soon.";
  } else if (message.includes("thank")) {
    return "You're welcome!";
  } else {
    return "Interesting! Tell me more.";
  }
}

// Handle form submission
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, 'user');
  const botReply = getBotResponse(input);
  setTimeout(() => addMessage(botReply, 'bot'), 500);

  userInput.value = '';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Scroll to top button
window.addEventListener('scroll', () => {
  scrollTop.style.display = window.scrollY > 100 ? 'block' : 'none';
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optional: Speech-to-text (microphone button)
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (recognition) {
  const mic = new recognition();
  mic.lang = 'en-US';

  micButton.addEventListener('click', () => {
    mic.start();
  });

  mic.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
  };
}


