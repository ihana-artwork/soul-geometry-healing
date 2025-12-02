import React, { useState } from "react";
import {
  Sparkles,
  Droplets,
  Activity,
  Calendar,
  CreditCard,
  Check,
  Printer,
  RotateCcw,
  Package,
  Info,
  Mail,
} from "lucide-react";

/**
 * 靈魂幾何：五行脈輪療癒所 v2.8 (CodeSandbox 版本)
 * * * 必要的 CodeSandbox 設定：
 * 1. 請在左側 Dependencies 安裝 'lucide-react'
 * 2. 請在 public/index.html 加入 <script src="https://cdn.tailwindcss.com"></script>
 * 3. 請將產品圖命名為 '01.jpg' 並上傳至 public 資料夾
 */

// --- 資料設定：問卷題目 (20題) ---
const QUESTIONS = [
  {
    id: 1,
    category: "Wood",
    text: "最近是否容易感到眼睛乾澀，或情緒容易煩躁易怒？",
  },
  {
    id: 2,
    category: "Fire",
    text: "是否常覺得心悸、失眠，或者情緒起伏非常大？",
  },
  { id: 3, category: "Earth", text: "腸胃消化系統是否常感到脹氣、消化不良？" },
  {
    id: 4,
    category: "Metal",
    text: "最近是否容易感冒、咳嗽，或皮膚感到特別乾燥？",
  },
  {
    id: 5,
    category: "Water",
    text: "是否常感到腰痠背痛，或者有頻尿、水腫的狀況？",
  },
  {
    id: 6,
    category: "Root",
    text: "你是否常對金錢或生存感到莫名的焦慮與不安全感？",
  },
  {
    id: 7,
    category: "Sacral",
    text: "你覺得自己的創造力枯竭，或對生活缺乏熱情嗎？",
  },
  {
    id: 8,
    category: "SolarPlexus",
    text: "你是否常缺乏自信，容易在意他人的眼光？",
  },
  {
    id: 9,
    category: "Heart",
    text: "在人際關係中，你是否難以敞開心房信任他人？",
  },
  {
    id: 10,
    category: "Throat",
    text: "你是否常覺得喉嚨卡卡的，難以表達真實的想法？",
  },
  {
    id: 11,
    category: "ThirdEye",
    text: "你是否感到思緒混亂，缺乏直覺或判斷力？",
  },
  {
    id: 12,
    category: "Crown",
    text: "你是否感到與世界失去連結，找不到生命的意義？",
  },
  {
    id: 13,
    category: "Wood",
    text: "早晨醒來時，是否常感到全身僵硬或偏頭痛？",
  },
  { id: 14, category: "Fire", text: "是否容易手腳冰冷，但在午後又覺得燥熱？" },
  { id: 15, category: "Earth", text: "是否常覺得身體沈重，思慮過度導致失眠？" },
  {
    id: 16,
    category: "Metal",
    text: "是否容易悲春傷秋，對過去的事情難以釋懷？",
  },
  {
    id: 17,
    category: "Water",
    text: "是否常覺得精力不足，容易感到恐懼或受驚？",
  },
  {
    id: 18,
    category: "Root",
    text: "最近是否覺得居住環境或家庭關係讓你感到不穩定？",
  },
  { id: 19, category: "Heart", text: "你是否容易感到胸悶，或呼吸較短淺？" },
  {
    id: 20,
    category: "Throat",
    text: "與人溝通時，是否常發生誤解或詞不達意？",
  },
];

// --- 資料設定：結果分析 ---
const RESULTS_DATA = {
  Wood: {
    element: "木",
    chakra: "心輪/肝膽",
    color: "#10B981",
    colorName: "翠綠色",
    oil: "佛手柑、羅馬洋甘菊",
    gemstone: "綠幽靈、孔雀石、綠髮晶",
    food: "深綠色蔬菜 (菠菜、花椰菜)、奇異果",
    desc: "疏通滯礙，讓生命力如樹木般自然伸展",
  },
  Fire: {
    element: "火",
    chakra: "太陽神經叢/心血管",
    color: "#EF4444",
    colorName: "緋紅色",
    oil: "玫瑰、依蘭依蘭",
    gemstone: "紅瑪瑙、石榴石、紅紋石",
    food: "紅色食物 (紅豆、番茄、火龍果)",
    desc: "平衡熱情，點燃內在溫暖而不灼人的光",
  },
  Earth: {
    element: "土",
    chakra: "胃輪/脾胃",
    color: "#F59E0B",
    colorName: "大地黃",
    oil: "岩蘭草、甜橙",
    gemstone: "黃水晶、虎眼石、黃玉",
    food: "黃色根莖類 (地瓜、南瓜、玉米)",
    desc: "扎根大地，找回安穩與滋養的豐盛感",
  },
  Metal: {
    element: "金",
    chakra: "喉輪/呼吸系統",
    color: "#9CA3AF",
    colorName: "銀白色",
    oil: "尤加利、絲柏",
    gemstone: "白水晶、月光石、白幽靈",
    food: "白色食物 (山藥、百合、白蘿蔔、水梨)",
    desc: "釐清邊界，在呼吸之間找回純粹的自己",
  },
  Water: {
    element: "水",
    chakra: "海底輪/腎膀胱",
    color: "#3B82F6",
    colorName: "湛藍色",
    oil: "杜松漿果、生薑",
    gemstone: "黑曜石、藍寶石、海藍寶",
    food: "黑色食物 (黑豆、黑木耳、藍莓、黑芝麻)",
    desc: "流動滋養，溫柔擁抱內在的情緒河流",
  },
  Root: {
    element: "地",
    chakra: "海底輪",
    color: "#B91C1C",
    colorName: "深紅色",
    oil: "廣藿香、雪松",
    gemstone: "黑碧璽、紅碧玉、煙晶",
    food: "根莖類蔬菜、紅肉、薑黃",
    desc: "穩固根基，連結大地母親的原始力量",
  },
  Sacral: {
    element: "水",
    chakra: "臍輪",
    color: "#EA580C",
    colorName: "橙色",
    oil: "茉莉、快樂鼠尾草",
    gemstone: "太陽石、橙月光、紅兔毛",
    food: "橙色蔬果 (柳橙、胡蘿蔔、芒果、南瓜)",
    desc: "喚醒創造，享受生命中的喜悅與流動",
  },
  SolarPlexus: {
    element: "火",
    chakra: "太陽神經叢",
    color: "#FCD34D",
    colorName: "金黃色",
    oil: "檸檬、黑胡椒",
    gemstone: "鈦晶、黃玉、琥珀",
    food: "黃色食物 (香蕉、鳳梨、糙米、燕麥)",
    desc: "重拾自信，展現你獨一無二的光芒",
  },
  Heart: {
    element: "風",
    chakra: "心輪",
    color: "#059669",
    colorName: "翡翠綠",
    oil: "玫瑰天竺葵、薰衣草",
    gemstone: "粉晶、捷克隕石、綠松石",
    food: "綠色蔬果 (酪梨、綠豆、綠茶、芭樂)",
    desc: "敞開心扉，在愛與被愛中獲得療癒",
  },
  Throat: {
    element: "空",
    chakra: "喉輪",
    color: "#60A5FA",
    colorName: "天藍色",
    oil: "德國洋甘菊、薄荷",
    gemstone: "藍紋瑪瑙、天河石、青金石",
    food: "潤喉食物 (蜂蜜、檸檬水、楊桃、枇杷)",
    desc: "真實表達，讓聲音成為連結世界的橋樑",
  },
  ThirdEye: {
    element: "光",
    chakra: "眉心輪",
    color: "#4F46E5",
    colorName: "靛藍色",
    oil: "迷迭香、乳香",
    gemstone: "青金石、藍銅礦、紫螢石",
    food: "藍紫色食物 (藍莓、葡萄、紫甘藍)",
    desc: "洞見真實，喚醒內在深處的直覺智慧",
  },
  Crown: {
    element: "靈",
    chakra: "頂輪",
    color: "#7C3AED",
    colorName: "紫色",
    oil: "乳香、沒藥、蓮花",
    gemstone: "紫水晶、舒俱來、白水晶",
    food: "紫色食物 (茄子、紫米、紫薯) 或 斷食排毒",
    desc: "靈性合一，感受宇宙無條件的愛與祝福",
  },
};

// --- 元件：宇宙琉璃光流生命之花 ---
const FlowerOfLifeSVG = ({
  color,
  opacity = 0.8,
  animate = false,
  uniqueId = "default",
}) => {
  const radius = 30;
  const centers = [];
  centers.push({ x: 0, y: 0 });
  for (let i = 0; i < 6; i++) {
    const angle = i * 60 * (Math.PI / 180);
    centers.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
  }
  for (let i = 0; i < 6; i++) {
    const angleVertex = i * 60 * (Math.PI / 180);
    centers.push({
      x: 2 * radius * Math.cos(angleVertex),
      y: 2 * radius * Math.sin(angleVertex),
    });
    const v1 = {
      x: radius * Math.cos((i * 60 * Math.PI) / 180),
      y: radius * Math.sin((i * 60 * Math.PI) / 180),
    };
    const v2 = {
      x: radius * Math.cos((((i + 1) % 6) * 60 * Math.PI) / 180),
      y: radius * Math.sin((((i + 1) % 6) * 60 * Math.PI) / 180),
    };
    centers.push({ x: v1.x + v2.x, y: v1.y + v2.y });
  }

  const gradientId = `glazed-gradient-${uniqueId}`;
  const glowId = `glow-filter-${uniqueId}`;

  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`w-full h-full ${
        animate ? "animate-[spin_60s_linear_infinite]" : ""
      }`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="25%" stopColor="#c084fc" stopOpacity="1" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="75%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="rotate(30)">
        <g opacity={opacity * 0.5} filter={`url(#${glowId})`}>
          <circle
            cx="0"
            cy="0"
            r={radius * 3}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          {centers.map((c, idx) => (
            <circle
              key={`blur-${idx}`}
              cx={c.x}
              cy={c.y}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
          ))}
        </g>
        <g opacity={opacity}>
          <circle
            cx="0"
            cy="0"
            r={radius * 3}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
          />
          <circle
            cx="0"
            cy="0"
            r={radius * 3 + 2}
            fill="none"
            stroke="white"
            strokeWidth="0.2"
            opacity="0.5"
          />
          {centers.map((c, idx) => (
            <circle
              key={idx}
              cx={c.x}
              cy={c.y}
              r={radius}
              fill="white"
              fillOpacity="0.03"
              stroke={`url(#${gradientId})`}
              strokeWidth="0.8"
              style={
                animate
                  ? { animation: `pulse 4s infinite ease-in-out ${idx * 0.1}s` }
                  : {}
              }
            />
          ))}
        </g>
        {animate && (
          <circle
            cx="0"
            cy="0"
            r={radius * 2}
            fill={`url(#${gradientId})`}
            opacity="0.1"
            className="animate-pulse"
          />
        )}
      </g>
    </svg>
  );
};

// --- 主程式元件 ---
export default function App() {
  const [view, setView] = useState("landing");
  const [nickname, setNickname] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [activeColor, setActiveColor] = useState("#818cf8");

  // 預約表單狀態
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // 圖片設定 (請上傳 01.jpg 到 public 資料夾)
  const productImageSrc = "/01.jpg";

  const handleAnswer = (score) => {
    const question = QUESTIONS[currentQuestion];
    setAnswers((prev) => ({
      ...prev,
      [question.category]: (prev[question.category] || 0) + score,
    }));
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      if (currentQuestion % 5 === 0) {
        const colors = ["#818cf8", "#f472b6", "#34d399", "#60a5fa"];
        setActiveColor(colors[Math.floor(Math.random() * colors.length)]);
      }
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setView("analyzing");
    setTimeout(() => {
      const sortedCategories = Object.entries(answers).sort(
        (a, b) => b[1] - a[1]
      );
      const topCategory =
        sortedCategories.length > 0 ? sortedCategories[0][0] : "Heart";
      const resultData = RESULTS_DATA[topCategory] || RESULTS_DATA["Heart"];
      setResult({
        category: topCategory,
        ...resultData,
        score: answers[topCategory] || 0,
      });
      setActiveColor(resultData.color);
      setView("result");
    }, 2000);
  };

  const handleRetest = () => {
    setNickname("");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setActiveColor("#818cf8");
    setView("landing");
  };

  // PDF 下載列印
  const handlePrint = () => {
    const confirmPrint = window.confirm(
      "即將開啟列印視窗。\n請在目的地選擇「另存為 PDF」即可下載報告。\n\n是否繼續？"
    );
    if (confirmPrint) {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  // 處理預約與發送 Email
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // 1. 準備信件內容
    const subject = `[靈魂幾何預約] ${nickname} - ${bookingDate}`;
    const body = `
親愛的靈魂幾何療癒師您好：

我想預約「直覺繪畫生命之花 + 報告解析」服務 ($1588)。

【預約資訊】
姓名：${nickname}
預約日期：${bookingDate}
預約時段：${bookingTime}
聯絡信箱：${email}
收件地址：${address}

【測驗結果】
主要能量：${result.element}元素 / ${result.chakra}
顏色頻率：${result.colorName}
專屬精油：${result.oil}

請確認我的預約並提供匯款資訊，謝謝！
    `.trim();

    // 2. 構建 mailto 連結
    const mailtoLink = `mailto:ihana.artwork@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // 3. 觸發信件
    alert(
      "感謝您的預約！\n\n系統將為您開啟郵件軟體，請按下「傳送」鍵，我們將在收到信件後與您聯繫確認匯款。"
    );
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      {/* 動態背景層 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/50 via-slate-950 to-black"></div>
        <div className="absolute inset-0 opacity-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() > 0.5 ? "2px" : "3px",
                height: Math.random() > 0.5 ? "2px" : "3px",
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] opacity-10 blur-sm">
          <FlowerOfLifeSVG
            color={activeColor}
            opacity={0.5}
            animate={true}
            uniqueId="bg"
          />
        </div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Landing Page */}
        {view === "landing" && (
          <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl animate-fade-in text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24">
                <FlowerOfLifeSVG color="#c084fc" opacity={1} uniqueId="logo" />
                <Sparkles
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  size={32}
                />
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 mb-2 tracking-wide">
              靈魂幾何
            </h1>
            <h2 className="text-lg text-purple-300/80 mb-6 font-light tracking-widest">
              SOUL GEOMETRY
            </h2>
            <p className="text-slate-300 mb-8 font-light leading-relaxed">
              透過五行脈輪檢測，連結您的內在頻率
              <br />
              獲取專屬的<b>「生命之花祝福圖騰」</b>
              <br />與 <b>3ml 調配精油</b>
            </p>
            <input
              type="text"
              placeholder="請輸入您的暱稱"
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center placeholder-slate-500 transition-all text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button
              onClick={() => nickname && setView("quiz")}
              disabled={!nickname}
              className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
                nickname
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] text-white transform hover:-translate-y-0.5"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              開始能量檢測
            </button>
          </div>
        )}

        {/* Quiz Page */}
        {view === "quiz" && (
          <div className="max-w-2xl w-full bg-slate-900/70 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl animate-fade-in">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2 font-mono">
                <span>PROGRESS</span>
                <span>
                  {currentQuestion + 1} / {QUESTIONS.length}
                </span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / QUESTIONS.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-12 min-h-[100px] flex items-center justify-center leading-relaxed">
              {QUESTIONS[currentQuestion].text}
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "非常符合",
                  score: 5,
                  bg: "hover:bg-purple-600/20 hover:border-purple-500",
                },
                {
                  label: "部分符合",
                  score: 3,
                  bg: "hover:bg-indigo-600/20 hover:border-indigo-500",
                },
                {
                  label: "不太符合",
                  score: 1,
                  bg: "hover:bg-slate-600/20 hover:border-slate-500",
                },
              ].map((opt) => (
                <button
                  key={opt.score}
                  onClick={() => handleAnswer(opt.score)}
                  className={`w-full p-5 rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all flex items-center justify-between group ${opt.bg}`}
                >
                  <span className="text-lg tracking-wide">{opt.label}</span>
                  <div className="w-4 h-4 rounded-full border border-slate-500 group-hover:bg-white/90 group-hover:border-transparent transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing Page */}
        {view === "analyzing" && (
          <div className="text-center animate-pulse flex flex-col items-center">
            <div className="w-48 h-48 mb-8 relative">
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                <FlowerOfLifeSVG
                  color="#a78bfa"
                  opacity={0.6}
                  uniqueId="loading"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity
                  className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  size={32}
                />
              </div>
            </div>
            <h2 className="text-2xl font-serif text-slate-200 tracking-wider">
              正在連結宇宙頻率...
            </h2>
            <p className="text-slate-400 mt-2 font-light">繪製您的專屬圖騰</p>
          </div>
        )}

        {/* Result Page (Certificate) */}
        {view === "result" && result && (
          <div className="w-full max-w-5xl animate-fade-in-up flex flex-col gap-8 items-center">
            {/* 可下載/列印的證書區塊 */}
            {/* CSS Fix: 移除了 print:w-full 等可能導致跑版的設定，改用絕對定位在 @media print 中控制 */}
            <div
              id="print-area"
              className="w-full max-w-4xl bg-white text-slate-900 p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 print:h-2" />
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <div className="w-[150%] h-[150%]">
                  <FlowerOfLifeSVG
                    color="#000000"
                    opacity={1}
                    uniqueId="watermark"
                  />
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end border-b-2 border-slate-100 pb-6 mb-8">
                <div>
                  <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">
                    Soul Geometry Report
                  </h2>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
                    {nickname} 的靈魂光譜
                  </h1>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm text-slate-500 mb-1">
                    Testing Date
                  </div>
                  <div className="font-mono text-lg font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                  <div className="relative w-72 h-72 mb-6 group">
                    <div className="absolute inset-0 border-[1px] border-slate-200 rounded-full scale-110" />
                    <div className="absolute inset-0 border-[0.5px] border-slate-100 rounded-full scale-125" />
                    <div className="w-full h-full p-4 transition-transform duration-700 group-hover:rotate-12">
                      <FlowerOfLifeSVG
                        color={result.color}
                        opacity={1}
                        uniqueId="report-main"
                      />
                    </div>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-white"
                      style={{ backgroundColor: result.color }}
                    />
                  </div>
                  <div className="text-center">
                    <div
                      className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest text-white mb-3 shadow-md"
                      style={{ backgroundColor: result.color }}
                    >
                      {result.element}元素・{result.chakra}
                    </div>
                    <p className="font-serif italic text-slate-600 max-w-xs mx-auto text-sm">
                      「這幅生命之花象徵著宇宙對您的祝福：
                      <br />
                      {result.desc}。」
                    </p>
                  </div>
                </div>

                <div className="space-y-6 flex flex-col justify-center">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="flex items-center gap-2 text-base font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                      <Droplets size={18} className="text-purple-500" />
                      植物精油能量指引
                    </h3>
                    <div className="space-y-2">
                      <p className="text-lg font-serif text-slate-900">
                        {result.oil}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        這些植物精油擁有{result.element}元素的振動頻率，能協助您
                        {result.desc}。透過嗅吸這些香氣，能啟動對應的脈輪能量。
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Healing Advice
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-700 text-sm">
                        <Check
                          size={16}
                          className="mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span className="flex items-center flex-wrap gap-2">
                          建議穿著{" "}
                          <span className="font-bold text-slate-900">
                            {result.colorName}
                          </span>{" "}
                          色系的衣物。
                          <span
                            className="w-3 h-3 rounded-full inline-block border border-slate-300 shadow-sm"
                            style={{ backgroundColor: result.color }}
                          ></span>
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-700 text-sm">
                        <Check
                          size={16}
                          className="mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span>
                          適合配戴{" "}
                          <span className="font-bold text-slate-900">
                            {result.gemstone}
                          </span>{" "}
                          等能量寶石。
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-700 text-sm">
                        <Check
                          size={16}
                          className="mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span>
                          建議攝取{" "}
                          <span className="font-bold text-slate-900">
                            {result.food}
                          </span>{" "}
                          等食物進行食療。
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-8 border-t border-slate-100">
                <div className="bg-slate-50/80 rounded-2xl border border-purple-100 p-6 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 opacity-50"></div>
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
                    <Package size={18} className="text-purple-500" />
                    預約療癒・實體與服務內容展示
                  </h3>
                  <div className="relative rounded-xl overflow-hidden shadow-md border border-slate-200 mb-4 max-w-2xl mx-auto bg-white">
                    <img
                      src={productImageSrc}
                      alt="靈魂幾何療癒包裹展示"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                      <span className="text-white font-medium tracking-wider text-sm drop-shadow-md">
                        專屬為您準備的神聖儀式感
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                    預約 $1588 服務包含：您的生命之花個人祝福圖騰 (5x7相片尺寸, 作品含木相框, 成品樣式依實體為主)、3ml 專屬調配滾珠精油、以及療癒師的一對一30分鐘報告解析服務。
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 print:hidden">
                <span>© 2025 Soul Geometry Healing  by Happy Ihana.</span>
                <span className="font-mono">
                  ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 print:hidden">
              <button
                onClick={handleRetest}
                className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-600"
              >
                <RotateCcw size={20} />
                重新檢測
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 group border border-slate-700"
              >
                <Printer
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                下載報告 (PDF)
              </button>
              <button
                onClick={() => setView("booking")}
                className="flex-[1.5] py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <Calendar size={20} />
                預約繪畫 + 報告解析 ($1588)
              </button>
            </div>
            <div className="text-slate-500 text-sm print:hidden mb-8 flex items-center justify-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
              <Info size={16} className="text-blue-400" />
              <span>
                點擊「下載報告」後，請在列印視窗的目的地選擇
                <strong>「另存為 PDF」</strong>即可儲存。
              </span>
            </div>
          </div>
        )}

        {/* Booking Page */}
        {view === "booking" && (
          <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl animate-fade-in">
            <button
              onClick={() => setView("result")}
              className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
              <span className="text-xl">&larr;</span> 返回報告
            </button>
            <h2 className="text-3xl font-serif mb-2 text-white">
              預約專屬療癒服務
            </h2>
            <p className="text-slate-400 mb-8">
              確認您的直覺繪畫與精油寄送資訊
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-xl flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden border border-purple-500/30">
                  <img
                    src={productImageSrc}
                    alt="產品縮圖"
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/100x100/334155/cbd5e1?text=Img";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-purple-100">
                    直覺繪畫生命之花祝福圖騰 + 報告解析
                  </h3>
                  <p className="text-sm text-purple-300">
                    + 贈送 3ml 專屬調配精油 (實體包裹)
                  </p>
                  <p className="text-lg font-bold text-white mt-1">NT$ 1,588</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    預約日期
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-3 text-slate-500"
                      size={18}
                    />
                    <input
                      type="date"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-slate-500"
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    時段
                  </label>
                  <select
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none appearance-none text-white"
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="">請選擇</option>
                    <option>10:00 - 11:30</option>
                    <option>13:30 - 15:00</option>
                    <option>15:30 - 17:00</option>
                    <option>19:00 - 20:30</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    收件人姓名
                  </label>
                  <input
                    type="text"
                    defaultValue={nickname}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    聯絡信箱
                  </label>
                  <input
                    type="email"
                    placeholder="用於接收回覆與通知"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    收件地址 (寄送實體包裹)
                  </label>
                  <input
                    type="text"
                    placeholder="請輸入完整收件地址"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-xl transition-all font-bold text-white flex items-center justify-center gap-2 mt-4"
              >
                <Mail size={20} />
                確認預約 (NT$ 1,588)
              </button>
              <p className="text-center text-xs text-slate-500">
                點擊後將自動開啟您的郵件軟體，請按下「傳送」以完成預約。
              </p>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
        /* * PDF 列印修正：
         * 1. 隱藏所有 body 內容 (visibility: hidden)
         * 2. 僅顯示 #print-area (visibility: visible)
         * 3. 將 #print-area 絕對定位到 (0,0)
         * 4. 移除陰影、圓角等不適合列印的樣式
         */
        @media print {
          body {
            background: white !important;
            color: black !important;
            overflow: visible !important;
          }
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: white !important;
            color: black !important;
          }
          /* 確保背景圖形與漸層被列印 */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* 隱藏按鈕與提示 */
          button, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
