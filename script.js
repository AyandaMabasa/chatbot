const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const scrollArrow = document.getElementById("scroll-arrow");

// Auto-scroll arrow visibility
chatLog.addEventListener("scroll", () => {
  scrollArrow.style.display = chatLog.scrollTop + chatLog.clientHeight < chatLog.scrollHeight ? "block" : "none";
});

scrollArrow.addEventListener("click", () => {
  chatLog.scrollTop = chatLog.scrollHeight;
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;
  message.innerText = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  appendMessage("bot", "Typing...");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
    
    document.querySelector(".bot-message:last-child").remove(); // remove "Typing..."
    appendMessage("bot", reply.trim());
  } catch (error) {
    document.querySelector(".bot-message:last-child").remove();
    appendMessage("bot", "Error: Unable to connect. Please try again later.");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});


