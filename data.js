// Résumé content (zh / en share the same shape). Edit here to update the site.
const LINKS = [
  { label: "GitHub", url: "https://github.com/momolly1024" },
  { label: "Medium", url: "https://molly1024.medium.com/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mollychi/" },
];
const URL_EHS = "https://www.asus.com/tw/networking-iot-servers/aiot-industrial-solutions/ai-software-ai-platforms/aisehs/";
const URL_PHM = "https://www.asus.com/tw/networking-iot-servers/aiot-industrial-solutions/ai-software-ai-platforms/aisphm/";
const URL_VISION = "https://www.asus.com/networking-iot-servers/aiot-industrial-solutions/ai-software-ai-platforms/aisvision-365/";

window.RESUME = {
  zh: {
    name: "Molly Chi",
    title: "前端工程師",
    headline: "以使用者體驗為核心的 AI-native 開發者",
    location: "台灣 · 台北／新北",
    email: "momolly1024@gmail.com",
    links: LINKS,
    summary: "6~7 年前端經驗，橫跨醫院資訊系統、智慧醫療與 AIoT 工業 AI 平台。擅長把複雜需求拆解成清楚的 User Flow 與好維護的元件，讓醫護人員、產線人員、系統整合商這些「非工程師」也能直覺上手。目前在華碩負責前端技術決策；日常開發以 AI coding agent 撰寫程式碼為主，我專注在需求拆解、spec、架構決策與產出驗證，並把這套流程建立成團隊可複用的工作方式。",
    strengths: [
      { title: "UX 使用者體驗", text: "從使用者角度設計 User Flow：精簡醫護人員的警示處理路徑、降低 AI 模型訓練與部署的操作門檻、用互動式 ROI 繪製降低誤報。" },
      { title: "AI-native 開發", text: "程式碼主要交給 AI agent 撰寫；我負責把需求寫成明確 spec、拆解任務、審查與驗證每次產出，並整理成團隊可複用的開發流程。" },
      { title: "技術領導", text: "帶領 4 位工程師落地專案，主導技術選型與 Git 流程；從 0 到 1 建立 UI 元件庫，後續開發效率提升 30% 以上。" },
    ],
    jobs: [
      {
        id: "asus", company: "華碩電腦 ASUSTeK", role: "軟體研發工程師", period: "2024/5 – 現在",
        lead: "在團隊導入並迭代 AI agent 開發流程（Spec → AI 實作 → 審查驗證）：中型功能交付從約 15 天縮短到 5 天，bug 明顯減少，修復時間從約 5 天縮短到 1 天。",
        projects: [
          { title: "AI CCTV 工安監控平台（AIS EHS）", url: URL_EHS, points: [
            "獨立主導前端：設計互動式 ROI 繪製與即時告警流程，有效降低誤報；負責架構規劃、時程控管與高頻影像串流整合。",
            "公司主力推廣產品，已導入台灣半導體龍頭企業，並獲選於國際自動化展展出。",
          ], tech: ["Vue 3", "TypeScript", "Tailwind CSS", "fabric.js", "Vite"] },
          { title: "AIS PHM 預測性維護系統 · 全面重構", url: URL_PHM, points: [
            "主導模組化架構重構，從 0 到 1 建立企業級 UI 元件庫與設計規範，後續功能開發效率提升 30% 以上。",
            "實作動態 i18n 多語系與主題切換；重新設計設備監控圖表，讓複雜趨勢更好讀、更好操作。",
          ], tech: ["Vue 3", "TypeScript", "Pinia", "i18n"] },
          { title: "AISVision AI 視覺平台", url: URL_VISION, points: [
            "帶領 4 位工程師開發 AI 視覺模型訓練、驗證到部署的一站式平台（半導體、PCBA、醫藥製造）。",
            "主導技術選型、狀態管理評估與 Git 工作流；簡化訓練到部署的操作流程，降低使用門檻，並完成 RWD。",
          ], tech: ["Vue 3", "TypeScript", "Tailwind CSS"] },
        ],
      },
      {
        id: "cognito", company: "美思科技 Cognito Health", role: "研發軟體工程師", period: "2022/5 – 2024/4",
        projects: [
          { title: "預防跌倒及褥瘡醫護監控系統", points: [
            "重構 React 介面邏輯並修復核心缺陷；精簡醫護人員操作流程，縮短異常狀況的處理反應時間。",
          ], tech: ["React", "Tailwind CSS"] },
          { title: "跨平台行動 App（獨立開發）", points: [
            "MQTT 即時數據、FCM 推播與警示音、JWT 驗證、i18n，並獨立完成 Android APK 封裝部署。",
          ], tech: ["React Native", "MQTT", "FCM"] },
          { title: "後台與帳務系統", points: [
            "獨立主導帳務系統（報表、PDF 匯出、多層級權限）；以 Ant Design 建立可複用元件與 Chart.js 數據圖表。",
          ], tech: ["React", "Ant Design", "MUI", "Chart.js"] },
        ],
      },
      {
        id: "koo", company: "和信治癌中心醫院", role: "網頁前端工程師", period: "2020/9 – 2022/5",
        projects: [
          { title: "乳癌臨床決策分析系統", points: [
            "以 React + Highcharts 打造臨床數據分析介面，協助醫療團隊判讀與決策。",
          ], tech: ["React", "Highcharts", "MUI"] },
          { title: "醫療流程網頁化", points: [
            "將紙本問卷、醫令系統、成人健檢與病人營養訂餐網頁化，提升資料收集效率與準確性。",
          ], tech: ["React", "C#"] },
        ],
      },
    ],
    skills: [
      { group: "UX", list: ["User Flow 設計", "互動設計", "設計系統／元件庫", "RWD", "i18n", "Photoshop", "Illustrator"] },
      { group: "AI-native 開發", list: ["Claude Code", "Spec 驅動開發", "Agentic 任務拆解與分派", "AI 產出審查與驗證"] },
      { group: "前端", list: ["Vue 3", "React", "React Native", "TypeScript", "JavaScript", "Pinia", "React Router"] },
      { group: "UI／圖表", list: ["Tailwind CSS", "shadcn/ui", "Ant Design", "MUI", "Bootstrap", "Sass", "Chart.js", "Highcharts", "fabric.js"] },
      { group: "後端／工具", list: ["Python (FastAPI)", "Node.js", "MQTT", "Firebase FCM", "Git", "MongoDB", "MSSQL"] },
    ],
    education: [
      { school: "國立宜蘭大學", program: "休閒產業與健康促進學系（三年半提前畢業）", period: "2014 – 2018" },
      { school: "勞動力發展署職訓中心", program: "前端網頁開發課程", period: "2020" },
    ],
    certs: ["丙級網頁設計技術士", "GEPT 全民英檢中級"],
    languages: ["中文（母語）", "英文（中等）", "台語（中等）"],
    extra: "Medium 技術部落格，平均每月約 1 萬次瀏覽",
    story: [
      { year: "2018", text: "國立宜蘭大學畢業（三年半提前畢業）。" },
      { year: "2020", text: "職訓局前端課程結訓，進入和信治癌中心成為前端工程師。" },
      { year: "2022", text: "加入智慧醫療公司美思科技，獨立開發 App 與後台系統。" },
      { year: "2024", text: "加入華碩，主導 AIoT 工安監控與 AI 平台前端，並導入 AI agent 開發流程。" },
    ],
    interests: ["健身", "爬山", "SUP", "旅行", "桌球"],
    hobbies: "Molly 很愛用 AI 解決生活小事：自己做了旅遊影片自動剪輯流程，還做了串 LINE 取得 PTT 文章連結的機器人！下班後則是健身、爬山、SUP、旅行、打桌球。",
    caseStudy: {
      title: "案例研究：AI 工安監控的 ROI 設定體驗",
      sub: "華碩 AIS EHS · 獨立主導前端與互動設計",
      context: "AIS EHS 讓工廠在攝影機畫面上劃出危險區域（ROI），AI 偵測到有人進入就即時告警。設定 ROI 的是廠區工安人員：他們最懂現場，但不是工程師。ROI 畫得準不準，直接決定告警準不準。",
      challenges: [
        "工廠的危險區域多半不規則：斜向走道、機台周邊、轉角。矩形一定會框進不該框的地方。",
        "攝影機遠處的區域在畫面上很小，很難精準點選。",
        "一台攝影機可能有多個區域，風險與規則各不相同；同一條產線又有很多台配置相同的攝影機。",
        "告警太多會造成警報疲勞，真正的危險反而被忽略。",
      ],
      figure: { before: "矩形框選：多框到的區域＝誤報來源", after: "點連點多邊形：貼合真實區域" },
      decisions: [
        { title: "從矩形框選改為點連點多邊形", how: "逐點點擊圍出區域，靠近起點自動吸附閉合。", why: "貼合真實的不規則區域，從源頭減少「框錯」造成的誤報。" },
        { title: "畫錯不用重來", how: "頂點可拖曳；可在邊上新增、刪除頂點；支援復原／重做。", why: "點錯一個點就要整個重畫，是設定時最大的挫折來源。" },
        { title: "防呆與精準操作", how: "線段交叉、點數不足時提示並阻止儲存；畫面可縮放與平移。", why: "讓遠處的小區域也能精準點選，也避免存出無效的區域。" },
        { title: "一眼看懂每個區域", how: "半透明填色，用顏色區分區域類型。", why: "多個區域疊在同一個畫面時，仍能快速辨識各自的用途。" },
        { title: "降低誤報與警報疲勞", how: "停留時間門檻（進入超過設定秒數才告警）、告警冷卻時間、每個 ROI 個別設定偵測模型、靈敏度與排程。", why: "排除路過與重複告警，讓每一則告警都值得被處理。" },
        { title: "把複雜設定變成簡單流程", how: "步驟精靈；ROI 可複製到配置相同的攝影機；座標以相對比例儲存。", why: "降低第一次設定的門檻，大量部署時不必逐台重畫，攝影機解析度改變也不會跑掉。" },
      ],
      flow: ["選攝影機", "畫 ROI", "選偵測模型", "設告警規則", "確認"],
      tech: "Vue 3 + TypeScript + fabric.js 實作畫布互動；與後端協作優化影像資料傳輸，確保高頻串流下的互動依然流暢。",
      results: ["有效降低誤報率", "成為公司主力推廣產品，已導入台灣半導體龍頭企業", "獲選於國際自動化展展出"],
      takeaway: "好的 AI 產品體驗，一半在模型，另一半在「讓使用者能正確告訴模型要看哪裡」。",
      labels: { context: "背景", challenges: "挑戰", decisions: "設計決策", how: "做法", why: "為什麼", flow: "設定流程", tech: "技術實作", results: "成果", takeaway: "心得" },
    },
    // ---- game UI ----
    ui: {
      hudTitle: "前端工程師",
      classic: "📄 一般版履歷",
      download: "⬇ 下載 PDF",
      langToggle: "EN",
      eyebrow: "Welcome to",
      introLead: "嗨，我是 <strong>Molly Chi</strong>，把使用者體驗放第一、帶著 AI agent 一起開發的前端工程師。<br>在小鎮裡走走，走進每棟房子就能看到我的履歷。",
      start: "▶ 開始探索",
      justResume: "📄 直接看履歷",
      introHelp: "WASD／方向鍵移動，或直接點地圖 · E／空白鍵進入建築",
      hint: "移動：WASD／方向鍵，或點地圖 · 進入／對話：E 或空白鍵",
      press: "按", enter: (n) => `進入「${n}」`, talk: "聊聊天", wish: "投硬幣許願",
      visitedOld: "已造訪", visitedNew: "新造訪！", leave: "離開 ↩",
      contact: "聯絡我", focus: "我的強項", storyTitle: "我的轉職小故事",
      eduTitle: "學歷・證照", eduSub: "從休閒產業轉職前端，靠的是持續學習", certs: "證照", langs: "語言",
      skillsTitle: "技能工坊", skillsSub: "UX 是我最大的武器，AI agent 是我的主力隊友",
      doneTitle: "🎉 小鎮全部逛完了！", doneSub: "謝謝你花時間認識我",
      doneText: "如果你正在找一位重視使用者體驗、能把需求拆解落地、並且能駕馭 AI agent 寫 code、同時守住品質的前端工程師，很希望有機會跟你聊聊！",
      progressLabel: (a, b) => `已造訪 ${a} / ${b} 棟建築`,
    },
    places: {
      home: ["Molly 的家", "關於我"], asus: ["華碩 ASUS", "2024 – 現在"], cognito: ["美思科技", "2022 – 2024"],
      koo: ["和信治癌中心", "2020 – 2022"], school: ["學校", "學歷・證照"], skills: ["技能工坊", "專長"], studio: ["設計工作室", "UX 案例集"],
    },
    npcs: {
      guide: ["歡迎來到 Molly 的小鎮！", "走進每棟房子就能看到她的履歷，一共 7 個地方，全部逛完有驚喜喔。"],
      knight: ["這裡是華碩。", "Molly 在這裡主導的 AI 工安監控系統，已經導入半導體龍頭企業，還上過國際自動化展！"],
      wizard: ["寫 spec、派任務給 AI agent、審查驗證產出……", "Molly 讓 AI agent 寫 code，她負責當指揮官和品管。"],
      friend: null, // filled from hobbies below
      well: ["你投了一枚硬幣到井裡……", "許願：「希望能和 Molly 一起工作！」✨"],
    },
  },

  en: {
    name: "Molly Chi",
    title: "Frontend Engineer",
    headline: "UX-focused, AI-native",
    location: "Taipei, Taiwan",
    email: "momolly1024@gmail.com",
    links: LINKS,
    summary: "Frontend engineer with 6–7 years across hospital systems, digital health and industrial AIoT. I turn complex requirements into clear user flows and maintainable components, so non-engineers (nurses, factory operators, integrators) can use the product intuitively. At ASUS I drive frontend decisions; AI coding agents write most of my code while I own the specs, architecture and verification — a workflow I turned into a team practice.",
    strengths: [
      { title: "User experience", text: "Design flows from the user's side — faster alert handling for nurses, an easier train-to-deploy flow for AI models, fewer false alarms via interactive ROI drawing." },
      { title: "AI-native development", text: "AI agents write most of my code; I write precise specs, break down tasks, and review and verify every output." },
      { title: "Technical leadership", text: "Led 4 engineers; owned tech selection and Git workflow; built a UI component library from scratch (+30% feature velocity)." },
    ],
    jobs: [
      {
        id: "asus", company: "ASUSTeK Computer", role: "Software Engineer (R&D)", period: "May 2024 – Present",
        lead: "Introduced an AI-agent workflow for the team (spec → AI implementation → review & verification): mid-size features ship in ~5 days instead of 15, with far fewer bugs fixed in ~1 day instead of 5.",
        projects: [
          { title: "AI CCTV Workplace Safety Platform (AIS EHS)", url: URL_EHS, points: [
            "Solely led the frontend: interactive ROI drawing on live video and real-time alerts that cut false alarms; owned architecture, schedule and video streaming.",
            "Flagship product adopted by a leading Taiwanese semiconductor maker and showcased at an international automation exhibition.",
          ], tech: ["Vue 3", "TypeScript", "Tailwind CSS", "fabric.js", "Vite"] },
          { title: "AIS PHM Predictive Maintenance — full rebuild", url: URL_PHM, points: [
            "Led a modular re-architecture and built an enterprise UI component library and design guidelines from 0 to 1 (+30% feature velocity).",
            "Added dynamic i18n and theming; redesigned monitoring charts so complex trends are easier to read.",
          ], tech: ["Vue 3", "TypeScript", "Pinia", "i18n"] },
          { title: "AISVision AI Vision Platform", url: URL_VISION, points: [
            "Led 4 engineers on a one-stop platform to train, validate and deploy AI vision models (semiconductor, PCBA, pharma).",
            "Owned tech selection, state management and Git workflow; simplified the train-to-deploy flow for non-expert users.",
          ], tech: ["Vue 3", "TypeScript", "Tailwind CSS"] },
        ],
      },
      {
        id: "cognito", company: "Cognito Health", role: "R&D Software Engineer", period: "May 2022 – Apr 2024",
        projects: [
          { title: "Fall & Pressure-Injury Prevention System", points: [
            "Refactored React UI and fixed core defects; streamlined nurses' workflow to respond faster to abnormal events.",
          ], tech: ["React", "Tailwind CSS"] },
          { title: "Cross-platform Mobile App (built solo)", points: [
            "Real-time MQTT data, FCM push with alert sounds, JWT auth and i18n; shipped the Android APK end to end.",
          ], tech: ["React Native", "MQTT", "FCM"] },
          { title: "Admin Console & Billing System", points: [
            "Built the billing system solo (reports, PDF export, permissions) plus Ant Design components and Chart.js dashboards.",
          ], tech: ["React", "Ant Design", "MUI", "Chart.js"] },
        ],
      },
      {
        id: "koo", company: "Koo Foundation Sun Yat-Sen Cancer Center", role: "Frontend Developer", period: "Sep 2020 – May 2022",
        projects: [
          { title: "Breast Cancer Clinical Decision Analytics", points: [
            "Clinical data analysis UI in React + Highcharts supporting the medical team's decisions.",
          ], tech: ["React", "Highcharts", "MUI"] },
          { title: "Digitizing Hospital Workflows", points: [
            "Moved paper questionnaires, medical orders, check-ups and meal ordering online, improving data accuracy.",
          ], tech: ["React", "C#"] },
        ],
      },
    ],
    skills: [
      { group: "UX", list: ["User flow design", "Interaction design", "Design systems", "Responsive design", "i18n", "Photoshop", "Illustrator"] },
      { group: "AI-native workflow", list: ["Claude Code", "Spec-driven development", "Agentic task orchestration", "AI output review & verification"] },
      { group: "Frontend", list: ["Vue 3", "React", "React Native", "TypeScript", "JavaScript", "Pinia", "React Router"] },
      { group: "UI & charts", list: ["Tailwind CSS", "shadcn/ui", "Ant Design", "MUI", "Bootstrap", "Sass", "Chart.js", "Highcharts", "fabric.js"] },
      { group: "Backend & tools", list: ["Python (FastAPI)", "Node.js", "MQTT", "Firebase FCM", "Git", "MongoDB", "MSSQL"] },
    ],
    education: [
      { school: "National Ilan University", program: "B.A., Leisure Industry & Health Promotion (graduated in 3.5 years)", period: "2014 – 2018" },
      { school: "Workforce Development Agency", program: "Frontend Web Development Program", period: "2020" },
    ],
    certs: ["Web Design Technician (Level C)", "GEPT Intermediate"],
    languages: ["Mandarin (native)", "English (intermediate)", "Taiwanese (intermediate)"],
    extra: "Tech blog on Medium, ~10k monthly views",
    story: [
      { year: "2018", text: "Graduated from National Ilan University in three and a half years." },
      { year: "2020", text: "Finished a frontend program and joined Koo Foundation Sun Yat-Sen Cancer Center as a frontend developer." },
      { year: "2022", text: "Joined digital-health startup Cognito Health and built its mobile app and admin systems." },
      { year: "2024", text: "Joined ASUS to lead frontends for AIoT safety monitoring and AI platforms, and brought AI agents into the team's workflow." },
    ],
    interests: ["Fitness", "Hiking", "Stand-up paddleboarding", "Travel", "Table tennis"],
    hobbies: "Molly loves using AI for everyday things: she built her own travel-vlog auto-editing pipeline and a LINE bot that fetches PTT article links! Off-screen: fitness, hiking, SUP, travel and table tennis.",
    caseStudy: {
      title: "Case study: ROI setup UX for AI safety monitoring",
      sub: "ASUS AIS EHS · I solely led the frontend and interaction design",
      context: "AIS EHS lets factories mark danger zones (ROIs) on camera feeds; when AI detects a person entering one, it raises a real-time alert. The people drawing these zones are on-site safety staff — they know the floor, but they aren't engineers. How accurately a zone is drawn directly decides how accurate the alerts are.",
      challenges: [
        "Danger zones are rarely rectangular: diagonal walkways, areas around machines, corners. A rectangle always covers areas it shouldn't.",
        "Zones far from the camera are tiny on screen and hard to click precisely.",
        "One camera can have several zones with different risks and rules, and a production line has many identically placed cameras.",
        "Too many alerts cause alarm fatigue — and real danger gets ignored.",
      ],
      figure: { before: "Rectangle: the extra area becomes false alarms", after: "Point-to-point polygon: fits the real zone" },
      decisions: [
        { title: "From rectangles to point-to-point polygons", how: "Click point by point to outline the zone; it snaps closed near the starting point.", why: "Matches real, irregular zones and removes false alarms caused by badly drawn areas at the source." },
        { title: "Mistakes don't mean starting over", how: "Drag vertices, add or delete vertices on an edge, with undo / redo.", why: "Redrawing everything after one wrong click was the biggest source of frustration." },
        { title: "Guard rails and precision", how: "Warn and block saving on self-intersecting lines or too few points; zoom and pan the feed.", why: "Small, distant zones can be drawn precisely, and invalid zones never get saved." },
        { title: "Every zone readable at a glance", how: "Semi-transparent fills, color-coded by zone type.", why: "Even with several zones on one feed, users instantly see what each one is for." },
        { title: "Fewer false alarms, less alarm fatigue", how: "Dwell-time threshold (alert only after N seconds inside), alert cooldown, and per-ROI model, sensitivity and schedule.", why: "Filters out passers-by and duplicates so every alert is worth acting on." },
        { title: "Complex setup, simple flow", how: "Step-by-step wizard; copy ROIs to identically placed cameras; coordinates stored as relative ratios.", why: "Lowers the barrier for first-time setup, avoids redrawing at scale, and survives resolution changes." },
      ],
      flow: ["Pick camera", "Draw ROI", "Choose model", "Set alert rules", "Confirm"],
      tech: "Canvas interaction built with Vue 3, TypeScript and fabric.js; worked with the backend to optimize video data transfer so interaction stays smooth on high-frequency streams.",
      results: ["Significantly reduced false alarms", "Became a flagship product, adopted by a leading Taiwanese semiconductor maker", "Showcased at an international automation exhibition"],
      takeaway: "Great AI product UX is half the model — and half letting people tell the model exactly where to look.",
      labels: { context: "Context", challenges: "Challenges", decisions: "Design decisions", how: "How", why: "Why", flow: "Setup flow", tech: "Implementation", results: "Results", takeaway: "Takeaway" },
    },
    ui: {
      hudTitle: "Frontend Engineer",
      classic: "📄 Classic résumé",
      download: "⬇ Download PDF",
      langToggle: "中文",
      eyebrow: "Welcome to",
      introLead: "Hi, I'm <strong>Molly Chi</strong>, a frontend engineer who puts users first and builds with AI agents.<br>Walk around the town and step into each building to read my résumé.",
      start: "▶ Start exploring",
      justResume: "📄 Just show me the résumé",
      introHelp: "Move with WASD / arrow keys or tap the map · E / Space to enter",
      hint: "Move: WASD / arrows or tap the map · Enter / talk: E or Space",
      press: "Press", enter: (n) => `to enter ${n}`, talk: "to talk", wish: "to make a wish",
      visitedOld: "Visited", visitedNew: "New!", leave: "Leave ↩",
      contact: "Contact", focus: "What I'm best at", storyTitle: "How I got here",
      eduTitle: "Education & Certificates", eduSub: "From leisure studies to frontend — powered by continuous learning", certs: "Certificates", langs: "Languages",
      skillsTitle: "Skill Workshop", skillsSub: "UX is my strongest tool; AI agents are my main teammates",
      doneTitle: "🎉 You explored the whole town!", doneSub: "Thanks for taking the time to get to know me",
      doneText: "If you're looking for a frontend engineer who puts users first, breaks complex requirements into shippable work, and can direct AI agents to write the code without lowering quality — I'd love to talk!",
      progressLabel: (a, b) => `Visited ${a} of ${b} buildings`,
    },
    places: {
      home: ["Molly's Home", "About me"], asus: ["ASUS", "2024 – now"], cognito: ["Cognito Health", "2022 – 2024"],
      koo: ["Koo Cancer Center", "2020 – 2022"], school: ["School", "Education"], skills: ["Skill Workshop", "Skills"], studio: ["Design Studio", "UX case studies"],
    },
    npcs: {
      guide: ["Welcome to Molly's town!", "Step into each house to read her résumé — 7 places in total, and there's a surprise when you've seen them all."],
      knight: ["This is ASUS.", "The AI safety-monitoring system Molly leads here is used by a leading semiconductor manufacturer and was shown at an international automation exhibition!"],
      wizard: ["Write the spec, dispatch AI agents, review and verify the output…", "Molly lets AI agents write the code — she's the commander and the quality gate."],
      friend: null,
      well: ["You toss a coin into the well…", "Your wish: \"I hope I get to work with Molly!\" ✨"],
    },
  },
};
for (const l of Object.values(window.RESUME)) l.npcs.friend = [l.hobbies];
