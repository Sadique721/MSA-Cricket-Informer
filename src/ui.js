// MSA Sport Informer UI Rendering & Interaction Modules
import { 
  fetchLiveScores, 
  fetchSportsNews, 
  rankData, 
  pointsData, 
  commentaryData, 
  predictions 
} from './api.js';
import { switchSport } from './three-scene.js';

let activeSport = 'football';
let chartsInstance = {};
let commIdx = 0;

// Helper to determine CSS classes for commentary events
function getCommentaryClass(type) {
  if (type === 'six') return 'ball-six';
  if (type === 'four') return 'ball-four';
  if (type === 'wicket') return 'ball-wicket';
  return 'ball-dot';
}

// 1. Render Live Score Centre
export async function renderMatches(sport = 'all') {
  const container = document.getElementById('matchCards');
  if (!container) return;
  
  const matches = await fetchLiveScores(sport);
  
  container.innerHTML = matches.map(m => {
    let detailsHTML = '';
    let icon = '⚽';
    if (m.sport === 'cricket') icon = '🏏';
    if (m.sport === 'basketball') icon = '🏀';
    if (m.sport === 'tennis') icon = '🎾';
    
    if (m.sport === 'cricket') {
      detailsHTML = `OVERS: ${m.time}`;
    } else if (m.sport === 'football' || m.sport === 'basketball') {
      detailsHTML = `TIME: ${m.time}`;
    } else if (m.sport === 'tennis') {
      detailsHTML = `STATUS: ${m.time}`;
    }

    return `
      <div class="glass match-card p-6 cursor-pointer" onclick="window.selectActiveMatch('${m.id}', '${m.sport}')">
        <div class="flex justify-between items-start mb-4">
          <div class="text-xs font-semibold text-gray-400 tracking-wider flex items-center gap-1.5">
            <span>${icon}</span> ${m.name}
          </div>
          <span class="live-badge">${m.status}</span>
        </div>
        <div class="match-score text-2xl font-bold font-mono tracking-tight">${m.score}</div>
        <div class="mt-2 text-xs font-mono text-gray-500">${detailsHTML}</div>
        <div class="mt-4 flex justify-between pt-4 border-t border-gray-800 text-xs">
          <span>${m.team1}: <b>${m.team1score}</b></span>
          <span>${m.team2}: <b>${m.team2score}</b></span>
        </div>
      </div>
    `;
  }).join('');
}

// 2. Render Live Match Details & Ball-by-ball commentary
export function renderCommentary(sport = 'football') {
  const box = document.getElementById('commentaryBox');
  if (!box) return;
  
  const stream = commentaryData[sport] || commentaryData['football'];
  const item = stream[commIdx % stream.length];
  const ballClass = getCommentaryClass(item.type);
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  box.insertAdjacentHTML('afterbegin', `
    <div class="commentary-item animate-[fadeInDown_0.4s_ease]">
      <div class="ball-icon ${ballClass}">${item.ball}</div>
      <div class="flex-1">
        <div class="text-2xs font-mono text-gray-500 mb-1">${time}</div>
        <div class="text-sm leading-relaxed">${item.text}</div>
      </div>
    </div>
  `);
  
  if (box.children.length > 5) {
    box.lastElementChild.remove();
  }
  commIdx++;
}

// 3. Render Match Statistics Scorecard
export function renderScorecard(sport = 'football') {
  const box = document.getElementById('scorecardBox');
  if (!box) return;
  
  let header = '';
  let rows = [];
  
  if (sport === 'cricket') {
    header = `<tr><th class="text-left py-2">BATSMAN</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>`;
    rows = [
      { name: 'V. Kohli', c1: '78', c2: '64', c3: '8', c4: '2', c5: '121.9' },
      { name: 'R. Sharma', c1: '45', c2: '38', c3: '5', c4: '2', c5: '118.4' },
      { name: 'S. Gill', c1: '32*', c2: '24', c3: '4', c4: '1', c5: '133.3' }
    ];
  } else if (sport === 'football') {
    header = `<tr><th class="text-left py-2">SCORERS</th><th>SHOTS</th><th>ON TGT</th><th>FOULS</th><th>PASSES</th><th>RATING</th></tr>`;
    rows = [
      { name: 'Vinicius Jr. (82\')', c1: '4', c2: '3', c3: '2', c4: '38', c5: '8.8' },
      { name: 'Jude Bellingham (31\')', c1: '2', c2: '1', c3: '1', c4: '54', c5: '7.9' },
      { name: 'Robert Lewandowski (12\')', c1: '3', c2: '2', c3: '0', c4: '15', c5: '7.5' }
    ];
  } else if (sport === 'basketball') {
    header = `<tr><th class="text-left py-2">PLAYER</th><th>PTS</th><th>AST</th><th>REB</th><th>STL</th><th>MIN</th></tr>`;
    rows = [
      { name: 'LeBron James', c1: '32', c2: '8', c3: '7', c4: '2', c5: '36' },
      { name: 'Anthony Davis', c1: '24', c2: '4', c3: '12', c4: '3', c5: '34' },
      { name: 'Jayson Tatum', c1: '28', c2: '6', c3: '9', c4: '1', c5: '38' }
    ];
  } else if (sport === 'tennis') {
    header = `<tr><th class="text-left py-2">METRIC</th><th>SET 1</th><th>SET 2</th><th>SET 3</th><th>ACES</th><th>DF</th></tr>`;
    rows = [
      { name: 'C. Alcaraz', c1: '6', c2: '3', c3: '4', c4: '8', c5: '2' },
      { name: 'N. Djokovic', c1: '4', c2: '6', c3: '3', c4: '5', c5: '4' }
    ];
  }
  
  box.innerHTML = `
    <table class="w-full text-xs border-collapse">
      <thead>
        <tr class="text-cyan-400 font-mono text-[10px] tracking-wider border-b border-cyan-400/20">
          ${header}
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr class="border-b border-white/5">
            <td class="py-3 font-semibold">${r.name}</td>
            <td class="text-center font-mono font-bold text-cyan-400">${r.c1}</td>
            <td class="text-center font-mono">${r.c2}</td>
            <td class="text-center text-orange-400">${r.c3}</td>
            <td class="text-center text-purple-400">${r.c4}</td>
            <td class="text-center text-gray-400">${r.c5}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// 4. Render Sports Newsroom
export async function renderNews(category = 'all') {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  
  const news = await fetchSportsNews(category);
  
  grid.innerHTML = news.map(a => `
    <div class="glass news-card flex flex-col justify-between" onclick="window.open('#', '_self')">
      <div>
        <div class="overflow-hidden rounded-t-[24px]">
          <img class="news-img" src="${a.img}" alt="${a.title}" loading="lazy">
        </div>
        <div class="p-6">
          <div class="flex items-center gap-3 mb-3">
            <span class="category-badge">${a.cat}</span>
            <span class="text-2xs font-mono text-gray-500">${a.time}</span>
          </div>
          <h3 class="font-bold text-base leading-snug mb-2">${a.title}</h3>
          <p class="text-xs text-gray-400 leading-relaxed mb-4">${a.desc.slice(0, 95)}…</p>
        </div>
      </div>
      <div class="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
        <span class="text-[10px] text-gray-500">via ${a.src}</span>
        <span class="text-cyan-400 text-xs font-semibold hover:underline">Read more →</span>
      </div>
    </div>
  `).join('');
}

// 5. Render Standings Points Table
export function renderPointsTable(sport = 'football') {
  const tbody = document.getElementById('pointsTableBody');
  if (!tbody) return;
  
  const headerRow = document.querySelector('#pointsTable thead tr');
  if (sport === 'football') {
    headerRow.innerHTML = `<th>#</th><th>CLUB</th><th>PLD</th><th>WON</th><th>LOST</th><th>DIFF</th><th>PTS</th><th>FORM</th>`;
  } else if (sport === 'cricket') {
    headerRow.innerHTML = `<th>#</th><th>TEAM</th><th>PLD</th><th>WON</th><th>LOST</th><th>NRR</th><th>PTS</th><th>FORM</th>`;
  } else if (sport === 'basketball') {
    headerRow.innerHTML = `<th>#</th><th>FRANCHISE</th><th>GP</th><th>W</th><th>L</th><th>DIFF</th><th>PTS</th><th>FORM</th>`;
  }
  
  const data = pointsData[sport] || pointsData['football'];
  
  tbody.innerHTML = data.map((t, i) => {
    const formDots = t.form.map(r => `
      <span class="pos-dot" style="background:${r === 'W' ? 'var(--neon)' : 'rgba(255,68,68,0.6)'};"></span>
    `).join('');
    
    return `
      <tr class="hover:bg-white/2 transition-colors">
        <td class="p-3 font-mono ${i < 3 ? 'text-cyan-400' : 'text-gray-500'}">${i + 1}</td>
        <td class="p-3 font-bold">${t.team}</td>
        <td class="p-3 text-center font-mono">${t.played}</td>
        <td class="p-3 text-center font-mono text-cyan-400">${t.won}</td>
        <td class="p-3 text-center font-mono text-red-400/80">${t.lost}</td>
        <td class="p-3 text-center font-mono text-xs ${parseFloat(t.nrr) >= 0 ? 'text-cyan-400' : 'text-red-400/80'}">${t.nrr}</td>
        <td class="p-3 pts-cell text-center font-bold">${t.pts}</td>
        <td class="p-3"><div class="pos-bar">${formDots}</div></td>
      </tr>
    `;
  }).join('');
}

// 6. Render Leader Standings / Player Rankings
export function renderRankings(containerId, sport = 'football', columnKey = 'c1') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const sportData = rankData[sport] || rankData['football'];
  const data = sportData[columnKey] || [];
  const maxVal = Math.max(...data.map(d => d.rating), 1);
  
  let metricLabel = 'Rating';
  if (sport === 'tennis') {
    metricLabel = 'Pts';
  } else if (sport === 'football') {
    metricLabel = columnKey === 'c1' ? 'Goals' : columnKey === 'c2' ? 'Assists' : 'CS';
  } else if (sport === 'basketball') {
    metricLabel = columnKey === 'c1' ? 'PPG' : columnKey === 'c2' ? 'APG' : 'RPG';
  } else if (sport === 'cricket') {
    metricLabel = columnKey === 'c3' ? 'Points' : 'Rating';
  }
  
  container.innerHTML = data.map((r, i) => `
    <div class="rank-row">
      <div class="rank-num ${i === 0 ? 'top' : ''}">${i + 1}</div>
      <div class="flex-1">
        <div class="font-semibold text-sm">${r.name}</div>
        <div class="text-[10px] text-gray-500 font-mono">${r.country} · ${r.rating} ${metricLabel}</div>
        <div class="rank-bar">
          <div class="rank-fill" data-w="${((r.rating / maxVal) * 100).toFixed(0)}"></div>
        </div>
      </div>
    </div>
  `).join('');
  
  setTimeout(() => {
    container.querySelectorAll('.rank-fill').forEach(el => {
      el.style.width = el.getAttribute('data-w') + '%';
    });
  }, 300);
}

// 7. Render dynamic Charts via Chart.js
export function setupCharts(sport = 'football') {
  const runsCtx = document.getElementById('runsChart')?.getContext('2d');
  const wicketsCtx = document.getElementById('wicketsChart')?.getContext('2d');
  
  if (!runsCtx || !wicketsCtx) return;
  
  // Destroy older instances to rebuild clean new charts
  if (chartsInstance.runs) chartsInstance.runs.destroy();
  if (chartsInstance.wickets) chartsInstance.wickets.destroy();
  
  let labelRuns = 'Goals — 2025/26 Season';
  let labelsRuns = ['Erling Haaland', 'K. Mbappe', 'Harry Kane', 'Vinicius Jr.', 'M. Salah'];
  let dataRuns = [35, 28, 31, 24, 22];
  let bgColors = ['rgba(59, 130, 246, 0.7)', 'rgba(255, 107, 0, 0.7)', 'rgba(124, 58, 237, 0.7)', 'rgba(0, 255, 179, 0.4)', 'rgba(255, 107, 0, 0.4)'];
  
  let labelWickets = 'Shots / Game (Monthly)';
  let labelWicketsDataset1 = 'Man City';
  let labelWicketsDataset2 = 'Real Madrid';
  let dataWickets1 = [16, 18, 15, 21, 19, 22];
  let dataWickets2 = [14, 15, 18, 17, 20, 23];
  
  if (sport === 'cricket') {
    labelRuns = 'Runs — 2025 Season';
    labelsRuns = ['V. Kohli', 'R. Sharma', 'S. Gill', 'J. Buttler', 'Joe Root'];
    dataRuns = [612, 518, 703, 489, 541];
    labelWickets = 'Wickets Over Time (Monthly)';
    labelWicketsDataset1 = 'Jasprit Bumrah';
    labelWicketsDataset2 = 'Mitchell Starc';
    dataWickets1 = [4, 6, 5, 8, 7, 9];
    dataWickets2 = [5, 4, 7, 6, 5, 8];
  } else if (sport === 'basketball') {
    labelRuns = 'Points Per Game (PPG)';
    labelsRuns = ['Joel Embiid', 'Luka Doncic', 'G. Antetokounmpo', 'S. Gilgeous-Alex', 'LeBron James'];
    dataRuns = [34.7, 33.9, 30.4, 30.1, 25.7];
    labelWickets = 'Three-Pointers Attempted (Monthly)';
    labelWicketsDataset1 = 'Steph Curry';
    labelWicketsDataset2 = 'Luka Doncic';
    dataWickets1 = [11, 12, 10, 14, 13, 15];
    dataWickets2 = [9, 8, 10, 9, 11, 10];
  } else if (sport === 'tennis') {
    labelRuns = 'Aces Recorded (Recent Matches)';
    labelsRuns = ['J. Sinner', 'C. Alcaraz', 'A. Zverev', 'D. Medvedev', 'N. Djokovic'];
    dataRuns = [120, 95, 160, 110, 85];
    labelWickets = 'First Serve % over Tournaments';
    labelWicketsDataset1 = 'Novak Djokovic';
    labelWicketsDataset2 = 'Carlos Alcaraz';
    dataWickets1 = [68, 70, 65, 72, 71, 74];
    dataWickets2 = [62, 64, 61, 66, 63, 68];
  }
  
  const isLight = document.body.classList.contains('light');
  const textColor = isLight ? 'rgba(10, 15, 30, 0.6)' : 'rgba(232, 244, 248, 0.6)';
  const gridColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';
  
  chartsInstance.runs = new Chart(runsCtx, {
    type: 'bar',
    data: {
      labels: labelsRuns,
      datasets: [{
        label: labelRuns,
        data: dataRuns,
        backgroundColor: bgColors,
        borderRadius: 12
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: textColor }, grid: { display: false } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } }
      },
      plugins: {
        legend: { labels: { color: textColor } }
      }
    }
  });
  
  chartsInstance.wickets = new Chart(wicketsCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: labelWicketsDataset1,
          data: dataWickets1,
          borderColor: '#00FFB3',
          backgroundColor: 'rgba(0, 255, 179, 0.04)',
          tension: 0.45,
          fill: true,
          pointBackgroundColor: '#00FFB3',
          pointRadius: 5
        },
        {
          label: labelWicketsDataset2,
          data: dataWickets2,
          borderColor: '#FF6B00',
          backgroundColor: 'rgba(255, 107, 0, 0.04)',
          tension: 0.45,
          fill: true,
          pointBackgroundColor: '#FF6B00',
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: textColor }, grid: { display: false } },
        y: { ticks: { color: textColor }, grid: { color: gridColor } }
      },
      plugins: {
        legend: { labels: { color: textColor } }
      }
    }
  });
}

// 8. Dynamic Poll Loading
export function renderPoll(sport = 'football') {
  const pollDiv = document.getElementById('pollOptions');
  if (!pollDiv) return;
  
  const options = {
    football: [
      { name: 'Real Madrid', pct: 45 },
      { name: 'Manchester City', pct: 35 },
      { name: 'Arsenal', pct: 12 },
      { name: 'Barcelona', pct: 8 }
    ],
    cricket: [
      { name: 'India', pct: 64 },
      { name: 'Australia', pct: 20 },
      { name: 'England', pct: 10 },
      { name: 'South Africa', pct: 6 }
    ],
    basketball: [
      { name: 'Boston Celtics', pct: 48 },
      { name: 'Denver Nuggets', pct: 32 },
      { name: 'Dallas Mavericks', pct: 15 },
      { name: 'Lakers', pct: 5 }
    ],
    tennis: [
      { name: 'Jannik Sinner', pct: 42 },
      { name: 'Carlos Alcaraz', pct: 38 },
      { name: 'Novak Djokovic', pct: 15 },
      { name: 'Alexander Zverev', pct: 5 }
    ]
  };
  
  const list = options[sport] || options['football'];
  pollDiv.innerHTML = list.map((opt, i) => `
    <button class="poll-btn" onclick="window.votePoll(${i}, '${sport}')">${opt.name}</button>
  `).join('');
  
  const resDiv = document.getElementById('pollResult');
  if (resDiv) resDiv.innerHTML = '';
}

window.votePoll = function(idx, sport) {
  const resDiv = document.getElementById('pollResult');
  if (!resDiv) return;
  
  const options = {
    football: [
      { name: 'Real Madrid', pct: 46 },
      { name: 'Manchester City', pct: 34 },
      { name: 'Arsenal', pct: 12 },
      { name: 'Barcelona', pct: 8 }
    ],
    cricket: [
      { name: 'India', pct: 65 },
      { name: 'Australia', pct: 19 },
      { name: 'England', pct: 10 },
      { name: 'South Africa', pct: 6 }
    ],
    basketball: [
      { name: 'Boston Celtics', pct: 49 },
      { name: 'Denver Nuggets', pct: 31 },
      { name: 'Dallas Mavericks', pct: 15 },
      { name: 'Lakers', pct: 5 }
    ],
    tennis: [
      { name: 'Jannik Sinner', pct: 43 },
      { name: 'Carlos Alcaraz', pct: 37 },
      { name: 'Novak Djokovic', pct: 15 },
      { name: 'Alexander Zverev', pct: 5 }
    ]
  };
  
  const list = options[sport] || options['football'];
  
  resDiv.innerHTML = `
    <div class="text-xs text-cyan-400 mb-2 mt-4 font-semibold">✅ Vote Recorded — MSA Sports Pulse</div>
    ${list.map(pt => `
      <div class="mb-3">
        <div class="flex justify-between text-xs mb-1">
          <span>${pt.name}</span>
          <span class="font-mono text-cyan-400">${pt.pct}%</span>
        </div>
        <div class="poll-bar-bg">
          <div class="poll-bar-fill" data-w="${pt.pct}"></div>
        </div>
      </div>
    `).join('')}
  `;
  
  setTimeout(() => {
    document.querySelectorAll('.poll-bar-fill').forEach(el => {
      el.style.width = el.getAttribute('data-w') + '%';
    });
  }, 50);
};

// 9. AI Prediction update
export function updateAIPrediction() {
  const el = document.getElementById('aiPrediction');
  if (!el) return;
  
  el.innerHTML = `
    <div class="ai-typing">
      <div class="ai-dot"></div>
      <div class="ai-dot"></div>
      <div class="ai-dot"></div>
    </div>
  `;
  
  setTimeout(() => {
    const text = predictions[Math.floor(Math.random() * predictions.length)];
    el.innerHTML = `
      <div class="text-[10px] text-cyan-400 mb-2 font-mono tracking-widest uppercase">MSA SPORT NEURAL v4.2</div>
      <div class="text-xs leading-relaxed">${text}</div>
    `;
  }, 1200);
}

// 10. Voice Recognition search interface
export function initVoiceSearch() {
  const vBtn = document.getElementById('voiceBtn');
  const statusSpan = document.getElementById('voiceStatus');
  
  if ('webkitSpeechRecognition' in window && vBtn) {
    const rec = new webkitSpeechRecognition();
    rec.lang = 'en-IN';
    rec.continuous = false;
    
    vBtn.onclick = () => {
      rec.start();
      if (statusSpan) statusSpan.textContent = '🎤 Listening...';
    };
    
    rec.onresult = e => {
      const txt = e.results[0][0].transcript.toLowerCase();
      if (statusSpan) statusSpan.textContent = `"${txt}"`;
      
      let sportMatch = 'all';
      if (txt.includes('football') || txt.includes('soccer')) sportMatch = 'football';
      else if (txt.includes('cricket')) sportMatch = 'cricket';
      else if (txt.includes('basketball') || txt.includes('nba')) sportMatch = 'basketball';
      else if (txt.includes('tennis')) sportMatch = 'tennis';
      
      if (sportMatch !== 'all') {
        window.changeActiveSport(sportMatch);
      } else {
        renderNews('all');
      }
    };
    
    rec.onend = () => {
      setTimeout(() => {
        if (statusSpan) statusSpan.textContent = 'click mic → speak sport';
      }, 2500);
    };
  } else if (vBtn) {
    vBtn.style.opacity = '0.5';
    vBtn.title = 'Speech API not supported in this browser';
  }
}

// 11. Fan Comments
const sampleChats = {
  football: ['🔥 Hala Madrid!', 'Messi is still the GOAT 🐐', 'Man City defense looks shaky this month.', 'Lewandowski is aging like fine wine.'],
  cricket: ['🔥 India all the way!', 'Kohli is the ultimate king 👑', 'Bumrah is simply unplayable!', 'IPL final predicts are crazy.'],
  basketball: ['Celtics repeat is incoming! ☘️', 'Jokic is a basketball cheat code.', 'Lakers need another trade ASAP.', 'Luka Magic is unstoppable.'],
  tennis: ['Sinner is currently invincible.', 'Alcaraz has the best drop shots.', 'Novak will get slam number 25 at Wimbledon.', 'Women\'s tennis is so unpredictable!']
};

export function initFanChat(sport = 'football') {
  const chatBox = document.getElementById('fanComments');
  if (!chatBox) return;
  
  chatBox.innerHTML = '';
  const initial = sampleChats[sport] || sampleChats['football'];
  initial.forEach(msg => {
    chatBox.insertAdjacentHTML('beforeend', `<div class="chat-msg chat-bot text-[11px]">${msg}</div>`);
  });
  
  // Detach previous listeners and attach clean new ones
  const postBtn = document.getElementById('postComment');
  const input = document.getElementById('commentInput');
  
  if (postBtn && input) {
    // Clone to reset event listeners
    const newBtn = postBtn.cloneNode(true);
    postBtn.parentNode.replaceChild(newBtn, postBtn);
    
    newBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) {
        chatBox.insertAdjacentHTML('beforeend', `<div class="chat-msg chat-user text-[11px]">${val}</div>`);
        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = '';
      }
    });
  }
}

// 12. Chatbot popup
export function initChatbot() {
  const btn = document.getElementById('chatbotBtn');
  const win = document.getElementById('chatWindow');
  const send = document.getElementById('sendChat');
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');
  
  if (btn && win) {
    btn.onclick = () => win.classList.toggle('show');
  }
  
  if (send && input && msgs) {
    const handleSend = () => {
      const msg = input.value.trim();
      if (!msg) return;
      
      msgs.insertAdjacentHTML('beforeend', `<div class="chat-msg chat-user">${msg}</div>`);
      input.value = '';
      msgs.scrollTop = msgs.scrollHeight;
      
      setTimeout(() => {
        const replies = [
          "⚽ Use the Sport selectors to view different statistics and schedules!",
          "🏀 Chatbot response: NBA box scores are loaded in the Statistics widget.",
          "🎾 Grand Slam match schedules are synced real-time in our Live Hub.",
          "🏏 AI Predictor: India has a 65% win probability today in the live match!"
        ];
        const botReply = replies[Math.floor(Math.random() * replies.length)];
        msgs.insertAdjacentHTML('beforeend', `
          <div class="chat-msg chat-bot">
            <b class="text-cyan-400">MSA Bot:</b> ${botReply}
          </div>
        `);
        msgs.scrollTop = msgs.scrollHeight;
      }, 600);
    };
    
    send.onclick = handleSend;
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

// Global hook to switch active sports theme across components
window.changeActiveSport = function(sport) {
  activeSport = sport;
  
  // Highlight navigation controls/buttons
  document.querySelectorAll('.sport-selector').forEach(btn => {
    if (btn.dataset.sport === sport) {
      btn.classList.add('active', 'bg-cyan-400/10', 'border-cyan-400', 'text-cyan-400');
      btn.classList.remove('border-white/10', 'text-gray-400');
    } else {
      btn.classList.remove('active', 'bg-cyan-400/10', 'border-cyan-400', 'text-cyan-400');
      btn.classList.add('border-white/10', 'text-gray-400');
    }
  });

  // Switch ThreeJS ball model
  switchSport(sport);

  // Update rankings headers dynamically
  const titles = {
    football: [
      { name: 'Top Goals Scored', icon: 'fa-futbol' },
      { name: 'Top Assists Leaders', icon: 'fa-running' },
      { name: 'Clean Sheets / Saves', icon: 'fa-hand-paper' }
    ],
    cricket: [
      { name: 'Test Batting Ranks', icon: 'fa-cricket-bat-ball' },
      { name: 'ODI Bowling Ranks', icon: 'fa-baseball-ball' },
      { name: 'T20 Allrounders', icon: 'fa-star' }
    ],
    basketball: [
      { name: 'PPG Points Leaders', icon: 'fa-basketball-ball' },
      { name: 'APG Assists Leaders', icon: 'fa-hands-helping' },
      { name: 'RPG Rebounds Leaders', icon: 'fa-compress-alt' }
    ],
    tennis: [
      { name: 'ATP Men\'s Singles', icon: 'fa-circle' },
      { name: 'WTA Women\'s Singles', icon: 'fa-circle' },
      { name: 'ATP Doubles Leaders', icon: 'fa-users' }
    ]
  };

  const list = titles[sport] || titles['football'];
  const t1 = document.getElementById('rankHeader1');
  const t2 = document.getElementById('rankHeader2');
  const t3 = document.getElementById('rankHeader3');
  
  if (t1) t1.innerHTML = `<i class="fas ${list[0].icon}" style="color:var(--neon);"></i> ${list[0].name}`;
  if (t2) t2.innerHTML = `<i class="fas ${list[1].icon}" style="color:var(--neon2);"></i> ${list[1].name}`;
  if (t3) t3.innerHTML = `<i class="fas ${list[2].icon}" style="color:var(--neon3);"></i> ${list[2].name}`;

  // Update DOM components
  renderMatches(sport);
  renderScorecard(sport);
  renderPointsTable(sport);
  renderRankings('testRankings', sport, 'c1');
  renderRankings('odiRankings', sport, 'c2');
  renderRankings('t20Rankings', sport, 'c3');
  setupCharts(sport);
  renderPoll(sport);
  initFanChat(sport);
  updateAIPrediction();
  
  // Keep active category filter aligned in Newsroom
  renderNews(sport);
};

// Global hook for selecting a card in the Live Match Hub
window.selectActiveMatch = function(matchId, sport) {
  // Switch to the match's sport
  window.changeActiveSport(sport);
  
  // Reset index to trigger new commentary elements
  commIdx = 0;
  const box = document.getElementById('commentaryBox');
  if (box) box.innerHTML = '';
  renderCommentary(sport);
};
