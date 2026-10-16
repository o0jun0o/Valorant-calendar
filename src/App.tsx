import { useState } from 'react';
import Calendar from 'react-calendar';
// カレンダーの基本デザイン（CSS）を読み込む
import 'react-calendar/dist/Calendar.css';

function App() {
  // 選択された日付を記憶する場所（最初は「今日」にする）
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: '20px' }}>
      <h1>VALORANT カレンダー</h1>
      
      {/* カレンダーを表示するタグ */}
      <Calendar 
        onChange={(newDate) => setDate(newDate as Date)} 
        value={date} 
      />
      
    </div>
  );
}

export default App;