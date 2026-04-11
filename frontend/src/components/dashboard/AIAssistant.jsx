import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, ChevronDown, Bot, Loader2 } from 'lucide-react';

// Age group configs
const AGE_CONFIG = {
  toddler: {
    range: '3–5',
    color: '#00C9B1',
    bg: 'linear-gradient(135deg, #00C9B1 0%, #00B4D8 100%)',
    cardBg: '#E6FAF8',
    accent: '#00C9B1',
    emoji: '🌟',
    name: 'Buddy',
    greeting: "Hi there! I'm Buddy! 🌟 Let's make a super fun week for you! First, how old are you?",
    inputPlaceholder: "Type your answer here...",
    questions: [
      { id: 'age', text: "How old are you? 🎂", key: 'age' },
      { id: 'fav_activity', text: "What do you love doing the most? Playing outside, drawing, or singing? 🎨", key: 'favActivity' },
      { id: 'sleep', text: "What time do you go to sleep at night? 😴", key: 'sleepTime' },
      { id: 'learning', text: "Do you like learning new things? Like counting or learning ABCs? 🔤", key: 'learningPref' },
      { id: 'friend', text: "Do you have a favorite toy or friend you play with? 🧸", key: 'favToy' },
    ]
  },
  youngLearner: {
    range: '6–9',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    cardBg: '#F5F0FF',
    accent: '#7C3AED',
    emoji: '🚀',
    name: 'Nova',
    greeting: "Hey there! I'm Nova 🚀 — your learning buddy! Tell me a bit about yourself so I can build your perfect week. How old are you?",
    inputPlaceholder: "Write your answer...",
    questions: [
      { id: 'age', text: "How old are you? 🎂", key: 'age' },
      { id: 'fav_subject', text: "What's your favorite subject at school? Math, Reading, Science, or Art? 📚", key: 'favSubject' },
      { id: 'after_school', text: "What do you love doing after school? Sports, games, reading, or drawing? ⚽", key: 'afterSchool' },
      { id: 'challenge', text: "Is there anything you find difficult or want to get better at? 💪", key: 'challenge' },
      { id: 'screen_time', text: "How much time do you spend on screens (TV, tablet, phone) each day? 📱", key: 'screenTime' },
    ]
  },
  explorer: {
    range: '10–12',
    color: '#1D4ED8',
    bg: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)',
    cardBg: '#EFF6FF',
    accent: '#1D4ED8',
    emoji: '⚡',
    name: 'Apex',
    greeting: "What's up! I'm Apex ⚡ — your AI planner. Answer a few quick questions and I'll generate a personalized weekly plan that actually fits your life. Age first?",
    inputPlaceholder: "Your answer...",
    questions: [
      { id: 'age', text: "How old are you? 🎂", key: 'age' },
      { id: 'goals', text: "What are your top goals right now? (academics, sports, hobbies, social skills?) 🎯", key: 'goals' },
      { id: 'study_style', text: "How do you prefer to study or learn? Videos, reading, hands-on, or group work? 📖", key: 'studyStyle' },
      { id: 'extracurricular', text: "What activities or sports are you involved in outside school? 🏅", key: 'extracurricular' },
      { id: 'sleep_schedule', text: "What time do you usually wake up and sleep? And how much homework do you typically get? 📅", key: 'schedule' },
    ]
  }
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

async function callGroqAPI(messages, ageGroup) {
  const systemPrompt = ageGroup === 'toddler'
    ? `You are Buddy, a warm and playful AI assistant for toddlers (ages 3-5). Create a simple, colorful, fun weekly plan. Use lots of emojis, very simple language, short sentences. Break each day into Morning Play, Afternoon Activity, and Bedtime Routine. Keep it joyful and encouraging. Format the plan clearly with day names and simple bullet points.`
    : ageGroup === 'youngLearner'
    ? `You are Nova, an enthusiastic AI learning companion for kids aged 6-9. Generate an engaging weekly plan that balances school, play, learning activities, and rest. Use friendly language, emojis, and organize each day with School/Study time, Active play, Creative activity, and Relaxation. Be encouraging and age-appropriate.`
    : `You are Apex, a cool and efficient AI planner for tweens aged 10-12. Create a structured weekly plan that includes academics, physical activity, social time, hobbies, and personal development. Use a modern tone, be concise and practical. Organize by day with time blocks. Include goal-setting tips and motivational notes.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.75,
      max_tokens: 1200,
    }),
  });

  if (!response.ok) throw new Error(`Groq API error: ${response.status}`);
  const data = await response.json();
  return data.choices[0]?.message?.content || 'Could not generate plan.';
}

// Parse AI plan text into structured day blocks
function parsePlan(text) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sections = [];
  let currentDay = null;
  let currentLines = [];

  text.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const dayFound = days.find(d => trimmed.toLowerCase().includes(d.toLowerCase()));
    if (dayFound) {
      if (currentDay) sections.push({ day: currentDay, content: currentLines });
      currentDay = dayFound;
      currentLines = [];
    } else if (currentDay) {
      currentLines.push(trimmed.replace(/^[•\-*]\s*/, '').replace(/^\*\*/, '').replace(/\*\*$/, ''));
    }
  });
  if (currentDay) sections.push({ day: currentDay, content: currentLines });
  return sections.length > 0 ? sections : null;
}

const PlanDisplay = ({ plan, config }) => {
  const parsed = parsePlan(plan);
  const [expanded, setExpanded] = useState(0);

  if (!parsed) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.25rem',
        marginTop: '0.75rem',
        border: `1px solid ${config.color}30`,
        whiteSpace: 'pre-wrap',
        fontSize: '0.85rem',
        color: '#374151',
        lineHeight: '1.7'
      }}>
        {plan}
      </div>
    );
  }

  return (
    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {parsed.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          style={{
            background: 'white',
            borderRadius: '14px',
            border: `1px solid ${config.color}25`,
            overflow: 'hidden'
          }}
        >
          <div
            onClick={() => setExpanded(expanded === i ? -1 : i)}
            style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              background: expanded === i ? `${config.color}12` : 'transparent',
              transition: 'background 0.2s'
            }}
          >
            <span style={{ fontWeight: '700', fontSize: '0.88rem', color: config.color }}>
              {section.day}
            </span>
            <ChevronDown
              size={15}
              style={{
                color: config.color,
                transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s'
              }}
            />
          </div>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ padding: '0.75rem 1rem', paddingTop: '0.25rem', borderTop: `1px solid ${config.color}15` }}>
                  {section.content.map((line, j) => (
                    line.trim() && (
                      <div key={j} style={{
                        display: 'flex',
                        gap: '0.5rem',
                        padding: '0.3rem 0',
                        fontSize: '0.82rem',
                        color: '#4B5563',
                        borderBottom: j < section.content.length - 1 ? '1px solid #F3F4F6' : 'none'
                      }}>
                        <span style={{ color: config.color, fontWeight: '700', flexShrink: 0 }}>›</span>
                        <span>{line}</span>
                      </div>
                    )
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const TypingDots = ({ color }) => (
  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.5rem 0' }}>
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
        style={{ width: '7px', height: '7px', borderRadius: '50%', background: color }}
      />
    ))}
  </div>
);

const AIAssistant = ({ ageGroup = 'toddler', childName = 'there' }) => {
  const config = AGE_CONFIG[ageGroup];
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState('questions'); // 'questions' | 'plan'
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: config.greeting }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput('');

    const q = config.questions[currentQ];
    const newAnswers = { ...answers, [q.key]: userText };
    setAnswers(newAnswers);

    setMessages(prev => [...prev, { type: 'user', text: userText }]);

    const nextQ = currentQ + 1;

    if (nextQ < config.questions.length) {
      setCurrentQ(nextQ);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: config.questions[nextQ].text }]);
      }, 600);
    } else {
      // Generate plan
      setPhase('plan');
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: ageGroup === 'toddler'
            ? "Yay! I have all I need! 🎉 Making your special week plan right now..."
            : ageGroup === 'youngLearner'
            ? "Awesome! I've got everything I need! 🌈 Generating your personalized plan..."
            : "Perfect. Generating your optimized weekly plan now... ⚡"
        }]);
      }, 400);

      try {
        const answerSummary = Object.entries(newAnswers)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');

        const groqMessages = [
          { role: 'user', content: `Child profile:\nName: ${childName}\nAge group: ${ageGroup}\n${answerSummary}\n\nGenerate a complete personalized 7-day weekly plan for this child. Include specific activities, times, and age-appropriate recommendations for each day.` }
        ];

        const result = await callGroqAPI(groqMessages, ageGroup);
        setPlan(result);
        setMessages(prev => [...prev, { type: 'plan', text: result }]);
      } catch (err) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: "Hmm, I had a small hiccup generating your plan. Please check your GROQ API key and try again! 🔧"
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setPhase('questions');
    setCurrentQ(0);
    setAnswers({});
    setMessages([{ type: 'bot', text: config.greeting }]);
    setPlan(null);
  };

  const progressPct = ((currentQ) / config.questions.length) * 100;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '62px',
              height: '62px',
              borderRadius: '50%',
              background: config.bg,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${config.color}55`,
              zIndex: 9999,
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <Sparkles size={22} color="white" />
            <span style={{ fontSize: '0.5rem', color: 'white', fontWeight: '800', letterSpacing: '0.05em' }}>
              AI PLAN
            </span>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: `2px solid ${config.color}`,
                pointerEvents: 'none'
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '380px',
              maxHeight: '620px',
              background: '#FAFAFA',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9999,
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            {/* Header */}
            <div style={{
              background: config.bg,
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem',
                  backdropFilter: 'blur(4px)'
                }}>
                  {config.emoji}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: '800', fontSize: '0.95rem' }}>
                    {config.name} <span style={{ fontWeight: '400', opacity: 0.85 }}>· AI Planner</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem' }}>
                    Ages {config.range} · Personalized Weekly Plans
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {plan && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      padding: '0.3rem 0.6rem',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: '700'
                    }}
                  >
                    New Plan
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '28px', height: '28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'white'
                  }}
                >
                  <X size={14} />
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            {phase === 'questions' && (
              <div style={{ height: '3px', background: '#E5E7EB', flexShrink: 0 }}>
                <motion.div
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ height: '100%', background: config.bg, borderRadius: '0 2px 2px 0' }}
                />
              </div>
            )}

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              scrollbarWidth: 'thin',
              scrollbarColor: `${config.color}40 transparent`
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.type === 'user' ? (
                    <div style={{
                      alignSelf: 'flex-end',
                      marginLeft: 'auto',
                      background: config.bg,
                      color: 'white',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '0.65rem 1rem',
                      maxWidth: '80%',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      boxShadow: `0 2px 8px ${config.color}30`,
                      display: 'inline-block'
                    }}>
                      {msg.text}
                    </div>
                  ) : msg.type === 'plan' ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: config.cardBg, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
                          border: `2px solid ${config.color}30`
                        }}>
                          {config.emoji}
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: '700', color: config.color }}>
                          Your Weekly Plan ✨
                        </span>
                      </div>
                      <PlanDisplay plan={msg.text} config={config} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        background: config.cardBg, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
                        border: `2px solid ${config.color}30`, marginTop: '2px'
                      }}>
                        {config.emoji}
                      </div>
                      <div style={{
                        background: 'white',
                        border: `1px solid ${config.color}20`,
                        borderRadius: '4px 16px 16px 16px',
                        padding: '0.65rem 1rem',
                        maxWidth: '85%',
                        fontSize: '0.875rem',
                        color: '#374151',
                        lineHeight: '1.55',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: config.cardBg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
                    border: `2px solid ${config.color}30`
                  }}>
                    {config.emoji}
                  </div>
                  <div style={{
                    background: 'white',
                    border: `1px solid ${config.color}20`,
                    borderRadius: '4px 16px 16px 16px',
                    padding: '0.65rem 1rem',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                  }}>
                    <TypingDots color={config.color} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {phase === 'questions' && (
              <div style={{
                padding: '0.875rem 1rem',
                borderTop: '1px solid #F3F4F6',
                background: 'white',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                flexShrink: 0
              }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={config.inputPlaceholder}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '0.65rem 1rem',
                    borderRadius: '50px',
                    border: `1.5px solid ${input ? config.color : '#E5E7EB'}`,
                    outline: 'none',
                    fontSize: '0.875rem',
                    background: '#F9FAFB',
                    color: '#1F2937',
                    transition: 'border-color 0.2s'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    background: input.trim() ? config.bg : '#E5E7EB',
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s',
                    flexShrink: 0
                  }}
                >
                  <Send size={16} color="white" />
                </motion.button>
              </div>
            )}

            {/* Plan footer */}
            {phase === 'plan' && !isLoading && (
              <div style={{
                padding: '0.875rem 1rem',
                borderTop: '1px solid #F3F4F6',
                background: 'white',
                display: 'flex',
                gap: '0.5rem',
                flexShrink: 0
              }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '12px',
                    background: config.bg,
                    border: 'none',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
                  }}
                >
                  <Sparkles size={14} /> Generate New Plan
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
export { AGE_CONFIG };
