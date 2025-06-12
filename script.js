const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const themeToggle = document.getElementById('themeToggle');
const scrollTop = document.getElementById('scrollTop');
const micButton = document.getElementById('micButton');

// Display messages
function addMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `chat-message ${className}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Reply logic
function getBotResponse(input) {
  const message = input.toLowerCase();

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
    return "Hello! How can I assist you?";
  } else if (message.includes("how are you")) {
    return "I'm just code, but I'm running great!";
  } else if (message.includes("bye")) {
    return "Goodbye! Have a great day.";
  } else if (message.includes("thank")) {
    return "You're welcome!";
  } else if (message.includes("your name")) {
    return "I’m your friendly AI chatbot.";
  } else if (message.includes("who made you")) {
    return "I was created by Ayanda Mabasa!";
  } else if (message.includes("what can you do")) {
    return "I can chat, answer questions, and keep you company!";
  } else if (message.includes("tell me a joke")) {
    return "Why don’t robots get tired? Because they recharge overnight!";
  } else if (message.includes("date")) {
    return `Today's date is ${date}.`;
  } else if (message.includes("time")) {
    return `The current time is ${time}.`;
  } else if (message.includes("openai")) {
    return "OpenAI is the amazing company that powers ChatGPT!";
  } else if (message.includes("love you")) {
    return "Aww, I love chatting with you too!";
  } else {
    return "Interesting! Tell me more.";
  }
}

// On submit
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

// Scroll to top
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
