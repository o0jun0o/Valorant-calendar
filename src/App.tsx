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
    team1Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=TL',
    team2Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=PRX'
  },
  {
    id: 2,
    date: '2026-10-10',
    event: 'Valorant Champions 2026 - Upper Semifinals',
    team1: 'NRG',
    team2: 'LOUD',
    result: '1 - 2',
    team1Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=NRG',
    team2Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=LOUD'
  },
  {
    id: 3,
    date: '2026-10-16',
    event: 'Valorant Champions 2026 - Upper Final',
    team1: 'Team Vitality',
    team2: 'LOUD',
    result: '1 - 2',
    team1Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=Team Vitality',
    team2Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=LOUD'
  },
  {
    id: 4,
    date: '2026-10-17',
    event: 'Valorant Champions 2026 - Lower Final',
    team1: 'Team Vitality',
    team2: '100 Thieves',
    result: '3 - 1',
    team1Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=Team Vitality',
    team2Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=100 Thieves'
  },
  {
    id: 5,
    date: '2026-10-18',
    event: 'Valorant Champions 2026 - Grand Final',
    team1: 'LOUD',
    team2: 'Team Vitality',
    result: '3 - 1',
    team1Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=LOUD',
    team2Logo: 'https://placehold.co/40x40/1f2326/ece8e1?text=Team Vitality'
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
    <div style={{ padding: '20px' }}>
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

            const hasMatch = matchData.some(match => match.date === checkDate);

            if (hasMatch) {
              return (
                <div style={{
                  height: '6px',
                  width: '6px',
                  backgroundColor: '#ff4655',
                  borderRadius: '50%',
                  margin: 'auto',
                  marginTop: '4px'
                }} />
              );
            }
          }
          return null;
        }}
        // ▲▲ ここまで追加 ▲▲
      />
      {/* 4. 試合結果を表示するエリア */}
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>{year}年{month}月{day}日の試合</h2>
        
        {selectedMatches.length > 0 ? (
          <ul>
            {selectedMatches.map((match) => (
              <li key={match.id} className="match-list-item">
                <div>
                  <div style={{ color: '#ff4655', fontSize: '0.9rem' }}>{match.event}</div>
                  <div className="team-name">{match.team1} vs {match.team2}</div>
                </div>
                <div className="team-logo-container">
                  <img src={match.team1Logo} className="team-logo" alt="Team1" />
                  <span style={{ fontWeight: 'bold', color: '#ff4655' }}>VS</span>
                  <img src={match.team2Logo} className="team-logo" alt="Team2" />
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