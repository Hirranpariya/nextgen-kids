import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ShapesSort.css';

const SHAPES = [
  { name: 'Circle',   emoji: '🔵', color: '#1E90FF', sides: 'No corners!',  bg: '#1E90FF' },
  { name: 'Square',   emoji: '🟥', color: '#FF3B3B', sides: '4 equal sides', bg: '#FF3B3B' },
  { name: 'Triangle', emoji: '🔺', color: '#FF8C00', sides: '3 sides',       bg: '#FF8C00' },
  { name: 'Star',     emoji: '⭐', color: '#FFD700', sides: '5 points',      bg: '#FFD700' },
  { name: 'Heart',    emoji: '❤️', color: '#FF69B4', sides: 'Rounded!',      bg: '#FF69B4' },
  { name: 'Diamond',  emoji: '💎', color: '#9B59B6', sides: '4 sides',       bg: '#9B59B6' },
];

const TRACE_COLORS = ['#FF3B3B','#FF8C00','#FFD700','#3CB371','#1E90FF','#9B59B6'];

const TRACE_SHAPES = [
  { name: 'Circle',   color: '#1E90FF' },
  { name: 'Square',   color: '#FF3B3B' },
  { name: 'Triangle', color: '#FF8C00' },
  { name: 'Star',     color: '#FFD700' },
];

const ShapesSort = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('sort');

    // Sort State
    const [sortBuckets, setSortBuckets] = useState([]);
    const [sortPieces, setSortPieces] = useState([]);
    const [sortSelected, setSortSelected] = useState(null);
    const [sortCounts, setSortCounts] = useState({});
    const [sortResultText, setSortResultText] = useState('');

    // Trace State
    const canvasRef = useRef(null);
    const [traceColor, setTraceColor] = useState('#1E90FF');
    const [currentTraceShape, setCurrentTraceShape] = useState(0);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // Quiz State
    const [quizShape, setQuizShape] = useState(null);
    const [quizOptions, setQuizOptions] = useState([]);
    const [quizScore, setQuizScore] = useState(0);
    const [quizTotal, setQuizTotal] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState('');
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [spinAnimationKey, setSpinAnimationKey] = useState(0);

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

    // ----- INIT RUNS -----
    useEffect(() => {
        initSort();
        nextQuizQ();
    }, []);

    // ----- SORT LOGIC -----
    const initSort = () => {
        setSortSelected(null);
        setSortResultText('');

        const picked = [...SHAPES].sort(() => Math.random() - 0.5).slice(0, 4);
        
        const counts = {};
        picked.forEach(s => counts[s.name] = 0);
        setSortCounts(counts);
        setSortBuckets(picked);

        // 12 random pieces (3 of each picked shape)
        const piecesData = [...picked, ...picked, ...picked].sort(() => Math.random() - 0.5);
        setSortPieces(piecesData.map((p, idx) => ({ ...p, id: `piece-${idx}`, isGone: false })));
    };

    const handlePieceClick = (piece) => {
        if (piece.isGone) return;
        setSortSelected(piece.id);
    };

    const handleBucketClick = (bucket) => {
        if (!sortSelected) return;

        const piece = sortPieces.find(p => p.id === sortSelected);
        
        if (piece.name === bucket.name) {
            // Correct match
            setSortCounts(prev => ({ ...prev, [bucket.name]: prev[bucket.name] + 1 }));
            
            const newPieces = sortPieces.map(p => p.id === sortSelected ? { ...p, isGone: true } : p);
            setSortPieces(newPieces);
            setSortSelected(null);
            
            triggerBurst(bucket.emoji);
            speak('Great job!');

            const remaining = newPieces.filter(p => !p.isGone).length;
            if (remaining === 0) {
                setSortResultText('🎉 You sorted them all! Amazing!');
                speak('You sorted them all! Amazing!');
            }
        } else {
            // Incorrect match
            setSortResultText('🤔 Oops! Try again!');
            setSortSelected(null);
            setTimeout(() => setSortResultText(''), 1000);
        }
    };

    // ----- TRACE LOGIC -----
    const drawGuide = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFEF7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.setLineDash([18, 12]);
        ctx.strokeStyle = 'rgba(0,0,0,.18)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        const s = TRACE_SHAPES[currentTraceShape];

        if (s.name === 'Circle') {
            ctx.arc(cx, cy, 110, 0, Math.PI * 2);
        } else if (s.name === 'Square') {
            ctx.rect(cx - 110, cy - 110, 220, 220);
        } else if (s.name === 'Triangle') {
            ctx.moveTo(cx, cy - 120);
            ctx.lineTo(cx + 120, cy + 100);
            ctx.lineTo(cx - 120, cy + 100);
            ctx.closePath();
        } else if (s.name === 'Star') {
            const pts = 5, r1 = 120, r2 = 55;
            for (let i = 0; i < pts * 2; i++) {
                const r = i % 2 === 0 ? r1 : r2;
                const a = (i * Math.PI / pts) - Math.PI / 2;
                i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a)) : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
            }
            ctx.closePath();
        }
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = s.color + '33';
        ctx.fill();

        ctx.font = 'bold 22px Nunito,sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,.3)';
        ctx.textAlign = 'center';
        ctx.fillText('Trace the ' + s.name + '!', cx, canvas.height - 18);
    };

    useEffect(() => {
        if (activeTab === 'trace') {
            drawGuide();
        }
    }, [activeTab, currentTraceShape]);

    const getPos = (e) => {
        const canvas = canvasRef.current;
        const r = canvas.getBoundingClientRect();
        const sx = canvas.width / r.width;
        const sy = canvas.height / r.height;
        if (e.touches && e.touches.length > 0) {
            return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy };
        }
        return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
    };

    const startDraw = (e) => {
        if (e.type.includes('touch')) e.preventDefault();
        isDrawing.current = true;
        lastPos.current = getPos(e);
    };

    const runDraw = (e) => {
        if (e.type.includes('touch')) e.preventDefault();
        if (!isDrawing.current || !canvasRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const pos = getPos(e);
        
        ctx.strokeStyle = traceColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        lastPos.current = pos;
    };

    const stopDraw = () => { isDrawing.current = false; };

    // ----- QUIZ LOGIC -----
    const nextQuizQ = () => {
        const cor = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        setQuizShape(cor);
        setQuizFeedback('');
        setQuizAnswered(false);
        setSpinAnimationKey(prev => prev + 1);

        const opts = [cor];
        while (opts.length < 4) {
            const r = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            if (!opts.find(o => o.name === r.name)) opts.push(r);
        }
        setQuizOptions(opts.sort(() => Math.random() - 0.5).map(o => ({ ...o, status: 'idle' })));
    };

    const handleQuizAnswer = (selectedOpt) => {
        if (quizAnswered) return;
        
        setQuizAnswered(true);
        setQuizTotal(prev => prev + 1);

        const newOptions = [...quizOptions];
        const selectedIdx = newOptions.findIndex(o => o.name === selectedOpt.name);
        const correctIdx = newOptions.findIndex(o => o.name === quizShape.name);

        if (selectedOpt.name === quizShape.name) {
            setQuizScore(prev => prev + 1);
            newOptions[selectedIdx].status = 'correct';
            setQuizFeedback('🎉 Correct! You rock!');
            speak('Correct! You rock!');
            triggerBurst(quizShape.emoji);
        } else {
            newOptions[selectedIdx].status = 'wrong';
            newOptions[correctIdx].status = 'correct';
            setQuizFeedback(`😊 It was a ${quizShape.name}!`);
            speak(`It was a ${quizShape.name}!`);
        }
        setQuizOptions(newOptions);
    };

    return (
        <div className="shapes-sort-container">
            {/* Header */}
            <header>
                <button 
                    onClick={() => navigate('/dashboard/toddler')}
                    className="absolute top-4 left-4 py-2 px-4 rounded-full bg-white text-blue-500 font-black text-lg border-4 border-white shadow-[0_4px_0_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all z-50 flex items-center gap-2"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                    <ArrowLeft size={24} strokeWidth={3} />
                    Back
                </button>
                <div className="bubbles">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bubble" style={{
                            width: `${28 + Math.random()*50}px`,
                            height: `${28 + Math.random()*50}px`,
                            left: `${Math.random()*100}%`,
                            top: `${Math.random()*100}%`,
                            background: ['#4D96FF','#6BCB77','#FFD93D','#FF6B6B','#C77DFF'][i%5],
                            animationDelay: `${Math.random()*4}s`,
                            animationDuration: `${4+Math.random()*4}s`
                        }} />
                    ))}
                </div>
                <h1>🔷 Shape Sort!</h1>
                <p>Learn shapes, sort &amp; trace! ✏️</p>
            </header>

            {/* Tabs */}
            <div className="tabs">
                <button className={`tab-btn ${activeTab === 'sort' ? 'active' : ''}`} id="tb-sort" onClick={() => setActiveTab('sort')}>🎯 Sort</button>
                <button className={`tab-btn ${activeTab === 'learn' ? 'active' : ''}`} id="tb-learn" onClick={() => setActiveTab('learn')}>📚 Learn</button>
                <button className={`tab-btn ${activeTab === 'trace' ? 'active' : ''}`} id="tb-trace" onClick={() => setActiveTab('trace')}>✏️ Trace</button>
                <button className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} id="tb-quiz" onClick={() => setActiveTab('quiz')}>⭐ Quiz</button>
            </div>

            {/* SORT SECTION */}
            {activeTab === 'sort' && (
                <section id="sort" className="active">
                    <div className="sec-title">🎯 Sort the Shapes!</div>
                    <div id="sort-wrap">
                        <p className="sort-instruction">Tap a shape, then tap its matching bucket! 🪣</p>
                        
                        <div className="buckets-row">
                            {sortBuckets.map((b) => (
                                <div 
                                    key={`bucket-${b.name}`} 
                                    className="bucket"
                                    style={{ background: b.bg }}
                                    onClick={() => handleBucketClick(b)}
                                >
                                    <div className="bucket-shape">{b.emoji}</div>
                                    <div className="bucket-label">{b.name}</div>
                                    <div className="bucket-count">{sortCounts[b.name] || 0}</div>
                                </div>
                            ))}
                        </div>

                        <div className="shapes-tray">
                            {sortPieces.map((p, idx) => (
                                <div 
                                    key={p.id}
                                    className={`shape-piece ${sortSelected === p.id ? 'selected' : ''} ${p.isGone ? 'gone' : ''}`}
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                    onClick={() => handlePieceClick(p)}
                                >
                                    {p.emoji}
                                </div>
                            ))}
                        </div>

                        <div className="sort-result">{sortResultText}</div>
                        <button className="btn-primary" onClick={initSort}>🔄 New Game</button>
                    </div>
                </section>
            )}

            {/* LEARN SECTION */}
            {activeTab === 'learn' && (
                <section id="learn" className="active">
                    <div className="sec-title">📚 Meet the Shapes!</div>
                    <div className="shapes-learn-grid">
                        {SHAPES.map((s, i) => (
                            <div 
                                key={s.name} 
                                className="shape-learn-card"
                                style={{ background: s.bg, animationDelay: `${i * 0.08}s` }}
                                onClick={() => { speak(s.name); triggerBurst(s.emoji); }}
                            >
                                <span className="big-shape">{s.emoji}</span>
                                <div className="sname">{s.name}</div>
                                <div className="sides">{s.sides}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* TRACE SECTION */}
            {activeTab === 'trace' && (
                <section id="trace" className="active">
                    <div className="sec-title">✏️ Trace the Shapes!</div>
                    <div id="trace-wrap">
                        <div className="trace-shapes-nav">
                            {TRACE_SHAPES.map((s, i) => (
                                <button 
                                    key={s.name}
                                    className={`trace-nav-btn ${currentTraceShape === i ? 'active' : ''}`}
                                    style={{ background: s.color }}
                                    onClick={() => setCurrentTraceShape(i)}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                        
                        <div id="trace-canvas-wrap">
                            <canvas 
                                ref={canvasRef} 
                                id="traceCanvas" 
                                width="540" 
                                height="360"
                                onMouseDown={startDraw}
                                onMouseMove={runDraw}
                                onMouseUp={stopDraw}
                                onMouseLeave={stopDraw}
                                onTouchStart={startDraw}
                                onTouchMove={runDraw}
                                onTouchEnd={stopDraw}
                            ></canvas>
                        </div>
                        
                        <div className="trace-controls">
                            {TRACE_COLORS.map(col => (
                                <div 
                                    key={col}
                                    className={`color-dot ${traceColor === col ? 'active' : ''}`}
                                    style={{ background: col }}
                                    onClick={() => setTraceColor(col)}
                                ></div>
                            ))}
                            <button className="btn-clear" onClick={drawGuide}>🗑️ Clear</button>
                        </div>
                    </div>
                </section>
            )}

            {/* QUIZ SECTION */}
            {activeTab === 'quiz' && quizShape && (
                <section id="quiz" className="active">
                    <div className="sec-title">⭐ Shape Quiz!</div>
                    <div id="quiz-wrap">
                        <div id="quiz-score">Score: {quizScore} / {quizTotal}</div>
                        
                        <div id="quiz-shape-display" key={spinAnimationKey}>
                            {quizShape.emoji}
                        </div>
                        
                        <div id="quiz-question">What shape is this?</div>
                        
                        <div className="quiz-opts">
                            {quizOptions.map(o => (
                                <button
                                    key={o.name}
                                    disabled={quizAnswered}
                                    className={`quiz-opt ${o.status !== 'idle' ? o.status : ''}`}
                                    style={{ background: o.bg }}
                                    onClick={() => handleQuizAnswer(o)}
                                >
                                    {o.name}
                                </button>
                            ))}
                        </div>
                        
                        <div id="quiz-feedback">{quizFeedback}</div>
                        {quizAnswered && (
                            <button className="btn-primary" onClick={nextQuizQ}>➡️ Next!</button>
                        )}
                    </div>
                </section>
            )}

            <footer>Made with 💖 for little learners!</footer>
        </div>
    );
};

export default ShapesSort;