// ─────────────────────────────────────────────────────────────
//  CHATBOT CONFIGURATION — edit this file to customise the bot
// ─────────────────────────────────────────────────────────────

export const botConfig = {
  name: 'Wylb Assistant',
  welcomeMessage: "Hi there! 👋 I'm the Wylb Perspective assistant. How can I help you today?",
  fallback: "I'm not sure about that one. For detailed inquiries please reach out to us directly at info@wylbperspective.com — we'd love to hear from you!",
}

export const companyInfo = {
  name: 'Wylb Perspective',
  tagline: 'Where Stories Come to Life',
  description: 'Wylb Perspective is a creative media and photography studio based in Canada. We specialise in photography, videography, documentary work, and visual storytelling for individuals and brands.',
  location: 'Toronto, Canada',
  email: 'info@wylbperspective.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  // Used as context for the AI system prompt
  systemPrompt: `You are a helpful assistant for Wylb Perspective, a Canadian photography and media studio based in Toronto.
The studio offers portrait photography, wedding photography, commercial photography, documentary work, and videography.
The website has a gallery section, photographer profiles (Sarah Mitchell, James Okafor, Priya Nair), and a tech section showcasing camera equipment.
Users can contact the studio via email at info@wylbperspective.com or through the contact form on the website.
Always be friendly, concise (2-3 sentences max), and professional. If unsure, direct users to the contact page.
Always reply in the same language the user writes in. If they write in French, reply in French. If they write in Spanish, reply in Spanish.`,
}

// Each FAQ entry has keywords (matched against user input) and an answer
export const faqs = [
  {
    keywords: ['service', 'offer', 'provide', 'what do you do', 'speciali'],
    answer: 'We offer portrait photography, wedding photography, commercial photography, documentary work, videography, and visual storytelling. Whether you\'re an individual or a brand — we bring your story to life. Visit our gallery to see our work!',
  },
  {
    keywords: ['contact', 'reach', 'email', 'get in touch', 'talk', 'message'],
    answer: 'You can reach us at info@wylbperspective.com or scroll down to the Contact section at the bottom of our homepage. We typically respond within 24 hours.',
  },
  {
    keywords: ['gallery', 'portfolio', 'photo', 'work', 'see', 'view', 'show'],
    answer: 'Our portfolio is in the Media section on the homepage — click the "Latest Media" tab. You can also browse our Photos, Videos, Events, and Art sections from the navigation menu.',
  },
  {
    keywords: ['book', 'hire', 'request', 'appointment', 'session', 'schedule', 'enquir'],
    answer: 'To book a session or request more information, head to the Contact section at the bottom of the page and fill out the form, or email us directly at info@wylbperspective.com. We\'ll get back to you quickly!',
  },
  {
    keywords: ['event', 'project', 'past', 'completed', 'previous', 'experience'],
    answer: 'Our photographers have worked on projects including wedding collections, urban portrait series, fashion week, documentary series, and brand campaigns. Visit a photographer\'s profile on our site to see their full project list.',
  },
  {
    keywords: ['about', 'company', 'who are', 'background', 'story', 'studio'],
    answer: 'Wylb Perspective is a Canadian media and photography studio. Our mission is to tell compelling visual stories — from intimate portraits to large-scale commercial productions. We\'re based in Toronto, Canada.',
  },
  {
    keywords: ['photographer', 'team', 'staff', 'crew', 'artist', 'professional'],
    answer: 'Our team includes Sarah Mitchell (Portrait & Wedding), James Okafor (Documentary & Street), and Priya Nair (Fashion & Commercial). Click on any photographer card in the Photographers tab to view their full profile.',
  },
  {
    keywords: ['tech', 'equipment', 'camera', 'gear', 'lens', 'kit'],
    answer: 'Our Tech section showcases the cameras and gear we use — including Sony A7 IV, Canon EOS R5, Leica M6, and more. Click the "Tech" tab in the Media section to explore each item in detail.',
  },
  {
    keywords: ['location', 'where', 'based', 'city', 'canada', 'toronto'],
    answer: 'We\'re based in Toronto, Canada, with photographers also located in Vancouver and Montreal. We travel for projects as well — just reach out to discuss your needs.',
  },
  {
    keywords: ['price', 'cost', 'rate', 'how much', 'fee', 'package', 'budget'],
    answer: 'Pricing varies depending on the type of shoot, duration, and deliverables. Contact us at info@wylbperspective.com with details about your project and we\'ll provide a personalised quote.',
  },
  {
    keywords: ['language', 'french', 'français', 'anglais', 'bilingual'],
    answer: 'Our website supports both English and French! Use the EN | FR toggle in the bottom-right corner of the screen to switch languages at any time.',
  },
]

export const quickQuestions = [
  'What services do you offer?',
  'How can I contact you?',
  'Where is the gallery?',
  'How do I book a session?',
]
