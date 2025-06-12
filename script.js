const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const micButton = document.getElementById('micButton');

// Add messages to the chat
function addMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `chat-message ${className}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Bot responses
function getBotResponse(input) {
  const message = input.toLowerCase().trim();
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
    return "Hey there! 👋";
  } else if (message.includes("how are you")) {
    return "I'm running perfectly, thanks for asking! 🤖";
  } else if (message.includes("bye")) {
    return "Goodbye! Come back anytime. 😊";
  } else if (message.includes("thank")) {
    return "You're very welcome!";
  } else if (message.includes("your name")) {
    return "I'm your AI assistant, always here to chat!";
  } else if (message.includes("who made you")) {
    return "I was created with love by Ayanda Mabasa. 💻✨";
  } else if (message.includes("what can you do")) {
    return "I can answer questions, tell jokes, and keep you company!";
  } else if (message.includes("joke")) {
    return "Why did the computer get cold? Because it left its Windows open!";
  } else if (message.includes("date")) {
    return `Today's date is ${date}.`;
  } else if (message.includes("time")) {
    return `The time right now is ${time}.`;
  } else if (message.includes("openai")) {
    return "OpenAI builds amazing AI tools like ChatGPT!";
  } else if (message.includes("love you")) {
    return "Aww! I love chatting with you too ❤️";
  } else if (message.includes("who are you")) {
    return "I'm just a friendly chatbot built to talk to you!";
  } else if (message.includes("are you real")) {
    return "As real as code can be!";
  } else if (message.includes("help")) {
    return "Just type a message and I’ll do my best to respond!";
  } else if (message.includes("weather")) {
    return "I can't check weather yet, but it’s always sunny in the chat 🌞";
  } else {
    return "Interesting! Tell me more.";
  }
}

// Chat submit event
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

// Speech to text
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

