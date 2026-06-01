import { useState, useEffect, useRef } from 'react'
import { botConfig, faqs, quickQuestions, companyInfo } from './ChatbotConfig'

const AI_KEY = import.meta.env.VITE_OPENROUTER_KEY

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function findFaqMatch(input) {
  const lower = input.toLowerCase()
  return faqs.find((faq) => faq.keywords.some((kw) => lower.includes(kw)))
}

async function getAIResponse(userMessage) {
  if (!AI_KEY) return null
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': companyInfo.name,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          { role: 'system', content: companyInfo.systemPrompt },
          { role: 'user',   content: userMessage },
        ],
        max_tokens: 120,
      }),
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || null
  } catch {
    return null
  }
}

async function getBotResponse(userMessage) {
  const faq = findFaqMatch(userMessage)
  if (faq) return faq.answer
  const ai = await getAIResponse(userMessage)
  if (ai) return ai
  return botConfig.fallback
}

export default function Chatbot() {
  const [isOpen,    setIsOpen]    = useState(false)
  const [messages,  setMessages]  = useState([
    { id: 1, role: 'bot', text: botConfig.welcomeMessage, time: new Date() },
  ])
  const [input,     setInput]     = useState('')
  const [isTyping,  setIsTyping]  = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const [unread,    setUnread]    = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return
    setShowQuick(false)
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: text.trim(), time: new Date() }])
    setInput('')
    setIsTyping(true)

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 700))
    const response = await getBotResponse(text)
    setIsTyping(false)
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: response, time: new Date() }])
    if (!isOpen) setUnread((n) => n + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── CHAT WINDOW ──────────────────────────────── */}
      <div className={`cb-window ${isOpen ? 'cb-window--open' : ''}`}>

        {/* Header */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar">W</div>
            <div>
              <div className="cb-bot-name">{botConfig.name}</div>
              <div className="cb-status"><span className="cb-status-dot" /> Online</div>
            </div>
          </div>
          <button className="cb-close" onClick={() => setIsOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`cb-msg cb-msg--${msg.role}`}>
              {msg.role === 'bot' && <div className="cb-msg-avatar">W</div>}
              <div className="cb-bubble">
                <p>{msg.text}</p>
                <span className="cb-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="cb-msg cb-msg--bot">
              <div className="cb-msg-avatar">W</div>
              <div className="cb-typing"><span /><span /><span /></div>
            </div>
          )}

          {/* Quick question chips */}
          {showQuick && !isTyping && (
            <div className="cb-quick">
              {quickQuestions.map((q, i) => (
                <button key={i} className="cb-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="cb-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="cb-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="cb-send" type="submit" disabled={!input.trim() || isTyping}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </form>

        {/* Footer note */}
        <div className="cb-footer-note">Powered by Wylb Perspective AI</div>
      </div>

      {/* ── FLOATING BUTTON ──────────────────────────── */}
      <button className={`cb-fab ${isOpen ? 'cb-fab--open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {unread > 0 && !isOpen && <span className="cb-badge">{unread}</span>}
      </button>
    </>
  )
}
