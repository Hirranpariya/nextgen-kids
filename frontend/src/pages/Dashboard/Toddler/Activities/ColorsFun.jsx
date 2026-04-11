import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/ui/BackButton';
import './ColorsFun.css';

const COLORS = [
  { name: "Red",    hex: "#FF3B3B", emoji: "🍎", bg: "#FF3B3B" },
  { name: "Orange", hex: "#FF8C00", emoji: "🍊", bg: "#FF8C00" },
  { name: "Yellow", hex: "#FFD700", emoji: "🌟", bg: "#FFD700" },
  { name: "Green",  hex: "#3CB371", emoji: "🐸", bg: "#3CB371" },
  { name: "Blue",   hex: "#1E90FF", emoji: "🫐", bg: "#1E90FF" },
  { name: "Purple", hex: "#9B59B6", emoji: "🍇", bg: "#9B59B6" },
  { name: "Pink",   hex: "#FF69B4", emoji: "🌸", bg: "#FF69B4" },
  { name: "Brown",  hex: "#A0522D", emoji: "🐻", bg: "#A0522D" },
];

const ColorsFun = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('learn');
    
    // Match State
    const [matchTargets, setMatchTargets] = useState([]);
    const [matchChips, setMatchChips] = useState([]);
    const [selectedChip, setSelectedChip] = useState(null);
    const [matchCorrectCount, setMatchCorrectCount] = useState(0);
    const [matchResultText, setMatchResultText] = useState('');

    // Paint State
    const [paintColor, setPaintColor] = useState('#FF3B3B');
    const [brushSize, setBrushSize] = useState(8);
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // Quiz State
    const [quizQuestionColor, setQuizQuestionColor] = useState(null);
    const [quizOptions, setQuizOptions] = useState([]);
    const [quizScore, setQuizScore] = useState(0);
    const [quizTotal, setQuizTotal] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState('');
    const [quizAnswered, setQuizAnswered] = useState(false);

    // Audio & FX
    const speak = (text) => {
        if (!window.speechSynthesis) return;
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.85; u.pitch = 1.3;
        speechSynthesis.speak(u);
    };

    const triggerBurst = (emoji) => {
        for (let i = 0; i < 6; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.textContent = emoji || '⭐';
            s.style.cssText = `left:${20+Math.random()*60}%;top:${20+Math.random()*50}%;animation-delay:${Math.random()*0.3}s`;
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 1200);
        }
    };

    // INIT handlers
    useEffect(() => {
        initMatch();
        nextQuestion();
    }, []);

    // MATCH LOGIC
    const initMatch = () => {
        setMatchCorrectCount(0);
        setSelectedChip(null);
        setMatchResultText('');
        
        const shuffled = [...COLORS].sort(() => Math.random() - 0.5).slice(0, 5);
        const chipOrder = [...shuffled].sort(() => Math.random() - 0.5);
        
        setMatchTargets(shuffled.map(c => ({ ...c, isFilled: false })));
        setMatchChips(chipOrder.map(c => ({ ...c, isUsed: false })));
    };

    const handleChipClick = (chipColorName) => {
        const chip = matchChips.find(c => c.name === chipColorName);
        if (chip?.isUsed) return;
        setSelectedChip(chipColorName);
    };

    const handleTargetClick = (targetColorName) => {
        if (!selectedChip) return;
        const targetIdx = matchTargets.findIndex(t => t.name === targetColorName);
        if (matchTargets[targetIdx].isFilled) return;

        if (selectedChip === targetColorName) {
            const newTargets = [...matchTargets];
            newTargets[targetIdx].isFilled = true;
            setMatchTargets(newTargets);

            const newChips = [...matchChips];
            const chipIdx = newChips.findIndex(c => c.name === selectedChip);
            newChips[chipIdx].isUsed = true;
            setMatchChips(newChips);

            setSelectedChip(null);
            
            const newCorrectCount = matchCorrectCount + 1;
            setMatchCorrectCount(newCorrectCount);

            const targetColor = matchTargets[targetIdx];
            triggerBurst('⭐');
            speak('Great job!');

            if (newCorrectCount === matchTargets.length) {
                setMatchResultText('🎉 Amazing! You matched them all!');
                speak('Amazing! You matched them all!');
            }
        } else {
            setMatchResultText('🤔 Try again!');
            setSelectedChip(null);
            setTimeout(() => setMatchResultText(''), 1000);
        }
    };

    // PAINT LOGIC
    useEffect(() => {
        if (activeTab === 'paint' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, [activeTab]);

    const getPos = (e) => {
        const canvas = canvasRef.current;
        const r = canvas.getBoundingClientRect();
        const scaleX = canvas.width / r.width;
        const scaleY = canvas.height / r.height;
        if (e.touches) {
            return { x: (e.touches[0].clientX - r.left) * scaleX, y: (e.touches[0].clientY - r.top) * scaleY };
        }
        return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
    };

    const startDraw = (e) => {
        e.preventDefault();
        isDrawing.current = true;
        lastPos.current = getPos(e);
    };

    const draw = (e) => {
        e.preventDefault();
        if (!isDrawing.current || !canvasRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const pos = getPos(e);
        
        ctx.strokeStyle = paintColor;
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        lastPos.current = pos;
    };

    const stopDraw = () => { isDrawing.current = false; };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    // QUIZ LOGIC
    const nextQuestion = () => {
        const correct = COLORS[Math.floor(Math.random() * COLORS.length)];
        setQuizQuestionColor(correct);
        setQuizFeedback('');
        setQuizAnswered(false);

        const opts = [correct];
        while (opts.length < 4) {
            const r = COLORS[Math.floor(Math.random() * COLORS.length)];
            if (!opts.find(o => o.name === r.name)) opts.push(r);
        }
        setQuizOptions(opts.sort(() => Math.random() - 0.5).map(o => ({...o, status: 'idle'})));
    };

    const handleQuizAnswer = (selectedColor) => {
        if(quizAnswered) return;
        setQuizAnswered(true);
        setQuizTotal(prev => prev + 1);

        const newOptions = [...quizOptions];
        const selectedIdx = newOptions.findIndex(o => o.name === selectedColor.name);
        const correctIdx = newOptions.findIndex(o => o.name === quizQuestionColor.name);

        if (selectedColor.name === quizQuestionColor.name) {
            setQuizScore(prev => prev + 1);
            newOptions[selectedIdx].status = 'correct';
            setQuizFeedback('🎉 Correct! Great job!');
            speak('Correct! Great job!');
            triggerBurst(quizQuestionColor.emoji);
        } else {
            newOptions[selectedIdx].status = 'wrong';
            newOptions[correctIdx].status = 'correct'; // highlight correct answer
            setQuizFeedback(`😊 It was ${quizQuestionColor.name}! Try again!`);
            speak(`It was ${quizQuestionColor.name}!`);
        }
        setQuizOptions(newOptions);
    };

    return (
        <div className="colors-fun-container">
            {/* Header */}
            <header>
                <BackButton to="/dashboard/toddler" theme="toddler" />
                <div className="bubbles">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bubble" style={{
                            width: `${30 + Math.random()*50}px`,
                            height: `${30 + Math.random()*50}px`,
                            left: `${Math.random()*100}%`,
                            top: `${Math.random()*100}%`,
                            background: ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#C77DFF','#FF9AA2'][i%6],
                            animationDelay: `${Math.random()*4}s`,
                            animationDuration: `${4+Math.random()*4}s`
                        }} />
                    ))}
                </div>
                <h1>🌈 Colors Fun!</h1>
                <p>Learn colors, play games &amp; paint! 🎨</p>
            </header>

            {/* TABS */}
            <div className="tabs">
                <button className={`tab-btn ${activeTab === 'learn' ? 'active' : ''}`} id="tab-learn" onClick={() => setActiveTab('learn')}>🎨 Learn</button>
                <button className={`tab-btn ${activeTab === 'match' ? 'active' : ''}`} id="tab-match" onClick={() => setActiveTab('match')}>🔵 Match</button>
                <button className={`tab-btn ${activeTab === 'paint' ? 'active' : ''}`} id="tab-paint" onClick={() => setActiveTab('paint')}>✏️ Paint</button>
                <button className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} id="tab-quiz" onClick={() => setActiveTab('quiz')}>⭐ Quiz</button>
            </div>

            {/* LEARN */}
            {activeTab === 'learn' && (
                <section id="learn" className="active">
                    <div className="section-title">🌟 Meet the Colors!</div>
                    <div className="colors-grid">
                        {COLORS.map((c, i) => (
                            <div 
                                key={c.name} 
                                className="color-card" 
                                style={{ background: c.hex, animationDelay: `${i*0.07}s` }}
                                onClick={() => { speak(c.name); triggerBurst(c.emoji); }}
                            >
                                <div className="blob" style={{ background: 'rgba(255,255,255,0.25)' }}></div>
                                <div className="color-name">{c.name}</div>
                                <span className="emoji">{c.emoji}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* MATCH */}
            {activeTab === 'match' && (
                <section id="match" className="active">
                    <div className="section-title">🔵 Match the Colors!</div>
                    <div id="match-area">
                        <p className="instructions">Tap a color chip, then tap its matching circle! 🎯</p>
                        
                        <div className="match-targets">
                            {matchTargets.map((t, i) => (
                                <div 
                                    key={`t-${i}`} 
                                    className={`match-target ${t.isFilled ? 'filled correct' : ''}`}
                                    style={{ background: t.isFilled ? t.hex : 'rgba(0,0,0,0.05)' }}
                                    onClick={() => handleTargetClick(t.name)}
                                >
                                    <span style={{ fontSize: '1.8rem' }}>{t.emoji}</span>
                                    <span className="check">✅</span>
                                </div>
                            ))}
                        </div>

                        <div className="color-chips">
                            {matchChips.map((c, i) => (
                                <div 
                                    key={`c-${i}`} 
                                    className={`color-chip ${selectedChip === c.name ? 'selected' : ''} ${c.isUsed ? 'used' : ''}`}
                                    style={{ background: c.hex }}
                                    onClick={() => handleChipClick(c.name)}
                                ></div>
                            ))}
                        </div>

                        <div id="match-result">{matchResultText}</div>
                        <button className="btn-primary" onClick={initMatch}>🔄 New Game</button>
                    </div>
                </section>
            )}

            {/* PAINT */}
            {activeTab === 'paint' && (
                <section id="paint" className="active">
                    <div className="section-title">✏️ Paint with Colors!</div>
                    <div id="paint-area">
                        <div className="palette">
                            {COLORS.map((c) => (
                                <div 
                                    key={c.name} 
                                    className={`paint-btn ${paintColor === c.hex ? 'active' : ''}`}
                                    style={{ background: c.hex }}
                                    title={c.name}
                                    onClick={() => setPaintColor(c.hex)}
                                ></div>
                            ))}
                            <div 
                                className={`paint-btn ${paintColor === '#ffffff' ? 'active' : ''}`} 
                                style={{ background: '#fff', border: '3px solid #ddd', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Eraser"
                                onClick={() => setPaintColor('#ffffff')}
                            >🧹</div>
                        </div>

                        <div id="canvas-wrap">
                            <canvas 
                                ref={canvasRef} 
                                id="paintCanvas" 
                                width="560" height="360"
                                onMouseDown={startDraw}
                                onMouseMove={draw}
                                onMouseUp={stopDraw}
                                onMouseLeave={stopDraw}
                                onTouchStart={startDraw}
                                onTouchMove={draw}
                                onTouchEnd={stopDraw}
                            ></canvas>
                        </div>

                        <div className="paint-controls">
                            {[8, 16, 28].map(size => (
                                <div 
                                    key={size}
                                    className={`brush-size ${brushSize === size ? 'active' : ''}`} 
                                    onClick={() => setBrushSize(size)}
                                >
                                    <div className="brush-dot" style={{ width: `${size-2}px`, height: `${size-2}px` }}></div>
                                </div>
                            ))}
                            <button className="btn-clear" onClick={clearCanvas}>🗑️ Clear</button>
                        </div>
                    </div>
                </section>
            )}

            {/* QUIZ */}
            {activeTab === 'quiz' && quizQuestionColor && (
                <section id="quiz" className="active">
                    <div className="section-title">⭐ Color Quiz!</div>
                    <div id="quiz-area">
                        <div id="quiz-score">Score: {quizScore} / {quizTotal}</div>
                        <div id="quiz-blob" style={{ background: quizQuestionColor.hex }}></div>
                        <div id="quiz-question">What color is this?</div>
                        
                        <div className="quiz-options">
                            {quizOptions.map((o) => (
                                <button 
                                    key={o.name}
                                    disabled={quizAnswered}
                                    className={`quiz-opt ${o.status !== 'idle' ? o.status : ''}`}
                                    style={{ background: o.hex }}
                                    onClick={() => handleQuizAnswer(o)}
                                >
                                    {o.name}
                                </button>
                            ))}
                        </div>
                        
                        <div id="quiz-feedback">{quizFeedback}</div>
                        {quizAnswered && (
                            <button className="btn-primary" onClick={nextQuestion}>➡️ Next!</button>
                        )}
                    </div>
                </section>
            )}

            <footer>Made with 💖 for little learners!</footer>
        </div>
    );
};

export default ColorsFun;