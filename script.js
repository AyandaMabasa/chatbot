const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const scrollArrow = document.getElementById("scroll-arrow");

// Scroll button logic
chatLog.addEventListener("scroll", () => {
  scrollArrow.style.display = chatLog.scrollTop > 100 ? "block" : "none";
});
scrollArrow.addEventListener("click", () => {
  chatLog.scrollTop = chatLog.scrollHeight;
});

// Add message to chat
function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `message ${role}-message`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle user message
async function handleUserMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  appendMessage("bot", "Thinking...");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
      })
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
    
    chatLog.lastChild.remove(); // remove 'Thinking...'
    appendMessage("bot", reply);
  } catch (err) {
    chatLog.lastChild.remove();
    appendMessage("bot", "Something went wrong. Please try again.");
  }
}

// Event listeners
sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage();
});


