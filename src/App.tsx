import { useState } from 'react';
import Calendar from 'react-calendar';
// カレンダーの基本デザイン（CSS）を読み込む
import 'react-calendar/dist/Calendar.css';

// 1. VALORANTの大会データ（Valorant Champions 2026）
const matchData = [
  {
    id: 1,
    date: '2026-09-24',
    event: 'Valorant Champions 2026 - Group Stage',
    match: 'Team Liquid vs Paper Rex',
    result: '1 - 2'
  },
  {
    id: 2,
    date: '2026-10-10',
    event: 'Valorant Champions 2026 - Upper Semifinals',
    match: 'NRG vs LOUD',
    result: '1 - 2'
  },
  {
    id: 3,
    date: '2026-10-16',
    event: 'Valorant Champions 2026 - Upper Final',
    match: 'Team Vitality vs LOUD',
    result: '1 - 2'
  },
  {
    id: 4,
    date: '2026-10-17',
    event: 'Valorant Champions 2026 - Lower Final',
    match: 'Team Vitality vs 100 Thieves',
    result: '3 - 1'
  },
  {
    id: 5,
    date: '2026-10-18',
    event: 'Valorant Champions 2026 - Grand Final',
    match: 'LOUD vs Team Vitality',
    result: '3 - 1'
  }
];
const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
function App() {
  // 選択された日付を記憶する場所（最初は Grand Final の日にする）
const [date, setDate] = useState(new Date(2026, 9, 18)); // 月は0始まり
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
        onChange={(newDate) => { if (newDate instanceof Date) setDate(newDate); }} 
        value={date} 
        
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const checkDate = toDateKey(date);

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
        />
      
      {/* 4. 試合結果を表示するエリア */}
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>{year}年{month}月{day}日の試合</h2>
        
        {selectedMatches.length > 0 ? (
          <ul>
            {selectedMatches.map((match) => (
              <li key={match.id} style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#ff4655' }}>{match.event}</strong><br />
                対戦カード: {match.match} <br />
                結果: <strong>{match.result}</strong>
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