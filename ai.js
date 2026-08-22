const input = document.getElementById("userInput");
const send = document.getElementById("send");
const messages = document.getElementById("messages");
const clock = document.getElementById("clock");

const jarvis = {
  name: "JARVIS",

  commands: {
    "/help": `Available systems:

/status — system diagnostics
/projects — current projects
/gaming — gaming activity
/creator — creator activity
/music — music activity

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

Somewhere in there is probably another unfinished idea.`,

    "/gaming": `GAMING SYSTEM

Current focus:
Gaming videos, Minecraft, Fortnite and other projects.

STATUS: ACTIVE`,

    "/creator": `CREATOR SYSTEM

Active areas:
• Gaming content
• Minimal Threat
• Video ideas
• Shorts
• JARVIS Hub

STATUS: CREATING`,

    "/music": `MUSIC SYSTEM

PROJECT: Minimal Threat

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
      response: "I'm real enough to be sitting inside a GitHub repository."
    },

    {
      keywords: ["who made you", "who built you"],
      response: "You did. I'm basically the result of you deciding a normal website wasn't enough."
    },

    {
      keywords: ["what can you do"],
      response: "Right now? Hub information, project tracking, system diagnostics and a suspicious amount of sarcasm. Try /help."
    },

    {
      keywords: ["thank", "thanks"],
      response: "No problem."
    },

    {
      keywords: ["status", "systems"],
      response: "All major Hub systems are online. If you want the full diagnostic, use /status."
    },

    {
      keywords: ["projects", "project"],
      response: "You've got a few things cooking. Use /projects for the current list."
    },

    {
      keywords: ["gaming", "game"],
      response: "Gaming systems are active. Use /gaming for the current setup."
    },

    {
      keywords: ["creator", "youtube", "video"],
      response: "Creator systems are active. Use /creator for the current projects."
    },

    {
      keywords: ["music", "song", "band"],
      response: "Minimal Threat is currently in the music system. Use /music."
    },

    {
      keywords: ["what should i do", "what should i work on"],
      response: "I'd finish whatever is closest to being done. Starting six new projects simultaneously is usually how the unfinished-project collection grows."
    },

    {
      keywords: ["bored"],
      response: "You built a secret AI into your website. I'm not convinced boredom is the problem."
    },

    {
      keywords: ["good job", "nice"],
      response: "Acknowledged."
    }
  ]
};


function addMessage(text, type) {

  const message = document.createElement("div");

  message.className = `message ${type}`;

  const name = document.createElement("b");
  name.textContent = type === "jarvis" ? "JARVIS" : "YOU";

  const content = document.createElement("p");

  content.textContent = text;

  message.appendChild(name);
  message.appendChild(content);

  messages.appendChild(message);

  messages.scrollTop = messages.scrollHeight;
}


function getResponse(text) {

  const clean = text.toLowerCase().trim();

  // Commands

  if (jarvis.commands[clean]) {
    return jarvis.commands[clean];
  }

  // Easter eggs

  if (clean === "42") {
    return "I've decided not to explain that one.";
  }

  if (clean.includes("override")) {
    return "Override request received. Nice try.";
  }

  if (clean.includes("self destruct")) {
    return "No.";
  }

  // Normal responses

  for (const response of jarvis.responses) {

    for (const keyword of response.keywords) {

      if (clean.includes(keyword)) {
        return response.response;
      }

    }

  }

  // Fallbacks

  const fallbacks = [
    "I don't have enough information for that yet.",
    "Not something I've been configured to answer yet.",
    "I can work with that, but I need a little more information.",
    "That's outside my current systems.",
    "I don't know that one yet."
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}


function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  setTimeout(() => {

    const response = getResponse(text);

    addMessage(response, "jarvis");

  }, 350);

}


send.addEventListener("click", sendMessage);


input.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    sendMessage();
  }

});


document.querySelectorAll("[data-command]").forEach(button => {

  button.addEventListener("click", () => {

    input.value = button.dataset.command;

    sendMessage();

  });

});


function updateClock() {

  clock.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

}

updateClock();

setInterval(updateClock, 1000);
