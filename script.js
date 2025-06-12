const API_KEY = "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";

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const scrollTopBtn = document.getElementById("scrollTop");
const themeToggle = document.getElementById("themeToggle");
const micButton = document.getElementById("micButton");

// Initial theme
let isDark = false;
document.body.classList.add("light");

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  document.body.className = isDark ? "dark" : "light";
});

scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
};

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  const reply = await fetchOpenRouter(message);
  addMessage(reply, "bot");
  speakText(reply);
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchOpenRouter(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "(No response)";
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong.";
  }
}

// 🎤 Speech-to-text
micButton.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    chatForm.dispatchEvent(new Event("submit"));
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
  };

  recognition.start();
});

// 🔊 Text-to-speech
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
