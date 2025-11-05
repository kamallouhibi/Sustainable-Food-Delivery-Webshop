// Newsletter validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      if (!name || !email) return alert("Please fill in all fields.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
        return alert("Please enter a valid email address.");
      alert(`Thanks ${name}, you're subscribed!`);
      form.reset();
    });
  }
});

// Chatbot popup logic
const chatPopup = document.getElementById("chatPopup");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");

openChat.addEventListener("click", () => chatPopup.classList.add("open"));
closeChat.addEventListener("click", () => chatPopup.classList.remove("open"));

// Chatbot AI logic
const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const API_KEY = "YOUR_OPENAI_API_KEY"; // replace later

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  userInput.value = "";

  const loading = appendMessage("bot", "...");
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are FRAM, a friendly AI assistant for a sustainable Norwegian food delivery service.",
          },
          { role: "user", content: userText },
        ],
      }),
    });

    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    loading.remove();
    appendMessage("bot", data.choices[0].message.content);
  } catch {
    loading.remove();
    appendMessage("bot", "⚠️ Connection error. Please try again later.");
  }
});

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", role);
  msg.textContent = role === "bot" ? `FRAM: ${text}` : text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}