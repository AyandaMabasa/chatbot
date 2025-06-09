const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(input) {
  const msg = input.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello! How can I help you today?";
  } else if (msg.includes("your name")) {
    return "I'm your friendly chatbot!";
  } else if (msg.includes("help")) {
    return "You can say hello, ask my name, or type 'bye'.";
  } else if (msg.includes("bye")) {
    return "Goodbye! 👋";
  } else {
    return "I'm not sure how to respond to that.";
  }
}

sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (input === "") return;

  appendMessage("user", input);
  const response = botReply(input);
  setTimeout(() => appendMessage("bot", response), 500);

  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

