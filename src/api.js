// MSA Sport Informer Data Service Layer

// 1. Mock Sports Matches Database
export const matchData = {
  all: [
    { id: 'f1', sport: 'football', name: 'Real Madrid vs Barcelona', score: '2 - 1', status: 'LIVE', team1: 'Real Madrid', team2: 'Barcelona', team1score: '2', team2score: '1', time: '82\'' },
    { id: 'c1', sport: 'cricket', name: 'IND vs AUS', score: '298/6 (47.3 ov)', status: 'LIVE', team1: 'India', team2: 'Australia', team1score: '298/6', team2score: '318', time: 'India needs 21 off 15' },
    { id: 'b1', sport: 'basketball', name: 'Lakers vs Celtics', score: '104 - 101', status: 'LIVE', team1: 'Lakers', team2: 'Celtics', team1score: '104', team2score: '101', time: 'Q4 1:20' },
    { id: 't1', sport: 'tennis', name: 'Alcaraz vs Djokovic', score: '6-4, 3-6, 4-3', status: 'LIVE', team1: 'C. Alcaraz', team2: 'N. Djokovic', team1score: '4', team2score: '3', time: 'Set 3, Game 8' }
  ],
  football: [
    { id: 'f1', sport: 'football', name: 'Real Madrid vs Barcelona', score: '2 - 1', status: 'LIVE', team1: 'Real Madrid', team2: 'Barcelona', team1score: '2', team2score: '1', time: '82\'' },
    { id: 'f2', sport: 'football', name: 'Man City vs Liverpool', score: '0 - 0', status: '3:00 PM', team1: 'Man City', team2: 'Liverpool', team1score: '–', team2score: '–', time: 'Today' },
    { id: 'f3', sport: 'football', name: 'Arsenal vs Chelsea', score: '3 - 1', status: 'FT', team1: 'Arsenal', team2: 'Chelsea', team1score: '3', team2score: '1', time: 'Completed' }
  ],
  cricket: [
    { id: 'c1', sport: 'cricket', name: 'IND vs AUS', score: '298/6 (47.3 ov)', status: 'LIVE', team1: 'India', team2: 'Australia', team1score: '298/6', team2score: '318', time: 'India needs 21 off 15' },
    { id: 'c2', sport: 'cricket', name: 'ENG vs SA', score: '189/3 (32.1 ov)', status: 'LIVE', team1: 'England', team2: 'S. Africa', team1score: '189/3', team2score: '–', time: 'Day 2, Session 3' },
    { id: 'c3', sport: 'cricket', name: 'PAK vs NZ', score: 'Yet to start', status: '5:30 PM', team1: 'Pakistan', team2: 'New Zealand', team1score: '–', team2score: '–', time: 'Today' }
  ],
  basketball: [
    { id: 'b1', sport: 'basketball', name: 'Lakers vs Celtics', score: '104 - 101', status: 'LIVE', team1: 'Lakers', team2: 'Celtics', team1score: '104', team2score: '101', time: 'Q4 1:20' },
    { id: 'b2', sport: 'basketball', name: 'Warriors vs Mavericks', score: '118 - 122', status: 'FT', team1: 'Warriors', team2: 'Mavericks', team1score: '118', team2score: '122', time: 'Completed' },
    { id: 'b3', sport: 'basketball', name: 'Bucks vs 76ers', score: '0 - 0', status: 'Tomorrow', team1: 'Bucks', team2: '76ers', team1score: '–', team2score: '–', time: '6:30 AM' }
  ],
  tennis: [
    { id: 't1', sport: 'tennis', name: 'Alcaraz vs Djokovic', score: '6-4, 3-6, 4-3', status: 'LIVE', team1: 'C. Alcaraz', team2: 'N. Djokovic', team1score: '4', team2score: '3', time: 'Set 3, Game 8' },
    { id: 't2', sport: 'tennis', name: 'Sinner vs Medvedev', score: '2-0', status: 'FT', team1: 'J. Sinner', team2: 'D. Medvedev', team1score: '6-3, 6-4', team2score: '0', time: 'Completed' },
    { id: 't3', sport: 'tennis', name: 'Swiatek vs Sabalenka', score: 'Yet to start', status: '8:00 PM', team1: 'I. Swiatek', team2: 'A. Sabalenka', team1score: '–', team2score: '–', time: 'Today' }
  ]
};

// 2. Mock News Articles Database
export const newsData = [
  { id: 1, title: 'Champions League: Real Madrid wins thriller at El Clasico', desc: 'A late Vinicius Jr. strike ensures victory for Madrid in a heated, star-studded derby.', cat: 'Football', img: 'https://picsum.photos/id/102/600/340', time: '1h ago', src: 'SportyNews' },
  { id: 2, title: 'Kohli confirms availability for 2026 T20 World Cup', desc: 'Virat announces full fitness and focus to secure the next world title for India.', cat: 'Cricket', img: 'https://picsum.photos/id/160/600/340', time: '2h ago', src: 'MSA Insider' },
  { id: 3, title: 'LeBron James hits career-defining buzzer beater vs Celtics', desc: 'Lakers clinch victory as LeBron converts a 30-foot fallaway jumper at the final whistle.', cat: 'Basketball', img: 'https://picsum.photos/id/1062/600/340', time: '4h ago', src: 'HoopsWire' },
  { id: 4, title: 'Alcaraz defeats Djokovic in epic Wimbledon Final rematch', desc: 'Carlos Alcaraz clinches a 5-set nailbiter against the veteran Novak Djokovic at the exhibition.', cat: 'Tennis', img: 'https://picsum.photos/id/26/600/340', time: '5h ago', src: 'TennisNet' },
  { id: 5, title: 'Dream11 signs MSA creator Md Sadique Amin as tech consultant', desc: 'Official collaboration announced targeting advanced neural networks for predictive sports statistics.', cat: 'Tech', img: 'https://picsum.photos/id/96/600/340', time: '1d ago', src: 'MSA Tech' },
  { id: 6, title: 'Formula 1: Hamilton wins Monaco GP after rain chaos', desc: 'Lewis Hamilton navigates torrential rain and pit-stop strategies to win his first race of 2026.', cat: 'Formula 1', img: 'https://picsum.photos/id/65/600/340', time: '2d ago', src: 'F1Pulse' }
];

// 3. Stats & Rankings Database
export const rankData = {
  football: {
    c1: [
      { name: 'Erling Haaland', country: 'NOR', rating: 35 },
      { name: 'Kylian Mbappe', country: 'FRA', rating: 28 },
      { name: 'Vinicius Jr.', country: 'BRA', rating: 24 },
      { name: 'Jude Bellingham', country: 'ENG', rating: 19 }
    ],
    c2: [
      { name: 'Kevin De Bruyne', country: 'BEL', rating: 18 },
      { name: 'Mohamed Salah', country: 'EGY', rating: 15 },
      { name: 'Martin Odegaard', country: 'NOR', rating: 14 },
      { name: 'Bruno Fernandes', country: 'POR', rating: 12 }
    ],
    c3: [
      { name: 'Thibaut Courtois', country: 'BEL', rating: 16 },
      { name: 'Marc-Andre ter Stegen', country: 'GER', rating: 14 },
      { name: 'Ederson Moraes', country: 'BRA', rating: 13 },
      { name: 'Alisson Becker', country: 'BRA', rating: 12 }
    ]
  },
  cricket: {
    c1: [
      { name: 'Joe Root', country: 'ENG', rating: 923 },
      { name: 'Marnus Labuschagne', country: 'AUS', rating: 878 },
      { name: 'Virat Kohli', country: 'IND', rating: 861 },
      { name: 'Steve Smith', country: 'AUS', rating: 839 }
    ],
    c2: [
      { name: 'Jasprit Bumrah', country: 'IND', rating: 849 },
      { name: 'Shaheen Afridi', country: 'PAK', rating: 782 },
      { name: 'Mitchell Starc', country: 'AUS', rating: 765 },
      { name: 'Trent Boult', country: 'NZ', rating: 741 }
    ],
    c3: [
      { name: 'Hardik Pandya', country: 'IND', rating: 302 },
      { name: 'Shakib Al Hasan', country: 'BAN', rating: 281 },
      { name: 'Ben Stokes', country: 'ENG', rating: 268 },
      { name: 'Liam Livingstone', country: 'ENG', rating: 255 }
    ]
  },
  basketball: {
    c1: [
      { name: 'Joel Embiid', country: 'USA', rating: 34.7 },
      { name: 'Luka Doncic', country: 'SLO', rating: 33.9 },
      { name: 'Giannis Antetokounmpo', country: 'GRE', rating: 30.4 },
      { name: 'Shai Gilgeous-Alexander', country: 'CAN', rating: 30.1 }
    ],
    c2: [
      { name: 'Tyrese Haliburton', country: 'USA', rating: 10.9 },
      { name: 'Luka Doncic', country: 'SLO', rating: 9.8 },
      { name: 'Nikola Jokic', country: 'SRB', rating: 9.0 },
      { name: 'LeBron James', country: 'USA', rating: 8.3 }
    ],
    c3: [
      { name: 'Domantas Sabonis', country: 'LTU', rating: 13.7 },
      { name: 'Rudy Gobert', country: 'FRA', rating: 12.9 },
      { name: 'Anthony Davis', country: 'USA', rating: 12.6 },
      { name: 'Nikola Jokic', country: 'SRB', rating: 12.4 }
    ]
  },
  tennis: {
    c1: [
      { name: 'Jannik Sinner', country: 'ITA', rating: 9525 },
      { name: 'Carlos Alcaraz', country: 'ESP', rating: 8580 },
      { name: 'Novak Djokovic', country: 'SRB', rating: 7160 },
      { name: 'Alexander Zverev', country: 'GER', rating: 6885 }
    ],
    c2: [
      { name: 'Iga Swiatek', country: 'POL', rating: 11695 },
      { name: 'Aryna Sabalenka', country: 'BLR', rating: 8130 },
      { name: 'Coco Gauff', country: 'USA', rating: 7638 },
      { name: 'Elena Rybakina', country: 'KAZ', rating: 5671 }
    ],
    c3: [
      { name: 'Matthew Ebden', country: 'AUS', rating: 8080 },
      { name: 'Rohan Bopanna', country: 'IND', rating: 8080 },
      { name: 'Rajeev Ram', country: 'USA', rating: 7920 },
      { name: 'Joe Salisbury', country: 'GBR', rating: 7920 }
    ]
  }
};

// 4. Standings Points Table Data
export const pointsData = {
  football: [
    { team: 'Real Madrid', played: 38, won: 29, lost: 3, nrr: '+54', pts: 95, form: ['W', 'W', 'D', 'W', 'W'] },
    { team: 'Barcelona', played: 38, won: 26, lost: 5, nrr: '+42', pts: 85, form: ['W', 'L', 'W', 'W', 'W'] },
    { team: 'Girona', played: 38, won: 25, lost: 7, nrr: '+39', pts: 81, form: ['L', 'W', 'W', 'L', 'W'] },
    { team: 'Atletico Madrid', played: 38, won: 24, lost: 10, nrr: '+26', pts: 76, form: ['W', 'W', 'L', 'W', 'L'] }
  ],
  cricket: [
    { team: 'CSK', played: 7, won: 6, lost: 1, nrr: '+1.25', pts: 12, form: ['W', 'W', 'W', 'L', 'W'] },
    { team: 'MI', played: 7, won: 5, lost: 2, nrr: '+0.62', pts: 10, form: ['W', 'L', 'W', 'W', 'W'] },
    { team: 'RCB', played: 7, won: 4, lost: 3, nrr: '+0.22', pts: 8, form: ['L', 'W', 'W', 'L', 'W'] },
    { team: 'KKR', played: 7, won: 3, lost: 4, nrr: '-0.05', pts: 6, form: ['W', 'L', 'L', 'W', 'L'] }
  ],
  basketball: [
    { team: 'Boston Celtics', played: 82, won: 64, lost: 18, nrr: '+11.3', pts: 64, form: ['W', 'W', 'W', 'W', 'L'] },
    { team: 'OKC Thunder', played: 82, won: 57, lost: 25, nrr: '+7.4', pts: 57, form: ['W', 'L', 'W', 'W', 'W'] },
    { team: 'Denver Nuggets', played: 82, won: 57, lost: 25, nrr: '+5.3', pts: 57, form: ['L', 'W', 'L', 'W', 'W'] },
    { team: 'Minnesota Timberwolves', played: 82, won: 56, lost: 26, nrr: '+6.5', pts: 56, form: ['W', 'L', 'W', 'L', 'W'] }
  ]
};

// 5. Multi-sports Live Commentary Stream
export const commentaryData = {
  football: [
    { ball: 'Goal', type: 'six', text: 'GOAL! Vinicius Jr. cuts inside and curls a magnificent shot into the top corner!' },
    { ball: 'Card', type: 'wicket', text: 'RED CARD! Araujo commits a sliding tackle from behind. Barcelona down to 10 men!' },
    { ball: 'Shot', type: 'four', text: 'CHANCE! Bellingham strikes it from distance, but Ter Stegen tips it over the bar!' },
    { ball: 'Foul', type: 'dot', text: 'Foul committed by De Jong in midfield. Real Madrid awarded a free kick.' }
  ],
  cricket: [
    { ball: '6', type: 'six', text: 'SIX! Kohli launches it over mid-wicket! Ball lands deep into the stands!' },
    { ball: 'W', type: 'wicket', text: 'WICKET! Warner caught at deep square-leg. Bumrah strikes again!' },
    { ball: '4', type: 'four', text: 'FOUR! Flicked off the pads, Sharma races it to the fine-leg boundary.' },
    { ball: '0', type: 'dot', text: 'Dot ball. Good length outside off stump, left alone by the batsman.' }
  ],
  basketball: [
    { ball: '3Pt', type: 'six', text: 'THREE POINTER! LeBron fires from deep downtown and splashes it!' },
    { ball: 'TO', type: 'wicket', text: 'TURNOVER! Brown loses handle of the ball, stolen by Davis!' },
    { ball: '2Pt', type: 'four', text: 'SLAM DUNK! Tatum drives down the lane and posters the defender!' },
    { ball: 'Foul', type: 'dot', text: 'Personal foul called on Holiday for blocking. Two free throws coming up.' }
  ],
  tennis: [
    { ball: 'Ace', type: 'six', text: 'ACE! Sinner launches a 135mph serve down the T, leaving Alcaraz frozen!' },
    { ball: 'Out', type: 'wicket', text: 'UNFORCED ERROR! Djokovic hits a backhand slice wide of the line. Set point Sinner!' },
    { ball: 'Rly', type: 'four', text: 'WINNER! Spectacular crosscourt forehand from Alcaraz after a grueling 24-shot rally!' },
    { ball: 'Flt', type: 'dot', text: 'Double fault. Sabalenka sends her second serve directly into the net.' }
  ]
};

// 6. AI Interactive Predictions Database
export const predictions = [
  "🧠 Real Madrid win probability 68% in El Clasico, predicted score 3 - 1.",
  "🌧 Rain delay forecast 30% for IND vs AUS. DLS target adjustments expected.",
  "🏀 Lakers average 115.4 PPG vs Celtics; win edge 54% at Crypto Arena.",
  "🎾 Pitch/Court speed is fast. Advantage Sinner's flat-ground strokes vs Djokovic.",
  "⚡ Erling Haaland is on fire (7 goals in last 4 games) — scoring today recommended.",
  "🏏 Chasing team won 62% of T20s on this ground. Bowling first is crucial."
];

// API Fetches Mock wrappers (can connect to real REST endpoints easily)
export async function fetchLiveScores(sport = 'all') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matchData[sport] || matchData['all']);
    }, 300);
  });
}

export async function fetchSportsNews(category = 'all') {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category.toLowerCase() === 'all') {
        resolve(newsData);
      } else {
        resolve(newsData.filter(n => n.cat.toLowerCase() === category.toLowerCase()));
      }
    }, 350);
  });
}
