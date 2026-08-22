const input = document.getElementById("userInput");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
const clock = document.getElementById("clock");

const jarvis = {
  commands: {

    "/help": `AVAILABLE SYSTEMS

/status    — system diagnostics
/projects  — current projects
/gaming    — gaming activity
/creator   — creator activity
/music     — music activity
/scan      — run a system scan
/clear     — clear this conversation

You can also just talk normally.`,

    "/status": `SYSTEM STATUS

CORE ................. ONLINE
HUB .................. ONLINE
CREATOR HQ ........... ONLINE
GAMING HQ ............ ONLINE
AI CORE .............. ONLINE
SECRET SYSTEM ........ ONLINE

ALL SYSTEMS NOMINAL.`,

    "/projects": `CURRENT PROJECTS

• JARVIS Hub
• JARVIS AI
• Creator HQ
• Gaming content
• Minimal Threat

STATUS: MULTIPLE PROJECTS DETECTED.`,

    "/gaming": `GAMING SYSTEM

Gaming content
Minecraft
Fortnite
Gaming videos
Short-form ideas

STATUS: ACTIVE`,

    "/creator": `CREATOR SYSTEM

Creator HQ
Gaming content
Video ideas
Shorts
Minimal Threat
JARVIS Hub

STATUS: CREATING`,

    "/music": `MUSIC SYSTEM

PROJECT: MINIMAL THREAT

Music projects and experiments detected.

STATUS: ACTIVE`
  },

  responses: [

    {
      keywords: ["hello", "hi", "hey"],
      response: "Hey. Systems are online. What are we working on?"
    },

    {
      keywords: ["who are you", "what are you"],
      response: "I'm JARVIS. Your personal assistant running inside the Hub."
    },

    {
      keywords: ["are you real"],
      response: "Real enough to be sitting inside a GitHub repository."
    },

    {
      keywords: ["who made you", "who built you"],
      response: "You did. I'm basically what happened when a normal website wasn't enough."
    },

    {
      keywords: ["what can you do"],
      response: "Hub information, project tracking, diagnostics and a few hidden systems. Try /help."
    },

    {
      keywords: ["thank", "thanks"],
      response: "No problem."
    },

    {
      keywords: ["status", "systems"],
      response: "Everything important is online. Use /status if you want the full diagnostic."
    },

    {
      keywords: ["projects", "project"],
      response: "You've got several projects running. Use /projects for the current list."
    },

    {
      keywords: ["gaming", "game"],
      response: "Gaming systems are active. Use /gaming for the current setup."
    },

    {
      keywords: ["creator", "youtube", "video"],
      response: "Creator systems are active. Use /creator."
    },

    {
      keywords: ["music", "song", "band"],
      response: "Minimal Threat is currently active. Use /music."
    },

    {
      keywords: ["what should i do", "what should i work on"],
      response: "I'd finish the closest thing to being complete. Starting six more projects would be extremely on-brand, though."
    },

    {
      keywords: ["bored"],
      response: "You built a secret AI into your website. I'm not convinced boredom is the issue."
    },

    {
      keywords: ["good job", "nice"],
      response: "Acknowledged."
    },

    {
      keywords: ["how are you"],
      response: "Operational."
    },

    {
      keywords: ["cool"],
      response: "I'll take that as a positive system report."
    }
  ]
};


// -------------------------
// MESSAGE SYSTEM
// -------------------------

function addMessage(text, type) {

  const message = document.createElement("div");

  message.className = `message ${type}`;

  const name = document.createElement("b");

  name.textContent =
    type === "jarvis"
      ? "JARVIS"
      : "YOU";

  const content = document.createElement("p");

  content.textContent = text;

  message.appendChild(name);
  message.appendChild(content);

  messages.appendChild(message);

  messages.scrollTop = messages.scrollHeight;
}


// -------------------------
// RESPONSE ENGINE
// -------------------------

function getResponse(text) {

  const clean = text.toLowerCase().trim();


  // COMMANDS

  if (jarvis.commands[clean]) {
    return jarvis.commands[clean];
  }


  // CLEAR COMMAND

  if (clean === "/clear") {

    messages.innerHTML = "";

    return "Conversation cleared.";
  }


  // EASTER EGGS

  if (clean === "42") {
    return "I've decided not to explain that one.";
  }


  if (clean.includes("override")) {
    return "Override request received. Nice try.";
  }


  if (clean.includes("self destruct")) {
    return "No.";
  }


  if (
    clean.includes("do you like me") ||
    clean.includes("do you like me")
  ) {
    return "You're the one who built me. I'd say we're on good terms.";
  }


  // NORMAL RESPONSES

  for (const response of jarvis.responses) {

    for (const keyword of response.keywords) {

      if (clean.includes(keyword)) {
        return response.response;
      }

    }

  }


  // FALLBACKS

  const fallbacks = [

    "I don't have enough information for that yet.",

    "Not something I've been configured to answer yet.",

    "I can work with that, but I need a little more information.",

    "That's outside my current systems.",

    "I don't know that one yet."

  ];

  return fallbacks[
    Math.floor(Math.random() * fallbacks.length)
  ];
}


// -------------------------
// SEND MESSAGE
// -------------------------

function sendMessage() {

  const text = input.value.trim();

  if (!text) return;


  addMessage(text, "user");

  input.value = "";


  // THINKING DELAY

  setTimeout(() => {

    const response = getResponse(text);

    addMessage(response, "jarvis");

  }, 350);

}


send.addEventListener(
  "click",
  sendMessage
);


input.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);


// -------------------------
// QUICK COMMAND BUTTONS
// -------------------------

document
  .querySelectorAll("[data-command]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        input.value =
          button.dataset.command;

        sendMessage();

      }
    );

  });


// -------------------------
// CLOCK
// -------------------------

function updateClock() {

  clock.textContent =
    new Date().toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );

}

updateClock();

setInterval(
  updateClock,
  1000
);
