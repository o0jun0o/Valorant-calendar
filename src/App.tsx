import { useState } from 'react';
import Calendar from 'react-calendar';
// カレンダーの基本デザイン（CSS）を読み込む
import 'react-calendar/dist/Calendar.css';

// 1. VALORANTの大会データ（ダミー）
const matchData = [
  {
    id: 1,
    date: '2026-10-19', // 今日の日付
    event: 'VCT Pacific',
    match: 'ZETA DIVISION vs Paper Rex',
    result: '1 - 2'
  },
  {
    id: 2,
    date: '2026-10-20', // 明日の日付
    event: 'VCT Pacific',
    match: 'DetonatioN FocusMe vs DRX',
    result: '0 - 2'
  }
];
function App() {
  // 選択された日付を記憶する場所（最初は「今日」にする）
  const [date, setDate] = useState(new Date());
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