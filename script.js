const apiKey = "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";
const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;
  message.textContent = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(message) {
  appendMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
    appendMessage("bot", reply.trim());
  } catch (error) {
    appendMessage("bot", "An error occurred. Please try again later.");
    console.error("Error:", error);
  }
}

sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) getBotResponse(message);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const message = userInput.value.trim();
    if (message) getBotResponse(message);
  }
});

