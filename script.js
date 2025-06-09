const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  respondToUser(message);
  userInput.value = "";
}

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatLog.appendChild(msgDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function respondToUser(input) {
  const cleaned = input.toLowerCase();
  let response = "";

  if (cleaned.includes("hello") || cleaned.includes("hi")) {
    response = "Hi there! 👋 How can I help you today?";
  } else if (cleaned.includes("how are you")) {
    response = "I'm just code, but I'm doing great! 😊";
  } else if (cleaned.includes("bye")) {
    response = "Goodbye! Come chat anytime.";
  } else if (cleaned.includes("your name")) {
    response = "You can call me ChatMate.";
  } else {
    response = "I'm still learning, but I'll do my best to help!";
  }

  setTimeout(() => addMessage("bot", response), 600);
}
