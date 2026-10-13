export const chatDemoData = {
  label: "AI VOICE AGENTS",
  heading: "We build AI voice agents that answer, qualify, and book, 24/7.",
  mutedLine:
    "Never miss a lead again. Your AI agent talks to every caller like your best salesperson.",
  header: {
    name: "GrowElite Voice AI",
    status: "Live",
    avatar: "/logo-mark.png",
  },
  channelsBadge: "Voice • Chat • WhatsApp",
  floatingChips: [
    { id: 1, text: "Answers calls 24/7", position: "left-top" },
    { id: 2, text: "Books appointments automatically", position: "right-top" },
    { id: 3, text: "Syncs with your CRM", position: "right-bottom" },
  ],
  callOverlay: {
    name: "GrowElite Voice AI",
    avatar: "/logo-mark.png",
    caption: "Hello! This is Ava from GrowElite, am I speaking with ...?",
    durationSeconds: 3,
  },
  messages: [
    {
      id: 1,
      role: "human",
      text: "We lose a lot of leads because nobody picks up calls after 6 PM.",
    },
    {
      id: 2,
      role: "ai",
      text: "That's exactly what we fix. We build a custom AI voice agent that answers every call, in your brand's voice.",
    },
    {
      id: 3,
      role: "human",
      text: "Can it really talk like a human?",
    },
    {
      id: 4,
      role: "ai",
      type: "voice",
      duration: "0:08",
      text: "Hi, thanks for calling Glow Skincare! I'm Ava. Are you looking to order, or book a consultation?",
    },
    {
      id: 5,
      role: "human",
      text: "Wow. What else can it do?",
    },
    {
      id: 6,
      role: "ai",
      text: "It qualifies leads, answers FAQs, books appointments in your calendar, and sends every lead straight to your CRM.",
    },
    {
      id: 7,
      role: "human",
      text: "How long does it take to set up?",
    },
    {
      id: 8,
      role: "ai",
      text: "We build and train it on your business in about 2 weeks. Want a live demo call?",
    },
    {
      id: 9,
      role: "human",
      text: "Yes!",
    },
    {
      id: 10,
      role: "ai",
      text: "Done ✓ Your demo is booked. Our voice agent will call you tomorrow at 11:00 AM.",
    },
  ],
};
