const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

window.addEventListener('DOMContentLoaded', () => {
  appendMessage("bot", "Hello, I'm your virtual assistant. How can I help you today?");
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", `${sender}-message`);
  message.innerText = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.className = "typing";
  typing.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
  chatLog.appendChild(typing);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

async function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";
  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(input);
    appendMessage("bot", response);
  }, 800);
}

function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("your name")) return "You can call me Ayanda Assistant.";
  if (msg.includes("who created you")) return "I was built by Ayanda Mabasa as a professional chatbot project.";
  if (msg.includes("how are you")) return "I'm running smoothly. How can I assist you?";
  if (msg.includes("help") || msg.includes("what can you do")) return "I can respond to basic questions, simulate intelligent conversation, and serve as a virtual assistant.";
  if (msg.includes("thank")) return "You're welcome. Let me know if there's anything else.";
  if (msg.includes("bye") || msg.includes("goodbye")) return "Goodbye. Best of luck with your internship applications.";
  if (msg.includes("joke")) return "I’m focused on professional topics. Let me know if you have a serious question.";

  if (msg.endsWith("?")) {
    return "That's an insightful question. Let me get back to you with more context as I improve.";
  }

  return "I’m still learning to respond to that. Please rephrase or ask something else.";
}

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage();
});


