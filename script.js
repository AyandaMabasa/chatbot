const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";
  userInput.focus();

  appendMessage("bot", "...");

  const reply = await fetchChatGPTResponse(input);

  removeLastBotMessage();
  appendMessage("bot", reply);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}-message`;
  msg.innerText = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeLastBotMessage() {
  const messages = document.querySelectorAll(".bot-message");
  if (messages.length > 0) {
    messages[messages.length - 1].remove();
  }
}

async function fetchChatGPTResponse(userMessage) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Only respond to what the user asks without mentioning internships, personal context, or unrelated topics."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
  } catch (err) {
    return "Error fetching response. Please check your internet or API key.";
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});


