import { useState } from 'react';
import Calendar from 'react-calendar';
// カレンダーの基本デザイン（CSS）を読み込む
import 'react-calendar/dist/Calendar.css';
import './App.css';

// 1. VALORANTの大会データ（Valorant Champions 2026）
const matchData = [
  {
    id: 1,
    date: '2026-09-24',
    event: 'Valorant Champions 2026 - Group Stage',
    team1: 'Team Liquid',
    team2: 'Paper Rex',
    result: '1 - 2',
    team1Logo: '/tl.png',
    team2Logo: '/prx.png'
  },
  {
    id: 2,
    date: '2026-10-10',
    event: 'Valorant Champions 2026 - Upper Semifinals',
    team1: 'NRG',
    team2: 'LOUD',
    result: '1 - 2',
    team1Logo: '/nrg.png',
    team2Logo: '/loud.png'
  },
  {
    id: 3,
    date: '2026-10-16',
    event: 'Valorant Champions 2026 - Upper Final',
    team1: 'Team Vitality',
    team2: 'LOUD',
    result: '1 - 2',
    team1Logo: '/vit.png',
    team2Logo: '/loud.png'
  },
  {
    id: 4,
    date: '2026-10-17',
    event: 'Valorant Champions 2026 - Lower Final',
    team1: 'Team Vitality',
    team2: '100 Thieves',
    result: '3 - 1',
    team1Logo: '/vit.png',
    team2Logo: '/100t.png'
  },
  {
    id: 5,
    date: '2026-10-18',
    event: 'Valorant Champions 2026 - Grand Final',
    team1: 'LOUD',
    team2: 'Team Vitality',
    result: '3 - 1',
    team1Logo: '/loud.png',
    team2Logo: '/vit.png'
  }
];
function App() {
  // 選択された日付を記憶する場所（最初は「今日」にする）
  const [date, setDate] = useState(new Date('2026-10-18'));
  // 2. カレンダーで選択した日付を 'YYYY-MM-DD' 形式に変換
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // 3. 選択した日付と一致する試合だけを探し出す
  const selectedMatches = matchData.filter(match => match.date === formattedDate);

  return (
    <div className="app-wrapper">
      <h1>VALORANT カレンダー</h1>
      
      {/* カレンダーを表示するタグ */}
      <Calendar 
        onChange={(newDate) => setDate(newDate as Date)} 
        value={date} 
        // ▼▼ ここから下の行を追加 ▼▼
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const checkDate = `${y}-${m}-${d}`;

            const match = matchData.find(match => match.date === checkDate);
if (match) {
  return (
    <div className="calendar-tile-content">
      {/* スマホ用の赤い点 */}
      <div className="calendar-marker" />
      {/* PC用のチームロゴ */}
      <div className="calendar-logos">
        <img src={match.team1Logo} alt="Team 1" />
        <span>VS</span>
        <img src={match.team2Logo} alt="Team 2" />
      </div>
    </div>
  );
}
            
          }
          return null;
        }}
        // ▲▲ ここまで追加 ▲▲
      />
      {/* 4. 試合結果を表示するエリア */}
      <div className="match-list-container">
        <h2>{year}年{month}月{day}日の試合</h2>
        
        {selectedMatches.length > 0 ? (
          <ul>
            {selectedMatches.map((match) => (
              <li key={match.id} className="match-list-item">
                <div>
                  <div className="match-event">{match.event}</div>
                  <div className="team-name">{match.team1} vs {match.team2}</div>
                </div>
                <div className="team-logo-container">
                  <img src={match.team1Logo} alt={match.team1} className="team-logo"/>
                  <span>VS</span>
                  <img src={match.team2Logo} alt={match.team2} className="team-logo"/>
                </div>
                <div className="match-time">{match.result}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>この日の試合はありません。</p>
        )}
      </div>

    </div>
  );
}

export default App;