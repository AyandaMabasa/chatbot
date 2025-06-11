const API_KEY = "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";
const MODEL = "openai/gpt-3.5-turbo";

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatLog = document.getElementById("chat-log");
const scrollArrow = document.getElementById("scroll-arrow");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

scrollArrow.addEventListener("click", () => {
  chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: "smooth" });
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message, "user-message");
  userInput.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    console.log("API Response:", data);

    const reply = data.choices?.[0]?.message?.content || data.error?.message || "Sorry, I couldn't understand that.";
    appendMessage("Bot", reply, "bot-message");
  } catch (error) {
    console.error("API Error:", error);
    appendMessage("Bot", "Error: Something went wrong.", "bot-message");
  }
}

function appendMessage(sender, text, className) {
  const msg = document.createElement("div");
  msg.className = `message ${className}`;
  msg.textContent = text;
  chatLog.appendChild(msg);
  setTimeout(() => {
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 100);
}

