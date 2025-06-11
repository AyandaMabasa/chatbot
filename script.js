const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", `${sender}-message`);
  message.textContent = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(input) {
  const msg = input.toLowerCase();

  if (msg.includes("your name")) return "I'm a virtual assistant developed for demonstration purposes.";
  if (msg.includes("who made you") || msg.includes("who created you")) return "I was developed by Ayanda Mabasa.";
  if (msg.includes("how are you")) return "I'm operating normally. How may I assist you today?";
  if (msg.includes("what can you do") || msg.includes("help")) return "I can simulate smart replies, answer simple queries, and demonstrate assistant behavior.";
  if (msg.includes("thank")) return "You're welcome.";
  if (msg.includes("bye")) return "Goodbye. Reach out if you need further assistance.";

  if (msg.endsWith("?")) return "That's a good question. I'm processing such queries more intelligently soon.";
  return "I'm currently limited to pre-defined topics. Please try asking about what I can do.";
}

function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(input);
    appendMessage("bot", response);
  }, 600);
}

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage();
});


