/* =========================================================
   مختبر الحياة — الصف السابع
   FINAL SCRIPT.JS
========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const STORAGE_KEY = "lifeLabGrade7FinalV1";

let currentLesson = 1;
let audioCtx = null;
let toastTimer = null;
let newlyUnlockedStation = null;

const defaultState = {
  name: "",
  stars: 0,
  xp: 0,
  sound: true,
  completed: [],
  discoveries: {},
  titles: []
};

let state = loadState();

/* =========================================================
   بيانات المحطات
========================================================= */

const lessons = {
  1: {
    code: "1-1",
    title: "أعضاء النبات",
    mission: "استكشفي أعضاء النبات",
    description:
      "اسقي النبات، أظهري ضوء الشمس، ثم اضغطي على أجزاء النبات لتتعرفي إلى وظائفها.",
    tip:
      "اضغطي على الجزء نفسه: الجذور أو الساق أو الأوراق أو الزهرة.",
    steps: ["الماء", "الجذور", "الساق", "الأوراق", "الزهرة"],
    core: ["الماء", "الجذور", "الأوراق"],
    observation:
      "لاحظتُ أن للنبات أجزاء مختلفة، ولكل جزء وظيفة. تمتص الجذور الماء والأملاح المعدنية من التربة، ويحمل الساق الأوراق والأزهار، وتصنع الأوراق الغذاء عندما يتوفر الضوء.",
    conclusion:
      "أستنتج أن أجزاء النبات تعمل معًا؛ فالجذور تثبت النبات وتمتص الماء والأملاح المعدنية، والساق يحمل الأوراق والأزهار، والأوراق تصنع الغذاء، والزهرة عضو التكاثر في النبات.",
    question:
      "أي جزء من النبات يمتص الماء والأملاح المعدنية من التربة؟",
    correct: "الجذور",
    choices: ["الأوراق", "الجذور", "الزهرة"],
    titleBadge: "عبقرية النبات",
    stars: 3,
    xp: 40
  },

  2: {
    code: "1-2",
    title: "الأزهار",
    mission: "اكتشفي أجزاء الزهرة",
    description:
      "استكشفي الزهرة نفسها، واضغطي على أجزائها للتعرف إلى البتلات والمتك والخيط والميسم والقلم والمبيض والبويضة والسبلة.",
    tip:
      "اضغطي على الجزء المرسوم نفسه، ثم افتحي المبيض لرؤية البويضات.",
    steps: [
      "البتلات",
      "المتك",
      "الخيط",
      "الميسم",
      "القلم",
      "المبيض",
      "البويضة",
      "السبلة"
    ],
    core: ["البتلات", "المتك", "الميسم", "المبيض", "البويضة"],
    observation:
      "لاحظتُ أن الزهرة تتكون من أجزاء مختلفة. تجذب البتلات الحيوانات الملقِّحة، ويوجد حبوب اللقاح في المتك، بينما توجد البويضات داخل المبيض.",
    conclusion:
      "أستنتج أن الزهرة عضو التكاثر في النبات، وأن أجزاءها تساعد في حدوث التكاثر الجنسي وتكوين البذور.",
    question:
      "أين توجد البويضات في الزهرة؟",
    correct: "داخل المبيض",
    choices: ["داخل المبيض", "داخل البتلات", "فوق المتك"],
    titleBadge: "خبيرة الأزهار",
    stars: 3,
    xp: 45
  },

  3: {
    code: "1-3",
    title: "التلقيح",
    mission: "قارني طرق التلقيح",
    description:
      "جرّبي انتقال حبوب اللقاح بالحشرة ثم بالرياح، ولاحظي الفرق بين الطريقتين.",
    tip:
      "التلقيح هو انتقال حبوب اللقاح من المتك إلى الميسم.",
    steps: ["التلقيح بالحشرة", "التلقيح بالرياح"],
    core: ["التلقيح بالحشرة", "التلقيح بالرياح"],
    observation:
      "لاحظتُ أن حبوب اللقاح يمكن أن تنتقل من المتك إلى الميسم بواسطة الحشرات أو بواسطة الرياح.",
    conclusion:
      "أستنتج أن التلقيح هو انتقال حبوب اللقاح من المتك إلى الميسم، وأن النباتات تستخدم وسائل مختلفة لنقل حبوب اللقاح.",
    question:
      "ما المقصود بالتلقيح؟",
    correct: "انتقال حبوب اللقاح من المتك إلى الميسم",
    choices: [
      "انتقال حبوب اللقاح من المتك إلى الميسم",
      "تحول البويضة إلى بذرة",
      "امتصاص الجذور للماء"
    ],
    titleBadge: "مستكشفة التلقيح",
    stars: 3,
    xp: 45
  },

  4: {
    code: "1-4",
    title: "الإخصاب",
    mission: "تتبعي رحلة الإخصاب ثم رتبي ما حدث",
    description:
      "شاهدي رحلة حبة اللقاح من الميسم حتى البويضة، ثم رتبي مراحل الإخصاب من البداية إلى النهاية.",
    tip:
      "شاهدي الحركة أولًا، ثم اختاري الأحداث بالترتيب الصحيح.",
    steps: ["مشاهدة رحلة الإخصاب", "ترتيب مراحل الإخصاب"],
    core: ["ترتيب مراحل الإخصاب"],
    observation:
      "لاحظتُ أن حبة اللقاح تصل إلى الميسم، ثم ينمو أنبوب اللقاح خلال القلم حتى تنتقل النواة الذكرية إلى البويضة.",
    conclusion:
      "أستنتج أن الإخصاب يحدث عندما تندمج النواة الذكرية مع النواة الأنثوية، فتتكون اللاقحة التي تنمو لتكوّن جنينًا.",
    question:
      "ماذا يتكون بعد اندماج النواة الذكرية مع النواة الأنثوية؟",
    correct: "اللاقحة",
    choices: ["اللاقحة", "البتلة", "حبوب اللقاح"],
    titleBadge: "باحثة الإخصاب",
    stars: 4,
    xp: 50
  },

  5: {
    code: "1-5",
    title: "الثمار",
    mission: "اكتشفي كيف تتكون الثمار والبذور",
    description:
      "شاهدي تحول البويضة إلى بذرة والمبيض إلى ثمرة، ثم افتحي الثمرة وجرّبي محاكاة الثمرة الورقية.",
    tip:
      "غيّري طول جناح الثمرة الورقية، وأسقطيها من الارتفاع نفسه ثم قارني زمن السقوط.",
    steps: [
      "البويضة ← بذرة",
      "المبيض ← ثمرة",
      "فتح الثمرة",
      "انتشار البذور"
    ],
    core: ["المبيض ← ثمرة", "فتح الثمرة"],
    observation:
      "لاحظتُ أنه بعد الإخصاب تتحول البويضة إلى بذرة، ويتحول المبيض إلى ثمرة. وتحتوي البذرة على جنين ومخزون من الغذاء.",
    conclusion:
      "أستنتج أن الثمرة تحتوي البذور، وأن انتشار البذور بعيدًا عن النبات الأم يقلل التنافس على الماء والضوء والأملاح المعدنية.",
    question:
      "إلى ماذا تتحول البويضة بعد الإخصاب؟",
    correct: "بذرة",
    choices: ["ثمرة", "بذرة", "بتلة"],
    titleBadge: "خبيرة الثمار",
    stars: 4,
    xp: 50
  },

  6: {
    code: "1-6",
    title: "أجهزة جسم الإنسان",
    mission: "استكشفي أجهزة الجسم",
    description:
      "شغّلي الأجهزة وشاهدي كيف يعمل الجهاز الهضمي والتنفسي والدوري والعصبي.",
    tip:
      "اختاري جهازًا ثم تابعي الحركة داخل الجسم.",
    steps: [
      "الجهاز الهضمي",
      "الجهاز التنفسي",
      "الجهاز الدوري",
      "الجهاز العصبي"
    ],
    core: ["الجهاز الهضمي", "الجهاز التنفسي"],
    observation:
      "لاحظتُ أن جسم الإنسان يحتوي أجهزة مكوّنة من أعضاء تعمل معًا؛ فالجهاز الهضمي يتعامل مع الغذاء، والجهاز التنفسي يتبادل الغازات، والقلب يضخ الدم، والجهاز العصبي ينقل الإشارات.",
    conclusion:
      "أستنتج أن أعضاء الجسم لا تعمل منفردة، بل تتعاون داخل أجهزة مختلفة لتؤدي وظائف الجسم.",
    question:
      "أي عضو يضخ الدم في الجهاز الدوري؟",
    correct: "القلب",
    choices: ["القلب", "المعدة", "الرئتان"],
    titleBadge: "خبيرة أجهزة الجسم",
    stars: 4,
    xp: 55
  },

  7: {
    code: "1-7",
    title: "الهيكل العظمي",
    mission: "استكشفي الهيكل العظمي",
    description:
      "شغّلي الأشعة ثم افحصي العظام، وجرّبي نشاط الانحناء لتتعرفي إلى وظائف الهيكل.",
    tip:
      "الهيكل العظمي يدعم الجسم ويساعد على الحركة ويحمي أعضاء مهمة.",
    steps: ["الأشعة", "فحص العظام", "اختبار الانحناء"],
    core: ["الأشعة", "فحص العظام"],
    observation:
      "لاحظتُ أن الهيكل العظمي يتكون من عظام عديدة، وأن بعض العظام تحمي أعضاء الجسم وتساعد العظام مع العضلات على الحركة.",
    conclusion:
      "أستنتج أن للهيكل العظمي ثلاث وظائف مهمة: دعم الجسم، والمساعدة على الحركة، وحماية بعض الأعضاء.",
    question:
      "أي عظام تحمي الدماغ؟",
    correct: "الجمجمة",
    choices: ["الجمجمة", "عظم الفخذ", "عظم العضد"],
    titleBadge: "مستكشفة العظام",
    stars: 3,
    xp: 45
  },

  8: {
    code: "1-8",
    title: "المفاصل",
    mission: "قارني أنواع المفاصل",
    description:
      "حرّكي المفاصل وقارني بين المفصل الثابت والرزي والكروي الحُقّي.",
    tip:
      "المفصل هو المكان الذي تلتقي فيه عظمتان أو أكثر.",
    steps: ["المفصل الثابت", "المفصل الرزي", "الكروي الحُقّي"],
    core: ["المفصل الرزي", "الكروي الحُقّي"],
    observation:
      "لاحظتُ أن المفاصل لا تتحرك بالطريقة نفسها؛ فبعضها ثابت، والمفصل الرزي يسمح بالحركة في اتجاه محدد، بينما يسمح المفصل الكروي الحُقّي بحركة أوسع.",
    conclusion:
      "أستنتج أن شكل المفصل يرتبط بطريقة حركته، وأن الغضروف والسائل الزلالي والأربطة تساعد المفصل على أداء وظيفته.",
    question:
      "أي نوع من المفاصل يوجد في المرفق والركبة؟",
    correct: "المفصل الرزي",
    choices: ["المفصل الرزي", "المفصل الثابت", "الكروي الحُقّي"],
    titleBadge: "خبيرة المفاصل",
    stars: 3,
    xp: 45
  },

  9: {
    code: "1-9",
    title: "العضلات",
    mission: "شاهدي كيف تحرك العضلات الذراع",
    description:
      "اثني الذراع ثم مدّيها، وراقبي العضلتين وهما تعملان في اتجاهين متعاكسين.",
    tip:
      "العضلات تسحب ولا تدفع؛ لذلك تعمل بعض العضلات في أزواج متضادة.",
    steps: ["ثني الذراع", "مد الذراع"],
    core: ["ثني الذراع", "مد الذراع"],
    observation:
      "لاحظتُ أنه عند ثني الذراع تنقبض إحدى العضلتين فتقصر وتزداد سمكًا، بينما ترتخي العضلة الأخرى. وعند مد الذراع يحدث العكس.",
    conclusion:
      "أستنتج أن العضلات تحرك العظام بالسحب، وأن العضلتين ذات الرأسين وثلاثية الرؤوس تعملان كزوج من العضلات المتضادة.",
    question:
      "ماذا يحدث للعضلة عندما تنقبض؟",
    correct: "تقصر وتزداد سمكًا",
    choices: ["تقصر وتزداد سمكًا", "تختفي", "تتحول إلى عظم"],
    titleBadge: "خبيرة العضلات",
    stars: 3,
    xp: 45
  },

  10: {
    code: "1-10",
    title: "العلماء",
    mission: "تعرّفي إلى علماء جسم الإنسان",
    description:
      "افتحي ملفات العلماء واكتشفي ما الذي يدرسه كل تخصص.",
    tip:
      "كل عالم ينظر إلى جسم الإنسان من زاوية مختلفة.",
    steps: [
      "عالم التشريح",
      "عالم وظائف الأعضاء",
      "عالم فسيولوجيا الرياضة",
      "عالم الأعصاب"
    ],
    core: ["عالم التشريح", "عالم وظائف الأعضاء", "عالم الأعصاب"],
    observation:
      "لاحظتُ أن العلماء يدرسون جسم الإنسان بطرق مختلفة؛ فعالم التشريح يدرس تركيب الجسم، وعالم وظائف الأعضاء يدرس كيفية عمله، وعالم الأعصاب يدرس الدماغ والجهاز العصبي.",
    conclusion:
      "أستنتج أن دراسة جسم الإنسان تحتاج إلى تخصصات علمية متعددة، وكل تخصص يساعدنا على فهم جانب مختلف من تركيب الجسم ووظائفه.",
    question:
      "من العالم الذي يدرس تركيب الجسم؟",
    correct: "عالم التشريح",
    choices: ["عالم الأعصاب", "عالم التشريح", "عالم فسيولوجيا الرياضة"],
    titleBadge: "عالمة المستقبل",
    stars: 5,
    xp: 60
  }
};

/* =========================================================
   التخزين
========================================================= */

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return {
      ...defaultState,
      ...(saved || {}),
      completed: Array.isArray(saved?.completed) ? saved.completed : [],
      discoveries:
        saved?.discoveries && typeof saved.discoveries === "object"
          ? saved.discoveries
          : {},
      titles: Array.isArray(saved?.titles) ? saved.titles : []
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* =========================================================
   الصوت
========================================================= */

function unlockAudio() {
  if (!state.sound) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch {}
}

function tone(freq = 440, duration = .1, type = "sine", volume = .04) {
  if (!state.sound) return;

  unlockAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    .001,
    audioCtx.currentTime + duration
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function discoverySound() {
  tone(520, .08);
  setTimeout(() => tone(680, .1), 80);
}

function successSound() {
  tone(520, .1);
  setTimeout(() => tone(660, .12), 100);
  setTimeout(() => tone(820, .18), 220);
}

function wrongSound() {
  tone(230, .13, "sine", .025);
}

function waterSound() {
  tone(560, .05, "sine", .018);
  setTimeout(() => tone(720, .05, "sine", .014), 110);
  setTimeout(() => tone(620, .05, "sine", .014), 220);
}

/* =========================================================
   التنقل
========================================================= */

function showView(id) {
  $$(".view").forEach(view => view.classList.remove("active"));

  $("#" + id)?.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  updateHeader();
}

function enterLab() {
  const input = $("#explorerName");
  const name = input?.value.trim();

  if (!name) {
    $("#nameHint").textContent = "اكتبي اسم المستكشفة أولًا ✦";
    input?.focus();
    wrongSound();
    return;
  }

  state.name = name;
  saveState();

  $("#nameHint").textContent = "";

  successSound();

  renderMap();
  showView("mapView");

  showToast(
    `مرحبًا يا ${state.name}`,
    "جاهزة لأول اكتشاف علمي؟"
  );
}

function goToMap(showUnlock = true) {
  renderMap();
  showView("mapView");

  if (showUnlock && newlyUnlockedStation) {
    const station = newlyUnlockedStation;
    newlyUnlockedStation = null;

    setTimeout(() => {
      celebrateUnlockedStation(station);
    }, 350);
  }
}

/* =========================================================
   الهيدر
========================================================= */

function updateHeader() {
  if ($("#headerStars")) {
    $("#headerStars").textContent = state.stars;
  }

  if ($("#headerXp")) {
    $("#headerXp").textContent = state.xp;
  }

  if ($("#soundIcon")) {
    $("#soundIcon").textContent = state.sound ? "♫" : "×";
  }

  const subtitle = $(".brand-text small");

  if (subtitle) {
    subtitle.textContent = state.name
      ? `المستكشفة ${state.name}`
      : "الوحدة الأولى • الصف السابع";
  }
}

/* =========================================================
   خريطة المحطات
========================================================= */

const stationIcons = {
  1: "🌱",
  2: "🌷",
  3: "🐝",
  4: "✦",
  5: "🍎",
  6: "♡",
  7: "🦴",
  8: "◉",
  9: "⌁",
  10: "🔬"
};

function isUnlocked(number) {
  return (
    number === 1 ||
    state.completed.includes(number) ||
    state.completed.includes(number - 1)
  );
}

function renderMap() {
  const container = $("#stationsContainer");
  if (!container) return;

  container.innerHTML = "";

  for (let number = 1; number <= 10; number++) {
    const lesson = lessons[number];
    const completed = state.completed.includes(number);
    const unlocked = isUnlocked(number);

    const card = document.createElement("article");

    card.dataset.lesson = number;

    card.className =
      "station-card " +
      (completed
        ? "completed"
        : unlocked
          ? "current"
          : "locked");

    let stateText = "مقفلة 🔒";

    if (completed) {
      stateText = "مكتملة ✓";
    } else if (unlocked) {
      stateText = "ابدئي المحطة";
    }

    card.innerHTML = `
      <span class="station-decor"></span>

      <div class="station-number">
        ${String(number).padStart(2, "0")}
      </div>

      <div class="station-info">

        <div class="station-icon">
          ${stationIcons[number]}
        </div>

        <small>${lesson.code}</small>

        <h3>${lesson.title}</h3>

        <p>${lesson.mission}</p>

      </div>

      <div class="station-state">
        ${stateText}
      </div>
    `;

    if (unlocked) {
      card.addEventListener("click", () => {
        openLesson(number);
      });
    }

    container.appendChild(card);
  }

  const completedCount = state.completed.length;
  const percent = completedCount * 10;

  $("#completedStations").textContent = completedCount;
  $("#mapPercent").textContent = percent + "%";
  $("#mapProgressFill").style.width = percent + "%";

  renderTitles();

  if (state.completed.length === 10) {
    addFinalChallengeButton();
  }
}

function renderTitles() {
  const grid = $("#titlesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  for (let n = 1; n <= 10; n++) {
    const unlocked = state.completed.includes(n);

    const badge = document.createElement("div");

    badge.className =
      "title-badge " +
      (unlocked ? "unlocked" : "");

    badge.innerHTML = `
      <span class="title-badge-icon">
        ${unlocked ? "★" : "?"}
      </span>

      <strong>
        ${
          unlocked
            ? lessons[n].titleBadge
            : "لقب لم يُكتشف بعد"
        }
      </strong>
    `;

    grid.appendChild(badge);
  }

  $("#titlesCount").textContent = state.completed.length;
}

function celebrateUnlockedStation(number) {
  const card =
    document.querySelector(
      `.station-card[data-lesson="${number}"]`
    );

  if (card) {
    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    card.classList.add("just-unlocked");

    for (let i = 0; i < 12; i++) {
      const spark = document.createElement("span");
      spark.className = "unlock-spark";
      spark.style.setProperty("--i", i);
      card.appendChild(spark);

      setTimeout(() => spark.remove(), 1700);
    }

    setTimeout(() => {
      card.classList.remove("just-unlocked");
    }, 2200);
  }

  successSound();

  showToast(
    "فُتحت محطة جديدة! ✦",
    `المحطة ${number}: ${lessons[number].title}`
  );
}

/* =========================================================
   فتح المحطة
========================================================= */

function openLesson(number) {
  if (!isUnlocked(number)) return;

  currentLesson = number;
  const lesson = lessons[number];

  $("#lessonCode").textContent = lesson.code;
  $("#lessonTitle").textContent = lesson.title;

  $("#lessonNumber").textContent =
    String(number).padStart(2, "0");

  $("#missionTitle").textContent = lesson.mission;
  $("#missionText").textContent = lesson.description;
  $("#missionTip").textContent = lesson.tip;

  $("#experimentTitle").textContent = lesson.title;

  $("#lessonStatus").textContent =
    state.completed.includes(number)
      ? "مكتملة — يمكنك إعادتها"
      : "قيد الاستكشاف";

  $("#experimentStep").textContent = "استكشف";

  $("#scienceInfo").classList.add("hidden");

  $("#autoObservation").textContent =
    "نفّذي النشاط الأساسي، وبعدها سأكتب لكِ الملاحظة بطريقة واضحة وبسيطة.";

  $("#autoConclusion").textContent =
    "سيظهر الاستنتاج تلقائيًا عندما تكتمل التجربة الأساسية.";

  $("#observationCard").classList.remove("ready");
  $("#conclusionCard").classList.remove("ready");

  $("#notebookState").textContent = "يكتمل تلقائيًا";
  $("#notebookState").classList.remove("ready");

  $("#questionStage").classList.add("hidden");

  renderDiscoveries();

  showView("lessonView");
  renderExperiment(number);

  if (lessonCoreComplete(number)) {
    unlockLessonSummary(false);
  }
}

/* =========================================================
   الاكتشافات
========================================================= */

function lessonDiscoveries(number = currentLesson) {
  if (!state.discoveries[number]) {
    state.discoveries[number] = [];
  }

  return state.discoveries[number];
}

function renderDiscoveries() {
  const lesson = lessons[currentLesson];
  const done = lessonDiscoveries();

  $("#discoveriesList").innerHTML =
    lesson.steps.map(step => `
      <div class="discovery-item ${
        done.includes(step) ? "done" : ""
      }">
        <span class="check">
          ${done.includes(step) ? "✓" : ""}
        </span>
        <span>${step}</span>
      </div>
    `).join("");

  $("#discoveriesCounter").textContent =
    `${done.length}/${lesson.steps.length}`;
}

function discover(step, title, text) {
  const done = lessonDiscoveries();
  const isNew = !done.includes(step);

  if (isNew) {
    done.push(step);
    state.discoveries[currentLesson] = done;

    saveState();
    discoverySound();

    showToast("اكتشاف جديد", step);
  }

  renderDiscoveries();
  showScienceInfo(title, text);

  if (lessonCoreComplete(currentLesson)) {
    unlockLessonSummary();
  }
}

function lessonCoreComplete(number) {
  const lesson = lessons[number];
  const done = lessonDiscoveries(number);

  return lesson.core.every(step =>
    done.includes(step)
  );
}

/* =========================================================
   المعلومة العلمية
========================================================= */

function showScienceInfo(title, text) {
  $("#scienceInfoTitle").textContent = title;
  $("#scienceInfoText").textContent = text;

  $("#scienceInfo").classList.remove("hidden");
}

/* =========================================================
   الملاحظة والاستنتاج
========================================================= */

function unlockLessonSummary(withSound = true) {
  const lesson = lessons[currentLesson];

  $("#autoObservation").textContent =
    lesson.observation;

  $("#autoConclusion").textContent =
    lesson.conclusion;

  $("#observationCard").classList.add("ready");
  $("#conclusionCard").classList.add("ready");

  $("#notebookState").textContent =
    "اكتملت التجربة ✓";

  $("#notebookState").classList.add("ready");

  $("#lessonStatus").textContent =
    "جاهزة للاستنتاج";

  $("#experimentStep").textContent =
    "استنتج";

  const wasHidden =
    $("#questionStage").classList.contains("hidden");

  $("#questionStage").classList.remove("hidden");

  if (wasHidden) {
    renderQuestion();

    if (withSound) {
      successSound();

      showToast(
        "أحسنتِ!",
        "ظهر ملخص تجربتك تلقائيًا"
      );
    }
  }
}

/* =========================================================
   السؤال
========================================================= */

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j =
      Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] =
      [copy[j], copy[i]];
  }

  return copy;
}

function renderQuestion() {
  const lesson = lessons[currentLesson];

  $("#lessonQuestion").textContent =
    lesson.question;

  $("#questionFeedback").classList.add("hidden");
  $("#questionFeedback").textContent = "";

  const choices = shuffle(lesson.choices);

  $("#questionChoices").innerHTML =
    choices.map(choice => `
      <button
        class="choice-button"
        type="button"
        data-choice="${choice}"
      >
        ${choice}
      </button>
    `).join("");

  $$(".choice-button").forEach(button => {
    button.addEventListener("click", () => {
      answerQuestion(button);
    });
  });
}

function answerQuestion(button) {
  const lesson = lessons[currentLesson];
  const answer = button.dataset.choice;

  if (answer === lesson.correct) {
    $$(".choice-button").forEach(btn => {
      btn.disabled = true;

      if (btn.dataset.choice === lesson.correct) {
        btn.classList.add("correct");
      }
    });

    $("#questionFeedback").textContent =
      `رائع يا ${state.name}! إجابتك صحيحة.`;

    $("#questionFeedback").classList.remove("hidden");

    successSound();

    setTimeout(completeLesson, 850);

  } else {
    button.classList.add("wrong");

    $("#questionFeedback").textContent =
      "قريبة! جرّبي اختيارًا آخر.";

    $("#questionFeedback").classList.remove("hidden");

    wrongSound();

    setTimeout(() => {
      button.classList.remove("wrong");
    }, 700);
  }
}

/* =========================================================
   إكمال المحطة
========================================================= */

function completeLesson() {
  const lesson = lessons[currentLesson];

  const firstTime =
    !state.completed.includes(currentLesson);

  if (firstTime) {
    state.completed.push(currentLesson);
    state.completed.sort((a, b) => a - b);

    state.stars += lesson.stars;
    state.xp += lesson.xp;

    if (!state.titles.includes(lesson.titleBadge)) {
      state.titles.push(lesson.titleBadge);
    }

    if (currentLesson < 10) {
      newlyUnlockedStation =
        currentLesson + 1;
    }

    saveState();
  }

  $("#celebrationHeading").textContent =
    `أبدعتِ يا ${state.name}!`;

  $("#celebrationMessage").textContent =
    firstTime
      ? "أنهيتِ التجربة وفهمتِ الفكرة العلمية. حصلتِ على لقب جديد!"
      : "أعدتِ التجربة بنجاح! مكافأتك السابقة محفوظة.";

  $("#earnedTitle").textContent =
    lesson.titleBadge;

  $("#rewardStars").textContent =
    firstTime
      ? `+${lesson.stars}`
      : "محفوظة";

  $("#rewardXp").textContent =
    firstTime
      ? `+${lesson.xp}`
      : "محفوظة";

  $("#newStationNotice").classList.remove("hidden");

  if (currentLesson < 10) {
    $("#newStationText").textContent =
      firstTime
        ? `المحطة ${currentLesson + 1} أصبحت مفتوحة!`
        : "يمكنك العودة إلى خريطة المحطات.";
  } else {
    $("#newStationText").textContent =
      "أكملتِ المحطات العشر! أصبح التحدي العلمي النهائي جاهزًا.";
  }

  updateHeader();

  $("#celebration").classList.remove("hidden");

  successSound();
}

/* =========================================================
   اختيار التجربة
========================================================= */

function renderExperiment(number) {
  switch (number) {
    case 1: renderPlantLab(); break;
    case 2: renderFlowerLab(); break;
    case 3: renderPollinationLab(); break;
    case 4: renderFertilisationLab(); break;
    case 5: renderFruitLab(); break;
    case 6: renderBodySystemsLab(); break;
    case 7: renderSkeletonLab(); break;
    case 8: renderJointsLab(); break;
    case 9: renderMusclesLab(); break;
    case 10: renderScientistsLab(); break;
  }
}

/* =========================================================
   1-1 أعضاء النبات
========================================================= */

function renderPlantLab() {
  $("#experimentTools").innerHTML = `
    <button class="action-button primary" id="waterPlant" type="button">
      اسقي النبات
    </button>

    <button class="action-button" id="showSun" type="button">
      أظهري ضوء الشمس
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="plant-lab-scene" id="plantScene">

      <div class="lab-sun" id="labSun"></div>

      <div class="cloud cloud-a"></div>
      <div class="cloud cloud-b"></div>

      <div class="watering-can">
        <div class="can-body"></div>
        <div class="can-handle"></div>
        <div class="can-spout"></div>
      </div>

      <div class="lab-plant">

        <button
          class="plant-part plant-flower-part"
          data-part="الزهرة"
          type="button"
        >
          <span class="mini-flower-petal mp1"></span>
          <span class="mini-flower-petal mp2"></span>
          <span class="mini-flower-petal mp3"></span>
          <span class="mini-flower-petal mp4"></span>
          <span class="mini-flower-petal mp5"></span>
          <i></i>
        </button>

        <button
          class="plant-part plant-leaves-part leaf-left"
          data-part="الأوراق"
          type="button"
        ></button>

        <button
          class="plant-part plant-leaves-part leaf-right"
          data-part="الأوراق"
          type="button"
        ></button>

        <button
          class="plant-part plant-stem-part"
          data-part="الساق"
          type="button"
        ></button>

        <button
          class="plant-part plant-roots-part"
          data-part="الجذور"
          type="button"
        >
          <span></span><span></span><span></span><span></span>
        </button>

      </div>

      <div class="plant-ground" id="plantGround"></div>

      <div class="plant-instruction">
        اضغطي على أجزاء النبات نفسها لاكتشاف وظائفها
      </div>

    </div>
  `;

  injectPlantStyles();

  $("#waterPlant").onclick = () => {
    createWaterDrops();
    waterSound();

    $("#plantGround").classList.add("wet");

    discover(
      "الماء",
      "وصل الماء إلى التربة",
      "عندما نسقي النبات يصل الماء إلى التربة، ثم تستطيع الجذور امتصاص الماء والأملاح المعدنية منها."
    );
  };

  $("#showSun").onclick = () => {
    $("#plantScene").classList.add("sunny");
    $("#labSun").classList.add("visible");

    showScienceInfo(
      "ضوء الشمس",
      "تحتوي الأجزاء الخضراء من النبات على الكلوروفيل الذي يمتص ضوء الشمس. يستخدم النبات الضوء والماء وثاني أكسيد الكربون لصنع الغذاء، وينتج الأكسجين."
    );

    discoverySound();
  };

  $$(".plant-part").forEach(part => {
    part.onclick = () => {
      const name = part.dataset.part;

      const info = {
        "الجذور": [
          "الجذور",
          "تثبت الجذور النبات في التربة وتمتص الماء والأملاح المعدنية منها."
        ],
        "الساق": [
          "الساق",
          "يحمل الساق الأوراق والأزهار."
        ],
        "الأوراق": [
          "الأوراق",
          "الأوراق هي الأجزاء التي يصنع فيها النبات غذاءه باستخدام الضوء."
        ],
        "الزهرة": [
          "الزهرة",
          "الزهرة هي عضو التكاثر في النبات."
        ]
      };

      discover(
        name,
        info[name][0],
        info[name][1]
      );
    };
  });
}

function createWaterDrops() {
  const scene = $("#plantScene");
  if (!scene) return;

  for (let i = 0; i < 16; i++) {
    const drop = document.createElement("span");

    drop.className = "water-drop";

    drop.style.left =
      `${23 + Math.random() * 12}%`;

    drop.style.top =
      `${22 + Math.random() * 8}%`;

    drop.style.setProperty(
      "--drop-time",
      `${.8 + Math.random() * .55}s`
    );

    drop.style.setProperty(
      "--drop-distance",
      `${285 + Math.random() * 45}px`
    );

    drop.style.animationDelay =
      `${Math.random() * .55}s`;

    scene.appendChild(drop);

    setTimeout(() => drop.remove(), 2100);
  }
}

/* =========================================================
   1-2 الأزهار — الشكل الجديد
========================================================= */

function renderFlowerLab() {
  $("#experimentTools").innerHTML = `
    <button class="action-button primary" id="flowerReset" type="button">
      الزهرة كاملة
    </button>

    <button class="action-button" id="flowerInside" type="button">
      افتحي المبيض
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="flower-lab-scene">

      <div class="flower-help">
        اضغطي على أي جزء من الزهرة
      </div>

      <div class="new-flower">

        <!-- السبلات -->
        <button class="nf-sepal ns1"
          data-flower="السبلة"
          type="button"></button>

        <button class="nf-sepal ns2"
          data-flower="السبلة"
          type="button"></button>

        <button class="nf-sepal ns3"
          data-flower="السبلة"
          type="button"></button>


        <!-- البتلات -->
        <button class="nf-petal np1"
          data-flower="البتلات"
          type="button"></button>

        <button class="nf-petal np2"
          data-flower="البتلات"
          type="button"></button>

        <button class="nf-petal np3"
          data-flower="البتلات"
          type="button"></button>

        <button class="nf-petal np4"
          data-flower="البتلات"
          type="button"></button>

        <button class="nf-petal np5"
          data-flower="البتلات"
          type="button"></button>

        <button class="nf-petal np6"
          data-flower="البتلات"
          type="button"></button>


        <!-- الأسدية -->

        <div class="nf-stamen stam1">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>

        <div class="nf-stamen stam2">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>

        <div class="nf-stamen stam3">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>

        <div class="nf-stamen stam4">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>

        <div class="nf-stamen stam5">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>

        <div class="nf-stamen stam6">
          <button class="nf-filament"
            data-flower="الخيط"
            type="button"></button>

          <button class="nf-anther"
            data-flower="المتك"
            type="button"></button>
        </div>


        <!-- المدقة -->
        <button class="nf-stigma"
          data-flower="الميسم"
          type="button"></button>

        <button class="nf-style"
          data-flower="القلم"
          type="button"></button>

        <button class="nf-ovary"
          data-flower="المبيض"
          type="button">

          <span class="nf-ovule no1"
            data-flower="البويضة"></span>

          <span class="nf-ovule no2"
            data-flower="البويضة"></span>

          <span class="nf-ovule no3"
            data-flower="البويضة"></span>

        </button>

      </div>

      <div class="flower-label" id="flowerLabel">
        اختاري جزءًا
      </div>

    </div>
  `;


  const flowerInfo = {
    "البتلات": [
      "البتلات",
      "تساعد البتلات الملونة على جذب الحيوانات الملقحة إلى الزهرة."
    ],

    "المتك": [
      "المتك",
      "يوجد في المتك حبوب اللقاح التي تحتوي الأمشاج الذكرية."
    ],

    "الخيط": [
      "الخيط",
      "يحمل الخيط المتك في الزهرة."
    ],

    "الميسم": [
      "الميسم",
      "يصل إلى الميسم حبوب اللقاح أثناء عملية التلقيح."
    ],

    "القلم": [
      "القلم",
      "يمتد القلم بين الميسم والمبيض."
    ],

    "المبيض": [
      "المبيض",
      "يحتوي المبيض على البويضات."
    ],

    "البويضة": [
      "البويضة",
      "توجد البويضات داخل المبيض وتحتوي الأمشاج الأنثوية."
    ],

    "السبلة": [
      "السبلة",
      "السبلات أجزاء توجد عند قاعدة الزهرة."
    ]
  };


  $$("[data-flower]", $("#experimentArea")).forEach(part => {

    part.addEventListener("click", event => {

      event.stopPropagation();

      const clicked =
        event.target.closest("[data-flower]");

      if (!clicked) return;

      const name =
        event.target.dataset.flower ||
        clicked.dataset.flower;

      $$(".new-flower .selected").forEach(el => {
        el.classList.remove("selected");
      });


      if (name === "البتلات") {
        $$(".nf-petal").forEach(el =>
          el.classList.add("selected")
        );
      }

      else if (name === "المتك") {
        $$(".nf-anther").forEach(el =>
          el.classList.add("selected")
        );
      }

      else if (name === "الخيط") {
        $$(".nf-filament").forEach(el =>
          el.classList.add("selected")
        );
      }

      else if (name === "السبلة") {
        $$(".nf-sepal").forEach(el =>
          el.classList.add("selected")
        );
      }

      else if (name === "البويضة") {
        $$(".nf-ovule").forEach(el =>
          el.classList.add("selected")
        );
      }

      else {
        clicked.classList.add("selected");
      }


      $("#flowerLabel").textContent = name;

      if (flowerInfo[name]) {
        discover(
          name,
          flowerInfo[name][0],
          flowerInfo[name][1]
        );
      }

    });

  });


  $("#flowerInside").onclick = () => {

    $(".new-flower")
      .classList.add("show-ovules");

    $("#flowerLabel").textContent =
      "داخل المبيض";

    showScienceInfo(
      "داخل المبيض",
      "داخل المبيض توجد البويضات. اضغطي على إحدى البويضات لاستكشافها."
    );
  };


  $("#flowerReset").onclick = () => {

    $(".new-flower")
      .classList.remove("show-ovules");

    $$(".new-flower .selected").forEach(el => {
      el.classList.remove("selected");
    });

    $("#flowerLabel").textContent =
      "اختاري جزءًا";
  };
}


  

/* =========================================================
   1-3 التلقيح
========================================================= */

function renderPollinationLab() {
  $("#experimentTools").innerHTML = `
    <button class="action-button primary" id="beePollination">
      التلقيح بالحشرة
    </button>

    <button class="action-button" id="windPollination">
      التلقيح بالرياح
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="simple-scene pollination-scene">

      <div class="pollination-flower flower-left">
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <i></i>
      </div>

      <div class="pollination-flower flower-right">
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <span class="pf-petal"></span>
        <i></i>
      </div>

      <div id="bee" class="bee">
        <span></span>
      </div>

      <div id="pollenCloud" class="pollen-cloud"></div>

      <div class="experiment-caption">
        اختاري طريقة التلقيح وشاهدي انتقال حبوب اللقاح.
      </div>

    </div>
  `;

  injectGeneralExperimentStyles();

  $("#beePollination").onclick = () => {
  const bee = $("#bee");

  // نحذف حبوب اللقاح القديمة إذا شغّلنا التجربة مرة ثانية
  bee.querySelectorAll(".bee-pollen").forEach(p => p.remove());

  // نعيد حركة النحلة
  bee.classList.remove("fly", "carrying-pollen");
  void bee.offsetWidth;
  bee.classList.add("fly");

  // عندما تصل النحلة للزهرة الأولى تلتقط حبوب اللقاح
  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      const pollen = document.createElement("i");
      pollen.className = "bee-pollen";
      bee.appendChild(pollen);
    }

    bee.classList.add("carrying-pollen");
  }, 1100);

  // عند وصولها للزهرة الثانية تنقل بعض حبوب اللقاح إليها
  setTimeout(() => {
    const rightFlower = $(".flower-right");

    if (rightFlower) {
      for (let i = 0; i < 4; i++) {
        const pollen = document.createElement("i");
        pollen.className = "received-pollen";
        rightFlower.appendChild(pollen);
      }
    }

    bee.querySelectorAll(".bee-pollen").forEach((pollen, index) => {
      if (index < 4) pollen.remove();
    });
  }, 2600);

  discover(
    "التلقيح بالحشرة",
    "الحشرات تنقل حبوب اللقاح",
    "قد تلتصق حبوب اللقاح بجسم الحشرة عندما تزور الزهرة، ثم تنتقل إلى ميسم زهرة أخرى."
  );
};

  $("#windPollination").onclick = () => {
    createPollenParticles();

    discover(
      "التلقيح بالرياح",
      "الرياح تنقل حبوب اللقاح",
      "يمكن للرياح أن تحمل حبوب اللقاح من زهرة إلى أخرى. حبوب اللقاح التي تنقلها الرياح تكون خفيفة وملساء."
    );
  };
}

function createPollenParticles() {
  const cloud = $("#pollenCloud");

  cloud.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("span");

    dot.style.top =
      `${Math.random() * 130}px`;

    dot.style.animationDelay =
      `${Math.random() * .6}s`;

    cloud.appendChild(dot);
  }
}

/* =========================================================
   1-4 الإخصاب — مشاهدة ثم ترتيب
========================================================= */

function renderFertilisationLab() {
  let journeyWatched = false;
  let chosenOrder = [];

  const correctOrder = [
    "تصل حبة اللقاح إلى الميسم",
    "ينمو أنبوب اللقاح خلال القلم",
    "تنتقل النواة الذكرية إلى البويضة",
    "يحدث الإخصاب وتتكوّن اللاقحة"
  ];

  $("#experimentTools").innerHTML = `
    <button class="action-button primary" id="watchFertJourney">
      ▶ شاهدي رحلة الإخصاب
    </button>

    <button class="action-button" id="repeatFertJourney">
      ↻ أعيدي الرحلة
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="fert-journey">

      <div class="fert-animation-side">

        <div class="fert-big-stigma">
          الميسم
          <span id="journeyPollen" class="journey-pollen"></span>
        </div>

        <div class="fert-big-style">

          <span id="journeyTube" class="journey-tube"></span>

          <span
            id="journeyNucleus"
            class="journey-nucleus"
          ></span>

        </div>

        <div class="fert-big-ovary">
          المبيض

          <div class="fert-big-ovule">
            البويضة
            <span
              id="journeyZygote"
              class="journey-zygote"
            ></span>
          </div>
        </div>

        <div
          id="fertJourneyCaption"
          class="experiment-caption"
        >
          شاهدي الرحلة أولًا ثم رتبي ما حدث.
        </div>

      </div>

      <div class="fert-order-side" id="fertOrderSide">

        <span class="fert-mini-tag">
          تحدي الترتيب
        </span>

        <h4>رتّبي ما حدث</h4>

        <p>
          اضغطي على الأحداث من الأول إلى الأخير.
        </p>

        <div
          id="fertWatchNote"
          class="fert-watch-note"
        >
          شاهدي رحلة الإخصاب أولًا.
        </div>

        <div
          id="fertOrderList"
          class="fert-order-list"
        ></div>

        <div
          id="fertOrderFeedback"
          class="fert-order-feedback"
        ></div>

        <div class="fert-order-actions">

          <button
            id="checkFertOrder"
            class="check-fert-order"
          >
            تحققي
          </button>

          <button
            id="resetFertOrder"
            class="reset-fert-order"
          >
            أعيدي الترتيب
          </button>

        </div>

      </div>

    </div>
  `;

  injectFertilisationStyles();

  function renderOrderCards() {
    chosenOrder = [];

    const mixed = shuffle(correctOrder);

    $("#fertOrderList").innerHTML =
      mixed.map(text => `
        <button
          class="fert-order-card"
          type="button"
          data-step="${text}"
        >
          <span class="order-number">؟</span>
          <strong>${text}</strong>
        </button>
      `).join("");

    $$(".fert-order-card").forEach(card => {
      card.onclick = () => {
        if (!journeyWatched) {
          wrongSound();

          showToast(
            "شاهدي الرحلة أولًا",
            "وبعدها رتبي الأحداث"
          );

          return;
        }

        const step = card.dataset.step;

        if (card.classList.contains("chosen")) {
          card.classList.remove("chosen");

          chosenOrder =
            chosenOrder.filter(item =>
              item !== step
            );

          updateNumbers();
          return;
        }

        if (chosenOrder.length >= 4) return;

        chosenOrder.push(step);
        card.classList.add("chosen");

        updateNumbers();
        discoverySound();
      };
    });
  }

  function updateNumbers() {
    $$(".fert-order-card").forEach(card => {
      const index =
        chosenOrder.indexOf(
          card.dataset.step
        );

      $(".order-number", card).textContent =
        index < 0 ? "؟" : index + 1;
    });
  }

  function resetJourney() {
    $("#journeyPollen")
      ?.classList.remove("show");

    $("#journeyTube")
      ?.classList.remove("show");

    $("#journeyNucleus")
      ?.classList.remove("travel");

    $("#journeyZygote")
      ?.classList.remove("show");
  }

  function playJourney() {
    resetJourney();

    $("#fertJourneyCaption").textContent =
      "تبدأ الرحلة بوصول حبة اللقاح إلى الميسم.";

    setTimeout(() => {
      $("#journeyPollen")?.classList.add("show");

      showScienceInfo(
        "1 — حبة اللقاح",
        "تصل حبة اللقاح إلى الميسم."
      );
    }, 300);

    setTimeout(() => {
      $("#journeyTube")?.classList.add("show");

      $("#fertJourneyCaption").textContent =
        "ينمو أنبوب اللقاح خلال القلم.";

      showScienceInfo(
        "2 — أنبوب اللقاح",
        "ينمو أنبوب اللقاح إلى أسفل خلال القلم."
      );
    }, 1400);

    setTimeout(() => {
      const nucleus =
        $("#journeyNucleus");

      nucleus?.classList.remove("travel");

      if (nucleus) void nucleus.offsetWidth;

      nucleus?.classList.add("travel");

      $("#fertJourneyCaption").textContent =
        "تنتقل النواة الذكرية إلى البويضة.";

      showScienceInfo(
        "3 — النواة الذكرية",
        "تنتقل النواة الذكرية عبر أنبوب اللقاح حتى تصل إلى البويضة."
      );
    }, 2700);

    setTimeout(() => {
      $("#journeyZygote")?.classList.add("show");

      $("#fertJourneyCaption").textContent =
        "يحدث الإخصاب وتتكوّن اللاقحة.";

      showScienceInfo(
        "4 — الإخصاب",
        "تندمج النواة الذكرية مع النواة الأنثوية، فيحدث الإخصاب وتتكوّن اللاقحة."
      );

      journeyWatched = true;

      $("#fertWatchNote").textContent =
        "الحين رتبي الأحداث من الأول إلى الأخير ✦";

      discover(
        "مشاهدة رحلة الإخصاب",
        "اكتملت الرحلة",
        "شاهدتِ وصول حبة اللقاح ونمو أنبوب اللقاح وانتقال النواة الذكرية وحدوث الإخصاب."
      );

      successSound();

    }, 4100);
  }

  $("#watchFertJourney").onclick =
    playJourney;

  $("#repeatFertJourney").onclick =
    playJourney;

  $("#checkFertOrder").onclick = () => {
    const feedback =
      $("#fertOrderFeedback");

    if (!journeyWatched) {
      feedback.textContent =
        "شاهدي الرحلة أولًا.";

      feedback.className =
        "fert-order-feedback show retry";

      wrongSound();
      return;
    }

    if (chosenOrder.length !== 4) {
      feedback.textContent =
        "رتبي الأحداث الأربعة أولًا.";

      feedback.className =
        "fert-order-feedback show retry";

      wrongSound();
      return;
    }

    const correct =
      chosenOrder.every(
        (step, index) =>
          step === correctOrder[index]
      );

    if (!correct) {
      feedback.textContent =
        "مو بالترتيب الصحيح بعد، أعيدي المحاولة.";

      feedback.className =
        "fert-order-feedback show retry";

      wrongSound();
      return;
    }

    feedback.textContent =
      "ممتاز! هذا هو ترتيب رحلة الإخصاب ✓";

    feedback.className =
      "fert-order-feedback show success";

    $("#fertOrderSide")
      .classList.add("correct");

    $$(".fert-order-card").forEach(card => {
      card.disabled = true;
    });

    discover(
      "ترتيب مراحل الإخصاب",
      "رتبتِ الرحلة",
      "تصل حبة اللقاح إلى الميسم، ثم ينمو أنبوب اللقاح خلال القلم، ثم تنتقل النواة الذكرية إلى البويضة، ثم يحدث الإخصاب وتتكوّن اللاقحة."
    );
  };

  $("#resetFertOrder").onclick = () => {
    $("#fertOrderSide")
      .classList.remove("correct");

    $("#fertOrderFeedback").className =
      "fert-order-feedback";

    renderOrderCards();
  };

  renderOrderCards();
}

/* =========================================================
   1-5 الثمار
========================================================= */

function renderFruitLab() {
  let trials = [];

  $("#experimentTools").innerHTML = `
    <button class="action-button" id="seedTransform">
      البويضة ← بذرة
    </button>

    <button class="action-button primary" id="fruitTransform">
      المبيض ← ثمرة
    </button>

    <button class="action-button" id="openFruit">
      افتحي الثمرة
    </button>

    <button class="action-button" id="dropPaperFruit">
      أسقطي الثمرة الورقية
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="fruit-lab-new">

      <div class="fruit-transform-area">

        <div class="ovary-model" id="ovaryModel">
          <strong>المبيض</strong>

          <div class="ovary-shape">
            <span class="mini-ovule"></span>
            <span class="mini-ovule"></span>
            <span class="mini-ovule"></span>
          </div>

          <small>البويضات داخل المبيض</small>
        </div>

        <div class="transform-arrow">←</div>

        <div class="fruit-model" id="fruitMain">

          <div class="fruit-side fruit-side-a"></div>
          <div class="fruit-side fruit-side-b"></div>

          <div class="fruit-inside">
            <span class="fruit-seed"></span>
            <span class="fruit-seed"></span>
            <span class="fruit-seed"></span>
          </div>

          <span class="fruit-top-stem"></span>

          <strong>الثمرة</strong>

        </div>

      </div>

      <div class="paper-fruit-lab">

        <div class="paper-settings">

          <span class="simulation-label">
            محاكاة رقمية
          </span>

          <h4>تجربة الثمرة الورقية</h4>

          <p>
            غيّري طول الجناح، مع تثبيت ارتفاع السقوط،
            ثم كرري القياس ثلاث مرات.
          </p>

          <label>
            طول الجناح
          </label>

          <input
            id="wingLength"
            type="range"
            min="1"
            max="3"
            value="2"
            step="1"
          >

          <div class="wing-label-row">
            <span>قصير</span>
            <span>متوسط</span>
            <span>طويل</span>
          </div>

        </div>

        <div class="paper-drop-area">

          <span class="fixed-height">
            ارتفاع ثابت
          </span>

          <div id="paperFruit" class="paper-fruit-new">

            <span class="paper-wing-new pw1"></span>
            <span class="paper-wing-new pw2"></span>
            <span class="paper-seed-new"></span>

          </div>

          <div class="paper-ground"></div>

        </div>

        <div class="trial-results-panel">

          <div class="big-timer">
            <small>زمن السقوط</small>
            <strong id="fallTimer">—</strong>
          </div>

          <div class="trial-line">
            <span>المحاولة 1</span>
            <b id="trial1">—</b>
          </div>

          <div class="trial-line">
            <span>المحاولة 2</span>
            <b id="trial2">—</b>
          </div>

          <div class="trial-line">
            <span>المحاولة 3</span>
            <b id="trial3">—</b>
          </div>

          <div class="trial-line average">
            <span>المتوسط</span>
            <b id="trialAverage">—</b>
          </div>

        </div>

      </div>

    </div>
  `;

  injectFruitStyles();

  $("#seedTransform").onclick = () => {
    $$(".mini-ovule").forEach(el =>
      el.classList.add("seed-state")
    );

    $$(".fruit-seed").forEach(el =>
      el.classList.add("formed")
    );

    discover(
      "البويضة ← بذرة",
      "البويضة تتحول إلى بذرة",
      "بعد الإخصاب تتحول البويضة إلى بذرة، وتحتوي البذرة على جنين ومخزون من الغذاء."
    );
  };

  $("#fruitTransform").onclick = () => {
    $("#fruitMain").classList.add("ripe");
    $("#ovaryModel").classList.add("faded");

    discover(
      "المبيض ← ثمرة",
      "المبيض يتحول إلى ثمرة",
      "بعد الإخصاب يتحول المبيض إلى ثمرة."
    );
  };

  $("#openFruit").onclick = () => {
    $("#fruitMain").classList.add("open");

    $$(".fruit-seed").forEach(el =>
      el.classList.add("formed")
    );

    discover(
      "فتح الثمرة",
      "البذور داخل الثمرة",
      "عند فتح الثمرة تظهر البذور التي تكونت من البويضات."
    );
  };

  $("#wingLength").oninput = () => {
    trials = [];
    updateTrials();
  };

  $("#dropPaperFruit").onclick = () => {
    const paper = $("#paperFruit");

    if (paper.classList.contains("falling")) {
      return;
    }

    const wing =
      Number($("#wingLength").value);

    /*
      هذه أزمنة محاكاة رقمية للعرض فقط.
      ليست نتائج مأخوذة من الكتاب.
    */
    const simulatedBase = {
      1: 1.40,
      2: 1.75,
      3: 2.10
    };

    const variation =
      Math.random() * .10 - .05;

    const result =
      Number(
        (simulatedBase[wing] + variation)
          .toFixed(2)
      );

    paper.style.setProperty(
      "--fall-duration",
      `${result}s`
    );

    paper.classList.remove("fallen");
    void paper.offsetWidth;
    paper.classList.add("falling");

    $("#fallTimer").textContent =
      "جاري القياس...";

    setTimeout(() => {
      paper.classList.remove("falling");
      paper.classList.add("fallen");

      $("#fallTimer").textContent =
        result.toFixed(2) + " ث";

      trials.push(result);

      if (trials.length > 3) {
        trials = [result];
      }

      updateTrials();

      discover(
        "انتشار البذور",
        "تجربة الثمرة الورقية",
        "يمكن تغيير طول جناح الثمرة الورقية، مع تثبيت ارتفاع السقوط، ثم قياس زمن السقوط وتكرار القياس وحساب المتوسط."
      );

    }, result * 1000);
  };

  function updateTrials() {
    for (let i = 0; i < 3; i++) {
      const el =
        $("#trial" + (i + 1));

      el.textContent =
        trials[i] !== undefined
          ? trials[i].toFixed(2) + " ث"
          : "—";
    }

    if (trials.length === 3) {
      const avg =
        trials.reduce((a, b) => a + b, 0) / 3;

      $("#trialAverage").textContent =
        avg.toFixed(2) + " ث";
    } else {
      $("#trialAverage").textContent = "—";
    }
  }
}

/* =========================================================
   مختبر أجهزة جسم الإنسان — الصف السابع
   الهضمي + التنفسي + الدوري + العصبي
========================================================= */

let humanActiveSystem = "digestive";
let humanCompletedSystems = new Set();
let humanAnimationBusy = false;


/* =========================================================
   1) المختبر الرئيسي
========================================================= */

function renderBodySystemsLab() {
  injectPerfectHumanBodyStyles();

  const area =
    document.querySelector("#experimentArea") ||
    document.querySelector(".experiment-area");

  if (!area) return;

  area.innerHTML = `
    <section class="perfect-human-lab">

      <div class="ph-header">
        <div>
          <span class="ph-kicker">مختبر جسم الإنسان</span>
          <h2>كيف تعمل أجهزة جسمك؟</h2>
          <p>
            استكشفي الأجهزة الأربعة وشاهدي كيف يعمل كل جهاز داخل جسم الإنسان.
          </p>
        </div>

        <div class="ph-progress">
          <span>الأجهزة المكتملة</span>
          <strong id="humanProgressCount">0 / 4</strong>
        </div>
      </div>

      <div class="ph-tabs">

        <button
          class="ph-tab active"
          data-human-system="digestive"
          onclick="openPerfectHumanSystem('digestive')">
          <span>01</span>
          الجهاز الهضمي
        </button>

        <button
          class="ph-tab"
          data-human-system="respiratory"
          onclick="openPerfectHumanSystem('respiratory')">
          <span>02</span>
          الجهاز التنفسي
        </button>

        <button
          class="ph-tab"
          data-human-system="circulatory"
          onclick="openPerfectHumanSystem('circulatory')">
          <span>03</span>
          الجهاز الدوري
        </button>

        <button
          class="ph-tab"
          data-human-system="nervous"
          onclick="openPerfectHumanSystem('nervous')">
          <span>04</span>
          الجهاز العصبي
        </button>

      </div>

      <div id="perfectHumanContent"></div>

    </section>
  `;

  updateHumanProgress();
  openPerfectHumanSystem(humanActiveSystem);
}


/* =========================================================
   2) التنقل بين الأجهزة
========================================================= */

function openPerfectHumanSystem(system) {
  humanActiveSystem = system;
  humanAnimationBusy = false;

  document.querySelectorAll(".ph-tab").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.humanSystem === system
    );
  });

  if (system === "digestive") {
    renderPerfectDigestive();
  }

  if (system === "respiratory") {
    renderPerfectRespiratory();
  }

  if (system === "circulatory") {
    renderPerfectCirculatory();
  }

  if (system === "nervous") {
    renderPerfectNervous();
  }
}


/* =========================================================
   جسم الإنسان الأساسي SVG
========================================================= */

function humanBodyBaseSVG() {
  return `
    <!-- الرأس -->
    <circle
      cx="250"
      cy="75"
      r="48"
      class="ph-skin"
    />

    <!-- الرقبة -->
    <path
      d="M229 112 L229 140 L271 140 L271 112"
      class="ph-skin"
    />

    <!-- الجسم -->
    <path
      d="
        M205 132
        C175 137 154 153 145 185
        C135 220 132 274 137 334
        C140 372 151 411 166 444
        L183 470
        L180 600
        C180 617 191 627 205 627
        C218 627 224 617 225 602
        L235 480

        L265 480
        L275 602
        C276 617 282 627 295 627
        C309 627 320 617 320 600
        L317 470
        L334 444
        C349 411 360 372 363 334
        C368 274 365 220 355 185
        C346 153 325 137 295 132

        C280 126 220 126 205 132
        Z"
      class="ph-skin"
    />

    <!-- الذراع الأيسر -->
    <path
      d="
        M154 170
        C132 177 121 197 116 225
        L89 355
        C85 375 94 387 107 389
        C122 391 131 381 134 363
        L158 249
      "
      class="ph-skin"
    />

    <!-- الذراع الأيمن -->
    <path
      d="
        M346 170
        C368 177 379 197 384 225
        L411 355
        C415 375 406 387 393 389
        C378 391 369 381 366 363
        L342 249
      "
      class="ph-skin"
    />

    <!-- ملامح بسيطة -->
    <circle cx="233" cy="69" r="3" class="ph-face"/>
    <circle cx="267" cy="69" r="3" class="ph-face"/>

    <path
      d="M239 91 Q250 99 261 91"
      class="ph-face-line"
    />
  `;
}


/* =========================================================
   3) الجهاز الهضمي
========================================================= */

function renderPerfectDigestive() {
  const box = document.querySelector("#perfectHumanContent");
  if (!box) return;

  box.innerHTML = `
    <div class="ph-system-grid">

      <div class="ph-anatomy digestive-anatomy">

        <div class="ph-figure-title">
          <span class="ph-dot digestive-dot"></span>
          مسار الغذاء داخل الجسم
        </div>

        <svg
          class="ph-human-svg"
          viewBox="0 0 500 660"
          xmlns="http://www.w3.org/2000/svg">

          ${humanBodyBaseSVG()}

          <!-- الفم -->
          <path
            d="M237 92 Q250 102 263 92"
            class="digestive-mouth-organ"
          />

          <!-- المريء -->
          <path
            d="M250 101
               C250 130 249 160 250 190
               C251 212 252 228 250 244"
            class="digestive-esophagus-organ"
          />

          <!-- المعدة -->
          <path
            d="
              M251 239
              C270 222 300 224 311 247
              C322 270 312 300 289 310
              C268 320 246 307 244 286
              C242 270 249 258 251 239
              Z
            "
            class="digestive-stomach-organ"
          />

          <!-- بداية الأمعاء -->
          <path
            d="M284 307 C280 322 270 330 259 336"
            class="digestive-duodenum"
          />

          <!-- الأمعاء الغليظة -->
          <path
            d="
              M196 335
              C183 339 179 350 180 367
              L184 445
              C185 462 195 470 210 470

              L290 470

              C305 470 315 462 316 445
              L320 367
              C321 350 317 339 304 335

              L196 335
            "
            class="digestive-large-organ"
          />

          <!-- الأمعاء الدقيقة -->
          <path
            d="
              M211 357
              C275 342 293 365 232 375
              C193 382 198 399 263 398
              C302 397 299 417 226 422
              C195 424 205 444 281 441
            "
            class="digestive-small-organ"
          />

          <!-- المستقيم -->
          <path
            d="M250 468 L250 514"
            class="digestive-rectum-organ"
          />

          <!-- نقطة الغذاء -->
          <circle
            id="perfectFoodDot"
            cx="250"
            cy="95"
            r="9"
            class="perfect-food-dot"
          />

        </svg>

        <span class="ph-label dg-mouth">الفم</span>
        <span class="ph-label dg-esophagus">المريء</span>
        <span class="ph-label dg-stomach">المعدة</span>
        <span class="ph-label dg-small">الأمعاء الدقيقة</span>
        <span class="ph-label dg-large">الأمعاء الغليظة</span>
        <span class="ph-label dg-rectum">المستقيم</span>

      </div>


      <div class="ph-info-card">

        <span class="ph-system-chip digestive-chip">
          الجهاز الهضمي
        </span>

        <h3>رحلة الغذاء</h3>

        <p class="ph-description">
          يمر الغذاء عبر أعضاء الجهاز الهضمي، حيث يتم هضمه
          وامتصاص المواد الغذائية التي يحتاج إليها الجسم.
        </p>

        <div class="ph-route">
          <span>الفم</span>
          <b>←</b>
          <span>المريء</span>
          <b>←</b>
          <span>المعدة</span>
          <b>←</b>
          <span>الأمعاء الدقيقة</span>
          <b>←</b>
          <span>الأمعاء الغليظة</span>
          <b>←</b>
          <span>المستقيم</span>
        </div>

        <div
          class="ph-science-box"
          id="perfectDigestiveInfo">

          <strong>جاهزة للتجربة؟</strong>

          <p>
            شغّلي رحلة الغذاء وراقبي انتقاله بين أعضاء
            الجهاز الهضمي بالترتيب.
          </p>

        </div>

        <button
          class="ph-main-btn digestive-btn"
          onclick="runPerfectDigestive()">
          <span>▶</span>
          تشغيل رحلة الغذاء
        </button>

      </div>

    </div>
  `;
}


function runPerfectDigestive() {
  if (humanAnimationBusy) return;

  const dot = document.querySelector("#perfectFoodDot");
  const info = document.querySelector("#perfectDigestiveInfo");

  if (!dot || !info) return;

  humanAnimationBusy = true;

  const stages = [
    {
      x: 250,
      y: 95,
      title: "الفم",
      text: "تبدأ رحلة الغذاء من الفم."
    },
    {
      x: 250,
      y: 185,
      title: "المريء",
      text: "ينتقل الغذاء من الفم عبر المريء إلى المعدة."
    },
    {
      x: 280,
      y: 270,
      title: "المعدة",
      text: "يصل الغذاء إلى المعدة، حيث يستمر هضمه."
    },
    {
      x: 245,
      y: 397,
      title: "الأمعاء الدقيقة",
      text: "ينتقل الغذاء إلى الأمعاء الدقيقة، حيث يُستكمل الهضم وتمتص المواد الغذائية."
    },
    {
      x: 188,
      y: 438,
      title: "الأمعاء الغليظة",
      text: "تنتقل بقايا الغذاء بعد ذلك إلى الأمعاء الغليظة."
    },
    {
      x: 250,
      y: 505,
      title: "المستقيم",
      text: "في نهاية المسار تصل الفضلات إلى المستقيم."
    }
  ];

  let index = 0;

  function moveFood() {
    const stage = stages[index];

    dot.setAttribute("cx", stage.x);
    dot.setAttribute("cy", stage.y);

    info.innerHTML = `
      <strong>${index + 1} — ${stage.title}</strong>
      <p>${stage.text}</p>
    `;

    index++;

    if (index < stages.length) {
      setTimeout(moveFood, 1150);
    } else {
      setTimeout(() => {
        humanAnimationBusy = false;
        completeHumanSystem("digestive");
      }, 900);
    }
  }

  moveFood();
}


/* =========================================================
   4) الجهاز التنفسي
========================================================= */

function renderPerfectRespiratory() {
  const box = document.querySelector("#perfectHumanContent");
  if (!box) return;

  box.innerHTML = `
    <div class="ph-system-grid">

      <div class="ph-anatomy">

        <div class="ph-figure-title">
          <span class="ph-dot respiratory-dot"></span>
          رحلة الهواء داخل الجهاز التنفسي
        </div>

        <svg
          class="ph-human-svg"
          viewBox="0 0 500 660"
          xmlns="http://www.w3.org/2000/svg">

          ${humanBodyBaseSVG()}

          <!-- الأنف -->
          <circle
            cx="250"
            cy="82"
            r="7"
            class="resp-nose"
          />

          <!-- البلعوم والقصبة -->
          <path
            d="M250 88 L250 230"
            class="resp-trachea"
          />

          <!-- حلقات القصبة -->
          <g class="trachea-rings">
            ${[118,132,146,160,174,188,202].map(y => `
              <line
                x1="242"
                y1="${y}"
                x2="258"
                y2="${y}"
              />
            `).join("")}
          </g>

          <!-- الشعبتان -->
          <path
            d="M250 218 C236 230 224 241 213 255"
            class="resp-bronchus"
          />

          <path
            d="M250 218 C264 230 276 241 287 255"
            class="resp-bronchus"
          />

          <!-- الرئة اليمنى -->
          <path
            id="perfectRightLung"
            d="
              M287 235
              C322 239 337 272 334 323
              C331 372 312 402 280 394
              C260 389 258 361 260 315
              L262 270
              C264 250 274 237 287 235
              Z
            "
            class="perfect-lung"
          />

          <!-- الرئة اليسرى -->
          <path
            id="perfectLeftLung"
            d="
              M213 235
              C178 239 163 272 166 323
              C169 372 188 402 220 394
              C240 389 242 361 240 315
              L238 270
              C236 250 226 237 213 235
              Z
            "
            class="perfect-lung"
          />

          <!-- تفرعات الشعب -->
          <g class="lung-branches">

            <path d="M213 255 L188 286" />
            <path d="M207 267 L185 321" />
            <path d="M287 255 L312 286" />
            <path d="M293 267 L315 321" />

          </g>

          <!-- الحجاب الحاجز -->
          <path
            id="perfectDiaphragm"
            d="M166 412 Q250 450 334 412"
            class="perfect-diaphragm"
          />

          <!-- الهواء -->
          <circle
            id="perfectAirDot"
            cx="250"
            cy="82"
            r="9"
            class="perfect-air-dot"
          />

        </svg>

        <span class="ph-label rp-nose">الأنف / الفم</span>
        <span class="ph-label rp-trachea">القصبة الهوائية</span>
        <span class="ph-label rp-lungs">الرئتان</span>
        <span class="ph-label rp-diaphragm">الحجاب الحاجز</span>

      </div>


      <div class="ph-info-card">

        <span class="ph-system-chip respiratory-chip">
          الجهاز التنفسي
        </span>

        <h3>رحلة الهواء</h3>

        <p class="ph-description">
          يسمح الجهاز التنفسي بدخول الهواء إلى الجسم وخروجه،
          وتعد الرئتان من أعضائه الرئيسية.
        </p>

        <div
          class="ph-science-box"
          id="perfectRespiratoryInfo">

          <strong>الشهيق والزفير</strong>

          <p>
            اختاري الشهيق أو الزفير وراقبي حركة الهواء
            والرئتين والحجاب الحاجز.
          </p>

        </div>

        <div class="ph-two-buttons">

          <button
            class="ph-main-btn respiratory-btn"
            onclick="runPerfectInhale()">
            ↓ شهيق
          </button>

          <button
            class="ph-main-btn exhale-btn"
            onclick="runPerfectExhale()">
            ↑ زفير
          </button>

        </div>

      </div>

    </div>
  `;
}


function runPerfectInhale() {
  const air = document.querySelector("#perfectAirDot");
  const left = document.querySelector("#perfectLeftLung");
  const right = document.querySelector("#perfectRightLung");
  const diaphragm = document.querySelector("#perfectDiaphragm");
  const info = document.querySelector("#perfectRespiratoryInfo");

  if (!air || !left || !right || !diaphragm || !info) return;

  air.setAttribute("cy", "265");

  left.classList.remove("lung-exhale");
  right.classList.remove("lung-exhale");

  left.classList.add("lung-inhale");
  right.classList.add("lung-inhale");

  diaphragm.classList.remove("diaphragm-up");
  diaphragm.classList.add("diaphragm-down");

  info.innerHTML = `
    <strong>الشهيق</strong>
    <p>
      يدخل الهواء إلى الرئتين، وتتسع الرئتان،
      ويتحرك الحجاب الحاجز إلى أسفل.
    </p>
  `;

  completeHumanSystem("respiratory");
}


function runPerfectExhale() {
  const air = document.querySelector("#perfectAirDot");
  const left = document.querySelector("#perfectLeftLung");
  const right = document.querySelector("#perfectRightLung");
  const diaphragm = document.querySelector("#perfectDiaphragm");
  const info = document.querySelector("#perfectRespiratoryInfo");

  if (!air || !left || !right || !diaphragm || !info) return;

  air.setAttribute("cy", "82");

  left.classList.remove("lung-inhale");
  right.classList.remove("lung-inhale");

  left.classList.add("lung-exhale");
  right.classList.add("lung-exhale");

  diaphragm.classList.remove("diaphragm-down");
  diaphragm.classList.add("diaphragm-up");

  info.innerHTML = `
    <strong>الزفير</strong>
    <p>
      يخرج الهواء من الرئتين، وتقل مساحة الرئتين،
      ويتحرك الحجاب الحاجز إلى أعلى.
    </p>
  `;

  completeHumanSystem("respiratory");
}


/* =========================================================
   5) الجهاز الدوري
========================================================= */

function renderPerfectCirculatory() {
  const box = document.querySelector("#perfectHumanContent");
  if (!box) return;

  box.innerHTML = `
    <div class="ph-system-grid">

      <div class="ph-anatomy">

        <div class="ph-figure-title">
          <span class="ph-dot circulatory-dot"></span>
          القلب والأوعية الدموية
        </div>

        <svg
          class="ph-human-svg"
          viewBox="0 0 500 660"
          xmlns="http://www.w3.org/2000/svg">

          ${humanBodyBaseSVG()}

          <!-- الشرايين -->
          <g class="arteries">

            <path d="M260 260 C272 230 275 190 272 145" />
            <path d="M270 170 C310 180 340 210 370 275" />
            <path d="M270 170 C230 180 195 210 130 280" />

            <path d="M260 270 C272 335 280 405 286 475" />
            <path d="M286 475 L298 590" />

            <path d="M260 270 C245 345 230 405 215 475" />
            <path d="M215 475 L202 590" />

          </g>

          <!-- الأوردة -->
          <g class="veins">

            <path d="M240 260 C228 230 225 190 228 145" />
            <path d="M230 180 C198 196 170 225 125 310" />
            <path d="M230 180 C300 195 332 230 380 310" />

            <path d="M240 275 C230 345 220 410 214 475" />
            <path d="M214 475 L204 590" />

            <path d="M240 275 C255 345 270 410 286 475" />
            <path d="M286 475 L296 590" />

          </g>

          <!-- القلب: داخل الصدر ومائل قليلًا لليسار -->
          <g
            id="perfectHeart"
            transform="translate(-10 -6) rotate(-8 250 245)">

            <path
              d="
                M250 244
                C235 220 202 224 202 254
                C202 283 230 304 250 321
                C270 304 298 283 298 254
                C298 224 265 220 250 244
                Z
              "
              class="heart-main"
            />

            <path
              d="M247 237 C244 216 244 201 250 185"
              class="heart-vessel-red"
            />

            <path
              d="M260 238 C270 215 273 201 271 185"
              class="heart-vessel-blue"
            />

          </g>

          <!-- الدم المتحرك -->
          <circle
            id="perfectRedBlood"
            cx="258"
            cy="265"
            r="8"
            class="blood-red-dot"
          />

          <circle
            id="perfectBlueBlood"
            cx="237"
            cy="430"
            r="8"
            class="blood-blue-dot"
          />

        </svg>

        <span class="ph-label cp-heart">القلب</span>
        <span class="ph-label cp-artery">الشرايين</span>
        <span class="ph-label cp-vein">الأوردة</span>

        <div class="ph-blood-legend">
          <span>
            <i class="legend-red"></i>
            شرايين
          </span>

          <span>
            <i class="legend-blue"></i>
            أوردة
          </span>
        </div>

      </div>


      <div class="ph-info-card">

        <span class="ph-system-chip circulatory-chip">
          الجهاز الدوري
        </span>

        <h3>رحلة الدم</h3>

        <p class="ph-description">
          يتكوّن الجهاز الدوري من القلب والأوعية الدموية.
          يضخ القلب الدم ليتحرك عبر الأوعية الدموية في الجسم.
        </p>

        <div
          class="ph-science-box"
          id="perfectCirculatoryInfo">

          <strong>القلب</strong>

          <p>
            القلب عضو عضلي يوجد في الصدر ويميل قليلًا
            إلى الجانب الأيسر من الجسم.
          </p>

        </div>

        <button
          class="ph-main-btn circulatory-btn"
          onclick="runPerfectCirculation()">
          ♥ تشغيل الدورة
        </button>

      </div>

    </div>
  `;
}


function runPerfectCirculation() {
  if (humanAnimationBusy) return;

  const heart = document.querySelector("#perfectHeart");
  const red = document.querySelector("#perfectRedBlood");
  const blue = document.querySelector("#perfectBlueBlood");
  const info = document.querySelector("#perfectCirculatoryInfo");

  if (!heart || !red || !blue || !info) return;

  humanAnimationBusy = true;

  heart.classList.add("perfect-heart-beat");
  red.classList.add("perfect-red-travel");
  blue.classList.add("perfect-blue-travel");

  info.innerHTML = `
    <strong>حركة الدم</strong>
    <p>
      يضخ القلب الدم عبر الأوعية الدموية إلى أجزاء الجسم،
      ويستمر الدم في الدوران عبر شبكة الأوعية.
    </p>
  `;

  setTimeout(() => {
    heart.classList.remove("perfect-heart-beat");
    red.classList.remove("perfect-red-travel");
    blue.classList.remove("perfect-blue-travel");

    humanAnimationBusy = false;

    completeHumanSystem("circulatory");
  }, 4200);
}


/* =========================================================
   6) الجهاز العصبي
========================================================= */

function renderPerfectNervous() {
  const box = document.querySelector("#perfectHumanContent");
  if (!box) return;

  box.innerHTML = `
    <div class="ph-system-grid">

      <div class="ph-anatomy nervous-anatomy">

        <div class="ph-figure-title">
          <span class="ph-dot nervous-dot"></span>
          انتقال الإشارة العصبية
        </div>

        <svg
          class="ph-human-svg"
          viewBox="0 0 500 660"
          xmlns="http://www.w3.org/2000/svg">

          ${humanBodyBaseSVG()}

          <!-- الدماغ -->
          <g class="perfect-brain">

            <circle cx="231" cy="66" r="18"/>
            <circle cx="250" cy="59" r="19"/>
            <circle cx="269" cy="67" r="18"/>
            <circle cx="240" cy="82" r="18"/>
            <circle cx="260" cy="82" r="18"/>

          </g>

          <!-- الحبل الشوكي -->
          <path
            d="M250 96 C249 170 250 245 250 410"
            class="perfect-spinal"
          />

          <!-- أعصاب الذراعين -->
          <g class="perfect-nerves">

            <path d="M250 170 C210 190 165 220 125 315" />
            <path d="M250 170 C290 190 335 220 395 315" />

            <path d="M250 235 C215 265 180 300 115 370" />
            <path d="M250 235 C285 265 320 300 405 370" />

            <!-- الرجلان -->
            <path d="M250 350 C220 400 205 470 202 595" />
            <path d="M250 350 C280 400 295 470 298 595" />

          </g>

          <!-- الإشارة -->
          <circle
            id="perfectNerveSignal"
            cx="398"
            cy="360"
            r="10"
            class="perfect-nerve-signal"
          />

          <!-- اليد -->
          <circle
            id="perfectHandTarget"
            cx="399"
            cy="365"
            r="15"
            class="perfect-hand-target"
          />

        </svg>

        <span class="ph-label np-brain">الدماغ</span>
        <span class="ph-label np-spinal">الحبل الشوكي</span>
        <span class="ph-label np-nerves">الأعصاب</span>


        <button
          id="perfectHotObject"
          class="perfect-hot-object"
          onclick="runPerfectNervous()">

          <span class="hot-wave hw1">~</span>
          <span class="hot-wave hw2">~</span>
          <span class="hot-wave hw3">~</span>

          <b>جسم ساخن</b>
          <small>المسيه</small>

        </button>

      </div>


      <div class="ph-info-card">

        <span class="ph-system-chip nervous-chip">
          الجهاز العصبي
        </span>

        <h3>كيف يستجيب جسمك؟</h3>

        <p class="ph-description">
          يستقبل الجهاز العصبي المعلومات من البيئة المحيطة،
          وينقل الإشارات عبر الأعصاب ليساعد الجسم على الاستجابة.
        </p>

        <div
          class="ph-science-box"
          id="perfectNervousInfo">

          <strong>جرّبي بنفسك</strong>

          <p>
            اضغطي الجسم الساخن وشاهدي انتقال الإشارة
            من اليد عبر الجهاز العصبي.
          </p>

        </div>

        <button
          class="ph-main-btn nervous-btn"
          onclick="runPerfectNervous()">
          ✦ تشغيل الاستجابة العصبية
        </button>

      </div>

    </div>
  `;
}


function runPerfectNervous() {
  if (humanAnimationBusy) return;

  const signal = document.querySelector("#perfectNerveSignal");
  const info = document.querySelector("#perfectNervousInfo");
  const hot = document.querySelector("#perfectHotObject");
  const hand = document.querySelector("#perfectHandTarget");

  if (!signal || !info || !hot || !hand) return;

  humanAnimationBusy = true;

  hot.classList.add("perfect-hot-active");
  hand.classList.add("hand-touching");

  signal.style.opacity = "1";

  const stages = [
    {
      x: 398,
      y: 360,
      title: "1 — المؤثر",
      text: "تلامس اليد الجسم الساخن فتستقبل المستقبلات الحسية المؤثر."
    },
    {
      x: 340,
      y: 270,
      title: "2 — الأعصاب",
      text: "تنتقل الإشارة العصبية من اليد عبر الأعصاب."
    },
    {
      x: 250,
      y: 235,
      title: "3 — الحبل الشوكي",
      text: "تصل الإشارة إلى الجهاز العصبي المركزي."
    },
    {
      x: 250,
      y: 70,
      title: "4 — الدماغ",
      text: "يستقبل الدماغ المعلومات ويعالجها."
    },
    {
      x: 330,
      y: 260,
      title: "5 — أمر الاستجابة",
      text: "تنتقل أوامر الاستجابة عبر الأعصاب إلى العضلات."
    },
    {
      x: 390,
      y: 340,
      title: "6 — الاستجابة",
      text: "تستجيب العضلات وتبتعد اليد عن الجسم الساخن."
    }
  ];

  let index = 0;

  function moveSignal() {
    const stage = stages[index];

    signal.setAttribute("cx", stage.x);
    signal.setAttribute("cy", stage.y);

    info.innerHTML = `
      <strong>${stage.title}</strong>
      <p>${stage.text}</p>
    `;

    index++;

    if (index < stages.length) {
      setTimeout(moveSignal, 950);
    } else {
      setTimeout(() => {
        hand.classList.remove("hand-touching");
        hand.classList.add("hand-away");

        signal.style.opacity = "0";
        hot.classList.remove("perfect-hot-active");

        humanAnimationBusy = false;

        completeHumanSystem("nervous");
      }, 850);
    }
  }

  moveSignal();
}


/* =========================================================
   7) تسجيل إكمال الأجهزة
========================================================= */

/* =========================================================
   تسجيل إكمال أجهزة جسم الإنسان وربطها باكتشافات المحطة
========================================================= */

function completeHumanSystem(system) {

  // لا نسجل الجهاز مرتين
  const alreadyCompleted = humanCompletedSystems.has(system);

  humanCompletedSystems.add(system);

  // تحديث عداد المختبر الداخلي
  updateHumanProgress();

  // علامة الصح على التبويب
  const tab = document.querySelector(
    `.ph-tab[data-human-system="${system}"]`
  );

  if (tab) {
    tab.classList.add("completed");
  }

  // أسماء الأجهزة كما تظهر في اكتشافات المحطة
  const systemNames = {
    digestive: "الجهاز الهضمي",
    respiratory: "الجهاز التنفسي",
    circulatory: "الجهاز الدوري",
    nervous: "الجهاز العصبي"
  };

  // تسجيل كل جهاز كاكتشاف مستقل
  if (!alreadyCompleted && typeof discover === "function") {
    discover(systemNames[system]);
  }

  // بعد إكمال الأربعة
  if (humanCompletedSystems.size === 4) {
    finishPerfectHumanLab();
  }
}


function updateHumanProgress() {

  const counter =
    document.querySelector("#humanProgressCount");

  if (counter) {
    counter.textContent =
      `${humanCompletedSystems.size} / 4`;
  }

  document
    .querySelectorAll(".ph-tab")
    .forEach(tab => {

      if (
        humanCompletedSystems.has(
          tab.dataset.humanSystem
        )
      ) {
        tab.classList.add("completed");
      }

    });
}


function finishPerfectHumanLab() {

  const oldMessage =
    document.querySelector(
      "#humanLabCompleteMessage"
    );

  if (oldMessage) return;


  const lab =
    document.querySelector(
      ".perfect-human-lab"
    );

  if (!lab) return;


  const message =
    document.createElement("div");

  message.id =
    "humanLabCompleteMessage";

  message.className =
    "ph-complete-message";


  message.innerHTML = `
    <span>✓</span>

    <div>
      <strong>
        أكملتِ استكشاف أجهزة جسم الإنسان
      </strong>

      <p>
        تم اكتشاف الجهاز الهضمي والتنفسـي
        والدوري والعصبي.
      </p>
    </div>
  `;


  lab.appendChild(message);


  /*
     هنا لا نسجل "أجهزة جسم الإنسان"
     كاكتشاف خامس.

     الأجهزة الأربعة تم تسجيلها
     بشكل منفصل في completeHumanSystem().
  */

  setTimeout(() => {

    if (
      typeof checkLessonCompletion ===
      "function"
    ) {
      checkLessonCompletion();
    }

  }, 500);
}


/* =========================================================
   8) التصميم الكامل
========================================================= */

function injectPerfectHumanBodyStyles() {

  if (
    document.querySelector(
      "#perfectHumanBodyStyles"
    )
  ) return;


  const style =
    document.createElement("style");


  style.id =
    "perfectHumanBodyStyles";


  style.textContent = `

    /* =====================================================
       المختبر
    ===================================================== */

    .perfect-human-lab{
      --human-green:#174f41;
      --human-green-2:#236856;
      --human-cream:#fbf8f0;
      --human-text:#263c35;
      --human-muted:#74817c;

      width:100%;
      direction:rtl;
      box-sizing:border-box;
    }


    .perfect-human-lab *{
      box-sizing:border-box;
    }


    /* =====================================================
       الرأس
    ===================================================== */

    .ph-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:25px;

      margin-bottom:20px;
      padding:20px 24px;

      background:
        linear-gradient(
          135deg,
          rgba(255,255,255,.95),
          rgba(247,251,248,.95)
        );

      border:
        1px solid #e0e9e4;

      border-radius:24px;
    }


    .ph-kicker{
      display:inline-block;
      margin-bottom:5px;
      color:#b46e58;
      font-size:12px;
      font-weight:900;
    }


    .ph-header h2{
      margin:0 0 5px;
      color:var(--human-green);
      font-size:24px;
    }


    .ph-header p{
      margin:0;
      color:var(--human-muted);
      font-size:13px;
      line-height:1.8;
    }


    .ph-progress{
      flex:0 0 auto;

      min-width:115px;

      padding:13px 18px;

      text-align:center;

      background:#f4f9f6;

      border:
        1px solid #dce9e2;

      border-radius:18px;
    }


    .ph-progress span{
      display:block;
      color:#77857f;
      font-size:10px;
      font-weight:800;
      margin-bottom:3px;
    }


    .ph-progress strong{
      color:var(--human-green);
      font-size:20px;
    }


    /* =====================================================
       التبويبات
    ===================================================== */

    .ph-tabs{
      display:grid;
      grid-template-columns:
        repeat(4,1fr);

      gap:10px;

      margin-bottom:18px;
    }


    .ph-tab{
      position:relative;

      min-height:56px;

      border:
        1px solid #dce5e0;

      border-radius:15px;

      background:#fff;

      color:#40574f;

      font-family:inherit;
      font-size:13px;
      font-weight:900;

      cursor:pointer;

      transition:
        transform .2s ease,
        background .2s ease,
        color .2s ease,
        box-shadow .2s ease;
    }


    .ph-tab span{
      margin-left:6px;
      opacity:.45;
      font-size:10px;
    }


    .ph-tab:hover{
      transform:
        translateY(-2px);
    }


    .ph-tab.active{
      background:
        var(--human-green);

      border-color:
        var(--human-green);

      color:#fff;

      box-shadow:
        0 9px 20px
        rgba(23,79,65,.14);
    }


    .ph-tab.completed::after{
      content:"✓";

      position:absolute;

      top:-7px;
      left:-5px;

      display:flex;
      justify-content:center;
      align-items:center;

      width:21px;
      height:21px;

      border-radius:50%;

      background:#d8a84e;
      color:white;

      font-size:11px;

      box-shadow:
        0 4px 9px
        rgba(0,0,0,.12);
    }


    /* =====================================================
       الصفحة الداخلية
    ===================================================== */

    .ph-system-grid{
      display:grid;

      grid-template-columns:
        minmax(370px,1.25fr)
        minmax(280px,.75fr);

      align-items:center;

      gap:30px;

      min-height:680px;

      padding:24px;

      border:
        1px solid #dfe8e3;

      border-radius:28px;

      background:
        radial-gradient(
          circle at 20% 20%,
          rgba(218,238,228,.6),
          transparent 28%
        ),
        radial-gradient(
          circle at 85% 75%,
          rgba(250,229,216,.45),
          transparent 28%
        ),
        #fbfcfa;

      overflow:hidden;
    }


    /* =====================================================
       الرسم
    ===================================================== */

    .ph-anatomy{
      position:relative;

      min-height:630px;

      display:flex;
      align-items:center;
      justify-content:center;

      direction:ltr;
    }


    .ph-figure-title{
      position:absolute;
      top:8px;
      left:50%;

      transform:
        translateX(-50%);

      z-index:20;

      display:flex;
      align-items:center;

      gap:7px;

      padding:
        8px 14px;

      border:
        1px solid #e4e9e6;

      border-radius:999px;

      background:
        rgba(255,255,255,.94);

      color:#607069;

      font-size:11px;
      font-weight:900;

      white-space:nowrap;
    }


    .ph-dot{
      width:8px;
      height:8px;
      border-radius:50%;
    }


    .digestive-dot{
      background:#c47c61;
    }


    .respiratory-dot{
      background:#5eaebe;
    }


    .circulatory-dot{
      background:#c94d58;
    }


    .nervous-dot{
      background:#c99a37;
    }


    .ph-human-svg{
      width:min(100%,500px);
      height:620px;

      display:block;

      overflow:visible;
    }


    .ph-skin{
      fill:#f3dcc9;
      stroke:#dfbea5;
      stroke-width:3;
      stroke-linejoin:round;
    }


    .ph-face{
      fill:#7d6557;
    }


    .ph-face-line{
      fill:none;
      stroke:#9d7063;
      stroke-width:3;
      stroke-linecap:round;
    }


    /* =====================================================
       التسميات
    ===================================================== */

    .ph-label{
      position:absolute;
      z-index:25;

      padding:
        6px 10px;

      border:
        1px solid #e4e8e6;

      border-radius:10px;

      background:
        rgba(255,255,255,.96);

      color:#53645e;

      font-size:10px;
      font-weight:900;

      white-space:nowrap;

      box-shadow:
        0 5px 14px
        rgba(32,55,47,.07);

      direction:rtl;
    }


    /* =====================================================
       بطاقة المعلومات
    ===================================================== */

    .ph-info-card{
      position:relative;
      z-index:30;

      padding:27px;

      border:
        1px solid #e0e6e2;

      border-radius:25px;

      background:
        rgba(255,255,255,.97);

      box-shadow:
        0 16px 38px
        rgba(29,57,47,.08);

      direction:rtl;
      text-align:right;
    }


    .ph-system-chip{
      display:inline-flex;

      padding:
        7px 13px;

      margin-bottom:10px;

      border-radius:999px;

      font-size:11px;
      font-weight:900;
    }


    .digestive-chip{
      color:#985c48;
      background:#f7e6de;
    }


    .respiratory-chip{
      color:#397a86;
      background:#e0f0f2;
    }


    .circulatory-chip{
      color:#a8424e;
      background:#f6e1e4;
    }


    .nervous-chip{
      color:#876522;
      background:#f7edcf;
    }


    .ph-info-card h3{
      margin:
        3px 0 10px;

      color:
        var(--human-green);

      font-size:27px;
    }


    .ph-description{
      margin:
        0 0 18px;

      color:#697771;

      font-size:14px;
      line-height:1.9;
    }


    .ph-science-box{
      min-height:105px;

      display:flex;
      flex-direction:column;
      justify-content:center;

      gap:6px;

      padding:17px;

      margin-bottom:17px;

      border:
        1px solid #eee7d8;

      border-radius:17px;

      background:#fbf8ef;
    }


    .ph-science-box strong{
      color:#b65b60;
      font-size:14px;
    }


    .ph-science-box p{
      margin:0;

      color:#716f68;

      font-size:12px;
      line-height:1.8;
    }


    .ph-route{
      display:flex;
      flex-wrap:wrap;

      align-items:center;

      gap:5px;

      margin-bottom:15px;
    }


    .ph-route span{
      padding:
        5px 8px;

      border-radius:8px;

      background:#f2f6f3;

      color:#52645d;

      font-size:9px;
      font-weight:800;
    }


    .ph-route b{
      color:#c0a36d;
      font-size:10px;
    }


    /* =====================================================
       الأزرار
    ===================================================== */

    .ph-main-btn{
      width:100%;

      min-height:54px;

      border:0;

      border-radius:15px;

      font-family:inherit;
      font-size:14px;
      font-weight:900;

      cursor:pointer;

      transition:
        transform .2s ease,
        box-shadow .2s ease;
    }


    .ph-main-btn:hover{
      transform:
        translateY(-2px);
    }


    .ph-main-btn:active{
      transform:
        scale(.98);
    }


    .digestive-btn{
      background:#1c5b49;
      color:#fff;
    }


    .respiratory-btn{
      background:#428a97;
      color:#fff;
    }


    .exhale-btn{
      background:#e3f1f3;
      color:#39727d;
    }


    .circulatory-btn{
      background:#b94d58;
      color:#fff;
    }


    .nervous-btn{
      background:#e5b54e;
      color:#4c3b14;
    }


    .ph-two-buttons{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:10px;
    }


    /* =====================================================
       الهضمي
    ===================================================== */

    .digestive-mouth-organ{
      fill:none;
      stroke:#ad5f62;
      stroke-width:8;
      stroke-linecap:round;
    }


    .digestive-esophagus-organ{
      fill:none;
      stroke:#c87961;
      stroke-width:12;
      stroke-linecap:round;
    }


    .digestive-stomach-organ{
      fill:#d58d79;
      stroke:#bd7464;
      stroke-width:3;
    }


    .digestive-duodenum{
      fill:none;
      stroke:#dfa06f;
      stroke-width:9;
      stroke-linecap:round;
    }


    .digestive-large-organ{
      fill:none;
      stroke:#a86b51;
      stroke-width:20;
      stroke-linecap:round;
      stroke-linejoin:round;
    }


    .digestive-small-organ{
      fill:none;
      stroke:#dfa16f;
      stroke-width:12;
      stroke-linecap:round;
    }


    .digestive-rectum-organ{
      fill:none;
      stroke:#a86b51;
      stroke-width:14;
      stroke-linecap:round;
    }


    .perfect-food-dot{
      fill:#f1b83c;
      stroke:white;
      stroke-width:3;

      filter:
        drop-shadow(
          0 0 7px
          rgba(241,184,60,.8)
        );

      transition:
        cx .8s ease,
        cy .8s ease;
    }


    .dg-mouth{
      top:87px;
      left:64%;
    }


    .dg-esophagus{
      top:175px;
      left:64%;
    }


    .dg-stomach{
      top:275px;
      left:68%;
    }


    .dg-small{
      top:395px;
      left:67%;
    }


    .dg-large{
      top:455px;
      left:10%;
    }


    .dg-rectum{
      top:525px;
      left:61%;
    }


    /* =====================================================
       التنفسي
    ===================================================== */

    .resp-nose{
      fill:#55aab9;
    }


    .resp-trachea{
      fill:none;
      stroke:#65aeb9;
      stroke-width:17;
      stroke-linecap:round;
    }


    .trachea-rings line{
      stroke:
        rgba(255,255,255,.5);

      stroke-width:2;
    }


    .resp-bronchus{
      fill:none;
      stroke:#65aeb9;
      stroke-width:11;
      stroke-linecap:round;
    }


    .perfect-lung{
      fill:#d7889a;
      stroke:#c8788c;
      stroke-width:3;

      transform-box:
        fill-box;

      transform-origin:
        center;

      transition:
        transform .7s ease;
    }


    .lung-branches path{
      fill:none;
      stroke:#68aeba;
      stroke-width:6;
      stroke-linecap:round;
    }


    .perfect-diaphragm{
      fill:none;
      stroke:#936e72;
      stroke-width:10;
      stroke-linecap:round;

      transform-box:
        fill-box;

      transform-origin:
        center;

      transition:
        transform .7s ease;
    }


    .perfect-air-dot{
      fill:#52b4c7;
      stroke:white;
      stroke-width:3;

      filter:
        drop-shadow(
          0 0 7px
          rgba(82,180,199,.8)
        );

      transition:
        cy 1s ease;
    }


    .lung-inhale{
      transform:
        scale(1.08);
    }


    .lung-exhale{
      transform:
        scale(.93);
    }


    .diaphragm-down{
      transform:
        translateY(14px);
    }


    .diaphragm-up{
      transform:
        translateY(-7px);
    }


    .rp-nose{
      top:80px;
      left:63%;
    }


    .rp-trachea{
      top:180px;
      left:64%;
    }


    .rp-lungs{
      top:325px;
      left:68%;
    }


    .rp-diaphragm{
      top:445px;
      left:61%;
    }


    /* =====================================================
       الدوري
    ===================================================== */

    .arteries path{
      fill:none;
      stroke:#d64f59;
      stroke-width:7;
      stroke-linecap:round;
      opacity:.9;
    }


    .veins path{
      fill:none;
      stroke:#4d7fb7;
      stroke-width:7;
      stroke-linecap:round;
      opacity:.9;
    }


    .heart-main{
      fill:#c94d59;
      stroke:#a73e49;
      stroke-width:3;
    }


    .heart-vessel-red{
      fill:none;
      stroke:#d9515b;
      stroke-width:9;
      stroke-linecap:round;
    }


    .heart-vessel-blue{
      fill:none;
      stroke:#4c7eb6;
      stroke-width:9;
      stroke-linecap:round;
    }


    #perfectHeart{
      transform-box:fill-box;
      transform-origin:center;
    }


    .perfect-heart-beat{
      animation:
        perfectHeartBeat
        .55s ease
        7;
    }


    @keyframes perfectHeartBeat{

      0%,100%{
        transform:
          translate(-10px,-6px)
          rotate(-8deg)
          scale(1);
      }

      45%{
        transform:
          translate(-10px,-6px)
          rotate(-8deg)
          scale(1.13);
      }
    }


    .blood-red-dot{
      fill:#ee5a62;

      filter:
        drop-shadow(
          0 0 6px
          rgba(238,90,98,.8)
        );
    }


    .blood-blue-dot{
      fill:#477db7;

      filter:
        drop-shadow(
          0 0 6px
          rgba(71,125,183,.8)
        );
    }


    .perfect-red-travel{
      animation:
        perfectRedBlood
        2s ease-in-out
        2;
    }


    .perfect-blue-travel{
      animation:
        perfectBlueBlood
        2s ease-in-out
        2;
    }


    @keyframes perfectRedBlood{

      0%{
        transform:
          translate(0,0);
      }

      35%{
        transform:
          translate(65px,65px);
      }

      70%{
        transform:
          translate(40px,260px);
      }

      100%{
        transform:
          translate(0,0);
      }
    }


    @keyframes perfectBlueBlood{

      0%{
        transform:
          translate(0,0);
      }

      55%{
        transform:
          translate(5px,-150px);
      }

      100%{
        transform:
          translate(15px,-175px);
      }
    }


    .cp-heart{
      top:255px;
      left:64%;
      color:#a8414b;
    }


    .cp-artery{
      top:350px;
      left:69%;
      color:#bd414c;
    }


    .cp-vein{
      top:400px;
      left:13%;
      color:#3e70aa;
    }


    .ph-blood-legend{
      position:absolute;

      bottom:18px;
      left:50%;

      transform:
        translateX(-50%);

      display:flex;

      gap:15px;

      padding:
        8px 14px;

      border:
        1px solid #e2e8e5;

      border-radius:999px;

      background:white;

      font-size:10px;
      font-weight:900;

      direction:rtl;

      box-shadow:
        0 5px 14px
        rgba(0,0,0,.05);
    }


    .ph-blood-legend span{
      display:flex;
      align-items:center;
      gap:5px;
    }


    .ph-blood-legend i{
      width:9px;
      height:9px;
      border-radius:50%;
    }


    .legend-red{
      background:#d64f59;
    }


    .legend-blue{
      background:#4d7fb7;
    }


    /* =====================================================
       العصبي
    ===================================================== */

    .perfect-brain{
      fill:#bb82b4;
      stroke:#9c6696;
      stroke-width:1.5;
    }


    .perfect-spinal{
      fill:none;
      stroke:#d2b54d;
      stroke-width:10;
      stroke-linecap:round;
    }


    .perfect-nerves path{
      fill:none;
      stroke:#d2b54d;
      stroke-width:5;
      stroke-linecap:round;
    }


    .perfect-nerve-signal{
      fill:#ffd02f;
      stroke:white;
      stroke-width:3;

      opacity:0;

      filter:
        drop-shadow(
          0 0 8px
          #f1bd20
        );

      transition:
        cx .75s ease,
        cy .75s ease,
        opacity .2s ease;
    }


    .perfect-hand-target{
      fill:transparent;
      stroke:transparent;

      transform-box:
        fill-box;

      transform-origin:center;

      transition:
        transform .5s ease;
    }


    .hand-touching{
      transform:
        translateX(7px);
    }


    .hand-away{
      animation:
        pullHandAway
        .7s ease;
    }


    @keyframes pullHandAway{

      0%{
        transform:
          translateX(7px);
      }

      100%{
        transform:
          translateX(-25px);
      }
    }


    .np-brain{
      top:65px;
      left:62%;
    }


    .np-spinal{
      top:225px;
      left:62%;
    }


    .np-nerves{
      top:360px;
      left:68%;
    }


    .perfect-hot-object{
      position:absolute;

      right:0;
      top:315px;

      width:94px;
      min-height:82px;

      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;

      gap:2px;

      border:0;

      border-radius:17px;

      background:
        linear-gradient(
          145deg,
          #ee8455,
          #d96543
        );

      color:white;

      font-family:inherit;

      cursor:pointer;

      box-shadow:
        0 12px 25px
        rgba(209,94,58,.23);

      transition:
        transform .25s ease;
    }


    .perfect-hot-object b{
      font-size:12px;
    }


    .perfect-hot-object small{
      font-size:9px;
      opacity:.8;
    }


    .perfect-hot-object::before{
      content:"←";

      position:absolute;

      left:-33px;
      top:25px;

      color:#d66544;

      font-size:27px;
      font-weight:900;
    }


    .hot-wave{
      position:absolute;

      top:-25px;

      color:#dc6345;

      font-size:27px;
      font-weight:900;

      animation:
        perfectHeatWave
        1.1s ease-in-out
        infinite;
    }


    .hw1{
      left:13px;
    }


    .hw2{
      left:36px;
      animation-delay:.2s;
    }


    .hw3{
      left:59px;
      animation-delay:.4s;
    }


    @keyframes perfectHeatWave{

      0%,100%{
        transform:
          translateY(6px);

        opacity:.4;
      }

      50%{
        transform:
          translateY(-4px);

        opacity:1;
      }
    }


    .perfect-hot-active{
      animation:
        perfectHotShake
        .25s ease
        4;
    }


    @keyframes perfectHotShake{

      0%,100%{
        transform:
          translateX(0);
      }

      50%{
        transform:
          translateX(5px);
      }
    }


    /* =====================================================
       إكمال المختبر
    ===================================================== */

    .ph-complete-message{
      display:flex;
      align-items:center;

      gap:13px;

      margin-top:16px;

      padding:
        15px 18px;

      border:
        1px solid #cde3d7;

      border-radius:18px;

      background:#edf8f2;

      color:#315e4e;

      animation:
        completeHumanAppear
        .45s ease;
    }


    .ph-complete-message > span{
      flex:0 0 auto;

      display:flex;
      align-items:center;
      justify-content:center;

      width:35px;
      height:35px;

      border-radius:50%;

      background:#3d8a6d;
      color:white;

      font-size:18px;
      font-weight:900;
    }


    .ph-complete-message strong{
      display:block;
      margin-bottom:2px;
      font-size:13px;
    }


    .ph-complete-message p{
      margin:0;
      font-size:11px;
      opacity:.8;
    }


    @keyframes completeHumanAppear{

      from{
        transform:
          translateY(8px);

        opacity:0;
      }

      to{
        transform:
          translateY(0);

        opacity:1;
      }
    }


    /* =====================================================
       التابلت
    ===================================================== */

    @media(max-width:900px){

      .ph-system-grid{
        grid-template-columns:
          minmax(330px,1.05fr)
          minmax(250px,.95fr);

        gap:15px;
        padding:15px;
      }


      .ph-human-svg{
        height:570px;
      }


      .ph-anatomy{
        min-height:590px;
      }


      .ph-info-card{
        padding:20px;
      }

    }


    /* =====================================================
       الجوال
    ===================================================== */

    @media(max-width:720px){

      .ph-header{
        align-items:flex-start;
        padding:16px;
      }


      .ph-header h2{
        font-size:20px;
      }


      .ph-progress{
        min-width:90px;
        padding:10px;
      }


      .ph-tabs{
        grid-template-columns:
          1fr 1fr;
      }


      .ph-system-grid{
        grid-template-columns:1fr;
        gap:5px;
        padding:10px;
      }


      .ph-anatomy{
        min-height:560px;
      }


      .ph-human-svg{
        height:545px;
        max-width:430px;
      }


      .ph-info-card{
        margin-top:0;
      }


      .perfect-hot-object{
        right:2px;
        transform:
          scale(.82);
      }

    }


    @media(max-width:460px){

      .ph-header{
        display:block;
      }


      .ph-progress{
        margin-top:12px;
        width:100%;
      }


      .ph-anatomy{
        min-height:510px;
      }


      .ph-human-svg{
        height:500px;
      }


      .ph-label{
        font-size:8px;
        padding:4px 6px;
      }


      .ph-info-card h3{
        font-size:22px;
      }


      .ph-two-buttons{
        grid-template-columns:1fr;
      }

    }

  `;


  document.head.appendChild(style);
}
/* =========================================================
   مختبر الهيكل العظمي — الصف السابع
   نسخة جديدة: أوضح + علمية + تفاعلية
========================================================= */

let skeletonXrayOn = false;
let skeletonSelectedBone = null;
let skeletonFoundBones = new Set();

const skeletonBones = {

  skull: {
    name: "الجمجمة",
    info: "تحمي الدماغ."
  },

  spine: {
    name: "العمود الفقري",
    info: "يدعم الجسم ويساعده على الحركة والانحناء."
  },

  ribs: {
    name: "الأضلاع",
    info: "تكوّن القفص الصدري وتساعد على حماية القلب والرئتين."
  },

  pelvis: {
    name: "الحزام الحوضي",
    info: "جزء من الهيكل العظمي يربط الطرفين السفليين بالجسم."
  },

  femur: {
    name: "عظم الفخذ",
    info: "العظم الطويل في الجزء العلوي من الطرف السفلي."
  },

  

};

/* =========================================================
   المختبر الرئيسي
========================================================= */

function renderSkeletonLab() {
  injectScientificSkeletonStyles();

  const area =
    document.querySelector("#experimentArea") ||
    document.querySelector(".experiment-area");

  if (!area) return;

  area.innerHTML = `
    <section class="scientific-skeleton-lab">

      <div class="sk-topbar">

        <div>
          <span class="sk-kicker">مختبر العظام</span>
          <h2>استكشفي الهيكل العظمي</h2>
          <p>
            شغّلي الأشعة ثم اضغطي على العظام للتعرّف إليها.
          </p>
        </div>

        <div class="sk-counter">
          <span>العظام التي اكتشفتها</span>
          <strong id="skeletonCounter">
            ${skeletonFoundBones.size} / 5
          </strong>
        </div>

      </div>


      <div class="sk-controls">

        <button
          id="xrayButton"
          class="sk-control active"
          onclick="toggleSkeletonXray()">
          <span>◉</span>
          الأشعة تعمل
        </button>

        <button
          class="sk-control"
          onclick="showSkeletonFunctions(this)">
          وظائف الهيكل
        </button>

        <button
          id="bendButton"
          class="sk-control"
          onclick="runSkeletonBend(this)">
          اختبار الانحناء
        </button>

      </div>


      <div class="sk-main">

        <!-- ===========================
             الهيكل
        ============================ -->

        <div class="sk-stage xray-on" id="skeletonStage">

          <div class="sk-xray-title">
            <span></span>
            الأشعة تكشف العظام داخل الجسم
          </div>

          <svg
            class="scientific-skeleton"
            viewBox="0 0 500 800"
            xmlns="http://www.w3.org/2000/svg">

            <!-- ظل الجسم -->
            <path
              class="sk-body-shadow"
              d="
                M207 120
                C175 132 155 165 150 210
                L125 375
                C121 398 134 412 151 409
                L181 286
                L183 447
                L170 520
                L166 730
                L210 730
                L225 530
                L250 485
                L275 530
                L290 730
                L334 730
                L330 520
                L317 447
                L319 286
                L349 409
                C366 412 379 398 375 375
                L350 210
                C345 165 325 132 293 120
                Z
              "
            />


            <!-- ======================
                 الجزء العلوي المتحرك
            ======================= -->

            <g id="skeletonUpperBody">

              <!-- الجمجمة -->
              <g
                class="sk-bone"
                data-bone="skull"
                onclick="selectSkeletonBone('skull')">

                <path
                  d="
                    M205 67
                    C205 25 225 12 250 12
                    C275 12 295 25 295 67
                    C295 95 282 111 270 119
                    L267 139
                    C262 150 238 150 233 139
                    L230 119
                    C218 111 205 95 205 67
                    Z
                  "
                />

                <!-- تجاويف العين -->
                <ellipse
                  class="sk-hole"
                  cx="230"
                  cy="72"
                  rx="12"
                  ry="15"
                />

                <ellipse
                  class="sk-hole"
                  cx="270"
                  cy="72"
                  rx="12"
                  ry="15"
                />

                <!-- الأنف -->
                <path
                  class="sk-hole-line"
                  d="M250 80 L242 99 L258 99 Z"
                />

                <!-- الفك -->
                <path
                  class="sk-detail"
                  d="
                    M222 105
                    Q250 124 278 105
                    L273 133
                    Q250 150 227 133
                    Z
                  "
                />

                <!-- الأسنان -->
                <path
                  class="sk-thin"
                  d="M229 113 Q250 124 271 113"
                />

              </g>


              <!-- فقرات الرقبة -->
              <g class="sk-neck-vertebrae">
                <rect x="240" y="146" width="20" height="8" rx="4"/>
                <rect x="239" y="157" width="22" height="8" rx="4"/>
                <rect x="238" y="168" width="24" height="8" rx="4"/>
              </g>


              <!-- الترقوتان -->
              <g class="sk-normal-bone">
                <path d="M245 181 Q208 170 178 190"/>
                <path d="M255 181 Q292 170 322 190"/>
              </g>


              <!-- لوحا الكتف -->
              <g class="sk-light-bone">
                <path d="M182 190 Q164 215 180 243"/>
                <path d="M318 190 Q336 215 320 243"/>
              </g>


              <!-- ======================
                   القفص الصدري
              ======================= -->

              <g
                class="sk-bone ribs-group"
                data-bone="ribs"
                onclick="selectSkeletonBone('ribs')">

                <path d="M244 193 Q207 188 181 210 Q179 229 205 238"/>
                <path d="M256 193 Q293 188 319 210 Q321 229 295 238"/>

                <path d="M244 210 Q203 205 177 228 Q178 248 207 256"/>
                <path d="M256 210 Q297 205 323 228 Q322 248 293 256"/>

                <path d="M244 229 Q204 224 180 247 Q182 268 209 276"/>
                <path d="M256 229 Q296 224 320 247 Q318 268 291 276"/>

                <path d="M244 248 Q207 244 184 266 Q187 287 211 295"/>
                <path d="M256 248 Q293 244 316 266 Q313 287 289 295"/>

                <path d="M244 267 Q211 264 189 285 Q193 306 214 313"/>
                <path d="M256 267 Q289 264 311 285 Q307 306 286 313"/>

                <path d="M244 286 Q215 284 196 303 Q201 322 219 328"/>
                <path d="M256 286 Q285 284 304 303 Q299 322 281 328"/>

              </g>


              <!-- عظم القص -->
              <g
                class="sk-bone"
                data-bone="sternum"
                onclick="selectSkeletonBone('sternum')">

                <path
                  d="
                    M244 186
                    Q250 179 256 186
                    L258 280
                    Q250 296 242 280
                    Z
                  "
                />

              </g>


              <!-- العمود الفقري -->
              <g
                class="sk-bone spine-group"
                data-bone="spine"
                onclick="selectSkeletonBone('spine')">

                <rect x="241" y="181" width="18" height="10" rx="4"/>
                <rect x="240" y="194" width="20" height="10" rx="4"/>
                <rect x="239" y="207" width="22" height="10" rx="4"/>
                <rect x="239" y="220" width="22" height="10" rx="4"/>
                <rect x="239" y="233" width="22" height="10" rx="4"/>
                <rect x="238" y="246" width="24" height="10" rx="4"/>
                <rect x="238" y="259" width="24" height="10" rx="4"/>
                <rect x="237" y="272" width="26" height="10" rx="4"/>
                <rect x="237" y="285" width="26" height="10" rx="4"/>
                <rect x="236" y="298" width="28" height="10" rx="4"/>
                <rect x="235" y="312" width="30" height="11" rx="4"/>
                <rect x="234" y="327" width="32" height="11" rx="4"/>
                <rect x="234" y="342" width="32" height="11" rx="4"/>
                <rect x="235" y="357" width="30" height="11" rx="4"/>

              </g>


              <!-- الذراع الأيسر -->
              <g
                class="sk-bone"
                data-bone="humerus"
                onclick="selectSkeletonBone('humerus')">

                <circle cx="170" cy="202" r="11"/>

                <path
                  d="
                    M169 211
                    Q162 260 158 318
                    Q158 330 166 332
                    Q174 330 175 318
                    L181 218
                    Q179 207 169 211
                    Z
                  "
                />

              </g>


              <!-- الذراع الأيمن -->
              <g
                class="sk-bone"
                data-bone="humerus"
                onclick="selectSkeletonBone('humerus')">

                <circle cx="330" cy="202" r="11"/>

                <path
                  d="
                    M331 211
                    Q338 260 342 318
                    Q342 330 334 332
                    Q326 330 325 318
                    L319 218
                    Q321 207 331 211
                    Z
                  "
                />

              </g>


              <!-- المرفقان -->
              <g class="sk-joint">
                <circle cx="165" cy="337" r="9"/>
                <circle cx="335" cy="337" r="9"/>
              </g>


              <!-- الكعبرة -->
              <g
                class="sk-bone"
                data-bone="radius"
                onclick="selectSkeletonBone('radius')">

                <path d="M159 345 Q151 395 145 449"/>
                <path d="M341 345 Q349 395 355 449"/>

              </g>


              <!-- الزند -->
              <g
                class="sk-bone"
                data-bone="ulna"
                onclick="selectSkeletonBone('ulna')">

                <path d="M171 345 Q173 398 160 451"/>
                <path d="M329 345 Q327 398 340 451"/>

              </g>


              <!-- اليدان -->
              <g class="sk-hand">

                <circle cx="151" cy="459" r="8"/>
                <circle cx="349" cy="459" r="8"/>

                <path d="M148 466 L137 489"/>
                <path d="M151 466 L146 493"/>
                <path d="M154 466 L155 493"/>
                <path d="M157 466 L164 490"/>

                <path d="M352 466 L363 489"/>
                <path d="M349 466 L354 493"/>
                <path d="M346 466 L345 493"/>
                <path d="M343 466 L336 490"/>

              </g>

            </g>


            <!-- ======================
                 الحوض
            ======================= -->

            <g
              class="sk-bone"
              data-bone="pelvis"
              onclick="selectSkeletonBone('pelvis')">

              <path
                d="
                  M250 370

                  C223 356 194 361 181 386
                  C169 409 181 444 210 459

                  C220 465 229 461 233 451
                  L242 425

                  L250 438

                  L258 425
                  L267 451

                  C271 461 280 465 290 459
                  C319 444 331 409 319 386
                  C306 361 277 356 250 370
                  Z
                "
              />

              <!-- فتحات الحوض -->
              <ellipse
                class="sk-hole"
                cx="211"
                cy="407"
                rx="18"
                ry="24"
              />

              <ellipse
                class="sk-hole"
                cx="289"
                cy="407"
                rx="18"
                ry="24"
              />

            </g>


            <!-- ======================
                 الطرفان السفليان
            ======================= -->

            <!-- الفخذ -->
            <g
              class="sk-bone"
              data-bone="femur"
              onclick="selectSkeletonBone('femur')">

              <circle cx="214" cy="458" r="10"/>
              <circle cx="286" cy="458" r="10"/>

              <path
                d="
                  M213 465
                  Q204 530 207 603
                  Q208 619 220 619
                  Q230 616 228 602
                  L230 482
                  Q228 467 213 465
                  Z
                "
              />

              <path
                d="
                  M287 465
                  Q296 530 293 603
                  Q292 619 280 619
                  Q270 616 272 602
                  L270 482
                  Q272 467 287 465
                  Z
                "
              />

            </g>


            <!-- الرضفة -->
            <g
              class="sk-bone"
              data-bone="patella"
              onclick="selectSkeletonBone('patella')">

              <ellipse cx="218" cy="624" rx="11" ry="13"/>
              <ellipse cx="282" cy="624" rx="11" ry="13"/>

            </g>


            <!-- الظنبوب -->
            <g
              class="sk-bone"
              data-bone="tibia"
              onclick="selectSkeletonBone('tibia')">

              <path
                d="
                  M216 640
                  Q211 682 213 744
                  Q214 760 223 760
                  Q232 758 230 744
                  L229 646
                  Q226 637 216 640
                  Z
                "
              />

              <path
                d="
                  M284 640
                  Q289 682 287 744
                  Q286 760 277 760
                  Q268 758 270 744
                  L271 646
                  Q274 637 284 640
                  Z
                "
              />

            </g>


            <!-- الشظية -->
            <g
              class="sk-bone fibula-bone"
              data-bone="fibula"
              onclick="selectSkeletonBone('fibula')">

              <path d="M205 642 Q199 690 203 750"/>
              <path d="M295 642 Q301 690 297 750"/>

            </g>


            <!-- القدم -->
            <g class="sk-foot">

              <path d="M202 755 Q217 765 237 758"/>
              <path d="M298 755 Q283 765 263 758"/>

              <path d="M204 759 L195 774"/>
              <path d="M211 762 L205 779"/>
              <path d="M219 763 L217 780"/>
              <path d="M227 762 L230 778"/>

              <path d="M296 759 L305 774"/>
              <path d="M289 762 L295 779"/>
              <path d="M281 763 L283 780"/>
              <path d="M273 762 L270 778"/>

            </g>

          </svg>


          <!-- التسميات -->

          <button
            class="sk-label skull-label"
            onclick="selectSkeletonBone('skull')">
            الجمجمة
          </button>

          <button
            class="sk-label ribs-label"
            onclick="selectSkeletonBone('ribs')">
            الأضلاع
          </button>

          <button
            class="sk-label spine-label"
            onclick="selectSkeletonBone('spine')">
            العمود الفقري
          </button>

          <button
            class="sk-label pelvis-label"
            onclick="selectSkeletonBone('pelvis')">
            الحوض
          </button>

          <button
            class="sk-label femur-label"
            onclick="selectSkeletonBone('femur')">
            عظم الفخذ
          </button>

        </div>


        <!-- ===========================
             بطاقة المعلومات
        ============================ -->

        <aside class="sk-info">

          <span class="sk-chip">
            مختبر العظام
          </span>

          <h3 id="skeletonInfoTitle">
            استكشفي الهيكل العظمي
          </h3>

          <p id="skeletonInfoText">
            اضغطي على إحدى العظام في الرسم لتظهر
            معلوماتها هنا.
          </p>


          <div class="sk-stat">

            <span>
              العظام التي اكتشفتها
            </span>

            <strong id="skeletonSideCounter">
              ${skeletonFoundBones.size} / 5
            </strong>

          </div>


          <div
            class="sk-selected"
            id="skeletonSelectedBox">

            <span>✦</span>

            <div>
              <small>اختاري عظمة</small>
              <strong>
                لم تختاري عظمة بعد
              </strong>
            </div>

          </div>


          <div
            class="sk-function-list"
            id="skeletonFunctionList">

            <div>
              <span>01</span>
              <p>يدعم الجسم ويعطيه شكله.</p>
            </div>

            <div>
              <span>02</span>
              <p>يحمي بعض الأعضاء الداخلية.</p>
            </div>

            <div>
              <span>03</span>
              <p>يساعد الجسم على الحركة مع العضلات والمفاصل.</p>
            </div>

          </div>

        </aside>

      </div>


      <div
        class="sk-discovery"
        id="skeletonDiscovery">

        <span>✦</span>

        <div>
          <small>اكتشاف علمي</small>
          <strong>الأشعة تكشف العظام</strong>
          <p>
            يمكن رؤية العظام داخل الجسم باستخدام صور الأشعة.
          </p>
        </div>

      </div>

    </section>
  `;

  updateSkeletonCounter();
}


/* =========================================================
   تشغيل وإيقاف الأشعة
========================================================= */

function toggleSkeletonXray() {
  const stage =
    document.querySelector("#skeletonStage");

  const button =
    document.querySelector("#xrayButton");

  if (!stage || !button) return;

  skeletonXrayOn = !skeletonXrayOn;

  stage.classList.toggle(
    "xray-on",
    skeletonXrayOn
  );

  stage.classList.toggle(
    "xray-off",
    !skeletonXrayOn
  );

  if (skeletonXrayOn) {
    button.classList.add("active");
    button.innerHTML =
      "<span>◉</span> الأشعة تعمل";
  } else {
    button.classList.remove("active");
    button.innerHTML =
      "<span>○</span> تشغيل الأشعة";
  }
}


/* =========================================================
   اختيار عظمة
========================================================= */

function selectSkeletonBone(bone) {
  const data = skeletonBones[bone];

  if (!data) return;

  skeletonSelectedBone = bone;

  skeletonFoundBones.add(bone);

  document
    .querySelectorAll(".sk-bone")
    .forEach(el => {

      el.classList.toggle(
        "selected",
        el.dataset.bone === bone
      );

    });


  const title =
    document.querySelector(
      "#skeletonInfoTitle"
    );

  const text =
    document.querySelector(
      "#skeletonInfoText"
    );

  const box =
    document.querySelector(
      "#skeletonSelectedBox"
    );


  if (title) {
    title.textContent = data.name;
  }


  if (text) {
    text.textContent = data.info;
  }


  if (box) {
    box.innerHTML = `
      <span>✓</span>

      <div>
        <small>العظمة المختارة</small>
        <strong>${data.name}</strong>
      </div>
    `;
  }


  updateSkeletonCounter();
}


/* =========================================================
   تحديث العداد
========================================================= */

function updateSkeletonCounter() {
  const count =
    skeletonFoundBones.size;

  const top =
    document.querySelector(
      "#skeletonCounter"
    );

  const side =
    document.querySelector(
      "#skeletonSideCounter"
    );


  if (top) {
    top.textContent =
      `${count} / 5`;
  }


  if (side) {
    side.textContent =
      `${count} / 5`;
  }


  if (count >= 5) {
    completeSkeletonDiscovery();
  }
}


/* =========================================================
   اكتشاف جميع العظام
========================================================= */

function completeSkeletonDiscovery() {
  const discovery =
    document.querySelector(
      "#skeletonDiscovery"
    );

  if (discovery) {
    discovery.classList.add(
      "complete"
    );

    discovery.innerHTML = `
      <span>✓</span>

      <div>
        <small>اكتشاف مكتمل</small>
        <strong>
          تعرفتِ إلى أهم عظام الهيكل العظمي
        </strong>
        <p>
          أحسنتِ! استكشفتِ جميع العظام الموجودة في هذا النشاط.
        </p>
      </div>
    `;
  }
}


/* =========================================================
   وظائف الهيكل
========================================================= */

function showSkeletonFunctions(button) {
  document
    .querySelectorAll(".sk-control")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  }


  const title =
    document.querySelector(
      "#skeletonInfoTitle"
    );

  const text =
    document.querySelector(
      "#skeletonInfoText"
    );

  const list =
    document.querySelector(
      "#skeletonFunctionList"
    );


  if (title) {
    title.textContent =
      "وظائف الهيكل العظمي";
  }


  if (text) {
    text.textContent =
      "للهيكل العظمي دور مهم في دعم الجسم وحماية بعض أعضائه والمساعدة على الحركة.";
  }


  if (list) {
    list.classList.add("show");
  }
}


/* =========================================================
   اختبار الانحناء الحقيقي
========================================================= */

function runSkeletonBend(button) {
  const upper =
    document.querySelector(
      "#skeletonUpperBody"
    );

  const stage =
    document.querySelector(
      "#skeletonStage"
    );

  const title =
    document.querySelector(
      "#skeletonInfoTitle"
    );

  const text =
    document.querySelector(
      "#skeletonInfoText"
    );


  if (!upper || !stage) return;


  document
    .querySelectorAll(".sk-control")
    .forEach(btn => {
      btn.classList.remove("active");
    });


  if (button) {
    button.classList.add("active");
  }


  upper.classList.remove(
    "skeleton-bending"
  );

  stage.classList.remove(
    "bend-running"
  );


  void upper.getBoundingClientRect();


  upper.classList.add(
    "skeleton-bending"
  );

  stage.classList.add(
    "bend-running"
  );


  if (title) {
    title.textContent =
      "كيف ينحني الجسم؟";
  }


  if (text) {
    text.textContent =
      "يساعد العمود الفقري الجسم على الحركة والانحناء، وتعمل المفاصل والعضلات مع الهيكل العظمي أثناء الحركة.";
  }


  const spine =
    document.querySelector(
      '.sk-bone[data-bone="spine"]'
    );

  if (spine) {
    spine.classList.add(
      "bend-highlight"
    );
  }


  setTimeout(() => {

    upper.classList.remove(
      "skeleton-bending"
    );

    stage.classList.remove(
      "bend-running"
    );

    if (spine) {
      spine.classList.remove(
        "bend-highlight"
      );
    }

  }, 4300);
}


/* =========================================================
   CSS
========================================================= */

function injectScientificSkeletonStyles() {

  if (
    document.querySelector(
      "#scientificSkeletonStyles"
    )
  ) return;


  const style =
    document.createElement("style");


  style.id =
    "scientificSkeletonStyles";


  style.textContent = `

    .scientific-skeleton-lab{
      --sk-green:#174f41;
      --sk-green2:#246858;
      --sk-bone:#eee0bd;
      --sk-bone-edge:#cdbd98;
      --sk-bg:#f7faf7;
      --sk-pink:#c97883;

      direction:rtl;
      width:100%;
    }


    .scientific-skeleton-lab *{
      box-sizing:border-box;
    }


    /* ============================
       العنوان
    ============================ */

    .sk-topbar{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:20px;

      margin-bottom:14px;
      padding:18px 22px;

      border:1px solid #dce8e2;
      border-radius:22px;

      background:
        rgba(255,255,255,.94);
    }


    .sk-kicker{
      display:block;

      margin-bottom:5px;

      color:#c37473;

      font-size:11px;
      font-weight:900;
    }


    .sk-topbar h2{
      margin:0 0 5px;

      color:var(--sk-green);

      font-size:24px;
    }


    .sk-topbar p{
      margin:0;

      color:#84908b;

      font-size:12px;
    }


    .sk-counter{
      flex:0 0 auto;

      min-width:130px;

      padding:12px 15px;

      border:1px solid #d9e7e0;
      border-radius:18px;

      background:#f2f8f4;

      text-align:center;
    }


    .sk-counter span{
      display:block;

      margin-bottom:3px;

      color:#7e8d86;

      font-size:9px;
      font-weight:800;
    }


    .sk-counter strong{
      color:var(--sk-green);

      font-size:19px;
    }


    /* ============================
       أزرار التحكم
    ============================ */

    .sk-controls{
      display:flex;
      justify-content:center;
      flex-wrap:wrap;

      gap:9px;

      margin-bottom:16px;
    }


    .sk-control{
      min-height:47px;

      padding:0 19px;

      border:1px solid #d9e3de;
      border-radius:13px;

      background:white;

      color:#435b53;

      font-family:inherit;
      font-size:12px;
      font-weight:900;

      cursor:pointer;

      transition:
        transform .2s ease,
        background .2s ease,
        color .2s ease;
    }


    .sk-control:hover{
      transform:translateY(-2px);
    }


    .sk-control.active{
      background:var(--sk-green);
      border-color:var(--sk-green);
      color:white;

      box-shadow:
        0 8px 18px
        rgba(23,79,65,.15);
    }


    /* ============================
       المنطقة الرئيسية
    ============================ */

    .sk-main{
      display:grid;

      grid-template-columns:
        minmax(420px,1.25fr)
        minmax(280px,.75fr);

      gap:28px;

      align-items:center;

      min-height:720px;

      padding:25px;

      border:1px solid #dce6e1;
      border-radius:27px;

      background:
        radial-gradient(
          circle at 20% 20%,
          rgba(211,233,223,.5),
          transparent 35%
        ),
        radial-gradient(
          circle at 85% 80%,
          rgba(246,228,207,.4),
          transparent 30%
        ),
        #fafbf9;
    }


    /* ============================
       منطقة الأشعة
    ============================ */

    .sk-stage{
      position:relative;

      min-height:690px;

      display:flex;
      align-items:center;
      justify-content:center;

      overflow:hidden;

      border:1px solid #d6e5df;
      border-radius:27px;

      background:
        radial-gradient(
          ellipse at center,
          #f7fbf8 0%,
          #eaf3ee 58%,
          #dfece6 100%
        );
    }


    .sk-stage::before{
      content:"";

      position:absolute;

      width:340px;
      height:610px;

      border-radius:50%;

      background:
        rgba(210,230,221,.36);

      filter:blur(2px);
    }


    .sk-xray-title{
      position:absolute;

      top:18px;
      left:50%;

      transform:
        translateX(-50%);

      z-index:30;

      display:flex;
      align-items:center;

      gap:7px;

      padding:8px 14px;

      border:1px solid #dfe8e4;
      border-radius:999px;

      background:
        rgba(255,255,255,.94);

      color:#7b8882;

      font-size:10px;
      font-weight:900;

      white-space:nowrap;
    }


    .sk-xray-title span{
      width:8px;
      height:8px;

      border-radius:50%;

      background:#e2b44a;
    }


    /* ============================
       SVG
    ============================ */

    .scientific-skeleton{
      position:relative;
      z-index:10;

      width:min(100%,470px);
      height:660px;

      overflow:visible;
    }


    .sk-body-shadow{
      fill:rgba(112,153,138,.06);

      stroke:
        rgba(112,153,138,.1);

      stroke-width:2;
    }


    .sk-bone,
    .sk-normal-bone,
    .sk-light-bone,
    .sk-neck-vertebrae,
    .sk-hand,
    .sk-foot,
    .sk-joint{

      fill:var(--sk-bone);

      stroke:var(--sk-bone-edge);

      stroke-width:3;

      stroke-linecap:round;
      stroke-linejoin:round;
    }


    .sk-bone{
      cursor:pointer;

      transition:
        filter .2s ease,
        opacity .2s ease;
    }


    .sk-bone:hover{
      filter:
        drop-shadow(
          0 0 7px
          rgba(209,171,83,.6)
        );
    }


    .sk-bone.selected{
      fill:#e9bd69;
      stroke:#bd8c38;

      filter:
        drop-shadow(
          0 0 9px
          rgba(225,174,71,.65)
        );
    }


    .sk-hole{
      fill:#52665f;
      stroke:#c8b78f;
      stroke-width:2;
    }


    .sk-hole-line{
      fill:#52665f;
      stroke:none;
    }


    .sk-detail{
      fill:#eadbb7;
      stroke:#c7b48d;
      stroke-width:2;
    }


    .sk-thin{
      fill:none;
      stroke:#b8a781;
      stroke-width:2;
    }


    .ribs-group path{
      fill:none;

      stroke:var(--sk-bone-edge);

      stroke-width:9;
    }


    .ribs-group.selected path{
      stroke:#d49e47;
    }


    .spine-group rect{
      transform-box:fill-box;
      transform-origin:center;
    }


    .sk-normal-bone path{
      fill:none;
      stroke:var(--sk-bone-edge);
      stroke-width:10;
    }


    .sk-light-bone path{
      fill:none;
      stroke:#d6c8a7;
      stroke-width:7;
    }


    .sk-neck-vertebrae rect{
      fill:var(--sk-bone);
    }


    .sk-bone[data-bone="radius"] path,
    .sk-bone[data-bone="ulna"] path,
    .fibula-bone path,
    .sk-hand path,
    .sk-foot path{

      fill:none;

      stroke:var(--sk-bone-edge);

      stroke-width:7;
    }


    .sk-bone[data-bone="radius"].selected path,
    .sk-bone[data-bone="ulna"].selected path,
    .fibula-bone.selected path{

      stroke:#d49e47;
    }


    /* ============================
       تشغيل / إيقاف الأشعة
    ============================ */

    .sk-stage.xray-off
    .scientific-skeleton
    > *:not(.sk-body-shadow){

      opacity:.12;

      transition:
        opacity .4s ease;
    }


    .sk-stage.xray-on
    .scientific-skeleton
    > *{

      transition:
        opacity .4s ease;
    }


    /* ============================
       التسميات
    ============================ */

    .sk-label{
      position:absolute;

      z-index:25;

      padding:6px 10px;

      border:1px solid #e2e7e4;
      border-radius:9px;

      background:
        rgba(255,255,255,.96);

      color:#53645e;

      font-family:inherit;
      font-size:9px;
      font-weight:900;

      cursor:pointer;

      box-shadow:
        0 4px 12px
        rgba(20,50,40,.06);
    }


    .skull-label{
      top:100px;
      right:16%;
    }


    .ribs-label{
      top:255px;
      right:10%;
    }


    .spine-label{
      top:330px;
      left:9%;
    }


    .pelvis-label{
      top:420px;
      right:10%;
    }


    .femur-label{
      top:520px;
      left:10%;
    }


    /* ============================
       البطاقة
    ============================ */

    .sk-info{
      padding:27px;

      border:1px solid #dce4e0;
      border-radius:25px;

      background:
        rgba(255,255,255,.97);

      box-shadow:
        0 16px 35px
        rgba(30,57,48,.07);
    }


    .sk-chip{
      display:inline-block;

      margin-bottom:12px;

      padding:7px 12px;

      border-radius:999px;

      background:#e4efe9;

      color:#39715f;

      font-size:10px;
      font-weight:900;
    }


    .sk-info h3{
      margin:0 0 8px;

      color:var(--sk-green);

      font-size:25px;
    }


    .sk-info > p{
      min-height:66px;

      margin:0 0 17px;

      color:#78857f;

      font-size:12px;
      line-height:1.9;
    }


    .sk-stat{
      display:flex;
      align-items:center;
      justify-content:space-between;

      gap:10px;

      padding:13px 15px;

      margin-bottom:15px;

      border-radius:14px;

      background:#f7f3ea;
    }


    .sk-stat span{
      color:#85857e;
      font-size:10px;
    }


    .sk-stat strong{
      color:var(--sk-green);
      font-size:13px;
    }


    .sk-selected{
      display:flex;
      align-items:center;

      gap:12px;

      min-height:67px;

      padding:12px;

      border:1px solid #e0e6e3;
      border-radius:14px;

      background:#fff;
    }


    .sk-selected > span{
      display:flex;
      align-items:center;
      justify-content:center;

      width:38px;
      height:38px;

      border-radius:12px;

      background:#e9f2ed;

      color:#c67a82;

      font-weight:900;
    }


    .sk-selected small{
      display:block;

      margin-bottom:2px;

      color:#9a9f9c;

      font-size:9px;
    }


    .sk-selected strong{
      color:#405850;
      font-size:12px;
    }


    .sk-function-list{
      display:none;

      margin-top:15px;

      gap:8px;
    }


    .sk-function-list.show{
      display:grid;
    }


    .sk-function-list div{
      display:flex;
      align-items:center;

      gap:10px;

      padding:10px;

      border-radius:12px;

      background:#f4f8f5;
    }


    .sk-function-list span{
      color:#c2767e;

      font-size:10px;
      font-weight:900;
    }


    .sk-function-list p{
      margin:0;

      color:#65746e;

      font-size:10px;
    }


    /* ============================
       الانحناء
    ============================ */

    #skeletonUpperBody{
      transform-box:view-box;
      transform-origin:250px 382px;
    }


    .skeleton-bending{
      animation:
        scientificSkeletonBend
        4.2s
        cubic-bezier(.45,0,.25,1);
    }


    @keyframes scientificSkeletonBend{

      0%{
        transform:
          translate(0,0)
          rotate(0deg);
      }

      20%{
        transform:
          translate(0,0)
          rotate(0deg);
      }

      48%{
        transform:
          translate(-18px,18px)
          rotate(-18deg);
      }

      68%{
        transform:
          translate(-18px,18px)
          rotate(-18deg);
      }

      100%{
        transform:
          translate(0,0)
          rotate(0deg);
      }

    }


    .bend-running
    .spine-group rect:nth-child(1){
      transform:rotate(-1deg);
    }

    .bend-running
    .spine-group rect:nth-child(2){
      transform:rotate(-2deg);
    }

    .bend-running
    .spine-group rect:nth-child(3){
      transform:rotate(-3deg);
    }

    .bend-running
    .spine-group rect:nth-child(4){
      transform:rotate(-4deg);
    }

    .bend-running
    .spine-group rect:nth-child(5){
      transform:rotate(-5deg);
    }

    .bend-running
    .spine-group rect:nth-child(6){
      transform:rotate(-6deg);
    }

    .bend-running
    .spine-group rect:nth-child(7){
      transform:rotate(-7deg);
    }

    .bend-running
    .spine-group rect:nth-child(8){
      transform:rotate(-8deg);
    }


    .bend-highlight{
      fill:#efc35f !important;
      stroke:#c69135 !important;

      filter:
        drop-shadow(
          0 0 9px
          rgba(229,179,67,.8)
        );
    }


    /* ============================
       الاكتشاف
    ============================ */

    .sk-discovery{
      display:flex;
      align-items:center;

      gap:13px;

      margin-top:14px;

      padding:15px 18px;

      border:1px solid #d7e5df;
      border-radius:18px;

      background:#edf6f2;
    }


    .sk-discovery > span{
      flex:0 0 auto;

      display:flex;
      align-items:center;
      justify-content:center;

      width:38px;
      height:38px;

      border-radius:12px;

      background:var(--sk-green);

      color:white;

      font-size:17px;
    }


    .sk-discovery small{
      display:block;

      margin-bottom:2px;

      color:#c2747d;

      font-size:9px;
      font-weight:900;
    }


    .sk-discovery strong{
      display:block;

      margin-bottom:2px;

      color:#365b4f;

      font-size:12px;
    }


    .sk-discovery p{
      margin:0;

      color:#7b8883;

      font-size:10px;
    }


    .sk-discovery.complete{
      background:#e5f4eb;
      border-color:#bddccb;
    }


    /* ============================
       تابلت
    ============================ */

    @media(max-width:900px){

      .sk-main{
        grid-template-columns:
          minmax(370px,1.15fr)
          minmax(250px,.85fr);

        gap:15px;

        padding:15px;
      }


      .scientific-skeleton{
        height:620px;
      }


      .sk-stage{
        min-height:650px;
      }


      .sk-info{
        padding:20px;
      }

    }


    /* ============================
       جوال
    ============================ */

    @media(max-width:720px){

      .sk-main{
        grid-template-columns:1fr;
      }


      .sk-stage{
        min-height:630px;
      }


      .scientific-skeleton{
        height:600px;
      }


      .sk-topbar{
        align-items:flex-start;
      }


      .sk-counter{
        min-width:105px;
      }

    }


    @media(max-width:470px){

      .sk-topbar{
        display:block;
      }


      .sk-counter{
        width:100%;
        margin-top:12px;
      }


      .sk-control{
        flex:1;
        padding:0 8px;
        font-size:10px;
      }


      .sk-stage{
        min-height:570px;
      }


      .scientific-skeleton{
        height:550px;
      }


      .sk-label{
        font-size:8px;
        padding:4px 6px;
      }

    }

  `;


  document.head.appendChild(style);
}
/* =========================================================
   1-8 المفاصل
========================================================= */

function renderJointsLab() {
  $("#experimentTools").innerHTML = `
    <button class="action-button" data-joint="fixed">
      المفصل الثابت
    </button>

    <button class="action-button primary" data-joint="hinge">
      المفصل الرزي
    </button>

    <button class="action-button" data-joint="ball">
      الكروي الحُقّي
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="joint-scene">

      <div id="jointModel" class="joint-model hinge-model">
        <div class="joint-bone bone-top"></div>
        <div class="joint-bone bone-bottom"></div>
        <div class="joint-cartilage"></div>
        <div class="joint-ligament"></div>
      </div>

      <div id="jointName" class="joint-name">
        المفصل الرزي
      </div>

      <div id="jointExplanation" class="experiment-caption">
        يسمح المفصل الرزي بالحركة في اتجاه محدد.
      </div>

    </div>
  `;

  injectGeneralExperimentStyles();

  $$("[data-joint]").forEach(btn => {
    btn.onclick = () => {
      $$("[data-joint]").forEach(b =>
        b.classList.remove("primary")
      );

      btn.classList.add("primary");

      const type = btn.dataset.joint;
      const model = $("#jointModel");

      model.className = "joint-model";

      if (type === "fixed") {
        model.classList.add("fixed-model");

        $("#jointName").textContent =
          "المفصل الثابت";

        discover(
          "المفصل الثابت",
          "المفصل الثابت",
          "بعض المفاصل ثابتة ولا تسمح بحركة العظام."
        );
      }

      if (type === "hinge") {
        model.classList.add(
          "hinge-model",
          "move"
        );

        $("#jointName").textContent =
          "المفصل الرزي";

        discover(
          "المفصل الرزي",
          "المفصل الرزي",
          "يوجد المفصل الرزي في المرفق والركبة، ويسمح بالحركة في اتجاه محدد."
        );
      }

      if (type === "ball") {
        model.classList.add(
          "ball-model",
          "move-ball"
        );

        $("#jointName").textContent =
          "المفصل الكروي الحُقّي";

        discover(
          "الكروي الحُقّي",
          "المفصل الكروي الحُقّي",
          "يوجد هذا النوع من المفاصل في الكتف والورك ويسمح بحركة واسعة."
        );
      }

      $("#jointExplanation").textContent =
        "تساعد تراكيب مثل الغضروف والسائل الزلالي والأربطة المفصل على أداء وظيفته.";
    };
  });
}

/* =========================================================
   1-9 العضلات
========================================================= */

function renderMusclesLab() {
  $("#experimentTools").innerHTML = `
    <button class="action-button primary" id="flexArm">
      اثني الذراع
    </button>

    <button class="action-button" id="extendArm">
      مدّي الذراع
    </button>
  `;

  $("#experimentArea").innerHTML = `
    <div class="muscle-scene">

      <div id="armModel" class="arm-model">

        <div class="upper-arm"></div>
        <div class="forearm"></div>

        <div id="biceps" class="muscle biceps">
          ذات الرأسين
        </div>

        <div id="triceps" class="muscle triceps">
          ثلاثية الرؤوس
        </div>

        <div class="tendon tendon-a"></div>
        <div class="tendon tendon-b"></div>

        <div class="elbow-dot"></div>

      </div>

      <div class="experiment-caption">
        جرّبي ثني الذراع ثم مدّها وقارني العضلتين.
      </div>

    </div>
  `;

  injectGeneralExperimentStyles();

  $("#flexArm").onclick = () => {
    $("#armModel").classList.add("flexed");

    $("#biceps").classList.add("contracted");
    $("#triceps").classList.remove("contracted");

    discover(
      "ثني الذراع",
      "ثني الذراع",
      "عند ثني الذراع تنقبض العضلة ذات الرأسين فتقصر وتزداد سمكًا، بينما ترتخي العضلة ثلاثية الرؤوس."
    );
  };

  $("#extendArm").onclick = () => {
    $("#armModel").classList.remove("flexed");

    $("#triceps").classList.add("contracted");
    $("#biceps").classList.remove("contracted");

    discover(
      "مد الذراع",
      "مد الذراع",
      "عند مد الذراع تنقبض العضلة ثلاثية الرؤوس بينما ترتخي العضلة ذات الرأسين."
    );
  };
}

/* =========================================================
   1-10 العلماء
========================================================= */

function renderScientistsLab() {
  $("#experimentTools").innerHTML = "";

  $("#experimentArea").innerHTML = `
    <div class="scientists-scene">

      ${scientistCard(
        "عالم التشريح",
        "تركيب الجسم",
        "يدرس تركيب الجسم، ويمكنه استخدام التشريح وتقنيات التصوير لفهم أجزائه."
      )}

      ${scientistCard(
        "عالم وظائف الأعضاء",
        "كيف يعمل الجسم",
        "يدرس وظائف أعضاء الجسم وكيف تعمل."
      )}

      ${scientistCard(
        "عالم فسيولوجيا الرياضة",
        "الجسم أثناء الرياضة",
        "يدرس استجابة الجسم للتمرين، مثل تغير عمل القلب والتنفس."
      )}

      ${scientistCard(
        "عالم الأعصاب",
        "الدماغ والجهاز العصبي",
        "يدرس الدماغ والجهاز العصبي والإشارات التي تنتقل فيه."
      )}

    </div>
  `;

  injectGeneralExperimentStyles();

  $$(".scientist-card").forEach(card => {
    card.onclick = () => {
      $$(".scientist-card").forEach(c =>
        c.classList.remove("active")
      );

      card.classList.add("active");

      discover(
        card.dataset.name,
        card.dataset.name,
        card.dataset.info
      );
    };
  });
}

function scientistCard(name, focus, info) {
  return `
    <button
      class="scientist-card"
      type="button"
      data-name="${name}"
      data-info="${info}"
    >
      <span class="scientist-symbol">✦</span>
      <small>${focus}</small>
      <strong>${name}</strong>
      <p>${info}</p>
    </button>
  `;
}

/* =========================================================
   ستايلات المحطة 1 + الزهرة + الإخصاب + الثمار
========================================================= */

function injectPlantStyles() {
  if ($("#plantDynamicStyles")) return;

  const style = document.createElement("style");
  style.id = "plantDynamicStyles";

  style.textContent = `
    .plant-lab-scene{
      position:absolute;inset:0;overflow:hidden;
      background:linear-gradient(#dfe8e5 0 64%,#c9ad8a 64%);
      transition:.8s;
    }
    .plant-lab-scene.sunny{
      background:linear-gradient(#dff1ef 0 64%,#c9ad8a 64%);
    }
    .lab-sun{
      position:absolute;top:42px;right:55px;
      width:70px;height:70px;border-radius:50%;
      background:#f0ce69;opacity:0;transform:scale(.7);
      box-shadow:0 0 45px rgba(240,206,105,.45);
      transition:.7s;
    }
    .lab-sun.visible{opacity:1;transform:scale(1);}
    .cloud{
      position:absolute;height:25px;border-radius:30px;
      background:rgba(255,255,255,.65);
    }
    .cloud:before,.cloud:after{
      content:"";position:absolute;border-radius:50%;
      background:inherit;
    }
    .cloud:before{width:35px;height:35px;left:14px;top:-15px;}
    .cloud:after{width:28px;height:28px;right:14px;top:-10px;}
    .cloud-a{width:95px;top:65px;left:8%;}
    .cloud-b{width:75px;top:115px;left:36%;}
    .plant-ground{
      position:absolute;left:0;right:0;bottom:0;height:36%;
      background:#b8926d;transition:.8s;
    }
    .plant-ground.wet{background:#957255;}
    .lab-plant{
      position:absolute;width:310px;height:470px;
      left:50%;bottom:45px;transform:translateX(-50%);z-index:5;
    }
    .plant-part{position:absolute;border:0;padding:0;background:none;}
    .plant-stem-part{
      width:23px;height:270px;left:144px;top:120px;
      border-radius:20px;background:#587f66;z-index:3;
    }
    .plant-leaves-part{
      width:135px;height:73px;
      background:linear-gradient(145deg,#8bab8f,#587f66);
      border-radius:100% 0 100% 0;z-index:4;
    }
    .leaf-left{left:24px;top:220px;transform:rotate(14deg);}
    .leaf-right{right:22px;top:165px;transform:scaleX(-1) rotate(14deg);}
    .plant-roots-part{
      width:180px;height:115px;left:65px;top:365px;z-index:4;
    }
    .plant-roots-part span{
      position:absolute;width:7px;height:105px;top:0;left:86px;
      border-radius:8px;background:#806046;transform-origin:top;
    }
    .plant-roots-part span:nth-child(1){transform:rotate(18deg);}
    .plant-roots-part span:nth-child(2){transform:rotate(-18deg);}
    .plant-roots-part span:nth-child(3){transform:rotate(36deg) scale(.82);}
    .plant-roots-part span:nth-child(4){transform:rotate(-36deg) scale(.82);}
    .plant-flower-part{
      width:150px;height:150px;left:80px;top:0;z-index:7;
    }
    .mini-flower-petal{
      position:absolute;width:62px;height:78px;left:44px;top:36px;
      border-radius:70% 70% 55% 55%;
      background:linear-gradient(#e5a4ad,#c87380);
      transform-origin:31px 39px;
    }
    .mp1{transform:rotate(0deg) translateY(-29px);}
    .mp2{transform:rotate(72deg) translateY(-29px);}
    .mp3{transform:rotate(144deg) translateY(-29px);}
    .mp4{transform:rotate(216deg) translateY(-29px);}
    .mp5{transform:rotate(288deg) translateY(-29px);}
    .plant-flower-part i{
      position:absolute;width:47px;height:47px;left:52px;top:52px;
      border-radius:50%;background:#dfbd62;z-index:5;
    }
    .watering-can{
      position:absolute;left:10%;top:105px;width:105px;height:85px;
      transform:rotate(-12deg);z-index:12;
    }
    .can-body{
      position:absolute;left:15px;top:24px;width:65px;height:52px;
      border-radius:12px 12px 20px 20px;background:#769ca0;
    }
    .can-handle{
      position:absolute;left:7px;top:8px;width:55px;height:45px;
      border:8px solid #769ca0;border-radius:50%;
    }
    .can-spout{
      position:absolute;width:65px;height:17px;right:-35px;top:34px;
      border-radius:12px;background:#769ca0;transform:rotate(17deg);
    }
    .plant-instruction{
      position:absolute;left:50%;bottom:14px;transform:translateX(-50%);
      z-index:20;padding:8px 13px;border-radius:12px;background:#fff;
      color:#52665f;font-size:10px;white-space:nowrap;
    }
  `;

  document.head.appendChild(style);
}

function injectFlowerStyles() {
  if ($("#flowerDynamicStyles")) return;

  const style = document.createElement("style");
  style.id = "flowerDynamicStyles";

  style.textContent = `
    .new-flower-scene{
      position:absolute;inset:0;overflow:hidden;
      display:grid;place-items:center;
      background:
        radial-gradient(circle at center,#fffdf9 0 28%,transparent 55%),
        linear-gradient(145deg,#edf4ef,#fff7f1);
    }

    .flower-guide{
      position:absolute;top:18px;left:50%;transform:translateX(-50%);
      padding:8px 15px;border-radius:30px;background:#fff;
      color:#61736d;font-size:10px;z-index:50;
      box-shadow:0 5px 18px rgba(35,63,54,.06);
    }

    .botanical-flower{
      width:450px;height:450px;position:relative;
      transform:scale(.9);
    }

    .botanical-flower button{border:0;padding:0;cursor:pointer;}

    .bot-petal{
      position:absolute;width:138px;height:210px;
      left:156px;top:116px;
      border-radius:72% 72% 58% 58%;
      background:
        radial-gradient(circle at 50% 82%,#c87885 0 15%,#e5a1ab 48%,#f0bdc2 100%);
      transform-origin:69px 110px;
      box-shadow:inset 0 0 18px rgba(255,255,255,.18);
      z-index:5;transition:.25s;
    }

    .bp1{transform:rotate(0deg) translateY(-92px);}
    .bp2{transform:rotate(60deg) translateY(-92px);}
    .bp3{transform:rotate(120deg) translateY(-92px);}
    .bp4{transform:rotate(180deg) translateY(-92px);}
    .bp5{transform:rotate(240deg) translateY(-92px);}
    .bp6{transform:rotate(300deg) translateY(-92px);}

    .bot-sepal{
      position:absolute;width:68px;height:145px;
      left:191px;top:240px;
      border-radius:90% 12% 90% 12%;
      background:linear-gradient(#829f79,#55765e);
      transform-origin:34px 30px;z-index:3;
    }

    .bs1{transform:rotate(20deg) translateY(55px);}
    .bs2{transform:rotate(110deg) translateY(55px);}
    .bs3{transform:rotate(200deg) translateY(55px);}
    .bs4{transform:rotate(290deg) translateY(55px);}

    .bot-filament{
      position:absolute;width:7px;height:115px;
      left:222px;top:157px;border-radius:10px;
      background:#f0d4a0;transform-origin:3px 95px;z-index:13;
    }

    .bf1{transform:rotate(0deg) translateY(-22px);}
    .bf2{transform:rotate(60deg) translateY(-22px);}
    .bf3{transform:rotate(120deg) translateY(-22px);}
    .bf4{transform:rotate(180deg) translateY(-22px);}
    .bf5{transform:rotate(240deg) translateY(-22px);}
    .bf6{transform:rotate(300deg) translateY(-22px);}

    .bot-anther{
      position:absolute;width:25px;height:39px;
      left:213px;top:104px;border-radius:55%;
      background:linear-gradient(#e1bb61,#c99437);
      transform-origin:12px 118px;z-index:15;
    }

    .ba1{transform:rotate(0deg);}
    .ba2{transform:rotate(60deg);}
    .ba3{transform:rotate(120deg);}
    .ba4{transform:rotate(180deg);}
    .ba5{transform:rotate(240deg);}
    .ba6{transform:rotate(300deg);}

    .bot-stigma{
      position:absolute;width:48px;height:31px;left:201px;top:122px;
      border-radius:55% 55% 40% 40%;background:#9bb876;z-index:25;
    }

    .bot-style{
      position:absolute;width:17px;height:130px;left:216px;top:148px;
      border-radius:12px;background:#aac17e;z-index:23;
    }

    .bot-ovary{
      position:absolute;width:112px;height:105px;left:169px;top:265px;
      border-radius:50% 50% 43% 43%;
      background:#708e5c;z-index:22;overflow:hidden;
      box-shadow:inset 0 0 0 5px rgba(255,255,255,.12);
    }

    .ovary-cut{
      position:absolute;inset:9px;border-radius:50%;
      background:#a9bd76;opacity:.35;
    }

    .bot-ovule{
      position:absolute;width:22px;height:29px;border-radius:50%;
      background:#f1dda0;opacity:.22;transform:scale(.7);
      transition:.4s;z-index:5;
    }

    .bo1{left:19px;top:45px;}
    .bo2{left:44px;top:56px;}
    .bo3{right:18px;top:40px;}

    .show-ovary .bot-ovule{
      opacity:1;transform:scale(1);
    }

    .show-ovary .bot-ovary{
      transform:scale(1.22);
      box-shadow:0 0 0 8px rgba(255,255,255,.7);
    }

    .flower-stem-base{
      position:absolute;width:18px;height:100px;left:216px;top:350px;
      background:#55765e;border-radius:10px;z-index:1;
    }

    [data-flower].selected{
      filter:brightness(1.12) drop-shadow(0 0 8px rgba(198,125,134,.6));
    }

    .flower-part-name{
      position:absolute;bottom:18px;left:50%;transform:translateX(-50%);
      min-width:150px;padding:9px 14px;border-radius:13px;background:#fff;
      color:#173f36;font-size:11px;font-weight:900;text-align:center;
      box-shadow:0 6px 20px rgba(35,63,54,.08);z-index:60;
    }

    @media(max-width:650px){
      .botanical-flower{transform:scale(.68);}
    }
  `;

  document.head.appendChild(style);
}

function injectFertilisationStyles() {
  if ($("#fertDynamicStyles")) return;

  const style = document.createElement("style");
  style.id = "fertDynamicStyles";

  style.textContent = `
    .fert-journey{
      position:absolute;inset:0;overflow:auto;
      display:grid;grid-template-columns:1fr 310px;
      gap:24px;padding:30px;
      background:linear-gradient(145deg,#edf4ef,#fff8f1);
    }

    .fert-animation-side{
      min-height:500px;display:flex;flex-direction:column;
      align-items:center;justify-content:center;position:relative;
    }

    .fert-big-stigma{
      width:145px;height:65px;position:relative;
      display:grid;place-items:center;border-radius:55% 55% 35% 35%;
      background:#9db879;color:#fff;font-weight:900;z-index:5;
    }

    .fert-big-style{
      width:55px;height:220px;position:relative;background:#a9be7d;
    }

    .fert-big-ovary{
      width:230px;height:145px;position:relative;
      display:grid;place-items:center;border-radius:50% 50% 44% 44%;
      background:#799661;color:#fff;font-size:11px;font-weight:900;
    }

    .fert-big-ovule{
      position:absolute;right:35px;bottom:23px;
      width:74px;height:58px;display:grid;place-items:center;
      border-radius:50%;background:#eee0a6;color:#67583b;font-size:9px;
    }

    .journey-pollen{
      position:absolute;width:27px;height:27px;right:25px;top:-30px;
      border-radius:50%;background:#d7ad45;opacity:0;transform:scale(.4);
      transition:.45s;
    }

    .journey-pollen.show{opacity:1;transform:scale(1);}

    .journey-tube{
      position:absolute;left:24px;top:0;width:8px;height:0;
      border-radius:8px;background:#e8c65e;transition:1s;
    }

    .journey-tube.show{height:215px;}

    .journey-nucleus{
      position:absolute;left:21px;top:4px;width:14px;height:14px;
      border-radius:50%;background:#69553f;opacity:0;
    }

    .journey-nucleus.travel{
      opacity:1;animation:fertNucleus 1.25s forwards;
    }

    @keyframes fertNucleus{
      from{top:4px;}
      to{top:205px;}
    }

    .journey-zygote{
      width:21px;height:21px;border-radius:50%;
      background:#bd744f;opacity:0;transform:scale(.3);transition:.45s;
    }

    .journey-zygote.show{opacity:1;transform:scale(1);}

    .fert-order-side{
      align-self:center;padding:20px;border:1px solid #e1e5df;
      border-radius:22px;background:rgba(255,255,255,.9);
      box-shadow:0 10px 30px rgba(35,63,54,.07);
    }

    .fert-mini-tag{
      display:inline-block;padding:5px 8px;border-radius:20px;
      background:#f3dfe1;color:#9f6069;font-size:8px;font-weight:900;
    }

    .fert-order-side h4{
      margin:10px 0 4px;color:#183f36;font-size:17px;
    }

    .fert-order-side p{
      margin:0 0 12px;color:#6f7d78;font-size:9px;line-height:1.7;
    }

    .fert-watch-note{
      padding:8px 10px;margin-bottom:10px;border-radius:11px;
      background:#f7f2e7;color:#7b6c50;font-size:8px;
    }

    .fert-order-list{display:grid;gap:7px;}

    .fert-order-card{
      width:100%;min-height:53px;padding:9px 10px;
      display:flex;align-items:center;gap:9px;
      border:1px solid #e0e5df;border-radius:13px;
      background:#fafbf8;color:#263b35;font-family:inherit;text-align:right;
    }

    .order-number{
      width:28px;height:28px;flex:0 0 28px;
      display:grid;place-items:center;border-radius:8px;
      background:#f3dfe1;color:#9f6069;font-weight:900;
    }

    .fert-order-card strong{font-size:9px;line-height:1.6;}

    .fert-order-card.chosen{
      border-color:#6f9483;background:#edf4ef;
    }

    .fert-order-card.chosen .order-number{
      background:#183f36;color:#fff;
    }

    .fert-order-feedback{
      display:none;margin-top:10px;padding:9px;border-radius:10px;
      font-size:9px;font-weight:800;line-height:1.6;
    }

    .fert-order-feedback.show{display:block;}
    .fert-order-feedback.success{background:#e8f4eb;color:#2c6842;}
    .fert-order-feedback.retry{background:#f9e9eb;color:#95525b;}

    .fert-order-actions{
      margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:7px;
    }

    .fert-order-actions button{
      min-height:40px;border:0;border-radius:11px;
      font-family:inherit;font-size:9px;font-weight:900;
    }

    .check-fert-order{background:#183f36;color:#fff;}
    .reset-fert-order{background:#eef0ec;color:#183f36;}

    @media(max-width:760px){
      .fert-journey{grid-template-columns:1fr;padding:20px;}
      .fert-animation-side{min-height:460px;}
    }
  `;

  document.head.appendChild(style);
}

function injectFruitStyles() {
  if ($("#fruitDynamicStyles")) return;

  const style = document.createElement("style");
  style.id = "fruitDynamicStyles";

  style.textContent = `
    .fruit-lab-new{
      position:absolute;inset:0;overflow:auto;padding:22px;
      background:linear-gradient(145deg,#edf4ef,#fff8f0);
    }

    .fruit-transform-area{
      min-height:245px;display:flex;align-items:center;
      justify-content:center;gap:40px;
    }

    .ovary-model{text-align:center;transition:.5s;}
    .ovary-model.faded{opacity:.45;transform:scale(.9);}
    .ovary-model strong,.fruit-model strong{
      display:block;color:#183f36;font-size:11px;margin-bottom:7px;
    }

    .ovary-model small{
      display:block;margin-top:6px;color:#74817c;font-size:8px;
    }

    .ovary-shape{
      width:125px;height:135px;position:relative;
      border-radius:50% 50% 43% 43%;
      background:#76945f;
    }

    .mini-ovule{
      position:absolute;width:23px;height:30px;border-radius:50%;
      background:#f1dfa0;transition:.4s;
    }

    .mini-ovule:nth-child(1){left:22px;top:50px;}
    .mini-ovule:nth-child(2){right:22px;top:42px;}
    .mini-ovule:nth-child(3){left:50px;bottom:20px;}
    .mini-ovule.seed-state{background:#714b33;}

    .transform-arrow{font-size:30px;color:#c67d86;font-weight:900;}

    .fruit-model{
      width:180px;height:190px;position:relative;text-align:center;
      opacity:.4;transition:.5s;
    }

    .fruit-model.ripe{opacity:1;}

    .fruit-side{
      position:absolute;top:15px;width:91px;height:155px;
      background:linear-gradient(#a5b477,#78935f);transition:.6s;z-index:3;
    }

    .fruit-model.ripe .fruit-side{
      background:linear-gradient(#e89581,#c8625d);
    }

    .fruit-side-a{left:0;border-radius:70% 15% 50% 68%;}
    .fruit-side-b{right:0;border-radius:15% 70% 68% 50%;}

    .fruit-model.open .fruit-side-a{
      transform:translateX(-30px) rotate(-8deg);
    }

    .fruit-model.open .fruit-side-b{
      transform:translateX(30px) rotate(8deg);
    }

    .fruit-inside{
      position:absolute;width:55px;height:112px;left:63px;top:38px;
      border-radius:50%;background:#f3d8b6;z-index:5;
    }

    .fruit-seed{
      position:absolute;width:14px;height:25px;border-radius:50%;
      background:#bca76d;transition:.4s;
    }

    .fruit-seed:nth-child(1){left:8px;top:20px;}
    .fruit-seed:nth-child(2){right:8px;top:46px;}
    .fruit-seed:nth-child(3){left:20px;bottom:14px;}
    .fruit-seed.formed{background:#704a32;}

    .fruit-top-stem{
      position:absolute;width:10px;height:42px;left:85px;top:-15px;
      border-radius:8px;background:#58754f;z-index:8;
    }

    .fruit-model strong{
      position:absolute;left:0;right:0;bottom:0;
    }

    .paper-fruit-lab{
      padding-top:18px;border-top:1px solid #e0e5df;
      display:grid;grid-template-columns:1fr 190px 170px;
      gap:15px;align-items:center;
    }

    .paper-settings{
      padding:15px;border-radius:17px;background:#fff;
      border:1px solid #e1e5df;
    }

    .simulation-label{
      display:inline-block;padding:5px 8px;border-radius:20px;
      background:#f5e9cf;color:#8d733e;font-size:8px;font-weight:900;
    }

    .paper-settings h4{margin:8px 0 5px;color:#183f36;}
    .paper-settings p{font-size:8px;line-height:1.8;color:#6f7d78;}
    .paper-settings label{font-size:8px;font-weight:900;color:#183f36;}
    .paper-settings input{width:100%;accent-color:#c67d86;}

    .wing-label-row{
      display:flex;justify-content:space-between;color:#84908b;font-size:7px;
    }

    .paper-drop-area{
      height:230px;position:relative;overflow:hidden;
      border:1px dashed #cad6d0;border-radius:17px;
      background:linear-gradient(#f8fbfa,#f2eee5);
    }

    .fixed-height{
      position:absolute;top:7px;left:50%;transform:translateX(-50%);
      font-size:7px;color:#7c8984;
    }

    .paper-fruit-new{
      position:absolute;left:50%;top:32px;width:80px;height:80px;
      transform:translateX(-50%);z-index:5;
    }

    .paper-wing-new{
      position:absolute;top:0;width:31px;height:65px;
      border:2px solid #bd9d62;background:#f3e4bb;
      border-radius:85% 15% 70% 25%;
    }

    .pw1{left:13px;transform:rotate(-30deg);}
    .pw2{right:13px;transform:scaleX(-1) rotate(-30deg);}

    .paper-seed-new{
      position:absolute;left:29px;bottom:0;width:22px;height:27px;
      border-radius:50%;background:#76533a;
    }

    .paper-fruit-new.falling{
      animation:paperFall var(--fall-duration,1.8s) linear forwards;
    }

    .paper-fruit-new.fallen{
      top:160px;transform:translateX(-50%) rotate(500deg);
    }

    @keyframes paperFall{
      0%{top:32px;transform:translateX(-50%) rotate(0);}
      25%{transform:translateX(-65%) rotate(120deg);}
      50%{transform:translateX(-35%) rotate(250deg);}
      75%{transform:translateX(-62%) rotate(380deg);}
      100%{top:160px;transform:translateX(-50%) rotate(500deg);}
    }

    .paper-ground{
      position:absolute;left:0;right:0;bottom:0;height:22px;background:#d7c3a5;
    }

    .trial-results-panel{display:grid;gap:6px;}

    .big-timer{
      padding:11px;border-radius:13px;background:#183f36;
      color:#fff;text-align:center;
    }

    .big-timer small{display:block;font-size:7px;opacity:.7;}
    .big-timer strong{font-size:15px;}

    .trial-line{
      padding:7px 9px;display:flex;justify-content:space-between;
      border-radius:9px;background:#fff;border:1px solid #e1e5df;
      color:#68766f;font-size:8px;
    }

    .trial-line b{color:#183f36;}
    .trial-line.average{background:#edf4ef;}

    @media(max-width:760px){
      .paper-fruit-lab{grid-template-columns:1fr 180px;}
      .trial-results-panel{grid-column:1/-1;}
      .fruit-transform-area{transform:scale(.85);}
    }
  `;

  document.head.appendChild(style);
}

/* =========================================================
   CSS التجارب العامة 3 و 6-10
========================================================= */

function injectGeneralExperimentStyles() {
  if ($("#generalExperimentStyles")) return;

  const style = document.createElement("style");
  style.id = "generalExperimentStyles";

  style.textContent = `
    .simple-scene,.body-lab,.skeleton-scene,.joint-scene,.muscle-scene{
      position:absolute;inset:0;overflow:hidden;
      background:
        radial-gradient(circle at 50% 25%,rgba(255,255,255,.95),transparent 33%),
        linear-gradient(#edf4f0,#faf5ed);
    }

    .experiment-caption{
      position:absolute;left:50%;bottom:16px;transform:translateX(-50%);
      min-width:260px;max-width:80%;padding:9px 13px;border-radius:12px;
      background:rgba(255,255,255,.92);color:#5e716a;
      box-shadow:0 5px 18px rgba(35,63,54,.07);
      font-size:10px;line-height:1.7;text-align:center;z-index:40;
    }

    .pollination-flower{
      position:absolute;width:150px;height:150px;top:210px;
    }

    .flower-left{left:12%;}
    .flower-right{right:12%;}

    .pf-petal{
      position:absolute;width:65px;height:90px;left:42px;top:30px;
      border-radius:70% 70% 55% 55%;background:#dc8d98;
      transform-origin:32px 45px;
    }

    .pf-petal:nth-child(1){transform:rotate(0deg) translateY(-30px);}
    .pf-petal:nth-child(2){transform:rotate(90deg) translateY(-30px);}
    .pf-petal:nth-child(3){transform:rotate(180deg) translateY(-30px);}
    .pf-petal:nth-child(4){transform:rotate(270deg) translateY(-30px);}

    .pollination-flower i{
      position:absolute;left:53px;top:53px;width:44px;height:44px;
      border-radius:50%;background:#dbb95a;z-index:5;
    }

    .bee{
      position:absolute;left:26%;top:170px;width:46px;height:30px;
      border-radius:50%;
      background:repeating-linear-gradient(90deg,#d7aa3e 0 9px,#493f32 9px 15px);
      z-index:20;
    }

    .bee:before,.bee:after{
      content:"";position:absolute;width:25px;height:17px;top:-12px;
      border-radius:50%;background:rgba(220,235,239,.8);
    }

    .bee:before{left:2px;transform:rotate(-20deg);}
    .bee:after{right:2px;transform:rotate(20deg);}

    .bee.fly{animation:beeFly 2.1s ease-in-out forwards;}

    @keyframes beeFly{
      0%{left:26%;top:170px;}
      45%{left:48%;top:250px;}
      100%{left:70%;top:175px;}
    }

    .pollen-cloud{
      position:absolute;left:20%;top:180px;width:60%;height:160px;
      pointer-events:none;
    }

    .pollen-cloud span{
      position:absolute;left:0;width:8px;height:8px;border-radius:50%;
      background:#d9b64c;animation:pollenWind 2s ease-out forwards;
    }

    @keyframes pollenWind{
      from{transform:translateX(0);opacity:1;}
      to{transform:translateX(430px) translateY(30px);opacity:.1;}
    }

    .body-lab{
      display:grid;grid-template-columns:1fr 230px;align-items:center;
      padding:30px 8%;
    }

    .human-figure{
      width:240px;height:480px;position:relative;margin:auto;
    }

    .human-head{
      position:absolute;width:105px;height:115px;left:67px;top:0;
      border-radius:48%;background:#e9c4a8;z-index:5;
    }

    .human-neck{
      position:absolute;left:95px;top:100px;width:50px;height:70px;
      background:#e9c4a8;
    }

    .human-torso{
      position:absolute;left:35px;top:145px;width:170px;height:310px;
      border-radius:45% 45% 25% 25%;
      background:rgba(233,196,168,.52);
    }

    .brain{
      position:absolute;width:66px;height:48px;left:19px;top:25px;
      border-radius:50%;background:#d7959e;
    }

    .trachea{
      position:absolute;left:21px;top:0;width:9px;height:65px;
      background:#8eb9bd;
    }

    .esophagus{
      position:absolute;left:34px;top:0;width:7px;height:70px;
      background:#bd8a77;
    }

    .lung{
      position:absolute;top:30px;width:55px;height:100px;
      border-radius:55% 55% 45% 45%;background:#dca0a7;
    }

    .lung-left{left:20px;}
    .lung-right{right:20px;}

    .lung.breathing{animation:breathe 1s ease-in-out 2;}
    @keyframes breathe{50%{transform:scale(1.12);}}

    .heart{
      position:absolute;left:75px;top:95px;width:36px;height:45px;
      border-radius:50%;background:#b95459;z-index:10;
    }

    .heart.beating{animation:heartBeat .55s ease-in-out 4;}
    @keyframes heartBeat{50%{transform:scale(1.18);}}

    .liver{
      position:absolute;left:30px;top:145px;width:85px;height:45px;
      border-radius:50%;background:#8f5543;
    }

    .stomach{
      position:absolute;right:27px;top:160px;width:48px;height:62px;
      border-radius:50%;background:#d49583;
    }

    .small-intestine{
      position:absolute;left:48px;top:215px;width:78px;height:62px;
      border:9px double #d39c77;border-radius:25px;
    }

    .large-intestine{
      position:absolute;left:32px;top:202px;width:110px;height:90px;
      border:8px solid #a97861;border-radius:30px;
    }

    .diaphragm{
      position:absolute;left:25px;top:132px;width:120px;height:22px;
      border-bottom:7px solid #8c7778;border-radius:50%;
    }

    .active-organ{
      filter:brightness(1.13) drop-shadow(0 0 8px rgba(198,125,134,.55));
    }

    .food-dot,.air-dot,.signal-dot{
      position:absolute;width:12px;height:12px;border-radius:50%;
      opacity:0;z-index:30;
    }

    .food-dot{left:85px;top:-55px;background:#d49b48;}
    .air-dot{left:70px;top:-55px;background:#6fb6c6;}
    .signal-dot{right:15px;bottom:15px;background:#e4b64f;}

    .food-dot.travel-food{
      opacity:1;animation:foodTravel 3.5s ease-in forwards;
    }

    @keyframes foodTravel{
      0%{top:-55px;left:85px;}
      30%{top:40px;left:85px;}
      55%{top:175px;left:112px;}
      100%{top:270px;left:70px;opacity:.3;}
    }

    .air-dot.travel-air{
      opacity:1;animation:airTravel 2.3s ease-in-out forwards;
    }

    @keyframes airTravel{
      0%{top:-55px;left:70px;}
      45%{top:45px;left:85px;}
      100%{top:100px;left:120px;opacity:.25;}
    }

    .signal-dot.signal-travel{
      opacity:1;animation:signalTravel 1.7s ease-out forwards;
    }

    @keyframes signalTravel{
      from{right:15px;bottom:15px;}
      to{right:78px;bottom:330px;opacity:.2;}
    }

    .body-explanation{
      padding:18px;border-radius:18px;background:#fff;
      color:#5d7069;font-size:10px;line-height:1.9;
    }

    .xray-screen{
      position:absolute;left:18%;top:40px;width:300px;height:450px;
      border-radius:25px;background:#263d46;opacity:.35;transition:.5s;
    }

    .xray-screen.on{opacity:1;}
    .bone-part{position:absolute;background:#e9eee7;}

    .skull{
      left:115px;top:25px;width:70px;height:75px;border-radius:50%;
    }

    .spine{
      left:144px;top:100px;width:12px;height:190px;border-radius:8px;
    }

    .rib{
      left:85px;width:130px;height:65px;border:7px solid #e9eee7;
      background:transparent;border-radius:50%;
    }

    .rib1{top:105px;}
    .rib2{top:130px;}
    .rib3{top:155px;}

    .arm-bone{
      top:115px;width:12px;height:180px;border-radius:8px;
    }

    .left-arm{left:55px;transform:rotate(8deg);}
    .right-arm{right:55px;transform:rotate(-8deg);}

    .pelvis{
      left:95px;top:275px;width:110px;height:65px;border-radius:45%;
    }

    .leg-bone{
      top:325px;width:15px;height:115px;border-radius:8px;
    }

    .left-leg{left:110px;}
    .right-leg{right:110px;}

    .bone-test{
      position:absolute;right:10%;top:200px;width:230px;text-align:center;
      color:#61736d;font-size:9px;
    }

    .test-bone{
      width:190px;height:30px;margin:0 auto 14px;border-radius:50%;
      background:#e6dfcb;transition:.6s;
    }

    .test-bone.bend{transform:rotate(8deg) skewY(-8deg);}

    .joint-scene,.muscle-scene{
      display:grid;place-items:center;
    }

    .joint-model{
      width:280px;height:330px;position:relative;
    }

    .joint-bone{
      position:absolute;left:105px;width:70px;height:145px;
      border-radius:30px;background:#e7dfca;
      transform-origin:35px 145px;transition:.8s;
    }

    .bone-top{top:15px;}
    .bone-bottom{top:165px;}

    .joint-cartilage{
      position:absolute;left:98px;top:150px;width:84px;height:35px;
      border-radius:50%;background:#a9c8c6;z-index:5;
    }

    .joint-ligament{
      position:absolute;left:90px;top:120px;width:100px;height:95px;
      border:8px solid rgba(181,143,104,.6);border-radius:45%;z-index:7;
    }

    .hinge-model.move .bone-bottom{transform:rotate(-38deg);}
    .fixed-model .bone-bottom{top:155px;}

    .ball-model .joint-cartilage{
      width:70px;height:70px;left:105px;top:135px;
    }

    .ball-model.move-ball .bone-bottom{
      animation:ballMove 1.5s ease-in-out infinite alternate;
    }

    @keyframes ballMove{
      from{transform:rotate(-25deg);}
      to{transform:rotate(25deg);}
    }

    .joint-name{
      position:absolute;bottom:90px;padding:9px 15px;border-radius:12px;
      background:#fff;color:#173f36;font-size:11px;font-weight:900;
    }

    .arm-model{
      width:360px;height:340px;position:relative;
    }

    .upper-arm{
      position:absolute;left:70px;top:65px;width:160px;height:45px;
      border-radius:30px;background:#e4c6ae;
    }

    .forearm{
      position:absolute;left:205px;top:65px;width:140px;height:40px;
      border-radius:30px;background:#e4c6ae;
      transform-origin:10px 20px;transition:.8s;
    }

    .arm-model.flexed .forearm{transform:rotate(-75deg);}

    .muscle{
      position:absolute;padding:8px 12px;border-radius:50%;
      color:#fff;font-size:8px;text-align:center;transition:.5s;z-index:5;
    }

    .biceps{
      left:105px;top:45px;width:100px;height:42px;background:#c9666b;
    }

    .triceps{
      left:105px;top:93px;width:105px;height:35px;background:#9f5960;
    }

    .muscle.contracted{
      transform:scaleX(.78) scaleY(1.35);
    }

    .tendon{
      position:absolute;width:30px;height:7px;border-radius:8px;
      background:#e7dec5;z-index:8;
    }

    .tendon-a{left:80px;top:65px;}
    .tendon-b{left:195px;top:70px;}

    .elbow-dot{
      position:absolute;left:205px;top:66px;width:22px;height:22px;
      border-radius:50%;background:#d6b79f;z-index:10;
    }

    .scientists-scene{
      min-height:560px;padding:45px;display:grid;
      grid-template-columns:1fr 1fr;gap:14px;
      background:linear-gradient(#edf4f0,#faf5ed);
    }

    .scientist-card{
      min-height:205px;padding:20px;border:1px solid #e1e6e1;
      border-radius:20px;background:#fff;color:#263b35;text-align:right;
      font-family:inherit;cursor:pointer;transition:.2s;
    }

    .scientist-card.active{
      border-color:#c67d86;
      box-shadow:0 10px 28px rgba(198,125,134,.12);
      transform:translateY(-3px);
    }

    .scientist-symbol{
      width:40px;height:40px;display:grid;place-items:center;
      margin-bottom:15px;border-radius:13px;background:#dce8df;color:#173f36;
    }

    .scientist-card small{display:block;color:#c67d86;font-size:8px;}
    .scientist-card strong{
      display:block;margin:4px 0 8px;color:#173f36;font-size:14px;
    }
    .scientist-card p{
      margin:0;color:#6f7d78;font-size:9px;line-height:1.8;
    }

    @media(max-width:700px){
      .body-lab{grid-template-columns:1fr;padding:20px;}
      .body-explanation{
        position:absolute;left:15px;right:15px;bottom:15px;
      }
      .xray-screen{left:5%;transform:scale(.8);transform-origin:left top;}
      .bone-test{right:1%;transform:scale(.75);}
      .scientists-scene{grid-template-columns:1fr;padding:20px;}
    }
  `;

  document.head.appendChild(style);
}

/* =========================================================
   ستايل احتفال فتح المحطة
========================================================= */

function injectUnlockStyles() {
  if ($("#unlockStyles")) return;

  const style = document.createElement("style");
  style.id = "unlockStyles";

  style.textContent = `
    .station-card{position:relative;overflow:hidden;}

    .station-card.just-unlocked{
      animation:stationUnlock 1.25s ease;
      z-index:5;
    }

    @keyframes stationUnlock{
      0%{transform:scale(.97);}
      40%{
        transform:scale(1.025);
        box-shadow:0 0 0 8px rgba(198,125,134,.12),
                   0 18px 40px rgba(35,63,54,.12);
      }
      100%{transform:scale(1);}
    }

    .unlock-spark{
      position:absolute;left:50%;top:50%;
      width:7px;height:7px;border-radius:50%;
      background:#d3ae58;pointer-events:none;z-index:20;
      animation:unlockSpark 1.4s ease-out forwards;
      transform:rotate(calc(var(--i) * 30deg)) translateY(-10px);
    }

    @keyframes unlockSpark{
      to{
        opacity:0;
        transform:
          rotate(calc(var(--i) * 30deg))
          translateY(-115px)
          scale(.2);
      }
    }

    .station-icon{
      width:38px;height:38px;display:grid;place-items:center;
      margin-bottom:7px;border-radius:12px;
      background:#edf4ef;font-size:18px;
    }

    .station-decor{
      position:absolute;width:90px;height:90px;left:-25px;bottom:-40px;
      border-radius:50%;background:rgba(220,232,223,.45);
      pointer-events:none;
    }
  `;

  document.head.appendChild(style);
}

/* =========================================================
   TOAST
========================================================= */

function showToast(title, text) {
  clearTimeout(toastTimer);

  $("#toastTitle").textContent = title;
  $("#toastText").textContent = text;

  $("#toast").classList.add("show");

  toastTimer = setTimeout(() => {
    $("#toast").classList.remove("show");
  }, 2200);
}

/* =========================================================
   التحدي النهائي
========================================================= */

function openFinalChallenge() {
  showView("finalView");

  $("#finalChallenge").innerHTML = `
    <div class="question-box">

      <p>
        أي عبارة توضّح فكرة مهمة تعلمتِها في مختبر الحياة؟
      </p>

      <div class="question-choices">

        <button class="choice-button final-choice" data-correct="false">
          جميع أجزاء النبات والجسم تؤدي الوظيفة نفسها.
        </button>

        <button class="choice-button final-choice" data-correct="true">
          للكائنات الحية أجزاء مختلفة تعمل معًا لأداء وظائفها.
        </button>

        <button class="choice-button final-choice" data-correct="false">
          لا تحتاج النباتات إلى الماء أو الضوء.
        </button>

      </div>

    </div>
  `;

  $$(".final-choice").forEach(btn => {
    btn.onclick = () => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");

        successSound();

        setTimeout(
          showCertificate,
          650
        );
      } else {
        btn.classList.add("wrong");
        wrongSound();

        setTimeout(() => {
          btn.classList.remove("wrong");
        }, 650);
      }
    };
  });
}

function showCertificate() {
  $("#certificateTitles").textContent =
    `${state.completed.length} ألقاب علمية`;

  $("#certificateStars").textContent =
    `${state.stars} نجمة • ${state.name}`;

  $("#certificateModal")
    .classList.remove("hidden");
}

/* =========================================================
   زر التحدي النهائي
========================================================= */

function addFinalChallengeButton() {
  if (state.completed.length < 10) return;
  if ($("#finalChallengeMapButton")) return;

  const button =
    document.createElement("button");

  button.id =
    "finalChallengeMapButton";

  button.type = "button";
  button.className = "primary-button";

  button.style.width = "100%";
  button.style.marginTop = "18px";

  button.innerHTML = `
    التحدي العلمي النهائي
    <b>←</b>
  `;

  button.onclick =
    openFinalChallenge;

  $("#titlesGrid")
    ?.parentElement
    ?.appendChild(button);
}

/* =========================================================
   الأحداث الأساسية
========================================================= */

$("#startBtn")?.addEventListener(
  "click",
  enterLab
);

$("#explorerName")?.addEventListener(
  "keydown",
  event => {
    if (event.key === "Enter") {
      enterLab();
    }
  }
);

$("#backToMapBtn")?.addEventListener(
  "click",
  () => goToMap(false)
);

$("#brandBtn")?.addEventListener(
  "click",
  () => goToMap(false)
);

$("#celebrationMapBtn")?.addEventListener(
  "click",
  () => {
    $("#celebration")
      .classList.add("hidden");

    goToMap(true);

    if (state.completed.length === 10) {
      setTimeout(() => {
        showToast(
          "اكتملت المحطات العشر! ✦",
          "أصبح التحدي العلمي النهائي جاهزًا"
        );
      }, 450);
    }
  }
);

$("#finalMapBtn")?.addEventListener(
  "click",
  () => goToMap(false)
);

$("#closeCertificateBtn")?.addEventListener(
  "click",
  () => {
    $("#certificateModal")
      .classList.add("hidden");

    goToMap(false);
  }
);

$("#soundToggle")?.addEventListener(
  "click",
  () => {
    state.sound = !state.sound;

    saveState();
    updateHeader();

    if (state.sound) {
      successSound();
    }
  }
);

$("#welcomeSoundBtn")?.addEventListener(
  "click",
  () => {
    state.sound = !state.sound;
    saveState();

    $("#welcomeSoundBtn").textContent =
      state.sound ? "♫" : "×";

    if (state.sound) {
      successSound();
    }
  }
);

/* =========================================================
   التشغيل
========================================================= */

function init() {
  injectUnlockStyles();

  updateHeader();

  if ($("#welcomeSoundBtn")) {
    $("#welcomeSoundBtn").textContent =
      state.sound ? "♫" : "×";
  }

  if ($("#explorerName") && state.name) {
    $("#explorerName").value =
      state.name;
  }

  renderMap();

  if (state.completed.length === 10) {
    addFinalChallengeButton();
  }
}

init();
const startButton = document.querySelector("#startBtn");

if (startButton) {
  startButton.onclick = enterLab;
}
/* =========================================================
   تعديل الهيكل العظمي إلى 10 عظام أساسية
   ضعي هذا الكود في آخر script.js
   لا تحذفي كود الهيكل الحالي
========================================================= */

(function () {

  /* =========================
     العظام العشرة
  ========================= */

  const bookSkeletonBones = {

    skull: {
      name: "الجمجمة",
      info: "تحمي الدماغ."
    },

    spine: {
      name: "العمود الفقري",
      info: "يدعم الجسم ويساعده على الحركة والانحناء."
    },

    ribs: {
      name: "الأضلاع",
      info: "تكوّن القفص الصدري وتساعد على حماية القلب والرئتين."
    },

    sternum: {
      name: "عظم القص",
      info: "يقع في مقدمة القفص الصدري وتتصل به الأضلاع."
    },

    humerus: {
      name: "العضد",
      info: "عظم الذراع العلوي."
    },

    forearm: {
      name: "الزند والكعبرة",
      info: "هما عظما الساعد."
    },

    pelvis: {
      name: "الحزام الحوضي",
      info: "يربط الطرفين السفليين بالجسم."
    },

    femur: {
      name: "عظم الفخذ",
      info: "العظم الطويل في الجزء العلوي من الطرف السفلي."
    },

    tibia: {
      name: "القصبة",
      info: "أحد عظمي الجزء السفلي من الساق."
    },

    fibula: {
      name: "الشظية",
      info: "أحد عظمي الجزء السفلي من الساق."
    }

  };


  /* =========================
     تخزين العظام المكتشفة
  ========================= */

  const discoveredBookBones = new Set();


  /* =========================
     تحويل أسماء الرسم الحالي
     إلى العظام العشرة
  ========================= */

  function normalizeSkeletonBone(bone) {

    if (
      bone === "radius" ||
      bone === "ulna"
    ) {
      return "forearm";
    }

    if (bone === "patella") {
      return null;
    }

    return bone;
  }


  /* =========================
     تحديث العداد
  ========================= */

  function updateBookSkeletonCounter() {

    const count =
      discoveredBookBones.size;


    const counter =
      document.querySelector(
        "#skeletonCounter"
      );

    const sideCounter =
      document.querySelector(
        "#skeletonSideCounter"
      );


    if (counter) {
      counter.textContent =
        `${count} / 10`;
    }


    if (sideCounter) {
      sideCounter.textContent =
        `${count} / 10`;
    }


    if (count >= 10) {
      finishBookSkeleton();
    }
  }


  /* =========================
     إكمال النشاط
  ========================= */

  function finishBookSkeleton() {

    const discovery =
      document.querySelector(
        "#skeletonDiscovery"
      );


    if (discovery) {

      discovery.classList.add(
        "complete"
      );


      discovery.innerHTML = `
        <span>✓</span>

        <div>
          <small>اكتشاف مكتمل</small>

          <strong>
            تعرفتِ إلى العظام الأساسية
          </strong>

          <p>
            يدعم الهيكل العظمي الجسم،
            ويساعده على الحركة،
            ويحمي بعض الأعضاء الرخوة داخله.
          </p>
        </div>
      `;
    }


    /*
       ربط النشاط بنظام المحطة
    */

    if (
      typeof discover === "function" &&
      !window.skeletonBookDiscoverySaved
    ) {

      window.skeletonBookDiscoverySaved = true;

      discover(
        "الهيكل العظمي",
        "يدعم الجسم ويساعده على الحركة ويحمي بعض الأعضاء الرخوة داخله."
      );
    }


    if (
      typeof checkLessonCompletion ===
      "function"
    ) {
      checkLessonCompletion();
    }
  }


})();
/* =========================================================
   تحديد الجزء المختار في تجربة أجزاء النبات
   ضعي الكود في آخر script.js
========================================================= */

(() => {

  // نضيف شكل التحديد مرة واحدة
  const style = document.createElement("style");

  style.textContent = `
    .plant-part-selected {
      outline: 4px solid #ffd54a !important;
      outline-offset: 5px !important;

      filter:
        drop-shadow(0 0 6px rgba(255, 213, 74, 0.95))
        drop-shadow(0 0 14px rgba(255, 213, 74, 0.65)) !important;

      transform: scale(1.06) !important;
      transition:
        transform 0.2s ease,
        filter 0.2s ease,
        outline 0.2s ease !important;

      position: relative;
      z-index: 20 !important;
    }
  `;

  document.head.appendChild(style);


  document.addEventListener("click", function (e) {

    /*
      يلتقط الجزء الذي تم الضغط عليه داخل تجربة النبات.
      يدعم الأجزاء سواء كانت button أو عناصر عليها data-part.
    */

    const part = e.target.closest(
      '[data-part], [data-plant-part], .plant-part'
    );

    if (!part) return;


    // نتأكد أننا داخل تجربة النبات فقط
    const plantLab = part.closest(
      '.plant-lab, #plantLab, [data-lab="plant"], #experimentArea, #experimentTools'
    );

    if (!plantLab) return;


    // نشيل التحديد من الجزء السابق
    plantLab
      .querySelectorAll(".plant-part-selected")
      .forEach(el => {
        el.classList.remove("plant-part-selected");
      });


    // نحدد الجزء الجديد
    part.classList.add("plant-part-selected");

  }, true);

})();
/* =========================================================
   FIX — منع خطأ plantScene + إكمال المحطات والأسئلة
   ضعي هذا الكود في آخر script.js فقط
========================================================= */

(() => {

  /* -------------------------------------------------------
     1) إنشاء plantScene احتياطية
     يمنع الخطأ:
     null is not an object
     $("#plantScene").classList
  ------------------------------------------------------- */

  function ensurePlantScene() {

    if (document.querySelector("#plantScene")) return;

    const fakePlantScene = document.createElement("div");

    fakePlantScene.id = "plantScene";
    fakePlantScene.className = "hidden";

    fakePlantScene.style.display = "none";

    document.body.appendChild(fakePlantScene);
  }

  ensurePlantScene();


  /* -------------------------------------------------------
     2) دالة آمنة لإظهار السؤال
  ------------------------------------------------------- */

  function showQuestionSafely() {

    const questionStage =
      document.querySelector("#questionStage");

    if (questionStage) {

      questionStage.classList.remove("hidden");

      questionStage.style.display = "";

      questionStage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

  }


  /* -------------------------------------------------------
     3) إصلاح محطة الهيكل العظمي
     بعد اكتمال الأنشطة الأساسية يظهر السؤال
  ------------------------------------------------------- */

  document.addEventListener("click", function () {

    if (
      typeof currentLesson === "undefined" ||
      Number(currentLesson) !== 7
    ) {
      return;
    }


    setTimeout(() => {

      try {

        /*
          نستخدم نظام المشروع الأصلي أولاً
        */

        if (
          typeof lessonCoreComplete === "function" &&
          lessonCoreComplete(7)
        ) {

          if (typeof unlockLessonSummary === "function") {
            unlockLessonSummary(false);
          }

          showQuestionSafely();
        }

      } catch (error) {

        console.log(
          "Station 7 completion fix:",
          error
        );

      }

    }, 250);

  }, true);


  /* -------------------------------------------------------
     4) إذا ظهر زر إنهاء/متابعة في محطة 7
     نتأكد أن السؤال يظهر
  ------------------------------------------------------- */

  document.addEventListener("click", function (e) {

    if (
      typeof currentLesson === "undefined" ||
      Number(currentLesson) !== 7
    ) {
      return;
    }

    const button = e.target.closest("button");

    if (!button) return;

    const text =
      (button.textContent || "").trim();

    if (
      text.includes("إنهاء") ||
      text.includes("اكتمل") ||
      text.includes("متابعة") ||
      text.includes("التالي") ||
      text.includes("النتيجة")
    ) {

      setTimeout(() => {

        try {

          if (typeof unlockLessonSummary === "function") {
            unlockLessonSummary(false);
          }

          showQuestionSafely();

        } catch (error) {
          console.log(error);
        }

      }, 200);

    }

  }, true);


  /* -------------------------------------------------------
     5) إعادة إنشاء plantScene إذا حذفها render
  ------------------------------------------------------- */

  const originalRenderExperiment =
    typeof renderExperiment === "function"
      ? renderExperiment
      : null;

  if (originalRenderExperiment) {

    renderExperiment = function (number) {

      ensurePlantScene();

      const result =
        originalRenderExperiment.apply(this, arguments);

      ensurePlantScene();

      return result;
    };

  }

})();