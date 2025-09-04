const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const responses = [
  { keywords: ["hi", "hello", "hey", "hiya", "hey there"], answers: ["Hello! 😊", "Hey there!", "Hi, how can I help you today?"] },
  { keywords: ["how are you", "how's it going", "how are you doing"], answers: ["I'm just a bot, but I'm doing great! 🤖", "Fantastic, thanks for asking!"] },
  { keywords: ["what is your name"], answers: ["I'm your Chatbot."] },
  { keywords: ["who built you", "who made you"], answers: ["I was built by Ayanda Mabasa!"] },
  { keywords: ["what is ai"], answers: ["AI stands for Artificial Intelligence. It's how machines mimic human intelligence."] },
  { keywords: ["tell me a joke"], answers: ["Why did the computer go to the doctor? It had a virus! 🤣"] },
  { keywords: ["what time is it"], answers: [() => `It's ${new Date().toLocaleTimeString()}`] },
  { keywords: ["what date is it"], answers: [() => `Today is ${new Date().toLocaleDateString()}`] },
  { keywords: ["i'm bored", "bored"], answers: ["Want to hear a joke? Or ask me anything!", "Let's play 20 questions! You start!"] },
  { keywords: ["thank you", "thanks"], answers: ["You're welcome! 🙌", "Anytime!"] },
  { keywords: ["bye", "goodbye", "see you"], answers: ["Goodbye! 👋", "See you later!"] },
  { keywords: ["sure", "okay", "ok"], answers: ["Great! Let's do it!", "Alright, sounds good!"] }
];

const fallbackResponses = [
  "Hmm, I don’t know about that 😅",
  "That’s new to me! 😅",
  "I wish I knew the answer 😅",
  "Could you ask me something else?",
  "Interesting! I’m still learning 😅"
];

function getBotResponse(input) {
  const cleaned = input.toLowerCase();
  for (const item of responses) {
    if (item.keywords.some(keyword => cleaned.includes(keyword))) {
      const response = item.answers[Math.floor(Math.random() * item.answers.length)];
      return typeof response === "function" ? response() : response;
    }
  }
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  chatBox.innerHTML += `<div class="chat-message user"><div class="chat-label">You</div>${input}</div>`;
  const response = getBotResponse(input);
  chatBox.innerHTML += `<div class="chat-message bot"><div class="chat-label">Bot</div>${response}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
  userInput.value = "";
});
