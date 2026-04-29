(() => {
  "use strict";
  // ─── Fallback data for file:// protocol ───
  const FALLBACK_MODELS = [
  {
    "id": "f1e",
    "name": "星智F1E",
    "series": "星智微卡",
    "category": "微卡",
    "energy": "纯电",
    "image": "./assets/pages/processed/f1e.webp?v=2",
    "tag": "真能载 · 真能跑 · 真能赚",
    "summary": "覆盖厢式、栏板、仓栅，多电池方案，适合城配短驳与多货型运营。",
    "metrics": [
      ["续航", "最高320km"],
      ["货厢", "最高9.7m³"],
      ["承载", "至高1.84t"],
      ["快充", "20%-80% 30min"]
    ],
    "specs": {
      "车辆类型": "厢式车 / 栏板车 / 仓栅车",
      "电池": "玄武35.2/41.05/51.39，宁德41.86，智芯46.08",
      "轴距": "3070 / 3360mm",
      "货厢尺寸": "最长3350×1700×1700mm",
      "驱动电机": "30/60、35/70、35/72kW",
      "安全配置": "ABS+EBD+ASR，ADAS可选"
    },
    "highlights": [
      "同级大方量货厢，装载空间最高9.7m³",
      "电池至高10年/80万公里质保",
      "支持快慢充与对外放电",
      "远程APP控制、OTA与状态监测"
    ]
  },
  {
    "id": "f3e",
    "name": "星智F3E",
    "series": "星智轻卡",
    "category": "轻卡",
    "energy": "纯电",
    "image": "./assets/pages/processed/f3e.webp?v=2",
    "tag": "宽体轻卡 · 智慧版",
    "summary": "3.5吨级纯电轻卡，三类上装覆盖，强调承载、智驾与舒适配置。",
    "metrics": [
      ["电量", "56-73kWh"],
      ["功率", "105/110kW"],
      ["轴距", "3700mm"],
      ["总质量", "3495kg"]
    ],
    "specs": {
      "车辆类型": "栏板车 / 厢式车 / 仓栅车",
      "驾驶室": "单排2座，外宽1820mm",
      "货箱尺寸": "3790/3820×1900×1800mm等",
      "电池质保": "玄武10年/80万公里，宁德8年/60万公里",
      "底盘": "610L高强度钢，160mm直通大梁",
      "智驾": "FCW、LDW、AEB、PEB、ACC"
    },
    "highlights": [
      "高强度车架与免维护轮端",
      "EHB+电子手刹+AutoHold",
      "无钥匙进入/启动与7寸液晶仪表",
      "全速自适应巡航与主动安全配置"
    ]
  },
  {
    "id": "v6e-function",
    "name": "星享V6E功能版",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v6e-function.webp?v=2",
    "tag": "4.8米车型 · 多变空间",
    "summary": "6座多用途车型，兼顾载人和载货，适合城市配送、服务用车与日常经营。",
    "metrics": [
      ["续航", "最高325km"],
      ["快充", "35min"],
      ["车长", "4845mm"],
      ["座位", "6座"]
    ],
    "specs": {
      "车身尺寸": "4845×1730×1985mm",
      "轴距": "3100mm",
      "电池": "玄武41.055 / 智芯46.08 / 宁德41.86 / 国轩41.93kWh",
      "电机": "35/70kW，后置后驱",
      "尾门": "270度对开式尾门",
      "智能": "远程OTA、远程锁车、DYN/ECO模式、载荷称重"
    },
    "highlights": [
      "第二/三排连体座椅可侧翻挂起",
      "标配快充，满足全天补能",
      "LED大灯与自动大灯",
      "可选10.1寸车机大屏与倒车影像"
    ]
  },
  {
    "id": "v6e-window",
    "name": "星享V6E",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v6e.webp?v=2",
    "tag": "明窗/盲窗 · 6方空间",
    "summary": "2座货运，主打紧凑车身，大空间和高效三电。",
    "metrics": [
      ["续航", "350-355km"],
      ["货厢", "6m³"],
      ["快充", "36min"],
      ["总质量", "3000kg"]
    ],
    "specs": {
      "车身尺寸": "4845×1730×1985mm",
      "货箱尺寸": "2800×1600×1320/1270mm",
      "电池": "玄武51.39kWh",
      "电机": "30/60kW，70/175N·m",
      "载质量": "1515/1535/1555kg",
      "座位": "2座"
    },
    "highlights": [
      "动力电池最长10年/80万公里质保",
      "6.6kW慢充+V2L，快慢结合",
      "270度尾门与磁吸门碰",
      "可选ADAS、DMS与双向实时通话"
    ]
  },
  {
    "id": "v7e",
    "name": "星享V7E",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v7e.webp?v=2",
    "tag": "7.5方 · 钢管能拉4米长",
    "summary": "大货厢、高承载、乘用化座舱，适合城配、安装服务与多场景经营。",
    "metrics": [
      ["续航", "最高375km"],
      ["货厢", "7.5m³"],
      ["载重", "最高1.5t"],
      ["快充", "15min"]
    ],
    "specs": {
      "车身尺寸": "5000×1820×1985mm",
      "货箱尺寸": "2870×1770×1435/1475mm",
      "轴距": "3200mm",
      "电池": "玄武51.4 / 宁德50.2kWh",
      "电机": "45/90kW，100/220N·m",
      "制动": "前后盘式，EHB+EPB+AutoHold"
    },
    "highlights": [
      "货厢可拓展至4100mm长货装载",
      "30%-80% SOC充电约15分钟",
      "0.27乘用级风阻系数",
      "支持V2L外放电与远程OTA"
    ]
  },
  {
    "id": "v7e-function",
    "name": "星享V7E功能版",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v7e-function.webp?v=2",
    "tag": "5/6/7/9座 · 货厢布局随心变",
    "summary": "多人座与货运能力兼顾，后排座椅支持放倒，适合客货两用场景。",
    "metrics": [
      ["续航", "360-370km"],
      ["货厢", "7.5m³"],
      ["座位", "5/6/7/9"],
      ["峰值扭矩", "220N·m"]
    ],
    "specs": {
      "车身尺寸": "5000×1820×1985mm",
      "轴距": "3200mm",
      "电池": "玄武51.4 / 宁德50.2kWh",
      "充电": "1.2C / 2C液冷",
      "安全": "ADAS / 高阶ADAS按版本配置",
      "舒适": "座椅通风加热、360影像等智尊版配置"
    },
    "highlights": [
      "后排座椅支持等比例放倒和全平放倒",
      "双侧滑门可选，两侧上下车",
      "全车15处储物空间",
      "12.3寸车机大屏与语音交互可选"
    ]
  },
  {
    "id": "xingxiang-v8e",
    "name": "星享V8E",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v8e.webp?v=2",
    "tag": "8.5方 · 4.5米长货",
    "summary": "更大车身与货厢容积，适合大件城配、工具设备运输和高频营运。",
    "metrics": [
      ["续航", "最高460km"],
      ["货厢", "8.5m³"],
      ["载质量", "最高1615kg"],
      ["车长", "5400mm"]
    ],
    "specs": {
      "车身尺寸": "5400×1820×1985mm",
      "货箱尺寸": "3280×1700/1770×1435/1475mm",
      "轴距": "3605mm",
      "电池": "玄武51.4 / 宁德50.2 / 玄武65kWh",
      "电机": "45/90kW，100/220N·m",
      "开门": "单侧滑门，双侧滑门可选"
    },
    "highlights": [
      "货厢内长3280mm，可拓展4500mm",
      "配备65kWh大电量玄武电池版本",
      "充电10分钟可补约2小时续航场景",
      "支持数字钥匙、远程空调、远程寻车"
    ]
  },
  {
    "id": "v8e-function",
    "name": "星享V8E功能版",
    "series": "星享V系",
    "category": "轻客",
    "energy": "纯电",
    "image": "./assets/pages/processed/v8e.webp?v=2",
    "sheet": "./assets/pages/processed/v8e-function.webp?v=2",
    "tag": "6/7/9座 · 8.5方",
    "summary": "V8E客货两用功能版，空间更大，座椅布局更灵活。",
    "metrics": [
      ["续航", "340-450km"],
      ["货厢", "8.5m³"],
      ["座位", "6/7/9"],
      ["快充", "2C液冷"]
    ],
    "specs": {
      "车身尺寸": "5400×1820×1985mm",
      "轴距": "3605mm",
      "电池": "玄武51.4 / 宁德50.2 / 玄武65kWh",
      "电机": "45/90kW，100/220N·m",
      "制动": "前后盘式，EHB电子液压制动",
      "智能": "基础ADAS / 高阶ADAS按版本配置"
    },
    "highlights": [
      "后排座椅支持等比例放倒和全平放倒",
      "2C液冷超充，充电10分钟满足高频出勤",
      "支持V2L车内/车外对外放电",
      "乘用化怀挡布局与舒适座舱"
    ]
  },
  {
    "id": "xingzhi-h",
    "name": "远程星智H纯电智卡",
    "series": "星智H系",
    "category": "轻卡",
    "energy": "纯电",
    "image": "./assets/pages/processed/h.webp?v=2",
    "tag": "智优双全 · 安心赚钱",
    "summary": "H8E/H9E多版本纯电智卡，覆盖中体/宽体与多类货厢，强调三电、智驾和服务生态。",
    "metrics": [
      ["电池", "81-155kWh"],
      ["功率", "最高140kW"],
      ["轴距", "3360mm"],
      ["快充", "最快≤20min"]
    ],
    "specs": {
      "车型系列": "H8E / H9E",
      "车辆类型": "厢式 / 仓栅 / 栏板",
      "总质量": "4495kg",
      "驾驶室": "中体 / 宽体，核定3人",
      "电机": "智芯动力，最大功率120/140kW",
      "货厢": "瓦楞板标配，钢平板/蜂窝板/铝合金等可选"
    },
    "highlights": [
      "玄武液冷电池最长10年/80万公里质保",
      "ADAS主动安全与DVR+DMS监测",
      "5年/30万公里底盘免维护技术",
      "金融与服务生态覆盖，适配多运营模式"
    ]
  },
  {
    "id": "xingzhi-t-ev",
    "name": "星智T纯电轻卡",
    "series": "星智T系",
    "category": "轻卡",
    "energy": "纯电",
    "image": "./assets/pages/processed/t-e.webp?v=2",
    "tag": "硬核承载 · 超长续航",
    "summary": "T9E/TXE纯电轻卡，面向高载重、高续航与高安全运营场景。",
    "metrics": [
      ["电池", "120-154kWh"],
      ["峰值功率", "235kW"],
      ["快充", "18min"],
      ["车架", "865mm宽"]
    ],
    "specs": {
      "车型系列": "T9E / TXE",
      "车辆类型": "厢式 / 仓栅 / 栏板",
      "驾驶室外宽": "2120mm",
      "轴距": "3360 / 3600mm",
      "驱动桥": "双档电驱动桥",
      "智驾": "AEB、LDW、FCW、ACC、LKA、BSD等按版本配置"
    },
    "highlights": [
      "最大4吨前桥+8吨后桥",
      "最大轮端扭矩16000N·m",
      "全系2C液冷超充，15分钟补能续航200km+",
      "三电最高10年/80万公里质保"
    ]
  },
  {
    "id": "xingzhi-t-methanol",
    "name": "星智T甲醇电动轻卡",
    "series": "星智T系",
    "category": "轻卡",
    "energy": "甲醇电动",
    "image": "./assets/pages/processed/t-m.webp?v=2",
    "tag": "甲醇电动 · 1500km+",
    "summary": "T9M/TXM甲醇电动轻卡，兼顾长续航和强动力，适合跨城与高强度运营。",
    "metrics": [
      ["综合续航", "1500km+"],
      ["峰值功率", "235kW"],
      ["增程器", "2.0T"],
      ["醇箱", "最高350L"]
    ],
    "specs": {
      "车型系列": "T9M / TXM",
      "车辆类型": "厢式 / 仓栅 / 栏板",
      "轴距": "3360 / 3600mm",
      "电池": "智芯15/81，玄武110kWh",
      "增程器": "2.0T，100kW",
      "驱动桥": "双档电驱动桥"
    },
    "highlights": [
      "最高综合续航1500km+",
      "最大4吨前桥+8吨后桥",
      "气压制动EBS+ESC与IBS智慧制动",
      "AI语音交互与生活舱配置"
    ]
  },
  {
    "id": "xingzhi-t-cold",
    "name": "星智T新能源冷藏轻卡",
    "series": "星智T系",
    "category": "冷藏",
    "energy": "纯电 / 甲醇电动",
    "image": "./assets/pages/processed/t-c.webp?v=2",
    "tag": "冷藏专用 · 智慧锁鲜",
    "summary": "覆盖纯电与甲醇电动冷藏方案，面向食品、生鲜、医药等温控运输场景。",
    "metrics": [
      ["冷箱", "4080×2100×2100mm"],
      ["最低温度", "-29℃"],
      ["降温", "30℃至0℃约20min"],
      ["功率", "最高235kW"]
    ],
    "specs": {
      "车型系列": "T9E / TXE / T9M / TXM",
      "车辆类型": "冷藏",
      "轴距": "3360 / 3600mm",
      "电池": "宁德120/140，玄武133/154，智芯15/81，玄武110",
      "制冷": "冷机最低温度可低至-29℃",
      "厢体": "聚氨酯，单开门，花纹玻璃钢底板"
    },
    "highlights": [
      "冷箱支持多区控温，覆盖冷藏/常温/冷冻",
      "冷箱内外蒙皮采用玻璃钢、VR板材质",
      "甲醇电动版本续航超1500km+",
      "AEB、FCW、LDW等主动安全配置"
    ]
  }
];
  let models = [];
  let categories = ["全部"];
  let activeCategory = "全部";
  let query = "";
  let searchDebounceTimer = null;

  // ─── DOM Refs ───
  const els = {
    tabs: document.querySelector("#tabs"),
    grid: document.querySelector("#cardGrid"),
    input: document.querySelector("#searchInput"),
    drawer: document.querySelector("#drawer"),
    closeBtn: document.querySelector("#closeBtn"),
    closeScrim: document.querySelector("#closeScrim"),
    modelCount: document.querySelector("#modelCount"),
    printBtn: document.querySelector("#printBtn"),
    emptyClearBtn: document.querySelector("#emptyClearBtn"),
    themeToggle: document.querySelector("#themeToggle"),
    themeIconSun: document.querySelector("#themeIconSun"),
    themeIconMoon: document.querySelector("#themeIconMoon"),
    loading: document.querySelector("#loadingState"),
    empty: document.querySelector("#emptyState"),
    detailImage: document.querySelector("#detailImage"),
    sheetPreview: document.querySelector("#sheetPreview"),
    detailSeries: document.querySelector("#detailSeries"),
    detailTitle: document.querySelector("#detailTitle"),
    detailTag: document.querySelector("#detailTag"),
    metricGrid: document.querySelector("#metricGrid"),
    highlights: document.querySelector("#highlights"),
    specTable: document.querySelector("#specTable"),
  };

  // ─── URL Helpers ───
  function readUrlState() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const q = params.get("search");
    if (cat) activeCategory = cat;
    if (q !== null) query = q;
  }

  function writeUrlState() {
    const params = new URLSearchParams();
    if (activeCategory !== "全部") params.set("category", activeCategory);
    if (query) params.set("search", query);
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  // ─── Data ───
  async function loadData() {
    try {
      const res = await fetch("./data/models.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      models = await res.json();
      categories = ["全部", ...new Set(models.map((m) => m.category))];
      els.modelCount.textContent = String(models.length);
      readUrlState();
      els.input.value = query;
      renderTabs();
      renderCards();
    } catch (err) {
      console.warn("fetch 失败，使用内嵌数据回退:", err);
      models = FALLBACK_MODELS;
      categories = ["全部", ...new Set(models.map((m) => m.category))];
      els.modelCount.textContent = String(models.length);
      readUrlState();
      els.input.value = query;
      renderTabs();
      renderCards();
    } finally {
      els.loading.hidden = true;
    }
  }

  // ─── Tabs ───
  function renderTabs() {
    els.tabs.innerHTML = categories
      .map(
        (cat) =>
          `<button class="tab ${cat === activeCategory ? "active" : ""}" data-category="${cat}" aria-pressed="${cat === activeCategory}">${cat}</button>`
      )
      .join("");
  }

  // ─── Match ───
  function matches(model) {
    const inCategory = activeCategory === "全部" || model.category === activeCategory;
    if (!query.trim()) return inCategory;
    const haystack = [
      model.name,
      model.series,
      model.category,
      model.energy,
      model.tag,
      model.summary,
      ...model.metrics.flat(),
      ...Object.values(model.specs),
      ...model.highlights,
    ].join(" ");
    return inCategory && haystack.toLowerCase().includes(query.toLowerCase());
  }

  // ─── Card Render ───
  function renderCards() {
    const visible = models.filter(matches);
    writeUrlState();

    if (visible.length === 0) {
      els.grid.innerHTML = "";
      els.empty.hidden = false;
      els.empty.querySelector(".empty-query").textContent = query ? `「${query}」` : "";
      return;
    }
    els.empty.hidden = true;

    els.grid.innerHTML = visible
      .map(
        (model, index) => `
        <article class="card" data-id="${model.id}" tabindex="0" aria-label="查看${model.name}详情" style="--stagger:${index}">
          <div class="card-media">
            <img src="${model.image}" alt="${model.name}彩页预览" loading="lazy" decoding="async" />
            <span class="badge">${model.energy}</span>
          </div>
          <div class="card-body">
            <p class="series">${model.series}</p>
            <h2>${model.name}</h2>
            <p class="summary">${model.summary}</p>
            <div class="mini-metrics">
              ${model.metrics
                .slice(0, 4)
                .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
                .join("")}
            </div>
            <button class="card-action" type="button">查看详细资料</button>
          </div>
        </article>
      `
      )
      .join("");

    // Animate cards in via IntersectionObserver
    observeCards();
  }

  // ─── IntersectionObserver for card reveal ───
  let cardObserver;
  function observeCards() {
    if (cardObserver) cardObserver.disconnect();
    cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".card").forEach((card) => cardObserver.observe(card));
  }

  // ─── Drawer / Detail ───
  let previousActiveElement = null;
  let touchStartX = 0;

  function openDetail(id) {
    const model = models.find((item) => item.id === id);
    if (!model) return;

    previousActiveElement = document.activeElement;

    els.detailImage.src = model.image;
    els.detailImage.alt = `${model.name}彩页预览`;
    els.sheetPreview.src = model.sheet || model.image;
    els.sheetPreview.alt = `${model.name}彩页预览`;
    els.detailSeries.textContent = `${model.series} / ${model.energy}`;
    els.detailTitle.textContent = model.name;
    els.detailTag.textContent = model.tag;

    els.metricGrid.innerHTML = model.metrics
      .map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");

    els.highlights.innerHTML = model.highlights.map((item) => `<li>${item}</li>`).join("");

    els.specTable.innerHTML = Object.entries(model.specs)
      .map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");

    els.drawer.classList.add("open");
    els.drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus management: move focus into drawer
    requestAnimationFrame(() => {
      els.closeBtn.focus();
    });
  }

  function closeDetail() {
    if (!els.drawer.classList.contains("open")) return;
    els.drawer.classList.remove("open");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (previousActiveElement) {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  }

  // ─── Focus Trap inside Drawer ───
  function handleDrawerTab(event) {
    if (event.key !== "Tab" || els.drawer.getAttribute("aria-hidden") === "true") return;
    const focusable = els.drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // ─── Swipe to close drawer (mobile) ───
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - touchStartX;
    if (diff > 80 && touchStartX < window.innerWidth * 0.25) {
      closeDetail();
    }
  }

  // ─── Events ───
  els.tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderTabs();
    renderCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.grid.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) openDetail(card.dataset.id);
  });

  els.grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const card = event.target.closest(".card");
    if (card) {
      event.preventDefault();
      openDetail(card.dataset.id);
    }
  });

  els.input.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      query = value;
      renderCards();
    }, 180);
  });

  els.closeBtn.addEventListener("click", closeDetail);
  els.closeScrim.addEventListener("click", closeDetail);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetail();
    handleDrawerTab(event);
  });

  // Swipe-to-close on drawer panel
  els.drawer.querySelector(".panel").addEventListener("touchstart", handleTouchStart, { passive: true });
  els.drawer.querySelector(".panel").addEventListener("touchend", handleTouchEnd, { passive: true });

  // ─── Print button ───
  els.printBtn.addEventListener("click", () => window.print());

  // ─── Empty state clear ───
  els.emptyClearBtn.addEventListener("click", () => {
    activeCategory = "全部";
    query = "";
    els.input.value = "";
    renderTabs();
    renderCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ─── Theme ───
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (els.themeIconSun && els.themeIconMoon) {
      els.themeIconSun.style.display = theme === "dark" ? "none" : "block";
      els.themeIconMoon.style.display = theme === "dark" ? "block" : "none";
    }
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    }
  }

  els.themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  initTheme();

  // ─── Init ───
  loadData();
})();
