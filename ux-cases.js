// UX case studies (top 5), source: claude-code-workspace/docs/portfolio/ux-case-studies.data.js
// Same shape as caseStudy in data.js. Edit the source doc, then regenerate this file.
window.UX_CASE_STUDIES = {
  "zh": [
    {
      "id": "ehs-notification",
      "title": "案例研究：不漏接也不被淹沒的即時告警通知",
      "sub": "華碩 AIS EHS · 負責前端設計與實作",
      "context": "AI 偵測到工安危險時，管理員與值班人員必須第一時間知道。原本告警只在通知頁面裡，人不在那頁就不會知道；從通知點進事件後，也不知道該看哪個時段的資料。",
      "challenges": [
        "告警量大：太吵會造成警報疲勞，太安靜又會漏接。",
        "已讀／未讀狀態分散在鈴鐺、通知總覽、側欄徽章，各處不一致。",
        "通知只是入口，使用者真正要的是事件發生當下的脈絡。",
        "網路斷線重連後，可能漏收或重複收到通知。"
      ],
      "figure": {
        "before": "告警只在通知頁：人不在就漏接",
        "after": "全域鈴鐺＋Toast：在哪一頁都即時知道"
      },
      "decisions": [
        {
          "title": "全域小鈴鐺＋Toast",
          "how": "任何頁面都有鈴鐺；新通知從右側滑入，最多同時 5 則、5 秒自動消失、可手動關閉；未讀超過 99 顯示「99+」。",
          "why": "不必待在通知頁也能即時知道，又不會讓畫面被通知淹沒。"
        },
        {
          "title": "讓使用者控制打擾程度",
          "how": "「即時橫幅」開關附說明：關掉只停止跳出橫幅，通知仍會進清單。",
          "why": "不同角色自己決定打擾程度，同時保證不漏資料。"
        },
        {
          "title": "一眼分辨類型與狀態",
          "how": "事件型與系統型用顏色和標籤區分；未讀與已讀用底色和標題色區分。",
          "why": "掃一眼就知道哪些要優先處理。"
        },
        {
          "title": "點了就到事發現場",
          "how": "依類型跳到事件、攝影機、任務或工作站頁並帶入時間；事件頁自動選出能涵蓋該時間的最小區間。",
          "why": "省掉「點進去還要自己找」的步驟，直接看到事發脈絡。"
        },
        {
          "title": "狀態處處一致",
          "how": "已讀採樂觀更新；鈴鐺、通知總覽、側欄徽章雙向同步；支援全部已讀與批次標記。",
          "why": "不會出現這邊看過、那邊還顯示未讀的困惑。"
        },
        {
          "title": "斷線也可靠",
          "how": "重連後自動重新訂閱，並對重複通知去重。",
          "why": "使用者不需要知道底層連線，也不會重複被打擾。"
        }
      ],
      "flow": [
        "收到告警",
        "Toast 提示",
        "點擊跳轉並帶入時間",
        "處理事件",
        "各處已讀同步"
      ],
      "tech": "Vue 3 + TypeScript；以 WebSocket 推播，搭配斷線重連與去重機制，並整合 i18n。",
      "results": [
        "告警從只能被動查詢，變成在任何頁面都能即時收到",
        "整合 LINE、Teams、SMS 等多種外部通知渠道的連線狀態顯示"
      ],
      "takeaway": "通知的價值不在「通知到」，而在「通知完，使用者下一步該做什麼」。",
      "labels": {
        "context": "背景",
        "challenges": "挑戰",
        "decisions": "設計決策",
        "how": "做法",
        "why": "為什麼",
        "flow": "流程",
        "tech": "技術實作",
        "results": "成果",
        "takeaway": "心得"
      }
    },
    {
      "id": "phm-dashboard",
      "title": "案例研究：一眼看出哪台機器有問題",
      "sub": "華碩 AIS PHM · 負責 Dashboard 資訊架構與前端實作",
      "context": "值班與巡檢人員打開 Dashboard，第一件事是想知道「哪台機器有問題」。舊版是一張平面的量測點大表，使用者要自己逐格掃數字、和門檻比對，看不出整體健康狀況。",
      "challenges": [
        "一個廠區有很多機器，每台又有多個量測點與軸向，資訊量大。",
        "狀態判斷規則多：警戒／危險兩級門檻、訊號、溫度。",
        "缺資料時若顯示 0，容易被誤判為正常。"
      ],
      "figure": {
        "before": "平面大表：要自己逐格比對數字",
        "after": "階層卡片：紅燈先浮上來，一點就進去"
      },
      "decisions": [
        {
          "title": "由大到小的資訊層級",
          "how": "依位置分組顯示機器卡片 → 點進機器看量測點卡片；全程有麵包屑。",
          "why": "先回答「哪裡有問題」，再回答「哪個點有問題」，符合排查的思考順序。"
        },
        {
          "title": "最嚴重的狀態往上浮",
          "how": "量測點狀態彙總到機器、再到位置，一律取最嚴重者；判斷規則集中管理。",
          "why": "一個點異常，整台機器就亮燈，不會被平均值掩蓋。"
        },
        {
          "title": "摘要即篩選",
          "how": "「全部／良好／警告／異常」數字方塊同時是篩選器，再點一次取消。",
          "why": "看到數字就能直接點進去，少一個步驟。"
        },
        {
          "title": "嚴重的排前面",
          "how": "同組內依嚴重度排序；沒有位置的排最後；空組不顯示。",
          "why": "注意力直接落在需要處理的地方。"
        },
        {
          "title": "誠實呈現缺值",
          "how": "缺值顯示「-」而不是 0；軸向標籤縮寫、長名稱截斷、卡片等寬。",
          "why": "避免把「沒資料」誤讀成「正常」，畫面也整齊好掃。"
        },
        {
          "title": "隨螢幕伸縮",
          "how": "卡片寬度隨視窗成長，窄時才換行。",
          "why": "大螢幕看板與一般筆電都好讀。"
        }
      ],
      "flow": [
        "總覽：依位置分組",
        "點摘要篩選異常",
        "進入機器",
        "查看量測點"
      ],
      "tech": "Vue 3 + TypeScript；狀態彙總規則抽成獨立模組，讓列表、卡片與篩選共用同一套判斷。",
      "results": [
        "從「逐格掃數字」變成「一眼看到紅燈 → 點進去」的排查路徑",
        "狀態規則集中，調整判斷邏輯只需改一處"
      ],
      "takeaway": "Dashboard 不是把所有資料都擺出來，而是替使用者先回答第一個問題。",
      "labels": {
        "context": "背景",
        "challenges": "挑戰",
        "decisions": "設計決策",
        "how": "做法",
        "why": "為什麼",
        "flow": "流程",
        "tech": "技術實作",
        "results": "成果",
        "takeaway": "心得"
      }
    },
    {
      "id": "vms-idle-refresh",
      "title": "案例研究：不打擾的自動刷新",
      "sub": "無線振動感測監控系統 · 負責前端設計與實作",
      "context": "現場維護人員常把監控畫面整天開著，資料會過期，只能手動重新整理。但最直覺的「固定時間輪詢」會在使用者操作到一半時刷新，打斷操作，畫面跳動也會讓人失去位置。",
      "challenges": [
        "資料要夠新，又不能打斷正在操作的人。",
        "使用者可能正在填表、開著彈窗，或只是在閱讀。",
        "分頁放在背景時，持續輪詢只是浪費資源。",
        "刷新失敗不應該跳錯誤窗把人嚇到。"
      ],
      "figure": {
        "before": "固定輪詢：操作到一半畫面就跳",
        "after": "閒置才刷新：資料新、操作不被打斷"
      },
      "decisions": [
        {
          "title": "只在閒置時刷新",
          "how": "只有點擊與按鍵算「活動」，滑鼠移動和捲動不算。",
          "why": "閱讀時畫面保持不動；真正操作中則不打擾。"
        },
        {
          "title": "正在忙就延後",
          "how": "有請求在跑、彈窗開著、或頁面正在載入時，延到下一輪再刷新。",
          "why": "絕不在使用者操作到一半時改變畫面。"
        },
        {
          "title": "背景不刷、回來就補",
          "how": "分頁在背景時不發請求，切回前景立刻補一次。",
          "why": "回來時看到的一定是最新資料，背景也不浪費資源。"
        },
        {
          "title": "靜默更新",
          "how": "自動刷新不顯示全頁 loading；失敗時不跳錯誤窗，等下一輪再試。",
          "why": "自動行為不應製造干擾，錯誤只在使用者主動操作時才提示。"
        },
        {
          "title": "交給使用者設定",
          "how": "可開關並設定 1–60 分鐘；超出範圍或非整數會被擋下或自動校正；改完立即生效、記在本機。",
          "why": "不同現場節奏不同，設定也要防呆。"
        }
      ],
      "flow": [
        "使用者閒置",
        "檢查是否忙碌／在背景",
        "靜默更新資料",
        "失敗則下一輪重試"
      ],
      "tech": "Vue 3 Composition API，把閒置偵測、頁面可見度與請求狀態封裝成可重用的 composable，套用到多個列表頁。",
      "results": [
        "看板可長時間掛著，資料保持更新，也不會打斷操作",
        "同一套機制套用到感測器、設備等主要頁面"
      ],
      "takeaway": "好的自動化是「使用者感覺不到它存在，但資料永遠是對的」。",
      "labels": {
        "context": "背景",
        "challenges": "挑戰",
        "decisions": "設計決策",
        "how": "做法",
        "why": "為什麼",
        "flow": "流程",
        "tech": "技術實作",
        "results": "成果",
        "takeaway": "心得"
      }
    },
    {
      "id": "sensor-batch",
      "title": "案例研究：管理上百顆感測器的批次操作與排程設定",
      "sub": "華碩 AIS PHM 與無線振動感測監控系統 · 負責前端設計與實作",
      "context": "現場維運與設備工程師一次要管理幾十到上百顆無線感測器：刪除、更新韌體、調整錄製排程（間隔、解析度、日期區間、星期）。逐顆操作既重複又容易漏；批次設定時，空值還會被默默補上預設值送出，使用者不知道實際送了什麼。",
      "challenges": [
        "操作對象多，重複作業耗時又容易漏。",
        "排程參數多，每次重新輸入很麻煩。",
        "批次設定中只要有一顆填錯，就可能讓整批結果不如預期。",
        "韌體更新是長時間任務，需要知道每一顆的進度與結果。"
      ],
      "figure": {
        "before": "逐顆操作：重複、易漏、送出內容不透明",
        "after": "批次操作＋預設：一次完成，送出即所見"
      },
      "decisions": [
        {
          "title": "勾選即出現批次操作列",
          "how": "勾選後表格上方滑出操作列，顯示「已選 N 項」與刪除、韌體更新、編輯排程、取消。",
          "why": "操作只在需要時出現，並且隨時知道會影響幾筆。"
        },
        {
          "title": "狀態就地顯示",
          "how": "韌體更新的等待中、更新中、失敗原因直接顯示在版本欄；刷新只重載表格；完成後自動清除勾選並重新查詢。",
          "why": "不用另開頁面追進度，結果出現在原本就在看的地方。"
        },
        {
          "title": "排程存成預設",
          "how": "常用排程可存成預設重複套用，列表顯示間隔、解析度、日期、星期摘要；套用預設不是必選。",
          "why": "把重複輸入變成一次點選，同時保留逐顆微調的彈性。"
        },
        {
          "title": "每一顆都合法才能套用",
          "how": "每顆感測器用手風琴收合、可逐顆編修；連沒展開的都會檢查；送出中鎖住按鈕防止連點。",
          "why": "避免整批裡藏著一顆錯誤設定，也避免重複送出。"
        },
        {
          "title": "所見即所送",
          "how": "不再默默補預設值，驗證與送出共用同一套轉換。",
          "why": "使用者在畫面上看到的，就是實際送出的設定。"
        },
        {
          "title": "輸入防呆但不打斷",
          "how": "間隔限 2–1440 分鐘、只允許數字、貼上也會過濾；離開欄位時才校正數值。",
          "why": "擋掉無效值，又不會在輸入「15」時，打下「1」就被改成「2」。"
        }
      ],
      "flow": [
        "勾選感測器",
        "批次操作列出現",
        "選預設或逐顆編修",
        "全部合法才可套用",
        "表格就地顯示結果"
      ],
      "tech": "Vue 3 + TypeScript；排程驗證與送出共用同一個轉換函式，確保畫面與 API 內容一致。",
      "results": [
        "大量感測器的維運從逐顆操作變成一次完成",
        "送出內容與畫面一致，批次設定的結果變得可預期"
      ],
      "takeaway": "批次操作的 UX 重點不是「一次做很多」，而是「一次做很多，也不會一次錯很多」。",
      "labels": {
        "context": "背景",
        "challenges": "挑戰",
        "decisions": "設計決策",
        "how": "做法",
        "why": "為什麼",
        "flow": "流程",
        "tech": "技術實作",
        "results": "成果",
        "takeaway": "心得"
      }
    },
    {
      "id": "aisphm-baseline",
      "title": "案例研究：讓「異常」的定義不會被設錯",
      "sub": "華碩 AIS PHM 2.0 · 負責互動設計與前端實作（尚未上線）",
      "context": "系統要先學習設備健康時的振動特徵（健康基準），再依門檻判斷注意、警戒、危險。設定的是設備工程師，他們懂機器，但不一定懂統計：基準期間選得太短、門檻順序設錯，都會造成大量誤報或漏報。",
      "challenges": [
        "樣本不足的基準不可靠，但使用者在設定當下看不出來。",
        "門檻有先後關係，設錯不容易發現。",
        "設備維修後要重建基準，舊基準也要保留可追溯。",
        "參數多，改到一半容易忘了儲存或誤存。"
      ],
      "figure": {
        "before": "自由輸入：設錯要等誤報才發現",
        "after": "即時護欄：不合理的設定存不進去"
      },
      "decisions": [
        {
          "title": "樣本不夠就不讓存",
          "how": "依選定日期即時估算每個頻帶的樣本數，不足時阻止儲存並說明原因。",
          "why": "在源頭擋掉不可靠的基準，而不是等誤報發生才發現。"
        },
        {
          "title": "門檻順序即時檢查",
          "how": "注意 < 警戒 < 危險，不符合時行內即時顯示錯誤。",
          "why": "錯誤出現在使用者正在看的地方，當下就能修。"
        },
        {
          "title": "輸入自動校正",
          "how": "數字欄位離開時自動夾回合法範圍。",
          "why": "少一則錯誤訊息，直接給出合理值。"
        },
        {
          "title": "未儲存一目了然",
          "how": "有變更才啟用儲存鈕，並出現「尚未儲存」提示。",
          "why": "避免改完忘了存，或沒改卻誤按。"
        },
        {
          "title": "基準版本化",
          "how": "草稿與已存版本可切換；維修後重建需選定既有版本並附說明；異動歷史可收合查看。",
          "why": "讓「為什麼現在的判斷標準是這樣」可追溯。"
        },
        {
          "title": "降低輸入成本",
          "how": "快速區間按鈕；數字千分位依使用者語系顯示。",
          "why": "常用操作一鍵完成，不同地區的使用者都讀得順。"
        }
      ],
      "flow": [
        "選健康基準期間",
        "檢查樣本是否足夠",
        "設定門檻",
        "儲存為版本",
        "維修後重建"
      ],
      "tech": "Vue 3 + TypeScript；驗證規則與表單狀態集中管理，讓即時提示、儲存條件與版本切換保持一致。",
      "results": [
        "把需要懂統計才設得對的專家設定，變成有護欄、可追溯的流程"
      ],
      "takeaway": "專家工具的 UX 不是把選項藏起來，而是讓每個選項都不會被設錯。",
      "labels": {
        "context": "背景",
        "challenges": "挑戰",
        "decisions": "設計決策",
        "how": "做法",
        "why": "為什麼",
        "flow": "流程",
        "tech": "技術實作",
        "results": "成果",
        "takeaway": "心得"
      }
    }
  ],
  "en": [
    {
      "id": "ehs-notification",
      "title": "Case study: Real-time alerts you never miss — and never drown in",
      "sub": "ASUS AIS EHS · Frontend design and implementation",
      "context": "When AI detects a safety hazard, safety managers and on-duty staff need to know immediately. Alerts used to live only on the notifications page — if you weren't on it, you missed them. And after clicking into an event, users still had to hunt for the right time range.",
      "challenges": [
        "High alert volume: too noisy causes alarm fatigue, too quiet means missed hazards.",
        "Read / unread state was scattered across the bell, the notification list and sidebar badges — and they disagreed.",
        "A notification is only an entry point; what users really need is the context of the moment it happened.",
        "After a network reconnect, notifications could be lost or duplicated."
      ],
      "figure": {
        "before": "Alerts only on one page: miss it if you're elsewhere",
        "after": "Global bell + toasts: know instantly, on any page"
      },
      "decisions": [
        {
          "title": "Global bell + toasts",
          "how": "A bell on every page; new alerts slide in from the right — at most 5 at once, auto-dismiss after 5 s, closable; unread counts over 99 show “99+”.",
          "why": "Users know right away without staying on one page, and the screen never gets flooded."
        },
        {
          "title": "Users control interruptions",
          "how": "A “live banner” toggle with a tooltip: turning it off stops pop-ups, but alerts still land in the list.",
          "why": "Each role picks its own interruption level without ever losing data."
        },
        {
          "title": "Type and state at a glance",
          "how": "Event vs. system alerts use distinct colors and tags; unread vs. read use background and title color.",
          "why": "One scan tells users what to handle first."
        },
        {
          "title": "One click to the scene",
          "how": "Jump to the source page — event, camera, task or workstation — with the time attached; the event page auto-selects the smallest range covering that moment.",
          "why": "No more “click in, then search again” — users land directly in context."
        },
        {
          "title": "Consistent state everywhere",
          "how": "Optimistic read updates; bell, list and sidebar badges sync both ways; mark all / batch mark as read.",
          "why": "No confusion of “read here, unread there”."
        },
        {
          "title": "Reliable through disconnects",
          "how": "Auto re-subscribe after reconnecting and de-duplicate repeated alerts.",
          "why": "Users never have to think about the connection, and are never pinged twice."
        }
      ],
      "flow": [
        "Alert arrives",
        "Toast",
        "Click → jump with time",
        "Handle event",
        "Read state synced"
      ],
      "tech": "Vue 3 + TypeScript; WebSocket push with reconnect and de-duplication, fully localized with i18n.",
      "results": [
        "Alerts went from something you had to go check to something that reaches you on any page",
        "Shows connection status for external channels such as LINE, Teams and SMS"
      ],
      "takeaway": "A notification's value isn't in arriving — it's in what the user can do next.",
      "labels": {
        "context": "Context",
        "challenges": "Challenges",
        "decisions": "Design decisions",
        "how": "How",
        "why": "Why",
        "flow": "Flow",
        "tech": "Implementation",
        "results": "Results",
        "takeaway": "Takeaway"
      }
    },
    {
      "id": "phm-dashboard",
      "title": "Case study: Spot the failing machine at a glance",
      "sub": "ASUS AIS PHM · Dashboard information architecture and frontend",
      "context": "When on-duty staff open the dashboard, their first question is “which machine has a problem?”. The old version was one flat table of measurement points — users had to scan every cell and compare it with thresholds, with no sense of overall health.",
      "challenges": [
        "A site has many machines, each with several measurement points and axes.",
        "Many status rules: warning / danger thresholds, signal and temperature.",
        "Showing 0 for missing data makes “no data” look healthy."
      ],
      "figure": {
        "before": "Flat table: compare numbers cell by cell",
        "after": "Hierarchical cards: red rises to the top, one click in"
      },
      "decisions": [
        {
          "title": "Top-down information hierarchy",
          "how": "Machine cards grouped by location → click into a machine for its point cards; breadcrumbs throughout.",
          "why": "Answer “where is the problem” before “which point” — matching how people troubleshoot."
        },
        {
          "title": "Worst status bubbles up",
          "how": "Point status rolls up to machine, then location, always taking the most severe; rules live in one module.",
          "why": "One abnormal point lights up the whole machine instead of being averaged away."
        },
        {
          "title": "Summary tiles are filters",
          "how": "All / Normal / Warning / Abnormal counters double as filters; click again to clear.",
          "why": "See a number, click it — one step fewer."
        },
        {
          "title": "Most severe first",
          "how": "Sort by severity within each group; unlocated machines last; hide empty groups.",
          "why": "Attention lands where action is needed."
        },
        {
          "title": "Honest about missing data",
          "how": "Show “-” instead of 0; abbreviate axis labels, truncate long names, keep cards equal width.",
          "why": "“No data” is never mistaken for “normal”, and the grid stays easy to scan."
        },
        {
          "title": "Scales with the screen",
          "how": "Cards grow with the viewport and wrap only when narrow.",
          "why": "Readable on wall displays and laptops alike."
        }
      ],
      "flow": [
        "Overview by location",
        "Filter by status",
        "Open machine",
        "Inspect points"
      ],
      "tech": "Vue 3 + TypeScript; status roll-up extracted into a shared module so lists, cards and filters use the same rules.",
      "results": [
        "Troubleshooting went from scanning numbers to “see red → click in”",
        "Status rules centralized — logic changes happen in one place"
      ],
      "takeaway": "A dashboard isn't about showing everything — it's about answering the user's first question for them.",
      "labels": {
        "context": "Context",
        "challenges": "Challenges",
        "decisions": "Design decisions",
        "how": "How",
        "why": "Why",
        "flow": "Flow",
        "tech": "Implementation",
        "results": "Results",
        "takeaway": "Takeaway"
      }
    },
    {
      "id": "vms-idle-refresh",
      "title": "Case study: Auto-refresh that never gets in the way",
      "sub": "Wireless vibration monitoring system · Frontend design and implementation",
      "context": "Maintenance staff keep monitoring screens open all day, so data goes stale and they had to reload by hand. The obvious fix — polling on a fixed timer — refreshes mid-task, interrupts input and makes users lose their place.",
      "challenges": [
        "Data must stay fresh without interrupting whoever is working.",
        "Users may be filling a form, have a dialog open, or simply be reading.",
        "Polling a background tab just wastes resources.",
        "A failed refresh shouldn't alarm anyone with an error pop-up."
      ],
      "figure": {
        "before": "Fixed polling: the screen jumps mid-task",
        "after": "Refresh only when idle: fresh data, no interruptions"
      },
      "decisions": [
        {
          "title": "Refresh only when idle",
          "how": "Only clicks and key presses count as activity — mouse moves and scrolling don't.",
          "why": "The screen stays still while reading, and never changes during real interaction."
        },
        {
          "title": "Busy? Wait",
          "how": "Skip to the next cycle when a request is in flight, a dialog is open or the page is loading.",
          "why": "Never change the screen while the user is mid-task."
        },
        {
          "title": "Pause in background, catch up on return",
          "how": "No requests while the tab is hidden; refresh once it's back in focus.",
          "why": "Users always come back to fresh data, with no wasted background traffic."
        },
        {
          "title": "Silent updates",
          "how": "No full-page loader for auto-refresh; failures don't pop errors and simply retry next cycle.",
          "why": "Automatic behavior shouldn't create noise — errors surface only for user-initiated actions."
        },
        {
          "title": "User-configurable, with guard rails",
          "how": "Toggle on/off and set 1–60 minutes; out-of-range or non-integer input is blocked or corrected; applies instantly and is saved locally.",
          "why": "Each site has its own rhythm, and settings deserve guard rails too."
        }
      ],
      "flow": [
        "User goes idle",
        "Check busy / background",
        "Silent refresh",
        "Retry next cycle on failure"
      ],
      "tech": "Vue 3 Composition API — idle detection, page visibility and request state wrapped in a reusable composable shared across list pages.",
      "results": [
        "Dashboards can stay open all day with fresh data and no interruptions",
        "One mechanism reused across sensor, equipment and other key pages"
      ],
      "takeaway": "Good automation is invisible to the user — yet the data is always right.",
      "labels": {
        "context": "Context",
        "challenges": "Challenges",
        "decisions": "Design decisions",
        "how": "How",
        "why": "Why",
        "flow": "Flow",
        "tech": "Implementation",
        "results": "Results",
        "takeaway": "Takeaway"
      }
    },
    {
      "id": "sensor-batch",
      "title": "Case study: Batch operations and scheduling for hundreds of sensors",
      "sub": "ASUS AIS PHM and wireless vibration monitoring system · Frontend design and implementation",
      "context": "Maintenance staff and equipment engineers manage dozens to hundreds of wireless sensors at once — deleting them, updating firmware and adjusting recording schedules (interval, resolution, date range, weekdays). Doing it one by one was repetitive and error-prone, and batch edits silently filled empty fields with defaults, so users couldn't tell what was actually sent.",
      "challenges": [
        "Many targets: repetitive work that's slow and easy to miss.",
        "Many schedule parameters, re-entered every time.",
        "One wrong sensor in a batch can make the whole result unpredictable.",
        "Firmware updates are long-running, and users need each sensor's progress and outcome."
      ],
      "figure": {
        "before": "One by one: repetitive, error-prone, opaque payloads",
        "after": "Batch + presets: done at once, what you see is what's sent"
      },
      "decisions": [
        {
          "title": "Batch bar on selection",
          "how": "Selecting rows slides in a bar above the table showing “N selected” with delete, firmware update, edit schedule and cancel.",
          "why": "Actions appear only when needed, and users always know how many items they affect."
        },
        {
          "title": "Status in place",
          "how": "Firmware states — pending, updating, failure reason — show right in the version column; refresh reloads only the table; selection clears and data reloads when done.",
          "why": "No separate page to track progress — results appear where users are already looking."
        },
        {
          "title": "Schedules as presets",
          "how": "Save common schedules as presets with a summary of interval, resolution, dates and weekdays; presets are optional.",
          "why": "Repeated typing becomes one click, while per-sensor tweaks stay possible."
        },
        {
          "title": "Every sensor must be valid",
          "how": "Each sensor sits in an accordion for individual edits; even collapsed ones are validated; the button locks while submitting.",
          "why": "No hidden bad setting inside a batch, and no double submits."
        },
        {
          "title": "What you see is what's sent",
          "how": "No more silent defaults — validation and submission share one conversion.",
          "why": "The settings on screen are exactly the settings sent."
        },
        {
          "title": "Guard rails that don't fight you",
          "how": "Interval limited to 2–1440 minutes, digits only, pasted text filtered; values are corrected on blur.",
          "why": "Invalid values are blocked without the field changing “1” to “2” while you're typing “15”."
        }
      ],
      "flow": [
        "Select sensors",
        "Batch bar appears",
        "Apply preset or edit each",
        "Apply only when all valid",
        "Results shown in place"
      ],
      "tech": "Vue 3 + TypeScript; schedule validation and submission share one conversion function so the screen and the API payload always match.",
      "results": [
        "Operating many sensors went from one by one to one action",
        "Payloads match the screen, making batch results predictable"
      ],
      "takeaway": "Good batch UX isn't about doing many things at once — it's about not making many mistakes at once.",
      "labels": {
        "context": "Context",
        "challenges": "Challenges",
        "decisions": "Design decisions",
        "how": "How",
        "why": "Why",
        "flow": "Flow",
        "tech": "Implementation",
        "results": "Results",
        "takeaway": "Takeaway"
      }
    },
    {
      "id": "aisphm-baseline",
      "title": "Case study: Making “abnormal” impossible to misconfigure",
      "sub": "ASUS AIS PHM 2.0 · Interaction design and frontend (not yet released)",
      "context": "The system first learns each machine's healthy vibration profile (the health baseline), then uses thresholds to flag notice, warning and danger. The people configuring it are equipment engineers — machine experts, not statisticians. A baseline period that's too short or thresholds in the wrong order cause floods of false or missed alarms.",
      "challenges": [
        "A baseline with too few samples is unreliable, but users can't tell while setting it.",
        "Thresholds must be ordered, and mistakes are easy to miss.",
        "After maintenance the baseline must be rebuilt, while old ones stay traceable.",
        "With many parameters, it's easy to forget to save — or save by accident."
      ],
      "figure": {
        "before": "Free input: mistakes surface as false alarms",
        "after": "Live guard rails: invalid settings can't be saved"
      },
      "decisions": [
        {
          "title": "Not enough samples, no save",
          "how": "Estimate samples per frequency band from the chosen dates in real time; block saving with an explanation when insufficient.",
          "why": "Stop unreliable baselines at the source instead of discovering them through false alarms."
        },
        {
          "title": "Live threshold ordering",
          "how": "Notice < warning < danger, with inline errors as soon as the order breaks.",
          "why": "Errors appear where the user is looking, so they're fixed on the spot."
        },
        {
          "title": "Auto-correct on blur",
          "how": "Numeric fields clamp back into the valid range when focus leaves.",
          "why": "One less error message — just a sensible value."
        },
        {
          "title": "Unsaved changes are obvious",
          "how": "Save is enabled only after a change, with an “unsaved” hint.",
          "why": "No forgotten saves, no accidental ones."
        },
        {
          "title": "Versioned baselines",
          "how": "Switch between draft and saved versions; rebuilding after maintenance requires picking a version and adding a note; collapsible change history.",
          "why": "“Why is this the current standard?” always has an answer."
        },
        {
          "title": "Less typing",
          "how": "Quick range buttons; number grouping follows the user's locale.",
          "why": "Common actions take one click and read naturally in every region."
        }
      ],
      "flow": [
        "Pick baseline period",
        "Check sample sufficiency",
        "Set thresholds",
        "Save as version",
        "Rebuild after maintenance"
      ],
      "tech": "Vue 3 + TypeScript; validation rules and form state managed in one place so hints, save conditions and version switching stay consistent.",
      "results": [
        "Turned an expert-only setting into a guarded, traceable flow"
      ],
      "takeaway": "UX for expert tools isn't about hiding options — it's about making every option impossible to get wrong.",
      "labels": {
        "context": "Context",
        "challenges": "Challenges",
        "decisions": "Design decisions",
        "how": "How",
        "why": "Why",
        "flow": "Flow",
        "tech": "Implementation",
        "results": "Results",
        "takeaway": "Takeaway"
      }
    }
  ]
};
