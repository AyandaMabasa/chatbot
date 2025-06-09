const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(message) {
  try {
    // Using Brainshop AI (public key, no signup needed)
    const res = await fetch(`https://api.brainshop.ai/get?bid=177029&key=fCT4ZpWc4ZtUMIQ6&uid=1&msg=${encodeURIComponent(message)}`);
    const data = await res.json();
    return data.cnt;
  } catch (error) {
    return "Oops, something went wrong!";
  }
}

sendBtn.addEventListener("click", async () => {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";
  
  const response = await getBotResponse(input);
  appendMessage("bot", response);
});

userInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

