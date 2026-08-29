/**
 * Pasaparola Web Uygulaması - Akıllı Tahta & Jokerli Oyun Motoru
 */

// Global Ses Motoru (Web Audio API - Sıfır Dış Bağımlılık)
class SoundFX {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, type, duration, startOffset = 0, gainLevel = 0.2) {
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime + startOffset;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(gainLevel, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            console.error("Audio error:", e);
        }
    }

    playCorrect() {
        this.playTone(523.25, "sine", 0.15, 0, 0.25);    // C5
        this.playTone(659.25, "sine", 0.15, 0.1, 0.25);  // E5
        this.playTone(783.99, "sine", 0.35, 0.2, 0.3);   // G5
    }

    playWrong() {
        this.playTone(280, "sawtooth", 0.2, 0, 0.25);
        this.playTone(220, "sawtooth", 0.35, 0.15, 0.3);
    }

    playPass() {
        this.playTone(440, "sine", 0.15, 0, 0.15);
        this.playTone(330, "sine", 0.2, 0.1, 0.15);
    }

    playJoker() {
        this.playTone(587.33, "triangle", 0.1, 0, 0.2);
        this.playTone(880.00, "triangle", 0.1, 0.08, 0.2);
        this.playTone(1174.66, "triangle", 0.25, 0.16, 0.25);
    }

    playTick() {
        this.playTone(800, "square", 0.03, 0, 0.08);
    }

    playTimeUp() {
        this.playTone(400, "sawtooth", 0.2, 0, 0.25);
        this.playTone(400, "sawtooth", 0.2, 0.25, 0.25);
        this.playTone(300, "sawtooth", 0.4, 0.5, 0.3);
    }

    playFanfare() {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            this.playTone(freq, "sine", 0.2, idx * 0.12, 0.25);
        });
        this.playTone(1046.50, "triangle", 0.8, 0.5, 0.35);
    }
}

// Konfeti Parçacık Sistemi
class ConfettiEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.particles = [];
        this.isActive = false;
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start(count = 120) {
        this.particles = [];
        const colors = ["#38bdf8", "#22c55e", "#facc15", "#f43f5e", "#a855f7", "#ffffff"];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.8) * 22,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 12,
                gravity: 0.4,
                opacity: 1
            });
        }
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    animate() {
        if (!this.isActive) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let alive = false;
        for (let p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rSpeed;
            p.opacity -= 0.008;

            if (p.opacity > 0 && p.y < this.canvas.height + 50) {
                alive = true;
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation * Math.PI) / 180);
                this.ctx.globalAlpha = Math.max(0, p.opacity);
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                this.ctx.restore();
            }
        }

        if (alive) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Ana Pasaparola Uygulama Mantığı
class PasaparolaApp {
    constructor() {
        this.sound = new SoundFX();
        this.confetti = new ConfettiEngine(document.getElementById("confettiCanvas"));

        // Oyun Ayarları
        this.currentPackKey = "paket_1";
        this.data = QUESTION_PACKS[this.currentPackKey].questions;
        this.totalQuestions = this.data.length;

        // Oyun Durumu
        this.states = new Array(this.totalQuestions).fill("waiting"); // waiting, correct, wrong, pas
        this.currentIndex = 0;
        this.score = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.pasCount = 0;
        this.isGameOver = false;

        // Takım Modu
        this.isTeamMode = false;
        this.activeTeam = 0; // 0: A Takımı (Mavi), 1: B Takımı (Pembe)
        this.teamScores = [0, 0];

        // Jokerler
        this.jokers = {
            hint: 3,   // Harf İpucu
            time: 3,   // +15 Sn
            pause: 2   // Sınıfı Dinle (Duraklat)
        };
        this.revealedHintIndices = [];
        this.isPaused = false;

        // Sayaç
        this.TIME_LIMIT = 30;
        this.timeLeft = this.TIME_LIMIT;
        this.timerInterval = null;

        // DOM Elemanları
        this.dom = {
            wheelCanvas: document.getElementById("wheelCanvas"),
            lblActiveLetter: document.getElementById("lblActiveLetter"),
            lblTimer: document.getElementById("lblTimer"),
            txtQuestion: document.getElementById("txtQuestion"),
            ansInput: document.getElementById("ansInput"),
            btnSubmit: document.getElementById("btnSubmit"),
            btnPas: document.getElementById("btnPas"),
            feedbackBanner: document.getElementById("feedbackBanner"),
            hintDisplay: document.getElementById("hintDisplay"),
            
            // Skorlar
            valPoints: document.getElementById("valPoints"),
            valCorrect: document.getElementById("valCorrect"),
            valWrong: document.getElementById("valWrong"),
            valPas: document.getElementById("valPas"),
            
            // Takım Skorları
            singleScorecard: document.getElementById("singleScorecard"),
            teamScorecard: document.getElementById("teamScorecard"),
            teamAScore: document.getElementById("teamAScore"),
            teamBScore: document.getElementById("teamBScore"),
            cardTeamA: document.getElementById("cardTeamA"),
            cardTeamB: document.getElementById("cardTeamB"),

            // Joker Butonları
            btnJokerHint: document.getElementById("btnJokerHint"),
            btnJokerTime: document.getElementById("btnJokerTime"),
            btnJokerPause: document.getElementById("btnJokerPause"),
            badgeJokerHint: document.getElementById("badgeJokerHint"),
            badgeJokerTime: document.getElementById("badgeJokerTime"),
            badgeJokerPause: document.getElementById("badgeJokerPause"),

            // Klavye ve Modallar
            keyboardSection: document.getElementById("keyboardSection"),
            btnToggleKeyboard: document.getElementById("btnToggleKeyboard"),
            btnToggleFullscreen: document.getElementById("btnToggleFullscreen"),
            btnToggleTeamMode: document.getElementById("btnToggleTeamMode"),
            btnPacksModal: document.getElementById("btnPacksModal"),
            btnRestart: document.getElementById("btnRestart"),

            modalPacks: document.getElementById("modalPacks"),
            modalGameOver: document.getElementById("modalGameOver"),
            gameOverSummary: document.getElementById("gameOverSummary"),
            packListContainer: document.getElementById("packListContainer")
        };

        this.initCanvas();
        this.initKeyboard();
        this.bindEvents();
        this.renderPacksList();
        this.startGame();
    }

    initCanvas() {
        this.canvasCtx = this.dom.wheelCanvas.getContext("2d");
        this.dpr = window.devicePixelRatio || 1;
        this.canvasSize = 480;
        
        this.dom.wheelCanvas.width = this.canvasSize * this.dpr;
        this.dom.wheelCanvas.height = this.canvasSize * this.dpr;
        this.dom.wheelCanvas.style.width = `${this.canvasSize}px`;
        this.dom.wheelCanvas.style.height = `${this.canvasSize}px`;
        this.canvasCtx.scale(this.dpr, this.dpr);

        // Çarka tıklayarak/dokunarak harfe gitme (Akıllı Tahta)
        this.dom.wheelCanvas.addEventListener("click", (e) => this.handleCanvasClick(e));
    }

    initKeyboard() {
        const keys = document.querySelectorAll(".kb-key");
        keys.forEach(key => {
            key.addEventListener("click", () => {
                this.sound.init();
                const letter = key.dataset.key;
                const action = key.dataset.action;

                if (letter) {
                    this.dom.ansInput.value += letter;
                    this.dom.ansInput.focus();
                } else if (action === "backspace") {
                    this.dom.ansInput.value = this.dom.ansInput.value.slice(0, -1);
                    this.dom.ansInput.focus();
                } else if (action === "enter") {
                    this.checkAnswer();
                } else if (action === "space") {
                    this.dom.ansInput.value += " ";
                    this.dom.ansInput.focus();
                }
            });
        });
    }

    bindEvents() {
        // Form girişleri
        this.dom.ansInput.addEventListener("keydown", (e) => {
            this.sound.init();
            if (e.key === "Enter") {
                this.checkAnswer();
            }
        });

        this.dom.btnSubmit.addEventListener("click", () => {
            this.sound.init();
            this.checkAnswer();
        });

        this.dom.btnPas.addEventListener("click", () => {
            this.sound.init();
            this.passQuestion();
        });

        this.dom.btnRestart.addEventListener("click", () => this.startGame());

        // Joker Butonları
        this.dom.btnJokerHint.addEventListener("click", () => this.useJokerHint());
        this.dom.btnJokerTime.addEventListener("click", () => this.useJokerTime());
        this.dom.btnJokerPause.addEventListener("click", () => this.useJokerPause());

        // Navbar Butonları
        this.dom.btnToggleKeyboard.addEventListener("click", () => {
            this.dom.keyboardSection.classList.toggle("hidden");
            this.dom.btnToggleKeyboard.classList.toggle("active");
        });

        this.dom.btnToggleFullscreen.addEventListener("click", () => this.toggleFullscreen());

        this.dom.btnToggleTeamMode.addEventListener("click", () => {
            this.isTeamMode = !this.isTeamMode;
            this.dom.btnToggleTeamMode.classList.toggle("active", this.isTeamMode);
            this.dom.btnToggleTeamMode.innerHTML = this.isTeamMode ? "👥 Takım Modu: Açık" : "👥 Takım Modu";
            this.updateScoreDisplay();
            this.startGame();
        });

        this.dom.btnPacksModal.addEventListener("click", () => {
            this.dom.modalPacks.classList.add("open");
        });

        document.querySelectorAll(".modal-close").forEach(btn => {
            btn.addEventListener("click", () => {
                this.dom.modalPacks.classList.remove("open");
                this.dom.modalGameOver.classList.remove("open");
            });
        });

        document.getElementById("btnPlayAgain").addEventListener("click", () => {
            this.dom.modalGameOver.classList.remove("open");
            this.startGame();
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.log(err));
            this.dom.btnToggleFullscreen.innerHTML = "⛶ Tam Ekran Çık";
        } else {
            document.exitFullscreen().catch(err => console.log(err));
            this.dom.btnToggleFullscreen.innerHTML = "⛶ Tam Ekran";
        }
    }

    renderPacksList() {
        this.dom.packListContainer.innerHTML = "";
        Object.keys(QUESTION_PACKS).forEach(key => {
            const pack = QUESTION_PACKS[key];
            const div = document.createElement("div");
            div.className = `pack-item ${key === this.currentPackKey ? 'selected' : ''}`;
            div.innerHTML = `
                <h4>${pack.title} (${pack.questions.length} Harf)</h4>
                <p>${pack.description}</p>
            `;
            div.addEventListener("click", () => {
                this.currentPackKey = key;
                this.data = QUESTION_PACKS[key].questions;
                this.totalQuestions = this.data.length;
                this.renderPacksList();
                this.dom.modalPacks.classList.remove("open");
                this.startGame();
            });
            this.dom.packListContainer.appendChild(div);
        });
    }

    startGame() {
        this.stopTimer();
        this.states = new Array(this.totalQuestions).fill("waiting");
        this.currentIndex = 0;
        this.score = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.pasCount = 0;
        this.isGameOver = false;
        this.isPaused = false;

        this.teamScores = [0, 0];
        this.activeTeam = 0;

        // Jokerleri sıfırla
        this.jokers = { hint: 3, time: 3, pause: 2 };
        this.updateJokerButtons();

        this.hideFeedback();
        this.hideHint();
        this.updateScoreDisplay();
        this.loadQuestion();
    }

    updateScoreDisplay() {
        if (this.isTeamMode) {
            this.dom.singleScorecard.style.display = "none";
            this.dom.teamScorecard.style.display = "flex";
            this.dom.teamAScore.textContent = `${this.teamScores[0]} P`;
            this.dom.teamBScore.textContent = `${this.teamScores[1]} P`;

            this.dom.cardTeamA.classList.toggle("active", this.activeTeam === 0);
            this.dom.cardTeamB.classList.toggle("active", this.activeTeam === 1);
        } else {
            this.dom.singleScorecard.style.display = "flex";
            this.dom.teamScorecard.style.display = "none";
            this.dom.valPoints.textContent = this.score;
            this.dom.valCorrect.textContent = this.correctCount;
            this.dom.valWrong.textContent = this.wrongCount;
            this.dom.valPas.textContent = this.pasCount;
        }
    }

    updateJokerButtons() {
        this.dom.badgeJokerHint.textContent = this.jokers.hint;
        this.dom.badgeJokerTime.textContent = this.jokers.time;
        this.dom.badgeJokerPause.textContent = this.jokers.pause;

        this.dom.btnJokerHint.disabled = this.jokers.hint <= 0;
        this.dom.btnJokerTime.disabled = this.jokers.time <= 0;
        this.dom.btnJokerPause.disabled = this.jokers.pause <= 0;
    }

    drawWheel() {
        const ctx = this.canvasCtx;
        const cx = this.canvasSize / 2;
        const cy = this.canvasSize / 2;
        const r = 185;
        const nodeRadius = 20;
        const n = this.totalQuestions;

        ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

        // Merkez Daire ve İkon
        ctx.beginPath();
        ctx.arc(cx, cy, 65, 0, 2 * Math.PI);
        ctx.fillStyle = "#1e293b";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#38bdf8";
        ctx.stroke();

        if (!this.isGameOver) {
            const curLetter = this.data[this.currentIndex].harf;
            ctx.fillStyle = "#facc15";
            ctx.font = "bold 34px 'Segoe UI', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(curLetter, cx, cy - 8);

            ctx.fillStyle = "#94a3b8";
            ctx.font = "bold 13px 'Segoe UI', sans-serif";
            ctx.fillText(`${this.currentIndex + 1} / ${n}`, cx, cy + 24);
        } else {
            ctx.fillStyle = "#22c55e";
            ctx.font = "bold 20px 'Segoe UI', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("BİTTİ", cx, cy);
        }

        // Harf Daireleri
        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            const state = this.states[i];
            let bgColor = "#475569";
            let textColor = "#ffffff";

            if (state === "correct") {
                bgColor = "#22c55e";
            } else if (state === "wrong") {
                bgColor = "#ef4444";
            } else if (state === "pas") {
                bgColor = "#f59e0b";
                textColor = "#0f172a";
            }

            // Aktif Harf Vurgu Halkası
            if (i === this.currentIndex && !this.isGameOver) {
                ctx.beginPath();
                ctx.arc(x, y, nodeRadius + 5, 0, 2 * Math.PI);
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#38bdf8";
                ctx.stroke();
            }

            // Daire
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = bgColor;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0f172a";
            ctx.stroke();

            // Harf
            ctx.fillStyle = textColor;
            ctx.font = "bold 13px 'Segoe UI', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.data[i].harf, x, y);
        }
    }

    handleCanvasClick(event) {
        if (this.isGameOver) return;
        const rect = this.dom.wheelCanvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) * (this.canvasSize / rect.width);
        const mouseY = (event.clientY - rect.top) * (this.canvasSize / rect.height);

        const cx = this.canvasSize / 2;
        const cy = this.canvasSize / 2;
        const r = 185;
        const nodeRadius = 22;
        const n = this.totalQuestions;

        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);

            const dist = Math.hypot(mouseX - x, mouseY - y);
            if (dist <= nodeRadius) {
                if (this.states[i] !== "correct" && this.states[i] !== "wrong") {
                    this.stopTimer();
                    this.currentIndex = i;
                    this.loadQuestion();
                }
                break;
            }
        }
    }

    loadQuestion() {
        if (this.states.every(s => s === "correct" || s === "wrong")) {
            this.endGame();
            return;
        }

        while (this.states[this.currentIndex] === "correct" || this.states[this.currentIndex] === "wrong") {
            this.currentIndex = (this.currentIndex + 1) % this.totalQuestions;
        }

        const cur = this.data[this.currentIndex];
        this.dom.lblActiveLetter.textContent = cur.harf;
        this.dom.txtQuestion.textContent = cur.soru;
        this.dom.ansInput.value = "";
        this.dom.ansInput.focus();

        this.revealedHintIndices = [];
        this.hideHint();
        this.drawWheel();
        this.resetTimer();
    }

    checkAnswer() {
        if (this.isGameOver) return;

        const raw = this.dom.ansInput.value.trim();
        if (!raw) return;

        const userAns = turkishUpper(raw);
        const targetAns = turkishUpper(this.data[this.currentIndex].kelime);

        if (userAns === targetAns) {
            // DOĞRU
            this.states[this.currentIndex] = "correct";
            this.correctCount++;
            const pointsEarned = 10;
            this.score += pointsEarned;

            if (this.isTeamMode) {
                this.teamScores[this.activeTeam] += pointsEarned;
            }

            this.showFeedback(`✓ TEBRİKLER! Doğru Cevap: ${targetAns}`, "correct");
            this.sound.playCorrect();
            this.confetti.start(40);
        } else {
            // YANLIŞ
            this.states[this.currentIndex] = "wrong";
            this.wrongCount++;
            this.showFeedback(`✗ YANLIŞ! Doğru Cevap: ${targetAns}`, "wrong");
            this.sound.playWrong();
        }

        if (this.isTeamMode) {
            // Sırayı diğer takıma devret
            this.activeTeam = this.activeTeam === 0 ? 1 : 0;
        }

        this.pasCount = this.states.filter(s => s === "pas").length;
        this.updateScoreDisplay();
        this.nextQuestion();
    }

    passQuestion() {
        if (this.isGameOver) return;

        this.states[this.currentIndex] = "pas";
        this.pasCount = this.states.filter(s => s === "pas").length;
        this.showFeedback("⏳ Soru PAS geçildi. Sonraki turlarda tekrar gelecek.", "pas");
        this.sound.playPass();

        if (this.isTeamMode) {
            this.activeTeam = this.activeTeam === 0 ? 1 : 0;
        }

        this.updateScoreDisplay();
        this.nextQuestion();
    }

    nextQuestion() {
        this.stopTimer();
        this.currentIndex = (this.currentIndex + 1) % this.totalQuestions;
        this.loadQuestion();
    }

    // JOKER 1: Harf İpucu (Harf Al)
    useJokerHint() {
        if (this.jokers.hint <= 0 || this.isGameOver) return;

        const word = turkishUpper(this.data[this.currentIndex].kelime);
        const unrevealed = [];
        for (let i = 0; i < word.length; i++) {
            if (!this.revealedHintIndices.includes(i) && word[i] !== " ") {
                unrevealed.push(i);
            }
        }

        if (unrevealed.length === 0) return;

        const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        this.revealedHintIndices.push(pick);

        this.jokers.hint--;
        this.updateJokerButtons();
        this.sound.playJoker();

        // Harf şablonunu oluştur
        let display = "";
        for (let i = 0; i < word.length; i++) {
            if (word[i] === " ") {
                display += "   ";
            } else if (this.revealedHintIndices.includes(i)) {
                display += word[i] + " ";
            } else {
                display += "_ ";
            }
        }

        this.dom.hintDisplay.textContent = display.trim();
        this.dom.hintDisplay.style.display = "block";
    }

    // JOKER 2: +15 Saniye Ek Süre
    useJokerTime() {
        if (this.jokers.time <= 0 || this.isGameOver) return;

        this.jokers.time--;
        this.timeLeft += 15;
        this.updateJokerButtons();
        this.sound.playJoker();
        this.updateTimerDisplay();
        this.showFeedback("⏱️ +15 Saniye Ek Süre Eklendi!", "pas");
    }

    // JOKER 3: Sınıfı Dinle (Duraklat)
    useJokerPause() {
        if (this.jokers.pause <= 0 || this.isGameOver) return;

        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.jokers.pause--;
            this.updateJokerButtons();
            this.sound.playJoker();
            this.showFeedback("⏸️ Zaman Duraklatıldı! Dilediğinizce düşünebilirsiniz.", "pas");
            this.dom.btnJokerPause.innerHTML = `▶️ Devam Et (<span id="badgeJokerPause">${this.jokers.pause}</span>)`;
        } else {
            this.dom.btnJokerPause.innerHTML = `👥 Süreyi Durdur (<span id="badgeJokerPause">${this.jokers.pause}</span>)`;
            this.hideFeedback();
        }
    }

    // Zamanlayıcı Motoru
    resetTimer() {
        this.stopTimer();
        this.timeLeft = this.TIME_LIMIT;
        this.isPaused = false;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => this.timerTick(), 1000);
    }

    timerTick() {
        if (this.isPaused) return;

        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 5) {
                this.sound.playTick();
            }
        } else {
            this.stopTimer();
            this.sound.playTimeUp();
            this.showFeedback("⏱️ Süre Doldu! Soru pas geçiliyor...", "pas");
            this.passQuestion();
        }
    }

    updateTimerDisplay() {
        this.dom.lblTimer.textContent = `⏱️ ${this.timeLeft}s`;
        this.dom.lblTimer.classList.remove("warning", "danger");

        if (this.timeLeft <= 5) {
            this.dom.lblTimer.classList.add("danger");
        } else if (this.timeLeft <= 10) {
            this.dom.lblTimer.classList.add("warning");
        }
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    showFeedback(text, type) {
        this.dom.feedbackBanner.textContent = text;
        this.dom.feedbackBanner.className = `feedback-banner show ${type}`;
    }

    hideFeedback() {
        this.dom.feedbackBanner.className = "feedback-banner";
        this.dom.feedbackBanner.textContent = "";
    }

    hideHint() {
        this.dom.hintDisplay.style.display = "none";
        this.dom.hintDisplay.textContent = "";
    }

    endGame() {
        this.isGameOver = true;
        this.stopTimer();
        this.drawWheel();
        this.sound.playFanfare();
        this.confetti.start(180);

        const accuracy = Math.round((this.correctCount / this.totalQuestions) * 100);

        let summaryHTML = "";
        if (this.isTeamMode) {
            const winner = this.teamScores[0] > this.teamScores[1] 
                ? "🔵 Mavi Takım Kazandı!" 
                : (this.teamScores[1] > this.teamScores[0] ? "🌸 Pembe Takım Kazandı!" : "🤝 Dostluk Kazandı (Berabere)!");

            summaryHTML = `
                <h3 style="color:#facc15; font-size:1.6rem; text-align:center; margin-bottom:12px;">${winner}</h3>
                <div style="display:flex; justify-content:space-around; margin:15px 0;">
                    <div style="background:#1e3a8a; padding:12px 20px; border-radius:12px; text-align:center;">
                        <h4 style="color:#93c5fd;">Mavi Takım</h4>
                        <strong style="font-size:1.8rem; color:#ffffff;">${this.teamScores[0]} Puan</strong>
                    </div>
                    <div style="background:#831843; padding:12px 20px; border-radius:12px; text-align:center;">
                        <h4 style="color:#fbcfe8;">Pembe Takım</h4>
                        <strong style="font-size:1.8rem; color:#ffffff;">${this.teamScores[1]} Puan</strong>
                    </div>
                </div>
            `;
        } else {
            summaryHTML = `
                <div style="text-align:center; margin:15px 0;">
                    <div style="font-size:2.8rem; font-weight:900; color:#38bdf8; margin-bottom:8px;">${this.score} Puan</div>
                    <p style="color:#94a3b8; font-size:1.1rem;">Başarı Oranı: <strong style="color:#22c55e;">%${accuracy}</strong></p>
                </div>
                <div style="display:flex; justify-content:space-around; background:#0f172a; padding:14px; border-radius:12px;">
                    <div>✓ Doğru: <strong style="color:#22c55e;">${this.correctCount}</strong></div>
                    <div>✗ Yanlış: <strong style="color:#ef4444;">${this.wrongCount}</strong></div>
                    <div>⏳ Toplam Harf: <strong>${this.totalQuestions}</strong></div>
                </div>
            `;
        }

        this.dom.gameOverSummary.innerHTML = summaryHTML;
        this.dom.modalGameOver.classList.add("open");
    }
}

// Sayfa Yüklendiğinde Başlat
window.addEventListener("DOMContentLoaded", () => {
    window.app = new PasaparolaApp();
});
