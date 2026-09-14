// chat.js
// Handles the AI chatbot on contact.html: sending user messages to the
// OpenAI Chat Completions API and rendering the conversation.
//
// Structure verified directly against Figma's three chat states
// (start / conversation / error, component node 7046:505):
//   - start:        greeting bubble only, empty input
//   - conversation: "Fram" label sits OUTSIDE the message bubble, bot
//                    bubble is pill-shaped (24px radius), user bubble
//                    is a 12px-radius rounded rectangle
//   - error:        a persistent red banner above the input row reading
//                    "Failed to connect. Wait and try again later." —
//                    not a button inside the message list
//
// Uses async/await for the API call and try/catch for error handling,
// as required by the project brief (asynchronous JavaScript + API
// error handling with user feedback).

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT =
  "You are the Fram assistant, a friendly helper for a sustainable food " +
  "delivery webshop connecting customers with fresh produce from local " +
  "Norwegian farms. Answer questions about the service, products, " +
  "delivery, and sustainability. Keep answers short and friendly.";

// Kept in memory only — chat history is not persisted between page loads.
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let activeController = null; // for aborting a request via the "stop" button

/**
 * Renders one chat bubble into the message list.
 * @param {"bot"|"user"} sender
 * @param {string} text
 */
const appendMessage = (sender, text) => {
  const list = document.getElementById("chat-messages");
  if (!list) return;

  const item = document.createElement("li");
  item.className = `chat-message chat-message--${sender}`;

  if (sender === "bot") {
    item.innerHTML = `
      <span class="chat-message__label">Fram</span>
      <span class="chat-message__bubble">${text}</span>
    `;
  } else {
    item.innerHTML = `<span class="chat-message__bubble">${text}</span>`;
  }

  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
};

/**
 * Shows the "Fram is typing" indicator (label + animated dots).
 * Returns a function that removes it again.
 */
const showTypingIndicator = () => {
  const list = document.getElementById("chat-messages");
  const item = document.createElement("li");
  item.className = "chat-typing";
  item.innerHTML = `
    <span class="chat-message__label">Fram</span>
    <span class="chat-typing__dots"><span></span><span></span><span></span></span>
  `;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
  return () => item.remove();
};

/** Shows/hides the persistent error banner above the input row. */
const setErrorVisible = (visible) => {
  document.getElementById("chat-error").classList.toggle("chat-error--visible", visible);
};

/** Toggles the send button between its "send" and "stop" states. */
const setSendButtonState = (isLoading) => {
  const btn = document.getElementById("chat-send-btn");
  btn.disabled = false; // knappen forblir klikkbar, men skifter funksjon
  btn.innerHTML = isLoading
    ? `<span aria-hidden="true">✕</span>`
    : `<span aria-hidden="true">↑</span>`;
  btn.setAttribute("aria-label", isLoading ? "Stop generating response" : "Send message");
  btn.dataset.mode = isLoading ? "stop" : "send";
};

/**
 * Sends a message to the OpenAI API and renders the response.
 * Handles missing/placeholder API keys and network/API errors gracefully,
 * always giving the user visible feedback instead of failing silently.
 * @param {string} userText
 */
const sendMessage = async (userText) => {
  if (!userText.trim()) return;

  setErrorVisible(false);
  appendMessage("user", userText);
  conversationHistory.push({ role: "user", content: userText });

  const removeTyping = showTypingIndicator();
  setSendButtonState(true);
  activeController = new AbortController();

  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
      throw new Error("Missing API key");
    }

    const response = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: conversationHistory,
      }),
      signal: activeController.signal,
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Empty response from API");
    }

    removeTyping();
    appendMessage("bot", reply);
    conversationHistory.push({ role: "assistant", content: reply });
  } catch (error) {
    if (error.name === "AbortError") {
      console.info("Chat request stopped by user.");
    } else {
      console.error("Chat request failed:", error);
      removeTyping();
      setErrorVisible(true);
    }
  } finally {
    setSendButtonState(false);
    activeController = null;
  }
};

/**
 * Wires up the chat input: the send button either sends the current
 * message or, while a response is loading, aborts it (matching the
 * Figma button/chat/send "stop" state).
 */
const initChat = () => {
  const panel = document.getElementById("chat-panel");
  if (!panel) return; // ikke på contact.html — ikke gjør noe

  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");

  sendBtn.addEventListener("click", () => {
    if (sendBtn.dataset.mode === "stop") {
      activeController?.abort();
      return;
    }
    const text = input.value;
    input.value = "";
    sendMessage(text);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (sendBtn.dataset.mode !== "stop") {
        const text = input.value;
        input.value = "";
        sendMessage(text);
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", initChat);
