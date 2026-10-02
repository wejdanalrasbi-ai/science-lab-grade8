/* =========================================================
   🧪 مختبر العناصر والمركبات
   الصف الثامن — الوحدة الثانية
   FINAL VERSION

   PART 1 / 4
========================================================= */

"use strict";


/* =========================================================
   1) أدوات سريعة
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


/* =========================================================
   2) عناصر الصفحة
========================================================= */

const welcomeScreen =
  $("#welcomeScreen");

const mapScreen =
  $("#mapScreen");

const lessonScreen =
  $("#lessonScreen");

const finalScreen =
  $("#finalScreen");

const graduationScreen =
  $("#graduationScreen");


const studentNameInput =
  $("#studentName");

const nameWarning =
  $("#nameWarning");

const enterLabBtn =
  $("#enterLabBtn");


const mapStudentName =
  $("#mapStudentName");

const starCount =
  $("#starCount");

const xpCount =
  $("#xpCount");

const lessonStarCount =
  $("#lessonStarCount");

const lessonXpCount =
  $("#lessonXpCount");


const globalSoundBtn =
  $("#globalSoundBtn");

const welcomeSoundBtn =
  $("#welcomeSoundBtn");

const lessonSoundBtn =
  $("#lessonSoundBtn");


const progressPercent =
  $("#progressPercent");

const completedCounter =
  $("#completedCounter");

const mainProgressBar =
  $("#mainProgressBar");


const backToMapBtn =
  $("#backToMapBtn");

const lessonContent =
  $("#lessonContent");


const finalChallengeCard =
  $("#finalChallengeCard");

const finalChallengeDescription =
  $("#finalChallengeDescription");

const finalChallengeLock =
  $("#finalChallengeLock");

const finalBackBtn =
  $("#finalBackBtn");

const finalQuizContainer =
  $("#finalQuizContainer");


const badgeModal =
  $("#badgeModal");

const earnedBadgeIcon =
  $("#earnedBadgeIcon");

const badgeTitle =
  $("#badgeTitle");

const badgeDescription =
  $("#badgeDescription");

const badgeContinueBtn =
  $("#badgeContinueBtn");


const unlockToast =
  $("#unlockToast");

const unlockText =
  $("#unlockText");


const celebrationLayer =
  $("#celebrationLayer");


const graduateName =
  $("#graduateName");

const certificateName =
  $("#certificateName");

const certificateStars =
  $("#certificateStars");

const certificateXp =
  $("#certificateXp");

const restartJourneyBtn =
  $("#restartJourneyBtn");


/* =========================================================
   3) بيانات الرحلة
========================================================= */

const LESSONS = {

  1: {
    code: "2-1",
    title: "الذرات",
    icon: "🔬",
    badge: "⚛️",
    badgeName: "مستكشفة الذرات",
    discovery:
      "المواد تتكون من ذرات صغيرة جدًا، والعنصر يتكون من نوع واحد من الذرات."
  },

  2: {
    code: "2-2",
    title: "الذرات والعناصر",
    icon: "🔐",
    badge: "🔤",
    badgeName: "خبيرة الرموز",
    discovery:
      "لكل عنصر رمز كيميائي، ويُكتب الحرف الأول منه بحرف كبير."
  },

  3: {
    code: "2-3",
    title: "الجدول الدوري",
    icon: "🧩",
    badge: "🗺️",
    badgeName: "مستكشفة الجدول الدوري",
    discovery:
      "العناصر مرتبة في الجدول الدوري في مجموعات ودورات."
  },

  4: {
    code: "2-4",
    title: "المزيد حول تركيب الذرة",
    icon: "⚛️",
    badge: "🧠",
    badgeName: "مهندسة الذرة",
    discovery:
      "العدد الذري يساوي عدد البروتونات، والعدد الكتلي يساوي البروتونات مع النيوترونات."
  },

  5: {
    code: "2-5",
    title: "خواص المجموعة الأولى",
    icon: "🔥",
    badge: "🔥",
    badgeName: "باحثة المجموعة الأولى",
    discovery:
      "نزولًا في المجموعة الأولى يزداد الحجم وتقل درجات الانصهار."
  },

  6: {
    code: "2-6",
    title: "خواص بعض المجموعات الأخرى",
    icon: "🧪",
    badge: "🧫",
    badgeName: "خبيرة الهالوجينات",
    discovery:
      "الفلور والكلور والبروم من الهالوجينات، ويقل نشاطها نزولًا في المجموعة."
  },

  7: {
    code: "2-7",
    title: "المركبات الكيميائية",
    icon: "🔗",
    badge: "🔗",
    badgeName: "صانعة المركبات",
    discovery:
      "يتكون المركب عند اتحاد ذرات من عناصر مختلفة كيميائيًا."
  },

  8: {
    code: "2-8",
    title: "الصيغ الكيميائية",
    icon: "🧬",
    badge: "🧬",
    badgeName: "مهندسة الجزيئات",
    discovery:
      "توضح الصيغة الكيميائية أنواع الذرات وأعدادها في المادة."
  },

  9: {
    code: "2-9",
    title: "المركبات والمخاليط",
    icon: "🧲",
    badge: "🧲",
    badgeName: "محققة المخاليط",
    discovery:
      "في المخلوط تحتفظ المواد بخواصها ويمكن فصلها بطرق فيزيائية."
  },

  10: {
    code: "2-10",
    title: "المزيد حول المخاليط",
    icon: "🥣",
    badge: "💧",
    badgeName: "خبيرة المخاليط",
    discovery:
      "المخاليط قد تتكون من عناصر أو مركبات، والسبائك والمياه المعدنية أمثلة عليها."
  }

};


/* =========================================================
   4) حالة اللعبة
========================================================= */

const state = {

  studentName: "",

  completedLessons:
    new Set(),

  currentLesson: 0,

  soundEnabled: true,

  xp: 0,

  discoveries: [],

  finalScore: 0,

  finalQuestion: 0,

  finalAnswered: false

};


/* =========================================================
   5) حفظ التقدم
========================================================= */

const STORAGE_KEY =
  "elementsCompoundsLabVFinal";


function saveProgress() {

  try {

    const data = {

      studentName:
        state.studentName,

      completedLessons:
        [...state.completedLessons],

      soundEnabled:
        state.soundEnabled,

      xp:
        state.xp,

      discoveries:
        state.discoveries

    };


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  } catch (error) {

    console.warn(
      "تعذر حفظ التقدم.",
      error
    );

  }

}


function loadProgress() {

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!saved) {
      return;
    }


    const data =
      JSON.parse(saved);


    if (data.studentName) {

      state.studentName =
        data.studentName;

      studentNameInput.value =
        data.studentName;

    }


    if (
      Array.isArray(
        data.completedLessons
      )
    ) {

      state.completedLessons =
        new Set(
          data.completedLessons
        );

    }


    if (
      typeof data.soundEnabled ===
      "boolean"
    ) {

      state.soundEnabled =
        data.soundEnabled;

    }


    if (
      Number.isFinite(data.xp)
    ) {

      state.xp =
        data.xp;

    }


    if (
      Array.isArray(
        data.discoveries
      )
    ) {

      state.discoveries =
        data.discoveries;

    }

  } catch (error) {

    console.warn(
      "تعذر قراءة التقدم المحفوظ.",
      error
    );

  }

}


/* =========================================================
   6) الصوت
========================================================= */

let audioContext = null;


function getAudioContext() {

  if (!state.soundEnabled) {
    return null;
  }


  if (!audioContext) {

    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;


    if (!AudioContextClass) {
      return null;
    }


    audioContext =
      new AudioContextClass();

  }


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext.resume();

  }


  return audioContext;

}


function playTone({

  frequency = 440,

  duration = 0.12,

  type = "sine",

  volume = 0.045,

  delay = 0

} = {}) {

  const ctx =
    getAudioContext();


  if (!ctx) {
    return;
  }


  const oscillator =
    ctx.createOscillator();

  const gain =
    ctx.createGain();


  oscillator.type =
    type;

  oscillator.frequency.value =
    frequency;


  gain.gain.setValueAtTime(
    0.0001,
    ctx.currentTime + delay
  );


  gain.gain.exponentialRampToValueAtTime(
    volume,
    ctx.currentTime + delay + 0.01
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + delay + duration
  );


  oscillator.connect(gain);

  gain.connect(
    ctx.destination
  );


  oscillator.start(
    ctx.currentTime + delay
  );


  oscillator.stop(
    ctx.currentTime +
    delay +
    duration +
    0.03
  );

}


function soundClick() {

  playTone({
    frequency: 420,
    duration: 0.07,
    type: "sine",
    volume: 0.025
  });

}


function soundPop() {

  playTone({
    frequency: 580,
    duration: 0.08,
    type: "sine"
  });

  playTone({
    frequency: 760,
    duration: 0.09,
    type: "sine",
    delay: 0.05
  });

}


function soundCorrect() {

  playTone({
    frequency: 523,
    duration: 0.11
  });

  playTone({
    frequency: 659,
    duration: 0.12,
    delay: 0.08
  });

  playTone({
    frequency: 784,
    duration: 0.16,
    delay: 0.16
  });

}


function soundWrong() {

  playTone({
    frequency: 250,
    duration: 0.11,
    type: "triangle",
    volume: 0.035
  });

  playTone({
    frequency: 190,
    duration: 0.14,
    type: "triangle",
    volume: 0.03,
    delay: 0.08
  });

}


function soundUnlock() {

  playTone({
    frequency: 520,
    duration: 0.1
  });

  playTone({
    frequency: 700,
    duration: 0.1,
    delay: 0.08
  });

  playTone({
    frequency: 900,
    duration: 0.2,
    delay: 0.16
  });

}


function soundExperiment() {

  playTone({
    frequency: 320,
    duration: 0.09,
    type: "triangle",
    volume: 0.025
  });

  playTone({
    frequency: 460,
    duration: 0.12,
    type: "sine",
    volume: 0.03,
    delay: 0.06
  });

}


function soundMix() {

  playTone({
    frequency: 210,
    duration: 0.08,
    type: "triangle",
    volume: 0.025
  });

  playTone({
    frequency: 260,
    duration: 0.08,
    type: "triangle",
    volume: 0.025,
    delay: 0.07
  });

  playTone({
    frequency: 320,
    duration: 0.08,
    type: "triangle",
    volume: 0.025,
    delay: 0.14
  });

}


function toggleSound() {

  state.soundEnabled =
    !state.soundEnabled;


  updateSoundButtons();

  saveProgress();


  if (state.soundEnabled) {
    soundCorrect();
  }

}


function updateSoundButtons() {

  const icon =
    state.soundEnabled
      ? "🔊"
      : "🔇";


  [
    welcomeSoundBtn,
    globalSoundBtn,
    lessonSoundBtn
  ].forEach(button => {

    if (button) {
      button.textContent = icon;
    }

  });

}


/* =========================================================
   7) التنقل بين الشاشات
========================================================= */

function showScreen(screen) {

  $$(".screen").forEach(item => {
    item.classList.remove("active");
  });


  screen.classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function enterLab() {

  const name =
    studentNameInput.value.trim();


  if (!name) {

    nameWarning.textContent =
      "اكتبي اسمكِ أولًا يا عالمة 🔬";

    studentNameInput.focus();

    soundWrong();

    return;
  }


  nameWarning.textContent = "";

  state.studentName = name;

  mapStudentName.textContent =
    name;


  saveProgress();

  updateInterface();

  soundUnlock();

  showScreen(mapScreen);

}


function goToMap() {

  soundClick();

  updateInterface();

  showScreen(mapScreen);

}


function openLesson(number) {

  const lesson =
    LESSONS[number];


  if (!lesson) {
    return;
  }


  state.currentLesson =
    number;


  soundClick();

  showScreen(
    lessonScreen
  );


  lessonContent.innerHTML =
    `
      <div class="lab-panel">
        <p class="box-text">
          جاري تجهيز المختبر...
          🧪
        </p>
      </div>
    `;


  const renderer =
    window[
      `renderLesson${number}`
    ];


  if (
    typeof renderer ===
    "function"
  ) {

    renderer();

  } else {

    lessonContent.innerHTML =
      `
        <div class="lesson-shell">

          ${lessonHero(
            number,
            "هذه المحطة تحتاج إلى جزء البرمجة التالي."
          )}

          <div class="lab-panel">

            <h3 class="box-title">
              🧪 المختبر قيد التركيب
            </h3>

            <p class="box-text">
              سيتم تركيب هذه التجربة
              في الجزء التالي من
              script.js.
            </p>

          </div>

        </div>
      `;

  }

}


/* =========================================================
   8) الأحداث الأساسية
========================================================= */

enterLabBtn.addEventListener(
  "click",
  enterLab
);


studentNameInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      enterLab();

    }

  }
);


[
  welcomeSoundBtn,
  globalSoundBtn,
  lessonSoundBtn
].forEach(button => {

  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    toggleSound
  );

});


backToMapBtn.addEventListener(
  "click",
  goToMap
);


finalBackBtn.addEventListener(
  "click",
  goToMap
);


$$(".station-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const lessonNumber =
          Number(
            card.dataset.lesson
          );


        if (
          card.classList.contains(
            "locked-station"
          )
        ) {

          soundWrong();

          showMiniToast(
            "🔒 أكملي المحطة السابقة أولًا."
          );

          return;
        }


        openLesson(
          lessonNumber
        );

      }
    );

  });


/* =========================================================
   9) واجهة عنوان الدرس
========================================================= */

function lessonHero(
  number,
  subtitle = ""
) {

  const lesson =
    LESSONS[number];


  return `
    <section class="lesson-top">

      <span class="lesson-number">
        ${lesson.code}
      </span>

      <div class="lesson-main-icon">
        ${lesson.icon}
      </div>

      <h1 class="lesson-title">
        ${lesson.title}
      </h1>

      <p class="lesson-subtitle">
        ${subtitle}
      </p>

    </section>
  `;

}


/* =========================================================
   10) شريط خطوات كل مهمة
========================================================= */

function learningSteps(active = 1) {

  const steps = [
    "👀 استكشفي",
    "💡 افهمي",
    "🕹️ جرّبي",
    "📓 استنتجي",
    "🎯 تحدّي"
  ];


  return `
    <div class="mission-steps">

      ${steps.map(
        (step, index) => {

          const position =
            index + 1;


          let className =
            "mission-step";


          if (
            position < active
          ) {

            className +=
              " done";

          } else if (
            position === active
          ) {

            className +=
              " active";

          }


          return `
            <span class="${className}">
              ${step}
            </span>
          `;

        }
      ).join("")}

    </div>
  `;

}


/* =========================================================
   11) دفتر العالمة
========================================================= */

function scientistNotebook({

  question,

  observation,

  conclusion,

  id = "scientistNotebook"

}) {

  return `
    <section
      id="${id}"
      class="scientist-notebook"
    >

      <div class="notebook-title">

        <span>
          📓
        </span>

        <div>

          <strong>
            دفتر العالمة
          </strong>

          <small>
            سجلي ما لاحظتِه من التجربة
          </small>

        </div>

      </div>


      <div class="notebook-question">

        <span>
          🤔
        </span>

        <p>
          ${question}
        </p>

      </div>


      <button
        class="lab-button primary notebook-reveal-btn"
        type="button"
      >
        🔍 اكشفي الملاحظة والاستنتاج
      </button>


      <div
        class="notebook-observation hidden"
      >

        <p>
          <strong>
            👀 الملاحظة:
          </strong>

          ${observation}
        </p>


        <p>
          <strong>
            💡 الاستنتاج:
          </strong>

          ${conclusion}
        </p>

      </div>

    </section>
  `;

}


function connectNotebook(parent) {

  const button =
    $(
      ".notebook-reveal-btn",
      parent
    );


  const result =
    $(
      ".notebook-observation",
      parent
    );


  if (
    !button ||
    !result
  ) {

    return;

  }


  button.addEventListener(
    "click",
    () => {

      soundCorrect();

      result.classList.remove(
        "hidden"
      );


      button.disabled = true;

      button.textContent =
        "✨ تم تسجيل الاستنتاج";

    },
    {
      once: true
    }
  );

}


/* =========================================================
   12) Feedback
========================================================= */

function setFeedback(
  element,
  message,
  type = "info"
) {

  if (!element) {
    return;
  }


  element.className =
    `feedback-message ${type}`;

  element.innerHTML =
    message;

}


function correctFeedback(
  element,
  message
) {

  soundCorrect();

  setFeedback(
    element,
    message,
    "good"
  );

}


function wrongFeedback(
  element,
  message
) {

  soundWrong();

  setFeedback(
    element,
    message,
    "try"
  );

}


function infoFeedback(
  element,
  message
) {

  soundPop();

  setFeedback(
    element,
    message,
    "info"
  );

}


/* =========================================================
   13) خلط المصفوفات
========================================================= */

function shuffleArray(array) {

  const copy =
    [...array];


  for (
    let i =
      copy.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }


  return copy;

}


/* =========================================================
   14) تحدي الاختيارات
========================================================= */

function createChoiceChallenge({

  question,

  answers,

  correct,

  explanation = ""

}) {

  const shuffled =
    shuffleArray(answers);


  return `
    <section class="mission-box choice-challenge">

      <span class="mini-label">
        🎯 تحدي سريع
      </span>

      <h3 class="box-title">
        ${question}
      </h3>


      <div class="challenge-options">

        ${shuffled.map(
          answer => `
            <button
              class="challenge-option"
              type="button"
              data-answer="${escapeHTML(answer)}"
            >
              ${answer}
            </button>
          `
        ).join("")}

      </div>


      <div
        class="challenge-feedback"
      ></div>


      ${
        explanation
          ? `
            <div
              class="challenge-explanation hidden"
            >
              💡 ${explanation}
            </div>
          `
          : ""
      }

    </section>
  `;

}


function connectChoiceChallenge({

  parent,

  correct,

  onCorrect = null,

  wrongHint =
    "راجعي ما حدث في التجربة ثم حاولي مرة أخرى."

}) {

  if (!parent) {
    return;
  }


  const options =
    $$(
      ".challenge-option",
      parent
    );


  const feedback =
    $(
      ".challenge-feedback",
      parent
    );


  const explanation =
    $(
      ".challenge-explanation",
      parent
    );


  let solved = false;


  options.forEach(option => {

    option.addEventListener(
      "click",
      () => {

        if (solved) {
          return;
        }


        const answer =
          option.dataset.answer;


        if (
          answer === correct
        ) {

          solved = true;

          option.classList.add(
            "correct"
          );


          correctFeedback(
            feedback,
            "✨ ممتاز! إجابتكِ صحيحة."
          );


          options.forEach(
            item => {

              item.disabled = true;

            }
          );


          if (explanation) {

            explanation.classList.remove(
              "hidden"
            );

          }


          if (
            typeof onCorrect ===
            "function"
          ) {

            onCorrect();

          }

        } else {

          option.classList.add(
            "wrong"
          );


          wrongFeedback(
            feedback,
            `مو تمام بعد 🙈 ${wrongHint}`
          );


          setTimeout(
            () => {

              option.classList.remove(
                "wrong"
              );

            },
            600
          );

        }

      }
    );

  });

}


/* =========================================================
   15) حماية النص
========================================================= */

function escapeHTML(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    );

}


/* =========================================================
   16) XP والاكتشافات
========================================================= */

function addXP(
  amount,
  message = ""
) {

  state.xp += amount;


  updateInterface();

  saveProgress();


  if (message) {

    showMiniToast(
      `⚡ +${amount} XP — ${message}`
    );

  }

}


function registerDiscovery(
  lessonNumber,
  text
) {

  const key =
    `${lessonNumber}:${text}`;


  if (
    state.discoveries.includes(
      key
    )
  ) {

    return false;

  }


  state.discoveries.push(
    key
  );


  addXP(
    10,
    "اكتشاف جديد"
  );


  saveProgress();

  return true;

}


/* =========================================================
   17) Toast صغير
========================================================= */

let miniToastTimer = null;


function showMiniToast(
  message
) {

  let toast =
    $("#miniScienceToast");


  if (!toast) {

    toast =
      document.createElement(
        "div"
      );


    toast.id =
      "miniScienceToast";


    toast.style.position =
      "fixed";

    toast.style.right =
      "20px";

    toast.style.bottom =
      "20px";

    toast.style.zIndex =
      "200";

    toast.style.maxWidth =
      "320px";

    toast.style.padding =
      "13px 17px";

    toast.style.borderRadius =
      "16px";

    toast.style.background =
      "#322653";

    toast.style.color =
      "white";

    toast.style.fontWeight =
      "800";

    toast.style.fontSize =
      "12px";

    toast.style.boxShadow =
      "0 15px 35px rgba(30,20,60,.25)";

    toast.style.transition =
      "opacity .25s ease, transform .25s ease";


    document.body.appendChild(
      toast
    );

  }


  toast.textContent =
    message;

  toast.style.opacity =
    "1";

  toast.style.transform =
    "translateY(0)";


  clearTimeout(
    miniToastTimer
  );


  miniToastTimer =
    setTimeout(
      () => {

        toast.style.opacity =
          "0";

        toast.style.transform =
          "translateY(8px)";

      },
      2200
    );

}


/* =========================================================
   18) نهاية المحطة
========================================================= */

function finishLessonUI(
  number
) {

  const lesson =
    LESSONS[number];


  return `
    <section class="finish-mission">

      <div class="finish-icon">
        ${lesson.badge}
      </div>

      <h3>
        المهمة العلمية اكتملت!
      </h3>

      <p>
        سجّلتِ اكتشاف المحطة.
        بقي أن تعتمدي النتيجة
        لتحصلي على الشارة.
      </p>


      <div class="rewards-row">

        <span class="reward-chip">
          ⭐ شارة
        </span>

        <span class="reward-chip">
          ⚡ 100 XP
        </span>

      </div>


      <button
        class="lab-button success finish-lesson-btn"
        type="button"
      >
        🏆 اعتمدي الاكتشاف
      </button>

    </section>
  `;

}


function connectFinishLesson(
  number,
  parent
) {

  const button =
    $(
      ".finish-lesson-btn",
      parent
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      button.disabled = true;

      completeLesson(
        number
      );

    },
    {
      once: true
    }
  );

}


/* =========================================================
   19) إكمال المحطة
========================================================= */

function completeLesson(
  number
) {

  const lesson =
    LESSONS[number];


  const wasCompleted =
    state.completedLessons.has(
      number
    );


  if (!wasCompleted) {

    state.completedLessons.add(
      number
    );


    state.xp += 100;


    saveProgress();

  }


  updateInterface();


  soundUnlock();

  createConfetti(
    34
  );


  earnedBadgeIcon.textContent =
    lesson.badge;

  badgeTitle.textContent =
    lesson.badgeName;

  badgeDescription.textContent =
    lesson.discovery;


  badgeModal.classList.remove(
    "hidden"
  );


  if (
    !wasCompleted &&
    number < 10
  ) {

    setTimeout(
      () => {

        showUnlockToast(
          number + 1
        );

      },
      700
    );

  }

}


/* =========================================================
   20) نافذة الشارة
========================================================= */

badgeContinueBtn.addEventListener(
  "click",
  () => {

    soundClick();

    badgeModal.classList.add(
      "hidden"
    );


    goToMap();

  }
);


/* =========================================================
   21) فتح محطة جديدة
========================================================= */

function showUnlockToast(
  lessonNumber
) {

  const lesson =
    LESSONS[lessonNumber];


  if (!lesson) {
    return;
  }


  unlockText.textContent =
    `${lesson.code} — ${lesson.title}`;


  unlockToast.classList.remove(
    "hidden"
  );


  setTimeout(
    () => {

      unlockToast.classList.add(
        "hidden"
      );

    },
    2800
  );

}


/* =========================================================
   22) تحديث الواجهة
========================================================= */

function updateInterface() {

  const completed =
    state.completedLessons.size;


  const stars =
    completed;


  const percent =
    Math.round(
      (completed / 10) *
      100
    );


  if (mapStudentName) {

    mapStudentName.textContent =
      state.studentName;

  }


  [
    starCount,
    lessonStarCount
  ].forEach(element => {

    if (element) {

      element.textContent =
        stars;

    }

  });


  [
    xpCount,
    lessonXpCount
  ].forEach(element => {

    if (element) {

      element.textContent =
        state.xp;

    }

  });


  progressPercent.textContent =
    `${percent}%`;

  completedCounter.textContent =
    `${completed} من 10`;

  mainProgressBar.style.width =
    `${percent}%`;


  $$(".station-card")
    .forEach(card => {

      const number =
        Number(
          card.dataset.lesson
        );


      const stateLabel =
        $(
          ".station-state",
          card
        );


      const icon =
        $(
          ".station-icon",
          card
        );


      card.classList.remove(
        "completed",
        "locked-station"
      );


      card.disabled = false;


      if (
        state.completedLessons.has(
          number
        )
      ) {

        card.classList.add(
          "completed"
        );


        if (stateLabel) {

          stateLabel.textContent =
            "مكتملة ✓";

        }


        if (icon) {

          icon.textContent =
            LESSONS[number].badge;

        }


        return;
      }


      const unlocked =
        number === 1 ||
        state.completedLessons.has(
          number - 1
        );


      if (unlocked) {

        if (stateLabel) {

          stateLabel.textContent =
            "ابدئي 🚀";

        }


        if (icon) {

          icon.textContent =
            LESSONS[number].icon;

        }

      } else {

        card.classList.add(
          "locked-station"
        );


        card.disabled = false;


        if (stateLabel) {

          stateLabel.textContent =
            "مقفلة 🔒";

        }


        if (icon) {

          icon.textContent =
            "🔒";

        }

      }

    });


  if (
    completed === 10
  ) {

    finalChallengeCard.disabled =
      false;

    finalChallengeCard.classList.remove(
      "locked"
    );

    finalChallengeLock.textContent =
      "🏆";

    finalChallengeDescription.textContent =
      "جميع المحطات مكتملة! المهمة النهائية جاهزة 🔬";

  } else {

    finalChallengeCard.disabled =
      true;

    finalChallengeCard.classList.add(
      "locked"
    );

    finalChallengeLock.textContent =
      "🔒";

    finalChallengeDescription.textContent =
      `أكملي ${
        10 - completed
      } محطة لفتح المهمة النهائية.`;

  }

}


/* =========================================================
   23) Confetti
========================================================= */

function createConfetti(
  amount = 35
) {

  const symbols = [
    "✨",
    "⭐",
    "💜",
    "🩷",
    "🔬",
    "⚛️"
  ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "confetti-piece";


    piece.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    piece.style.left =
      `${Math.random() * 100}%`;


    piece.style.fontSize =
      `${
        13 +
        Math.random() * 15
      }px`;


    piece.style.animationDelay =
      `${
        Math.random() * 0.8
      }s`;


    piece.style.animationDuration =
      `${
        2.2 +
        Math.random() * 1.5
      }s`;


    celebrationLayer.appendChild(
      piece
    );


    setTimeout(
      () => {

        piece.remove();

      },
      4500
    );

  }

}


/* =========================================================
   24) أدوات التجارب
========================================================= */

function wait(ms) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

}


function randomBetween(
  min,
  max
) {

  return (
    Math.random() *
    (max - min) +
    min
  );

}


function createParticle({

  className = "",

  label = "",

  x = 50,

  y = 50

} = {}) {

  const particle =
    document.createElement(
      "span"
    );


  particle.className =
    `particle science-particle ${className}`;


  particle.style.left =
    `${x}%`;

  particle.style.top =
    `${y}%`;


  if (label) {

    particle.textContent =
      label;

  }


  return particle;

}


function discoveryCard(
  icon,
  title,
  text
) {

  return `
    <div class="reveal-card">

      <div
        style="
          font-size:42px;
          margin-bottom:8px;
        "
      >
        ${icon}
      </div>

      <h3 class="box-title">
        ${title}
      </h3>

      <p class="box-text">
        ${text}
      </p>

    </div>
  `;

}


/* =========================================================
   25) أدوات إنشاء الذرات بصريًا
========================================================= */

function atomBubble(
  symbol,
  className = ""
) {

  return `
    <span
      class="molecule-atom ${className}"
    >
      ${symbol}
    </span>
  `;

}


function formulaWithSubscripts(
  formula
) {

  const map = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉"
  };


  return String(formula)
    .replace(
      /\d/g,
      digit =>
        map[digit]
    );

}


/* =========================================================
   26) تهيئة أولية
========================================================= */

loadProgress();

updateSoundButtons();

updateInterface();


/* =========================================================
   🧪 نهاية الجزء 1 / 4

   مهم:
   لا تضيفي </script>
   ولا تمسحي شيئًا.

   الجزء 2 يُلصق مباشرة تحت هذا السطر.
========================================================= */
/* =========================================================
   🧪 مختبر العناصر والمركبات
   PART 2 / 4

   المحطات:
   2-1 الذرات
   2-2 الذرات والعناصر
   2-3 الجدول الدوري
========================================================= */


/* =========================================================
   🔬 المحطة 1 — الذرات
========================================================= */

window.renderLesson1 = function () {

  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        1,
        "ابدئي من قطعة مادة عادية... ثم اقتربي حتى تصلي إلى عالم الذرات."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 الاستكشاف
        </span>

        <h3 class="box-title">
          هل المادة قطعة واحدة فعلًا؟
        </h3>

        <p class="box-text">
          عندما ننظر إلى مادة بأعيننا تبدو لنا متصلة،
          لكن ماذا سنجد إذا استطعنا تكبيرها أكثر وأكثر؟
          اضغطي زر التكبير حتى تصلي إلى أصغر عالم في هذه الرحلة.
        </p>

      </section>


      <section class="lab-panel">

        <div class="zoom-lab">

          <div class="zoom-stage">

            <div
              id="l1ZoomObject"
              class="zoom-object"
            >
              🪨
            </div>

          </div>

          <h3
            id="l1ZoomTitle"
            class="zoom-label"
          >
            قطعة من مادة
          </h3>

          <p
            id="l1ZoomDescription"
            class="zoom-description"
          >
            في البداية تبدو المادة كأنها قطعة واحدة.
          </p>

          <div
            id="l1ZoomProgress"
            class="feedback-message info"
          >
            🔍 مستوى التكبير: 0 من 4
          </div>

          <div class="action-row">

            <button
              id="l1ZoomBtn"
              class="lab-button primary"
              type="button"
            >
              🔍 كبّري المادة
            </button>

          </div>

        </div>

      </section>


      <div
        id="l1AfterZoom"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            ⚛️ وصلنا إلى الذرات!
          </h3>

          <p class="box-text">
            المادة تتكون من ذرات صغيرة جدًا.
            وتوجد أنواع مختلفة من الذرات.
            أما <strong>العنصر</strong> فهو مادة
            تتكون من نوع واحد من الذرات.
          </p>

          <div class="science-note">

            <span>
              🔬
            </span>

            <p>
              الذرات صغيرة جدًا، ويمكن دراسة بعضها
              باستخدام أجهزة خاصة شديدة التكبير.
              سنأخذ الآن نظرة تمهيدية داخل الذرة،
              ثم نبني الذرة بالتفصيل في المحطة 2-4.
            </p>

          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ تجربة
          </span>

          <h3 class="box-title">
            المسِي الذرة
          </h3>

          <p class="box-text">
            اضغطي على الذرات في العينة.
            هل تبدو كلها من النوع نفسه؟
          </p>


          <div
            id="l1AtomTray"
            class="particle-explorer"
          >

            <button
              class="explore-atom l1-sample-atom"
              type="button"
            >
              ⚛️
            </button>

            <button
              class="explore-atom l1-sample-atom"
              type="button"
            >
              ⚛️
            </button>

            <button
              class="explore-atom l1-sample-atom"
              type="button"
            >
              ⚛️
            </button>

            <button
              class="explore-atom l1-sample-atom"
              type="button"
            >
              ⚛️
            </button>

            <button
              class="explore-atom l1-sample-atom"
              type="button"
            >
              ⚛️
            </button>

          </div>


          <div
            id="l1AtomFeedback"
            class="feedback-message info"
          >
            👆 اضغطي على أي ذرة.
          </div>

        </section>


        <section
          id="l1InsideSection"
          class="lab-panel hidden"
        >

          <div class="mission-banner">

            <span>
              🔎
            </span>

            <div>

              <strong>
                نظرة تمهيدية داخل الذرة
              </strong>

              <small>
                التفاصيل الكاملة تنتظركِ في 2-4
              </small>

            </div>

          </div>


          <div class="atom-inside-lab">

            <div class="atom-visual">

              <div class="orbit one"></div>
              <div class="orbit two"></div>

              <button
                id="l1Proton"
                class="particle-button proton-button"
                type="button"
              >
                <span>
                  +
                </span>

                <small>
                  بروتون
                </small>
              </button>

              <button
                id="l1Neutron"
                class="particle-button neutron-button"
                type="button"
              >
                <span>
                  0
                </span>

                <small>
                  نيوترون
                </small>
              </button>

              <button
                id="l1Electron"
                class="particle-button electron-button"
                type="button"
              >
                <span>
                  −
                </span>

                <small>
                  إلكترون
                </small>
              </button>

            </div>

          </div>


          <div
            id="l1InsideFeedback"
            class="feedback-message info"
          >
            اكتشفي الجسيمات الثلاثة 👆
          </div>

          <div
            id="l1ParticleCounter"
            class="discovery-counter"
          >
            0 / 3
          </div>

        </section>


        <div
          id="l1Conclusion"
          class="hidden"
        >

          <div class="particle-fact-grid">

            <div class="particle-fact-card">

              <span class="particle-fact-icon">
                🔴
              </span>

              <strong>
                البروتون
              </strong>

              <p>
                يوجد في النواة ويحمل شحنة موجبة.
              </p>

            </div>


            <div class="particle-fact-card">

              <span class="particle-fact-icon">
                ⚪
              </span>

              <strong>
                النيوترون
              </strong>

              <p>
                يوجد في النواة.
              </p>

            </div>


            <div class="particle-fact-card">

              <span class="particle-fact-icon">
                🔵
              </span>

              <strong>
                الإلكترون
              </strong>

              <p>
                يوجد حول النواة ويحمل شحنة سالبة.
              </p>

            </div>

          </div>


          ${learningSteps(4)}

          ${scientistNotebook({

            id:
              "l1Notebook",

            question:
              "ماذا نستنتج إذا كانت المادة مكوّنة من نوع واحد فقط من الذرات؟",

            observation:
              "جميع الذرات التي استكشفناها في العينة كانت من النوع نفسه.",

            conclusion:
              "المادة التي تتكون من نوع واحد من الذرات تسمى عنصرًا."

          })}


          <div
            id="l1Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "أي عينة تمثل عنصرًا؟",

              answers: [
                "عينة تحتوي نوعًا واحدًا من الذرات",
                "عينة تحتوي نوعين مختلفين من الذرات",
                "عينة لا تحتوي على ذرات"
              ],

              correct:
                "عينة تحتوي نوعًا واحدًا من الذرات",

              explanation:
                "العنصر مادة تتكون من نوع واحد من الذرات."

            })}


            <div id="l1Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const stages = [

    {
      icon: "🪨",
      title: "قطعة من المادة",
      text:
        "تبدو لنا كأنها قطعة واحدة."
    },

    {
      icon: "🔍",
      title: "نقترب أكثر",
      text:
        "بدأنا نبحث عن تفاصيل أصغر لا نراها بالعين."
    },

    {
      icon: "🔬",
      title: "تكبير شديد",
      text:
        "نقترب من العالم المجهري."
    },

    {
      icon: "••••••",
      title: "جسيمات صغيرة جدًا",
      text:
        "المادة ليست كتلة واحدة كما تبدو لنا."
    },

    {
      icon: "⚛️",
      title: "ذرات!",
      text:
        "وصلنا إلى عالم الذرات الصغيرة جدًا."
    }

  ];


  let zoomLevel = 0;

  const zoomBtn =
    $("#l1ZoomBtn");

  const zoomObject =
    $("#l1ZoomObject");

  const zoomTitle =
    $("#l1ZoomTitle");

  const zoomDescription =
    $("#l1ZoomDescription");

  const zoomProgress =
    $("#l1ZoomProgress");


  zoomBtn.addEventListener(
    "click",
    async () => {

      if (
        zoomLevel >= 4
      ) {
        return;
      }

      soundExperiment();

      zoomLevel++;

      zoomObject.classList.add(
        "zoom-pulse"
      );

      await wait(220);

      zoomObject.textContent =
        stages[zoomLevel].icon;

      zoomTitle.textContent =
        stages[zoomLevel].title;

      zoomDescription.textContent =
        stages[zoomLevel].text;

      zoomProgress.innerHTML =
        `🔍 مستوى التكبير:
        <strong>${zoomLevel}</strong>
        من 4`;

      zoomObject.classList.remove(
        "zoom-pulse"
      );


      if (zoomLevel === 4) {

        zoomBtn.disabled = true;

        zoomBtn.textContent =
          "✨ اكتشفتِ الذرات";

        soundUnlock();

        registerDiscovery(
          1,
          "المادة تتكون من ذرات صغيرة جدًا."
        );

        $("#l1AfterZoom")
          .classList.remove(
            "hidden"
          );

        $("#l1AfterZoom")
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      }

    }
  );


  let sampleOpened = false;

  $$(".l1-sample-atom")
    .forEach(atom => {

      atom.addEventListener(
        "click",
        () => {

          soundPop();

          atom.classList.add(
            "atom-selected"
          );

          correctFeedback(
            $("#l1AtomFeedback"),
            "⚛️ هذه ذرة. وجميع الذرات في هذه العينة من النوع نفسه."
          );


          if (!sampleOpened) {

            sampleOpened = true;

            registerDiscovery(
              1,
              "العنصر يتكون من نوع واحد من الذرات."
            );

            $("#l1InsideSection")
              .classList.remove(
                "hidden"
              );

          }

        }
      );

    });


  const foundParticles =
    new Set();


  function revealParticle(
    key,
    message,
    button
  ) {

    foundParticles.add(key);

    button.classList.add(
      "particle-discovered"
    );

    infoFeedback(
      $("#l1InsideFeedback"),
      message
    );

    $("#l1ParticleCounter")
      .textContent =
        `${foundParticles.size} / 3`;


    if (
      foundParticles.size === 3
    ) {

      soundUnlock();

      $("#l1ParticleCounter")
        .textContent =
          "✨ 3 / 3 اكتملت";


      $("#l1Conclusion")
        .classList.remove(
          "hidden"
        );


      connectNotebook(
        $("#l1Conclusion")
      );


      const notebookBtn =
        $(
          ".notebook-reveal-btn",
          $("#l1Conclusion")
        );


      notebookBtn.addEventListener(
        "click",
        () => {

          $("#l1Challenge")
            .classList.remove(
              "hidden"
            );


          connectChoiceChallenge({

            parent:
              $("#l1Challenge"),

            correct:
              "عينة تحتوي نوعًا واحدًا من الذرات",

            wrongHint:
              "فكري في تعريف العنصر: كم نوعًا من الذرات يحتوي؟",

            onCorrect:
              () => {

                $("#l1Finish")
                  .innerHTML =
                    finishLessonUI(1);

                connectFinishLesson(
                  1,
                  $("#l1Finish")
                );

              }

          });

        },
        {
          once: true
        }
      );

    }

  }


  $("#l1Proton")
    .addEventListener(
      "click",
      function () {

        revealParticle(
          "p",
          "🔴 البروتون يوجد في النواة ويحمل شحنة موجبة (+).",
          this
        );

      }
    );


  $("#l1Neutron")
    .addEventListener(
      "click",
      function () {

        revealParticle(
          "n",
          "⚪ النيوترون يوجد مع البروتونات في النواة.",
          this
        );

      }
    );


  $("#l1Electron")
    .addEventListener(
      "click",
      function () {

        revealParticle(
          "e",
          "🔵 الإلكترون يحمل شحنة سالبة (−) ويوجد حول النواة.",
          this
        );

      }
    );

};


/* =========================================================
   🔐 المحطة 2 — الذرات والعناصر
========================================================= */

window.renderLesson2 = function () {

  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        2,
        "لكل عنصر بطاقة تعريف صغيرة جدًا: رمزه الكيميائي."
      )}

      ${learningSteps(1)}


      <section class="discovery-box">

        <span class="mini-label">
          🔐 خزنة الرموز
        </span>

        <h3 class="box-title">
          هل تستطيعين فك الشفرة؟
        </h3>

        <p class="box-text">
          بدل كتابة اسم العنصر كاملًا،
          يستخدم العلماء رموزًا كيميائية.
          افتحي البطاقات الأربع واكتشفي رموز
          الأكسجين والهيليوم والصوديوم والزئبق.
        </p>

      </section>


      <section class="lab-panel">

        <div class="symbol-cards">

          <button
            class="symbol-card l2-card"
            data-symbol="O"
            data-name="الأكسجين"
            type="button"
          >

            <span class="element-symbol">
              ?
            </span>

            <span class="element-name">
              الأكسجين
            </span>

            <span class="symbol-secret">
              اضغطي للكشف
            </span>

          </button>


          <button
            class="symbol-card l2-card"
            data-symbol="He"
            data-name="الهيليوم"
            type="button"
          >

            <span class="element-symbol">
              ?
            </span>

            <span class="element-name">
              الهيليوم
            </span>

            <span class="symbol-secret">
              اضغطي للكشف
            </span>

          </button>


          <button
            class="symbol-card l2-card"
            data-symbol="Na"
            data-name="الصوديوم"
            type="button"
          >

            <span class="element-symbol">
              ?
            </span>

            <span class="element-name">
              الصوديوم
            </span>

            <span class="symbol-secret">
              اضغطي للكشف
            </span>

          </button>


          <button
            class="symbol-card l2-card"
            data-symbol="Hg"
            data-name="الزئبق"
            type="button"
          >

            <span class="element-symbol">
              ?
            </span>

            <span class="element-name">
              الزئبق
            </span>

            <span class="symbol-secret">
              اضغطي للكشف
            </span>

          </button>

        </div>


        <div
          id="l2DiscoverCounter"
          class="discovery-counter"
        >
          اكتشفتِ 0 من 4
        </div>

      </section>


      <div
        id="l2RuleArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 سر كتابة الرموز
          </h3>

          <p class="box-text">
            رمز العنصر قد يتكون من حرف واحد
            أو حرفين.
            يبدأ الرمز بحرف كبير،
            وإذا وُجد حرف ثانٍ فيكتب صغيرًا.
          </p>


          <div class="science-note">

            <span>
              ✍️
            </span>

            <p>
              لاحظي:
              <strong>O</strong> للأكسجين،
              <strong>He</strong> للهيليوم،
              <strong>Na</strong> للصوديوم،
              و<strong>Hg</strong> للزئبق.
            </p>

          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ لعبة المطابقة
          </span>

          <h3 class="box-title">
            اختاري الرمز المطلوب
          </h3>

          <p
            id="l2MatchQuestion"
            class="box-text"
          ></p>


          <div
            id="l2MatchOptions"
            class="action-row"
          ></div>


          <div
            id="l2MatchFeedback"
            class="feedback-message info"
          >
            أمامكِ 4 جولات.
          </div>


          <div
            id="l2MatchCounter"
            class="discovery-counter"
          >
            الجولة 1 / 4
          </div>

        </section>


        <div
          id="l2NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id:
              "l2Notebook",

            question:
              "ما القاعدة التي لاحظتِها في كتابة رموز العناصر؟",

            observation:
              "بعض الرموز تتكون من حرف واحد وبعضها من حرفين مثل O وHe وNa وHg.",

            conclusion:
              "الحرف الأول في الرمز الكيميائي يكتب كبيرًا، وإذا وُجد حرف ثانٍ يكتب صغيرًا."

          })}


          <div
            id="l2Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "أي كتابة صحيحة لرمز الصوديوم؟",

              answers: [
                "Na",
                "NA",
                "na"
              ],

              correct:
                "Na",

              explanation:
                "رمز الصوديوم Na: الحرف الأول كبير والثاني صغير."

            })}


            <div id="l2Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const discovered =
    new Set();


  $$(".l2-card")
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          const symbol =
            card.dataset.symbol;

          const name =
            card.dataset.name;


          $(".element-symbol", card)
            .textContent =
              symbol;


          $(".symbol-secret", card)
            .textContent =
              `${name} ← ${symbol}`;


          card.style.borderColor =
            "#7657d9";


          soundPop();


          discovered.add(
            symbol
          );


          $("#l2DiscoverCounter")
            .textContent =
              `اكتشفتِ ${discovered.size} من 4`;


          if (
            discovered.size === 4
          ) {

            soundUnlock();

            registerDiscovery(
              2,
              "لكل عنصر رمز كيميائي."
            );


            $("#l2RuleArea")
              .classList.remove(
                "hidden"
              );


            startMatchingGame();

          }

        }
      );

    });


  function startMatchingGame() {

    const rounds = [
      {
        name: "الأكسجين",
        correct: "O"
      },
      {
        name: "الهيليوم",
        correct: "He"
      },
      {
        name: "الصوديوم",
        correct: "Na"
      },
      {
        name: "الزئبق",
        correct: "Hg"
      }
    ];


    const symbols = [
      "O",
      "He",
      "Na",
      "Hg"
    ];


    let round = 0;


    function renderRound() {

      if (
        round >= rounds.length
      ) {

        soundCorrect();

        $("#l2MatchQuestion")
          .textContent =
            "✨ فككتِ جميع الرموز بنجاح!";

        $("#l2MatchOptions")
          .innerHTML = "";

        $("#l2MatchCounter")
          .textContent =
            "4 / 4 ✓";


        $("#l2NotebookArea")
          .classList.remove(
            "hidden"
          );


        connectNotebook(
          $("#l2NotebookArea")
        );


        const notebookBtn =
          $(
            ".notebook-reveal-btn",
            $("#l2NotebookArea")
          );


        notebookBtn.addEventListener(
          "click",
          () => {

            $("#l2Challenge")
              .classList.remove(
                "hidden"
              );


            connectChoiceChallenge({

              parent:
                $("#l2Challenge"),

              correct:
                "Na",

              wrongHint:
                "تذكري قاعدة الحرف الأول والحرف الثاني.",

              onCorrect:
                () => {

                  registerDiscovery(
                    2,
                    LESSONS[2].discovery
                  );


                  $("#l2Finish")
                    .innerHTML =
                      finishLessonUI(2);


                  connectFinishLesson(
                    2,
                    $("#l2Finish")
                  );

                }

            });

          },
          {
            once: true
          }
        );


        return;

      }


      const current =
        rounds[round];


      $("#l2MatchQuestion")
        .innerHTML =
          `ما رمز عنصر
          <strong>${current.name}</strong>؟`;


      $("#l2MatchCounter")
        .textContent =
          `الجولة ${round + 1} / 4`;


      $("#l2MatchOptions")
        .innerHTML =
          shuffleArray(symbols)
            .map(
              symbol => `
                <button
                  class="lab-button l2-match-btn"
                  type="button"
                  data-symbol="${symbol}"
                >
                  ${symbol}
                </button>
              `
            )
            .join("");


      $$(".l2-match-btn")
        .forEach(button => {

          button.addEventListener(
            "click",
            () => {

              if (
                button.dataset.symbol ===
                current.correct
              ) {

                correctFeedback(
                  $("#l2MatchFeedback"),
                  `✨ صحيح!
                  ${current.name}
                  = ${current.correct}`
                );


                $$(".l2-match-btn")
                  .forEach(item => {
                    item.disabled = true;
                  });


                round++;


                setTimeout(
                  renderRound,
                  650
                );

              } else {

                wrongFeedback(
                  $("#l2MatchFeedback"),
                  "جربي رمزًا آخر 👀"
                );

              }

            }
          );

        });

    }


    renderRound();

  }

};


/* =========================================================
   🧩 المحطة 3 — الجدول الدوري
========================================================= */

window.renderLesson3 = function () {

  const elements = [

    {
      n: 1,
      s: "H",
      name: "الهيدروجين",
      type: "nonmetal",
      group: 1,
      period: 1
    },

    {
      n: 2,
      s: "He",
      name: "الهيليوم",
      type: "nonmetal",
      group: 8,
      period: 1
    },

    {
      n: 3,
      s: "Li",
      name: "الليثيوم",
      type: "metal",
      group: 1,
      period: 2
    },

    {
      n: 4,
      s: "Be",
      name: "البيريليوم",
      type: "metal",
      group: 2,
      period: 2
    },

    {
      n: 5,
      s: "B",
      name: "البورون",
      type: "nonmetal",
      group: 3,
      period: 2
    },

    {
      n: 6,
      s: "C",
      name: "الكربون",
      type: "nonmetal",
      group: 4,
      period: 2
    },

    {
      n: 7,
      s: "N",
      name: "النيتروجين",
      type: "nonmetal",
      group: 5,
      period: 2
    },

    {
      n: 8,
      s: "O",
      name: "الأكسجين",
      type: "nonmetal",
      group: 6,
      period: 2
    },

    {
      n: 9,
      s: "F",
      name: "الفلور",
      type: "nonmetal",
      group: 7,
      period: 2
    },

    {
      n: 10,
      s: "Ne",
      name: "النيون",
      type: "nonmetal",
      group: 8,
      period: 2
    },

    {
      n: 11,
      s: "Na",
      name: "الصوديوم",
      type: "metal",
      group: 1,
      period: 3
    },

    {
      n: 12,
      s: "Mg",
      name: "المغنيسيوم",
      type: "metal",
      group: 2,
      period: 3
    },

    {
      n: 13,
      s: "Al",
      name: "الألومنيوم",
      type: "metal",
      group: 3,
      period: 3
    },

    {
      n: 14,
      s: "Si",
      name: "السيليكون",
      type: "nonmetal",
      group: 4,
      period: 3
    },

    {
      n: 15,
      s: "P",
      name: "الفوسفور",
      type: "nonmetal",
      group: 5,
      period: 3
    },

    {
      n: 16,
      s: "S",
      name: "الكبريت",
      type: "nonmetal",
      group: 6,
      period: 3
    },

    {
      n: 17,
      s: "Cl",
      name: "الكلور",
      type: "nonmetal",
      group: 7,
      period: 3
    },

    {
      n: 18,
      s: "Ar",
      name: "الأرجون",
      type: "nonmetal",
      group: 8,
      period: 3
    },

    {
      n: 19,
      s: "K",
      name: "البوتاسيوم",
      type: "metal",
      group: 1,
      period: 4
    },

    {
      n: 20,
      s: "Ca",
      name: "الكالسيوم",
      type: "metal",
      group: 2,
      period: 4
    }

  ];


  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        3,
        "هذه ليست مجرد مربعات... إنها خريطة تنظّم العناصر وتكشف أنماطها."
      )}

      ${learningSteps(1)}


      <section class="discovery-box">

        <span class="mini-label">
          🗺️ خريطة العناصر
        </span>

        <h3 class="box-title">
          استكشفي أول 20 عنصرًا
        </h3>

        <p class="box-text">
          اضغطي على أي عنصر لقراءة معلوماته.
          لاحظي أيضًا اختلاف ألوان الفلزات واللافلزات.
        </p>

      </section>


      <section class="lab-panel">

        <div class="periodic-wrapper">

          <div
            id="l3PeriodicGrid"
            class="periodic-grid"
          ></div>

        </div>


        <div class="action-row">

          <span
            class="order-chip"
            style="background:#fff4df;"
          >
            🟨 فلز
          </span>

          <span
            class="order-chip"
            style="background:#eaf8ff;"
          >
            🟦 لافلز
          </span>

        </div>


        <div
          id="l3ElementInfo"
          class="feedback-message info"
        >
          👆 اختاري عنصرًا من الجدول.
        </div>

      </section>


      <div
        id="l3PatternArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 كيف نقرأ الجدول؟
          </h3>

          <p class="box-text">
            الصفوف الأفقية تسمى
            <strong>دورات</strong>،
            والأعمدة الرأسية تسمى
            <strong>مجموعات</strong>.
            العناصر في المجموعة نفسها تقع في العمود نفسه.
          </p>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ مهمة الباحثة
          </span>

          <h3 class="box-title">
            اكتشفي المجموعة الأولى
          </h3>

          <p class="box-text">
            في الجدول المبسط أمامكِ،
            ابحثي عن:
            <strong>Li</strong> ثم
            <strong>Na</strong> ثم
            <strong>K</strong>.
            هذه العناصر تقع في المجموعة الأولى.
          </p>


          <div
            id="l3MissionStatus"
            class="discovery-counter"
          >
            0 / 3
          </div>


          <div
            id="l3MissionFeedback"
            class="feedback-message info"
          >
            ابحثي أولًا عن Li 👀
          </div>

        </section>


        <div
          id="l3SecondMission"
          class="hidden"
        >

          <section class="lab-panel">

            <span class="mini-label">
              🔎 مهمة ثانية
            </span>

            <h3 class="box-title">
              ابحثي عن عنصر في المجموعة السابعة
            </h3>

            <p class="box-text">
              اضغطي على
              <strong>F</strong>
              أو
              <strong>Cl</strong>.
              ستقابلين هذه المجموعة بتفصيل أكبر لاحقًا.
            </p>

            <div
              id="l3Group7Feedback"
              class="feedback-message info"
            >
              👆 اختاري من الجدول.
            </div>

          </section>


          <div
            id="l3NotebookArea"
            class="hidden"
          >

            ${learningSteps(4)}

            ${scientistNotebook({

              id:
                "l3Notebook",

              question:
                "كيف ينظم الجدول الدوري العناصر؟",

              observation:
                "العناصر تظهر في صفوف أفقية وأعمدة رأسية، ووجدنا Li وNa وK في العمود نفسه.",

              conclusion:
                "الصفوف تسمى دورات، والأعمدة تسمى مجموعات."

            })}


            <div
              id="l3Challenge"
              class="hidden"
            >

              ${learningSteps(5)}

              ${createChoiceChallenge({

                question:
                  "ماذا تسمى الأعمدة الرأسية في الجدول الدوري؟",

                answers: [
                  "المجموعات",
                  "الدورات",
                  "الذرات"
                ],

                correct:
                  "المجموعات",

                explanation:
                  "الأعمدة الرأسية تسمى مجموعات، أما الصفوف الأفقية فتسمى دورات."

              })}


              <div id="l3Finish"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;


  const grid =
    $("#l3PeriodicGrid");


  const layout = [

    "H", null, null, null,
    null, null, null, "He",

    "Li", "Be", "B", "C",
    "N", "O", "F", "Ne",

    "Na", "Mg", "Al", "Si",
    "P", "S", "Cl", "Ar",

    "K", "Ca", null, null,
    null, null, null, null

  ];


  layout.forEach(symbol => {

    if (!symbol) {

      const space =
        document.createElement(
          "span"
        );

      space.className =
        "periodic-space";

      grid.appendChild(space);

      return;
    }


    const element =
      elements.find(
        item =>
          item.s === symbol
      );


    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";

    button.className =
      `element-cell ${element.type}`;

    button.dataset.symbol =
      element.s;

    button.dataset.group =
      element.group;

    button.dataset.period =
      element.period;


    button.innerHTML = `
      <span class="atomic-no">
        ${element.n}
      </span>

      <span class="symbol">
        ${element.s}
      </span>
    `;


    grid.appendChild(
      button
    );

  });


  const visited =
    new Set();

  const missionOrder = [
    "Li",
    "Na",
    "K"
  ];

  let missionIndex = 0;

  let missionStarted = false;

  let secondMissionActive =
    false;

  let secondMissionDone =
    false;


  $$(".element-cell", grid)
    .forEach(cell => {

      cell.addEventListener(
        "click",
        () => {

          const symbol =
            cell.dataset.symbol;


          const element =
            elements.find(
              item =>
                item.s === symbol
            );


          soundPop();


          $$(".element-cell", grid)
            .forEach(item => {

              item.classList.remove(
                "highlight"
              );

            });


          cell.classList.add(
            "highlight"
          );


          $("#l3ElementInfo")
            .innerHTML =
              `
                <strong>
                  ${element.s}
                  — ${element.name}
                </strong>
                <br>
                العدد الذري:
                ${element.n}
                • المجموعة:
                ${element.group}
                • الدورة:
                ${element.period}
              `;


          visited.add(
            symbol
          );


          if (
            visited.size >= 4 &&
            !missionStarted
          ) {

            missionStarted = true;


            $("#l3PatternArea")
              .classList.remove(
                "hidden"
              );


            registerDiscovery(
              3,
              "الجدول الدوري ينظم العناصر في مجموعات ودورات."
            );

          }


          if (
            missionStarted &&
            missionIndex <
              missionOrder.length
          ) {

            const expected =
              missionOrder[
                missionIndex
              ];


            if (
              symbol === expected
            ) {

              cell.classList.add(
                "target-good"
              );


              soundCorrect();

              missionIndex++;


              $("#l3MissionStatus")
                .textContent =
                  `${missionIndex} / 3`;


              if (
                missionIndex < 3
              ) {

                $("#l3MissionFeedback")
                  .innerHTML =
                    `✨ وجدتيها!
                    الآن ابحثي عن
                    <strong>${
                      missionOrder[
                        missionIndex
                      ]
                    }</strong>.`;

              } else {

                $("#l3MissionFeedback")
                  .innerHTML =
                    "🎉 Li وNa وK تقع في العمود نفسه: المجموعة الأولى.";


                $("#l3SecondMission")
                  .classList.remove(
                    "hidden"
                  );


                secondMissionActive =
                  true;

              }

            } else if (
              symbol === "Li" ||
              symbol === "Na" ||
              symbol === "K"
            ) {

              infoFeedback(
                $("#l3MissionFeedback"),
                `هذا عنصر من المجموعة الأولى،
                لكن ابحثي الآن عن ${expected}.`
              );

            }

          }


          if (
            secondMissionActive &&
            !secondMissionDone &&
            (
              symbol === "F" ||
              symbol === "Cl"
            )
          ) {

            secondMissionDone =
              true;


            cell.classList.add(
              "target-good"
            );


            correctFeedback(
              $("#l3Group7Feedback"),
              `✨ صحيح!
              ${element.name}
              يقع في المجموعة السابعة.`
            );


            $("#l3NotebookArea")
              .classList.remove(
                "hidden"
              );


            connectNotebook(
              $("#l3NotebookArea")
            );


            const notebookBtn =
              $(
                ".notebook-reveal-btn",
                $("#l3NotebookArea")
              );


            notebookBtn.addEventListener(
              "click",
              () => {

                $("#l3Challenge")
                  .classList.remove(
                    "hidden"
                  );


                connectChoiceChallenge({

                  parent:
                    $("#l3Challenge"),

                  correct:
                    "المجموعات",

                  wrongHint:
                    "انظري إلى اتجاه الأعمدة: هل هي أفقية أم رأسية؟",

                  onCorrect:
                    () => {

                      registerDiscovery(
                        3,
                        LESSONS[3].discovery
                      );


                      $("#l3Finish")
                        .innerHTML =
                          finishLessonUI(3);


                      connectFinishLesson(
                        3,
                        $("#l3Finish")
                      );

                    }

                });

              },
              {
                once: true
              }
            );

          }

        }
      );

    });

};


/* =========================================================
   🧪 نهاية الجزء 2 / 4

   المحطات الجاهزة الآن:
   ✅ 2-1 الذرات
   ✅ 2-2 الذرات والعناصر
   ✅ 2-3 الجدول الدوري

   الجزء 3 يُلصق مباشرة تحت هذا السطر.
========================================================= */
/* =========================================================
   🧪 مختبر العناصر والمركبات
   PART 3 / 4

   المحطات:
   2-4 المزيد حول تركيب الذرة
   2-5 خواص المجموعة الأولى
   2-6 خواص بعض المجموعات الأخرى
   2-7 المركبات الكيميائية
========================================================= */


/* =========================================================
   ⚛️ المحطة 4 — المزيد حول تركيب الذرة
========================================================= */

window.renderLesson4 = function () {

  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        4,
        "حان وقت بناء ذرة حقيقية! مهمتكِ: بناء ذرة الليثيوم ذات العدد الذري 3 والعدد الكتلي 7."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 بطاقة الليثيوم
        </span>

        <h3 class="box-title">
          Li — الليثيوم
        </h3>

        <p class="box-text">
          العدد الذري لليثيوم هو
          <strong>3</strong>،
          والعدد الكتلي هو
          <strong>7</strong>.
          استخدمي هاتين المعلومتين لمعرفة
          عدد البروتونات والنيوترونات والإلكترونات.
        </p>

        <div class="atom-data">

          <div class="data-chip">
            <small>الرمز</small>
            <strong>Li</strong>
          </div>

          <div class="data-chip">
            <small>العدد الذري</small>
            <strong>3</strong>
          </div>

          <div class="data-chip">
            <small>العدد الكتلي</small>
            <strong>7</strong>
          </div>

          <div class="data-chip">
            <small>الشحنة</small>
            <strong>متعادل</strong>
          </div>

        </div>

      </section>


      ${learningSteps(2)}

      <section class="explain-box">

        <h3 class="box-title">
          💡 قبل البناء
        </h3>

        <p class="box-text">
          <strong>العدد الذري</strong>
          يساوي عدد البروتونات.
          أما
          <strong>العدد الكتلي</strong>
          فهو مجموع عدد البروتونات والنيوترونات.
          وفي الذرة المتعادلة يكون عدد الإلكترونات
          مساويًا لعدد البروتونات.
        </p>

        <div class="science-note">

          <span>🧠</span>

          <p>
            لليثيوم:
            3 بروتونات،
            و7 − 3 = 4 نيوترونات،
            ولأنه متعادل فله 3 إلكترونات.
          </p>

        </div>

      </section>


      ${learningSteps(3)}

      <section class="lab-panel">

        <span class="mini-label">
          🕹️ مختبر بناء الذرة
        </span>

        <h3 class="box-title">
          ابنِي ذرة الليثيوم
        </h3>

        <p class="box-text">
          عدّلي أعداد الجسيمات حتى تحصلي على:
          <strong>3 بروتونات + 4 نيوترونات + 3 إلكترونات</strong>.
        </p>


        <div class="atom-builder">

          <div class="builder-visual">

            <div
              id="l4AtomVisual"
              class="atom-visual"
            >

              <div class="orbit one"></div>
              <div class="orbit two"></div>

              <div
                id="l4Nucleus"
                class="atom-nucleus"
              >
                النواة
              </div>

              <div
                id="l4Electrons"
              ></div>

            </div>

          </div>


          <div class="builder-controls">

            <div class="particle-control">

              <strong>
                🔴 البروتونات
              </strong>

              <button
                class="counter-button"
                data-particle="p"
                data-change="-1"
                type="button"
              >
                −
              </button>

              <span
                id="l4PCount"
                class="particle-count"
              >
                0
              </span>

              <button
                class="counter-button"
                data-particle="p"
                data-change="1"
                type="button"
              >
                +
              </button>

            </div>


            <div class="particle-control">

              <strong>
                ⚪ النيوترونات
              </strong>

              <button
                class="counter-button"
                data-particle="n"
                data-change="-1"
                type="button"
              >
                −
              </button>

              <span
                id="l4NCount"
                class="particle-count"
              >
                0
              </span>

              <button
                class="counter-button"
                data-particle="n"
                data-change="1"
                type="button"
              >
                +
              </button>

            </div>


            <div class="particle-control">

              <strong>
                🔵 الإلكترونات
              </strong>

              <button
                class="counter-button"
                data-particle="e"
                data-change="-1"
                type="button"
              >
                −
              </button>

              <span
                id="l4ECount"
                class="particle-count"
              >
                0
              </span>

              <button
                class="counter-button"
                data-particle="e"
                data-change="1"
                type="button"
              >
                +
              </button>

            </div>

          </div>


          <div
            id="l4BuilderFeedback"
            class="feedback-message info"
          >
            🎯 الهدف: 3p + 4n + 3e
          </div>


          <div class="action-row">

            <button
              id="l4CheckAtom"
              class="lab-button primary"
              type="button"
            >
              ⚛️ افحصي الذرة
            </button>

          </div>

        </div>

      </section>


      <div
        id="l4ShellArea"
        class="hidden"
      >

        <section class="explain-box">

          <h3 class="box-title">
            🌀 أين نضع الإلكترونات؟
          </h3>

          <p class="box-text">
            تتحرك الإلكترونات حول النواة في أغلفة.
            في هذا المستوى من دراستكِ،
            الغلاف الأول يتسع لإلكترونين،
            ثم نضع الإلكترون الثالث لليثيوم
            في الغلاف الثاني.
          </p>

          <div class="science-note">
            <span>⚛️</span>
            <p>
              التوزيع الإلكتروني لليثيوم:
              <strong>2، 1</strong>.
            </p>
          </div>

        </section>


        ${learningSteps(4)}

        ${scientistNotebook({

          id: "l4Notebook",

          question:
            "كيف استخدمنا العدد الذري والعدد الكتلي لبناء ذرة الليثيوم؟",

          observation:
            "العدد الذري 3 أعطانا 3 بروتونات، والعدد الكتلي 7 يعني أن عدد النيوترونات 4، والذرة المتعادلة احتوت 3 إلكترونات.",

          conclusion:
            "العدد الذري يساوي عدد البروتونات، والعدد الكتلي يساوي البروتونات + النيوترونات."

        })}


        <div
          id="l4Challenge"
          class="hidden"
        >

          ${learningSteps(5)}

          ${createChoiceChallenge({

            question:
              "ذرة عددها الذري 3 وعددها الكتلي 7. كم نيوترونًا فيها؟",

            answers: [
              "4",
              "3",
              "7"
            ],

            correct:
              "4",

            explanation:
              "عدد النيوترونات = العدد الكتلي − عدد البروتونات = 7 − 3 = 4."

          })}

          <div id="l4Finish"></div>

        </div>

      </div>

    </div>
  `;


  const counts = {
    p: 0,
    n: 0,
    e: 0
  };


  function updateAtomBuilder() {

    $("#l4PCount").textContent =
      counts.p;

    $("#l4NCount").textContent =
      counts.n;

    $("#l4ECount").textContent =
      counts.e;


    $("#l4Nucleus").innerHTML = `
      <span>
        🔴 ${counts.p}p
      </span>
      <br>
      <span>
        ⚪ ${counts.n}n
      </span>
    `;


    const electronArea =
      $("#l4Electrons");


    electronArea.innerHTML = "";


    const positions = [
      {
        left: "47%",
        top: "18%"
      },
      {
        left: "47%",
        top: "73%"
      },
      {
        left: "84%",
        top: "45%"
      },
      {
        left: "9%",
        top: "45%"
      },
      {
        left: "72%",
        top: "18%"
      },
      {
        left: "20%",
        top: "72%"
      },
      {
        left: "73%",
        top: "73%"
      },
      {
        left: "18%",
        top: "18%"
      }
    ];


    for (
      let i = 0;
      i < counts.e;
      i++
    ) {

      const electron =
        document.createElement(
          "span"
        );


      electron.className =
        "electron";

      electron.textContent =
        "−";


      const position =
        positions[
          i %
          positions.length
        ];


      electron.style.left =
        position.left;

      electron.style.top =
        position.top;


      electronArea.appendChild(
        electron
      );

    }

  }


  $$(".counter-button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const particle =
            button.dataset.particle;

          const change =
            Number(
              button.dataset.change
            );


          const next =
            counts[particle] +
            change;


          if (
            next < 0 ||
            next > 8
          ) {

            soundWrong();

            return;
          }


          counts[particle] =
            next;


          soundPop();

          updateAtomBuilder();

        }
      );

    });


  $("#l4CheckAtom")
    .addEventListener(
      "click",
      () => {

        if (
          counts.p === 3 &&
          counts.n === 4 &&
          counts.e === 3
        ) {

          correctFeedback(
            $("#l4BuilderFeedback"),
            "🎉 نجحتِ! بنيتِ ذرة الليثيوم: 3 بروتونات، 4 نيوترونات، 3 إلكترونات."
          );


          $("#l4CheckAtom")
            .disabled = true;


          registerDiscovery(
            4,
            "ذرة الليثيوم: 3 بروتونات و4 نيوترونات و3 إلكترونات."
          );


          $("#l4ShellArea")
            .classList.remove(
              "hidden"
            );


          connectNotebook(
            $("#l4ShellArea")
          );


          const notebookBtn =
            $(
              ".notebook-reveal-btn",
              $("#l4ShellArea")
            );


          notebookBtn.addEventListener(
            "click",
            () => {

              $("#l4Challenge")
                .classList.remove(
                  "hidden"
                );


              connectChoiceChallenge({

                parent:
                  $("#l4Challenge"),

                correct: "4",

                wrongHint:
                  "استخدمي: العدد الكتلي − عدد البروتونات.",

                onCorrect:
                  () => {

                    registerDiscovery(
                      4,
                      LESSONS[4].discovery
                    );


                    $("#l4Finish")
                      .innerHTML =
                        finishLessonUI(4);


                    connectFinishLesson(
                      4,
                      $("#l4Finish")
                    );

                  }

              });

            },
            {
              once: true
            }
          );

        } else {

          let hint = "";


          if (
            counts.p !== 3
          ) {

            hint +=
              " العدد الذري يخبركِ بعدد البروتونات.";

          }


          if (
            counts.n !== 4
          ) {

            hint +=
              " استخدمي 7 − 3 لإيجاد النيوترونات.";

          }


          if (
            counts.e !== 3
          ) {

            hint +=
              " الذرة متعادلة، لذلك الإلكترونات تساوي البروتونات.";

          }


          wrongFeedback(
            $("#l4BuilderFeedback"),
            `الذرة لم تكتمل بعد.${hint}`
          );

        }

      }
    );


  updateAtomBuilder();

};


/* =========================================================
   🔥 المحطة 5 — خواص المجموعة الأولى
========================================================= */

window.renderLesson5 = function () {

  const group1 = [

    {
      symbol: "Li",
      name: "الليثيوم",
      atomic: 3,
      mass: 7,
      melting: 180,
      boiling: 1360
    },

    {
      symbol: "Na",
      name: "الصوديوم",
      atomic: 11,
      mass: 23,
      melting: 98,
      boiling: 900
    },

    {
      symbol: "K",
      name: "البوتاسيوم",
      atomic: 19,
      mass: 39,
      melting: 63,
      boiling: 777
    }

  ];


  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        5,
        "ثلاثة فلزات في المجموعة نفسها... قارني بياناتها واكتشفي النمط بنفسكِ."
      )}

      ${learningSteps(1)}


      <section class="discovery-box">

        <span class="mini-label">
          👀 محطة المقارنة
        </span>

        <h3 class="box-title">
          Li — Na — K
        </h3>

        <p class="box-text">
          الليثيوم والصوديوم والبوتاسيوم
          من عناصر المجموعة الأولى.
          افتحي بطاقات العناصر وقارني
          العدد الذري والعدد الكتلي
          ودرجتي الانصهار والغليان.
        </p>

      </section>


      <section class="lab-panel">

        <div class="element-lab-cards">

          ${group1.map(
            item => `
              <button
                class="element-lab-card l5-element"
                type="button"
                data-symbol="${item.symbol}"
              >

                <div class="big-element-symbol">
                  ${item.symbol}
                </div>

                <strong>
                  ${item.name}
                </strong>

                <div class="element-property-list">

                  <span>
                    العدد الذري:
                    ${item.atomic}
                  </span>

                  <span>
                    العدد الكتلي:
                    ${item.mass}
                  </span>

                  <span>
                    الانصهار:
                    ${item.melting}°C
                  </span>

                  <span>
                    الغليان:
                    ${item.boiling}°C
                  </span>

                </div>

              </button>
            `
          ).join("")}

        </div>


        <div
          id="l5ExploreCounter"
          class="discovery-counter"
        >
          افتحي 0 / 3
        </div>


        <div
          id="l5ExploreFeedback"
          class="feedback-message info"
        >
          👆 اضغطي على كل عنصر للمقارنة.
        </div>

      </section>


      <div
        id="l5TrendArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 ماذا يحدث نزولًا في المجموعة؟
          </h3>

          <p class="box-text">
            من Li إلى Na إلى K
            يزداد العدد الذري والعدد الكتلي،
            ويزداد حجم الذرات.
            وفي البيانات نلاحظ أن
            درجات الانصهار تقل نزولًا في المجموعة.
          </p>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🔥 مختبر الاتجاهات
          </span>

          <h3 class="box-title">
            رتبي درجات الانصهار
          </h3>

          <p class="box-text">
            اضغطي العناصر من
            <strong>أعلى درجة انصهار</strong>
            إلى
            <strong>أقل درجة انصهار</strong>.
          </p>


          <div
            id="l5OrderButtons"
            class="action-row"
          >

            ${shuffleArray(group1)
              .map(
                item => `
                  <button
                    class="lab-button l5-order-btn"
                    type="button"
                    data-symbol="${item.symbol}"
                  >
                    ${item.symbol}
                    —
                    ${item.melting}°C
                  </button>
                `
              )
              .join("")}

          </div>


          <div
            id="l5OrderZone"
            class="order-zone"
          >
            الترتيب سيظهر هنا
          </div>


          <div
            id="l5OrderFeedback"
            class="feedback-message info"
          >
            ابدئي بالعنصر ذي درجة الانصهار الأعلى.
          </div>

        </section>


        <div
          id="l5ReactionArea"
          class="hidden"
        >

          <section class="lab-panel">

            <span class="mini-label">
              💧 محاكاة ملاحظة
            </span>

            <h3 class="box-title">
              عناصر المجموعة الأولى والماء
            </h3>

            <p class="box-text">
              في الدرس تُقارن تفاعلات
              الليثيوم والصوديوم والبوتاسيوم مع الماء.
              اضغطي على كل عنصر لمشاهدة مقارنة
              تمثيلية للنشاط.
            </p>


            <div class="action-row">

              <button
                class="lab-button l5-react-btn"
                data-element="Li"
                type="button"
              >
                💧 Li
              </button>

              <button
                class="lab-button l5-react-btn"
                data-element="Na"
                type="button"
              >
                💧 Na
              </button>

              <button
                class="lab-button l5-react-btn"
                data-element="K"
                type="button"
              >
                💧 K
              </button>

            </div>


            <div
              id="l5ReactionStage"
              class="experiment-stage"
              style="
                display:grid;
                place-items:center;
                text-align:center;
                font-size:45px;
              "
            >
              💧
            </div>


            <div
              id="l5ReactionFeedback"
              class="feedback-message info"
            >
              اختاري عنصرًا للمقارنة.
            </div>


            <div class="science-note">

              <span>🧤</span>

              <p>
                هذه محاكاة تعليمية فقط.
                تفاعلات فلزات المجموعة الأولى
                تُجرى في المختبر وفق تعليمات السلامة.
              </p>

            </div>

          </section>


          <div
            id="l5NotebookArea"
            class="hidden"
          >

            ${learningSteps(4)}

            ${scientistNotebook({

              id: "l5Notebook",

              question:
                "ما الاتجاه الذي لاحظتِه في درجات انصهار Li وNa وK؟",

              observation:
                "درجة انصهار Li هي 180°C، وNa هي 98°C، وK هي 63°C.",

              conclusion:
                "تقل درجات الانصهار نزولًا في المجموعة الأولى من الليثيوم إلى البوتاسيوم."

            })}


            <div
              id="l5Challenge"
              class="hidden"
            >

              ${learningSteps(5)}

              ${createChoiceChallenge({

                question:
                  "أي ترتيب صحيح لدرجات الانصهار من الأعلى إلى الأقل؟",

                answers: [
                  "Li ثم Na ثم K",
                  "K ثم Na ثم Li",
                  "Na ثم K ثم Li"
                ],

                correct:
                  "Li ثم Na ثم K",

                explanation:
                  "180°C > 98°C > 63°C، لذلك الترتيب Li ثم Na ثم K."

              })}

              <div id="l5Finish"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;


  const explored =
    new Set();


  $$(".l5-element")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const symbol =
            button.dataset.symbol;


          explored.add(
            symbol
          );


          button.style.borderColor =
            "#7657d9";


          soundPop();


          $("#l5ExploreCounter")
            .textContent =
              `فتحتِ ${explored.size} / 3`;


          const item =
            group1.find(
              element =>
                element.symbol ===
                symbol
            );


          infoFeedback(
            $("#l5ExploreFeedback"),
            `${item.name}: العدد الذري ${item.atomic}، العدد الكتلي ${item.mass}، الانصهار ${item.melting}°C، الغليان ${item.boiling}°C.`
          );


          if (
            explored.size === 3
          ) {

            $("#l5TrendArea")
              .classList.remove(
                "hidden"
              );


            registerDiscovery(
              5,
              "Li وNa وK من عناصر المجموعة الأولى."
            );

          }

        }
      );

    });


  const selectedOrder = [];

  const correctOrder = [
    "Li",
    "Na",
    "K"
  ];


  $$(".l5-order-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (
            button.disabled
          ) {
            return;
          }


          soundClick();


          selectedOrder.push(
            button.dataset.symbol
          );


          button.disabled =
            true;


          $("#l5OrderZone")
            .innerHTML =
              selectedOrder
                .map(
                  symbol =>
                    `<span class="order-chip">${symbol}</span>`
                )
                .join(" ← ");


          const index =
            selectedOrder.length - 1;


          if (
            selectedOrder[index] !==
            correctOrder[index]
          ) {

            soundWrong();


            selectedOrder.length =
              0;


            $$(".l5-order-btn")
              .forEach(item => {
                item.disabled = false;
              });


            $("#l5OrderZone")
              .textContent =
                "حاولي من جديد";


            wrongFeedback(
              $("#l5OrderFeedback"),
              "قارني الأرقام: 180، 98، 63."
            );


            return;
          }


          if (
            selectedOrder.length === 3
          ) {

            correctFeedback(
              $("#l5OrderFeedback"),
              "✨ صحيح! 180 > 98 > 63، إذن Li ثم Na ثم K."
            );


            $("#l5ReactionArea")
              .classList.remove(
                "hidden"
              );

          }

        }
      );

    });


  const reactionsSeen =
    new Set();


  const reactionData = {

    Li: {
      icon: "💧✨",
      text:
        "الليثيوم يتفاعل مع الماء."
    },

    Na: {
      icon: "💧✨✨",
      text:
        "الصوديوم أكثر نشاطًا من الليثيوم."
    },

    K: {
      icon: "💧✨✨✨",
      text:
        "البوتاسيوم أكثر نشاطًا من الصوديوم والليثيوم."
    }

  };


  $$(".l5-react-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const symbol =
            button.dataset.element;

          const data =
            reactionData[symbol];


          reactionsSeen.add(
            symbol
          );


          soundExperiment();


          $("#l5ReactionStage")
            .textContent =
              data.icon;


          infoFeedback(
            $("#l5ReactionFeedback"),
            data.text
          );


          if (
            reactionsSeen.size === 3
          ) {

            $("#l5NotebookArea")
              .classList.remove(
                "hidden"
              );


            connectNotebook(
              $("#l5NotebookArea")
            );


            const notebookBtn =
              $(
                ".notebook-reveal-btn",
                $("#l5NotebookArea")
              );


            notebookBtn.addEventListener(
              "click",
              () => {

                $("#l5Challenge")
                  .classList.remove(
                    "hidden"
                  );


                connectChoiceChallenge({

                  parent:
                    $("#l5Challenge"),

                  correct:
                    "Li ثم Na ثم K",

                  wrongHint:
                    "راجعي درجات الانصهار: Li = 180، Na = 98، K = 63.",

                  onCorrect:
                    () => {

                      registerDiscovery(
                        5,
                        LESSONS[5].discovery
                      );


                      $("#l5Finish")
                        .innerHTML =
                          finishLessonUI(5);


                      connectFinishLesson(
                        5,
                        $("#l5Finish")
                      );

                    }

                });

              },
              {
                once: true
              }
            );

          }

        }
      );

    });

};


/* =========================================================
   🧪 المحطة 6 — خواص بعض المجموعات الأخرى
   المجموعة السابعة / الهالوجينات
========================================================= */

window.renderLesson6 = function () {

  const halogens = [

    {
      symbol: "F",
      name: "الفلور",
      atomic: 9,
      mass: 19,
      config: "2،7",
      color: "أصفر باهت",
      state: "غاز",
      melting: -220,
      boiling: -188,
      activity: 3
    },

    {
      symbol: "Cl",
      name: "الكلور",
      atomic: 17,
      mass: 35,
      config: "2،8،7",
      color: "أخضر مصفر",
      state: "غاز",
      melting: -101,
      boiling: -34,
      activity: 2
    },

    {
      symbol: "Br",
      name: "البروم",
      atomic: 35,
      mass: 80,
      config: "2،8،18،7",
      color: "بني",
      state: "سائل",
      melting: -7,
      boiling: 59,
      activity: 1
    }

  ];


  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        6,
        "ادخلي مختبر الهالوجينات وقارني الفلور والكلور والبروم."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 المجموعة السابعة
        </span>

        <h3 class="box-title">
          ثلاثة عناصر... ما أوجه التشابه والاختلاف؟
        </h3>

        <p class="box-text">
          افتحي بطاقات F وCl وBr.
          قارني اللون والحالة الفيزيائية
          ودرجات الانصهار والغليان
          والتوزيع الإلكتروني.
        </p>

      </section>


      <section class="lab-panel">

        <div class="element-lab-cards">

          ${halogens.map(
            item => `
              <button
                class="element-lab-card l6-card"
                type="button"
                data-symbol="${item.symbol}"
              >

                <div class="big-element-symbol">
                  ${item.symbol}
                </div>

                <strong>
                  ${item.name}
                </strong>

                <div class="element-property-list">

                  <span>
                    العدد الذري:
                    ${item.atomic}
                  </span>

                  <span>
                    العدد الكتلي:
                    ${item.mass}
                  </span>

                  <span>
                    التوزيع:
                    ${item.config}
                  </span>

                  <span>
                    اللون:
                    ${item.color}
                  </span>

                  <span>
                    الحالة:
                    ${item.state}
                  </span>

                  <span>
                    الانصهار:
                    ${item.melting}°C
                  </span>

                  <span>
                    الغليان:
                    ${item.boiling}°C
                  </span>

                </div>

              </button>
            `
          ).join("")}

        </div>


        <div
          id="l6Counter"
          class="discovery-counter"
        >
          0 / 3
        </div>


        <div
          id="l6Info"
          class="feedback-message info"
        >
          👆 استكشفي العناصر الثلاثة.
        </div>

      </section>


      <div
        id="l6CompareArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 ماذا لاحظتِ؟
          </h3>

          <p class="box-text">
            الفلور والكلور غازان،
            بينما البروم سائل.
            كما أن نشاط الهالوجينات
            يقل نزولًا في المجموعة:
            الفلور أكثر نشاطًا،
            يليه الكلور،
            ثم البروم.
          </p>

          <div class="science-note">

            <span>⚛️</span>

            <p>
              لاحظي أن التوزيع الإلكتروني
              لكل واحد منها ينتهي بـ
              <strong>7 إلكترونات</strong>
              في الغلاف الخارجي.
            </p>

          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ مقياس النشاط
          </span>

          <h3 class="box-title">
            من الأكثر نشاطًا؟
          </h3>

          <p class="box-text">
            اضغطي على العناصر بالترتيب
            من <strong>الأكثر نشاطًا</strong>
            إلى <strong>الأقل نشاطًا</strong>.
          </p>


          <div
            id="l6ActivityButtons"
            class="action-row"
          >

            ${shuffleArray(halogens)
              .map(
                item => `
                  <button
                    class="lab-button l6-activity-btn"
                    data-symbol="${item.symbol}"
                    type="button"
                  >
                    ${item.symbol}
                  </button>
                `
              )
              .join("")}

          </div>


          <div
            id="l6Order"
            class="order-zone"
          >
            الترتيب سيظهر هنا
          </div>


          <div
            id="l6ActivityFeedback"
            class="feedback-message info"
          >
            ابدئي بالأكثر نشاطًا.
          </div>

        </section>


        <div
          id="l6NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id: "l6Notebook",

            question:
              "ما النمط الذي لاحظتِه في نشاط F وCl وBr؟",

            observation:
              "الفلور أكثر نشاطًا من الكلور، والكلور أكثر نشاطًا من البروم.",

            conclusion:
              "يقل نشاط عناصر المجموعة السابعة نزولًا في المجموعة."

          })}


          <div
            id="l6Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "أي عبارة صحيحة عن البروم في بيانات الدرس؟",

              answers: [
                "البروم سائل ولونه بني",
                "البروم غاز ولونه أصفر باهت",
                "البروم غاز ولونه أخضر مصفر"
              ],

              correct:
                "البروم سائل ولونه بني",

              explanation:
                "في البيانات: البروم Br لونه بني وهو سائل."

            })}

            <div id="l6Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const explored =
    new Set();


  $$(".l6-card")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const symbol =
            button.dataset.symbol;


          const item =
            halogens.find(
              element =>
                element.symbol ===
                symbol
            );


          explored.add(
            symbol
          );


          button.style.borderColor =
            "#7657d9";


          soundPop();


          $("#l6Counter")
            .textContent =
              `${explored.size} / 3`;


          infoFeedback(
            $("#l6Info"),
            `${item.name}: ${item.color}، ${item.state}، وتوزيعه الإلكتروني ${item.config}.`
          );


          if (
            explored.size === 3
          ) {

            $("#l6CompareArea")
              .classList.remove(
                "hidden"
              );


            registerDiscovery(
              6,
              "F وCl وBr من عناصر المجموعة السابعة."
            );

          }

        }
      );

    });


  const correctOrder = [
    "F",
    "Cl",
    "Br"
  ];

  const chosen =
    [];


  $$(".l6-activity-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const symbol =
            button.dataset.symbol;


          const expected =
            correctOrder[
              chosen.length
            ];


          if (
            symbol !== expected
          ) {

            wrongFeedback(
              $("#l6ActivityFeedback"),
              "راجعي ترتيب النشاط: الفلور هو الأكثر نشاطًا."
            );

            return;
          }


          chosen.push(
            symbol
          );


          button.disabled =
            true;


          soundCorrect();


          $("#l6Order")
            .innerHTML =
              chosen
                .map(
                  item =>
                    `<span class="order-chip">${item}</span>`
                )
                .join(" ← ");


          if (
            chosen.length < 3
          ) {

            infoFeedback(
              $("#l6ActivityFeedback"),
              "ممتاز! اختاري العنصر التالي."
            );

          } else {

            correctFeedback(
              $("#l6ActivityFeedback"),
              "✨ صحيح! F ثم Cl ثم Br."
            );


            $("#l6NotebookArea")
              .classList.remove(
                "hidden"
              );


            connectNotebook(
              $("#l6NotebookArea")
            );


            const notebookBtn =
              $(
                ".notebook-reveal-btn",
                $("#l6NotebookArea")
              );


            notebookBtn.addEventListener(
              "click",
              () => {

                $("#l6Challenge")
                  .classList.remove(
                    "hidden"
                  );


                connectChoiceChallenge({

                  parent:
                    $("#l6Challenge"),

                  correct:
                    "البروم سائل ولونه بني",

                  wrongHint:
                    "قارني حالة ولون Br في البطاقة.",

                  onCorrect:
                    () => {

                      registerDiscovery(
                        6,
                        LESSONS[6].discovery
                      );


                      $("#l6Finish")
                        .innerHTML =
                          finishLessonUI(6);


                      connectFinishLesson(
                        6,
                        $("#l6Finish")
                      );

                    }

                });

              },
              {
                once: true
              }
            );

          }

        }
      );

    });

};


/* =========================================================
   🔗 المحطة 7 — المركبات الكيميائية
========================================================= */

window.renderLesson7 = function () {

  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        7,
        "ماذا يحدث عندما تتحد ذرات من عناصر مختلفة؟ حان وقت صنع مركب."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 قبل الاتحاد
        </span>

        <h3 class="box-title">
          عنصران مختلفان
        </h3>

        <p class="box-text">
          أمامكِ ذرة صوديوم
          <strong>Na</strong>
          وذرة كلور
          <strong>Cl</strong>.
          كل واحدة تمثل عنصرًا مختلفًا.
          اضغطي عليهما لاستكشافهما،
          ثم اجمعيهما.
        </p>

      </section>


      <section class="lab-panel">

        <div
          id="l7BondLab"
          class="bond-lab"
        >

          <button
            id="l7Na"
            class="bond-atom na"
            type="button"
          >
            Na
          </button>


          <div
            id="l7BondSpace"
            style="
              min-width:70px;
              text-align:center;
              font-size:25px;
            "
          >
            +
          </div>


          <button
            id="l7Cl"
            class="bond-atom cl"
            type="button"
          >
            Cl
          </button>

        </div>


        <div
          id="l7ExploreFeedback"
          class="feedback-message info"
        >
          👆 اضغطي Na وCl أولًا.
        </div>


        <div class="action-row">

          <button
            id="l7CombineBtn"
            class="lab-button primary"
            type="button"
            disabled
          >
            🔗 كوّني المركب
          </button>

        </div>

      </section>


      <div
        id="l7CompoundArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            ✨ تكوّن مركب جديد
          </h3>

          <div class="formula-display">
            NaCl
          </div>

          <p class="box-text">
            عند اتحاد الصوديوم والكلور كيميائيًا
            يتكون <strong>كلوريد الصوديوم</strong>.
            المركب يتكون من ذرات عناصر مختلفة
            مرتبطة كيميائيًا.
          </p>

          <div class="science-note">

            <span>🧂</span>

            <p>
              خواص المركب الجديد تختلف عن
              خواص العناصر التي تكوّن منها.
            </p>

          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ مختبر التصنيف
          </span>

          <h3 class="box-title">
            عنصر أم مركب؟
          </h3>

          <p class="box-text">
            افحصي النماذج التالية واختاري وصفها.
          </p>


          <div class="sample-grid">

            <button
              class="sample-card l7-sample"
              data-answer="element"
              type="button"
            >
              <span class="sample-icon">
                🔵 🔵 🔵
              </span>

              <strong>
                نوع واحد من الذرات
              </strong>

              <small>
                اضغطي للتصنيف
              </small>
            </button>


            <button
              class="sample-card l7-sample"
              data-answer="compound"
              type="button"
            >
              <span class="sample-icon">
                🔵🟢 🔵🟢
              </span>

              <strong>
                ذرات مختلفة متحدة
              </strong>

              <small>
                اضغطي للتصنيف
              </small>
            </button>

          </div>


          <div
            id="l7Classification"
            class="feedback-message info"
          >
            صنفي النموذجين.
          </div>


          <div
            id="l7ClassificationCounter"
            class="discovery-counter"
          >
            0 / 2
          </div>

        </section>


        <div
          id="l7NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id: "l7Notebook",

            question:
              "ما الفرق الذي لاحظتِه بين العنصر والمركب؟",

            observation:
              "العنصر احتوى نوعًا واحدًا من الذرات، بينما نموذج المركب احتوى ذرات من عناصر مختلفة متحدة معًا.",

            conclusion:
              "يتكون المركب عندما تتحد ذرات من عناصر مختلفة كيميائيًا."

          })}


          <div
            id="l7Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "ماذا ينتج عند اتحاد الصوديوم والكلور كيميائيًا؟",

              answers: [
                "كلوريد الصوديوم",
                "عنصر الصوديوم فقط",
                "عنصر الكلور فقط"
              ],

              correct:
                "كلوريد الصوديوم",

              explanation:
                "اتحاد Na مع Cl يعطي مركب كلوريد الصوديوم NaCl."

            })}

            <div id="l7Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const selected =
    new Set();


  function checkAtoms() {

    if (
      selected.size === 2
    ) {

      $("#l7CombineBtn")
        .disabled = false;


      correctFeedback(
        $("#l7ExploreFeedback"),
        "✨ أصبح العنصران جاهزين للاتحاد. اضغطي «كوّني المركب»."
      );

    }

  }


  $("#l7Na")
    .addEventListener(
      "click",
      function () {

        selected.add(
          "Na"
        );

        this.classList.add(
          "active"
        );

        soundPop();

        infoFeedback(
          $("#l7ExploreFeedback"),
          "🔵 Na يمثل الصوديوم."
        );

        checkAtoms();

      }
    );


  $("#l7Cl")
    .addEventListener(
      "click",
      function () {

        selected.add(
          "Cl"
        );

        this.classList.add(
          "active"
        );

        soundPop();

        infoFeedback(
          $("#l7ExploreFeedback"),
          "🟢 Cl يمثل الكلور."
        );

        checkAtoms();

      }
    );


  $("#l7CombineBtn")
    .addEventListener(
      "click",
      async () => {

        soundExperiment();


        $("#l7CombineBtn")
          .disabled = true;


        $("#l7BondSpace")
          .innerHTML =
            `<div class="bond-line"></div>`;


        $("#l7Na")
          .style.transform =
            "translateX(-15px)";

        $("#l7Cl")
          .style.transform =
            "translateX(15px)";


        await wait(500);


        $("#l7ExploreFeedback")
          .className =
            "feedback-message good";

        $("#l7ExploreFeedback")
          .innerHTML =
            "🎉 تكون مركب كلوريد الصوديوم NaCl!";


        $("#l7CompoundArea")
          .classList.remove(
            "hidden"
          );


        registerDiscovery(
          7,
          "اتحاد الصوديوم والكلور كيميائيًا ينتج كلوريد الصوديوم."
        );

      }
    );


  let classified =
    0;


  $$(".l7-sample")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (
            button.disabled
          ) {
            return;
          }


          const answer =
            button.dataset.answer;


          button.disabled =
            true;

          button.style.borderColor =
            "#65c89c";


          classified++;


          if (
            answer === "element"
          ) {

            correctFeedback(
              $("#l7Classification"),
              "🔵 النوع الواحد من الذرات يمثل عنصرًا."
            );

          } else {

            correctFeedback(
              $("#l7Classification"),
              "🔵🟢 الذرات المختلفة المتحدة كيميائيًا تمثل مركبًا."
            );

          }


          $("#l7ClassificationCounter")
            .textContent =
              `${classified} / 2`;


          if (
            classified === 2
          ) {

            $("#l7NotebookArea")
              .classList.remove(
                "hidden"
              );


            connectNotebook(
              $("#l7NotebookArea")
            );


            const notebookBtn =
              $(
                ".notebook-reveal-btn",
                $("#l7NotebookArea")
              );


            notebookBtn.addEventListener(
              "click",
              () => {

                $("#l7Challenge")
                  .classList.remove(
                    "hidden"
                  );


                connectChoiceChallenge({

                  parent:
                    $("#l7Challenge"),

                  correct:
                    "كلوريد الصوديوم",

                  wrongHint:
                    "راجعي المركب الذي صنعناه من Na وCl.",

                  onCorrect:
                    () => {

                      registerDiscovery(
                        7,
                        LESSONS[7].discovery
                      );


                      $("#l7Finish")
                        .innerHTML =
                          finishLessonUI(7);


                      connectFinishLesson(
                        7,
                        $("#l7Finish")
                      );

                    }

                });

              },
              {
                once: true
              }
            );

          }

        }
      );

    });

};


/* =========================================================
   🧪 نهاية الجزء 3 / 4

   أصبح لدينا:
   ✅ 2-1 الذرات
   ✅ 2-2 الذرات والعناصر
   ✅ 2-3 الجدول الدوري
   ✅ 2-4 تركيب الذرة
   ✅ 2-5 المجموعة الأولى
   ✅ 2-6 المجموعة السابعة
   ✅ 2-7 المركبات الكيميائية

   الجزء 4 يُلصق مباشرة تحت هذا السطر.
   وهو الجزء الأخير 🎀
========================================================= */
/* =========================================================
   🧪 مختبر العناصر والمركبات
   PART 4 / 4 — FINAL

   المحطات:
   2-8 الصيغ الكيميائية
   2-9 المركبات والمخاليط
   2-10 المزيد حول المخاليط
   + التحدي النهائي
   + الشهادة
========================================================= */


/* =========================================================
   🧬 المحطة 8 — الصيغ الكيميائية
========================================================= */

window.renderLesson8 = function () {

  const molecules = {

    H2O: {
      formula: "H2O",
      name: "الماء",
      atoms: [
        ["H", "atom-h"],
        ["H", "atom-h"],
        ["O", "atom-o"]
      ],
      counts: {
        H: 2,
        O: 1,
        C: 0
      }
    },

    CO2: {
      formula: "CO2",
      name: "ثاني أكسيد الكربون",
      atoms: [
        ["C", "atom-c"],
        ["O", "atom-o"],
        ["O", "atom-o"]
      ],
      counts: {
        H: 0,
        O: 2,
        C: 1
      }
    },

    CH4: {
      formula: "CH4",
      name: "الميثان",
      atoms: [
        ["C", "atom-c"],
        ["H", "atom-h"],
        ["H", "atom-h"],
        ["H", "atom-h"],
        ["H", "atom-h"]
      ],
      counts: {
        H: 4,
        O: 0,
        C: 1
      }
    },

    O2: {
      formula: "O2",
      name: "الأكسجين",
      atoms: [
        ["O", "atom-o"],
        ["O", "atom-o"]
      ],
      counts: {
        H: 0,
        O: 2,
        C: 0
      }
    }

  };


  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        8,
        "الصيغة الكيميائية مثل شفرة صغيرة تخبرنا بأنواع الذرات وأعدادها."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 فكّي الصيغة
        </span>

        <h3 class="box-title">
          ماذا يخبرنا الرقم الصغير؟
        </h3>

        <p class="box-text">
          استكشفي الصيغ:
          H₂O وCO₂ وCH₄ وO₂.
          اضغطي على كل بطاقة لتري
          نموذج الذرات الذي تمثله.
        </p>

      </section>


      <section class="lab-panel">

        <div class="symbol-cards">

          ${Object.values(molecules)
            .map(
              item => `
                <button
                  class="symbol-card l8-formula-card"
                  type="button"
                  data-formula="${item.formula}"
                >
                  <span class="element-symbol">
                    ${formulaWithSubscripts(item.formula)}
                  </span>

                  <span class="element-name">
                    ${item.name}
                  </span>

                  <span class="symbol-secret">
                    اضغطي للاستكشاف
                  </span>
                </button>
              `
            )
            .join("")}

        </div>


        <div
          id="l8Preview"
          class="molecule-workbench"
        >
          👆 اختاري صيغة لرؤية نموذجها.
        </div>


        <div
          id="l8Info"
          class="feedback-message info"
        >
          الرقم الصغير في الصيغة يدل على عدد الذرات من ذلك النوع.
        </div>


        <div
          id="l8ExploreCounter"
          class="discovery-counter"
        >
          0 / 4
        </div>

      </section>


      <div
        id="l8BuilderArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 قراءة الصيغة
          </h3>

          <p class="box-text">
            في H₂O يوجد
            <strong>ذرتان من الهيدروجين</strong>
            و<strong>ذرة واحدة من الأكسجين</strong>.
            وإذا لم يوجد رقم صغير بعد رمز العنصر
            فهذا يعني وجود ذرة واحدة منه.
          </p>

          <div class="science-note">
            <span>🔎</span>
            <p>
              O₂ يتكون من نوع واحد من الذرات،
              لذلك يمثل عنصرًا، أما H₂O وCO₂ وCH₄
              فتحتوي جزيئاتها على أنواع مختلفة من الذرات
              ولذلك تمثل مركبات.
            </p>
          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            🕹️ مصنع الجزيئات
          </span>

          <h3 class="box-title">
            ابنِي جزيء الماء H₂O
          </h3>

          <p class="box-text">
            أضيفي الذرات إلى منصة البناء.
            المطلوب بالضبط:
            <strong>2H + 1O</strong>.
          </p>


          <div
            id="l8Workbench"
            class="molecule-workbench"
          >
            المنصة فارغة 🧪
          </div>


          <div class="action-row">

            <button
              class="lab-button l8-add"
              data-atom="H"
              type="button"
            >
              + H
            </button>

            <button
              class="lab-button l8-add"
              data-atom="O"
              type="button"
            >
              + O
            </button>

            <button
              class="lab-button l8-add"
              data-atom="C"
              type="button"
            >
              + C
            </button>

            <button
              id="l8Reset"
              class="lab-button"
              type="button"
            >
              ↻ إعادة
            </button>

          </div>


          <div
            id="l8BuilderFeedback"
            class="feedback-message info"
          >
            🎯 الهدف: H₂O
          </div>


          <div class="action-row">

            <button
              id="l8Check"
              class="lab-button primary"
              type="button"
            >
              🔬 افحصي الجزيء
            </button>

          </div>

        </section>


        <div
          id="l8NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id: "l8Notebook",

            question:
              "ماذا يخبرنا الرقم 2 في الصيغة H₂O؟",

            observation:
              "عند بناء H₂O احتجنا إلى ذرتين H وذرة واحدة O.",

            conclusion:
              "الرقم الصغير في الصيغة يوضح عدد ذرات العنصر، وعدم وجود رقم يعني ذرة واحدة."

          })}


          <div
            id="l8Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "أي صيغة تمثل عنصرًا وليست مركبًا؟",

              answers: [
                "O₂",
                "H₂O",
                "CO₂",
                "CH₄"
              ],

              correct:
                "O₂",

              explanation:
                "O₂ يحتوي نوعًا واحدًا فقط من الذرات، وهو الأكسجين."

            })}

            <div id="l8Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const explored =
    new Set();


  $$(".l8-formula-card")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const formula =
            button.dataset.formula;

          const item =
            molecules[formula];


          explored.add(
            formula
          );


          soundPop();


          $("#l8Preview")
            .innerHTML =
              item.atoms
                .map(
                  atom =>
                    atomBubble(
                      atom[0],
                      atom[1]
                    )
                )
                .join("");


          const description =
            Object.entries(
              item.counts
            )
              .filter(
                ([, count]) =>
                  count > 0
              )
              .map(
                ([symbol, count]) =>
                  `${count} ${symbol}`
              )
              .join(" + ");


          infoFeedback(
            $("#l8Info"),
            `${formulaWithSubscripts(item.formula)}
            = ${description}`
          );


          button.style.borderColor =
            "#7657d9";


          $("#l8ExploreCounter")
            .textContent =
              `${explored.size} / 4`;


          if (
            explored.size === 4
          ) {

            $("#l8BuilderArea")
              .classList.remove(
                "hidden"
              );


            registerDiscovery(
              8,
              "الصيغة الكيميائية توضح أنواع الذرات وأعدادها."
            );

          }

        }
      );

    });


  const build = {
    H: 0,
    O: 0,
    C: 0
  };


  function renderMoleculeBuild() {

    const workbench =
      $("#l8Workbench");


    const total =
      build.H +
      build.O +
      build.C;


    if (total === 0) {

      workbench.innerHTML =
        "المنصة فارغة 🧪";

      return;
    }


    let html = "";


    for (
      let i = 0;
      i < build.H;
      i++
    ) {

      html +=
        atomBubble(
          "H",
          "atom-h"
        );

    }


    for (
      let i = 0;
      i < build.O;
      i++
    ) {

      html +=
        atomBubble(
          "O",
          "atom-o"
        );

    }


    for (
      let i = 0;
      i < build.C;
      i++
    ) {

      html +=
        atomBubble(
          "C",
          "atom-c"
        );

    }


    workbench.innerHTML =
      html;

  }


  $$(".l8-add")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const atom =
            button.dataset.atom;


          if (
            build[atom] >= 5
          ) {

            soundWrong();

            return;
          }


          build[atom]++;

          soundPop();

          renderMoleculeBuild();

        }
      );

    });


  $("#l8Reset")
    .addEventListener(
      "click",
      () => {

        build.H = 0;
        build.O = 0;
        build.C = 0;

        soundClick();

        renderMoleculeBuild();

        infoFeedback(
          $("#l8BuilderFeedback"),
          "تم تنظيف المنصة. الهدف: 2H + 1O."
        );

      }
    );


  $("#l8Check")
    .addEventListener(
      "click",
      () => {

        if (
          build.H === 2 &&
          build.O === 1 &&
          build.C === 0
        ) {

          correctFeedback(
            $("#l8BuilderFeedback"),
            "💧 ممتاز! بنيتِ جزيء الماء H₂O."
          );


          $("#l8Check")
            .disabled = true;


          $$(".l8-add")
            .forEach(
              button =>
                button.disabled = true
            );


          registerDiscovery(
            8,
            "H₂O يحتوي ذرتين من الهيدروجين وذرة أكسجين واحدة."
          );


          $("#l8NotebookArea")
            .classList.remove(
              "hidden"
            );


          connectNotebook(
            $("#l8NotebookArea")
          );


          const notebookBtn =
            $(
              ".notebook-reveal-btn",
              $("#l8NotebookArea")
            );


          notebookBtn.addEventListener(
            "click",
            () => {

              $("#l8Challenge")
                .classList.remove(
                  "hidden"
                );


              connectChoiceChallenge({

                parent:
                  $("#l8Challenge"),

                correct: "O₂",

                wrongHint:
                  "المركب يجب أن يحتوي ذرات من عناصر مختلفة.",

                onCorrect:
                  () => {

                    registerDiscovery(
                      8,
                      LESSONS[8].discovery
                    );


                    $("#l8Finish")
                      .innerHTML =
                        finishLessonUI(8);


                    connectFinishLesson(
                      8,
                      $("#l8Finish")
                    );

                  }

              });

            },
            {
              once: true
            }
          );

        } else {

          wrongFeedback(
            $("#l8BuilderFeedback"),
            `ليس H₂O بعد 🙈
            لديكِ H=${build.H}،
            O=${build.O}،
            C=${build.C}.
            المطلوب H=2 وO=1 فقط.`
          );

        }

      }
    );

};


/* =========================================================
   🧲 المحطة 9 — المركبات والمخاليط
========================================================= */

window.renderLesson9 = function () {

  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        9,
        "هذه المرة لن نكتفي بالمشاهدة: أضيفي الحديد والكبريت، اخلطيهما، استخدمي المغناطيس، ثم قارني ذلك بالتسخين."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          🧲 تجربة الحديد والكبريت
        </span>

        <h3 class="box-title">
          هل الخلط يعني تكوّن مادة جديدة؟
        </h3>

        <p class="box-text">
          سنضع برادة الحديد والكبريت معًا.
          أولًا سنخلطهما فقط، ثم نختبر
          إمكانية فصل الحديد بالمغناطيس.
        </p>

      </section>


      ${learningSteps(3)}

      <section class="lab-panel">

        <span class="mini-label">
          🕹️ التجربة الأولى — مخلوط
        </span>

        <h3 class="box-title">
          اصنعي مخلوط الحديد والكبريت
        </h3>

        <p class="box-text">
          اتبعي الخطوات:
          أضيفي الحديد، ثم الكبريت،
          ثم اضغطي «اخلطي».
        </p>


        <div
          id="l9Tray"
          class="mixture-container"
        ></div>


        <div
          id="l9Magnet"
          class="magnet"
        >
          🧲
        </div>


        <div class="action-row">

          <button
            id="l9AddIron"
            class="lab-button"
            type="button"
          >
            ⚙️ أضيفي الحديد
          </button>

          <button
            id="l9AddSulfur"
            class="lab-button"
            type="button"
          >
            🟡 أضيفي الكبريت
          </button>

          <button
            id="l9Mix"
            class="lab-button primary"
            type="button"
            disabled
          >
            🥣 اخلطي
          </button>

          <button
            id="l9UseMagnet"
            class="lab-button"
            type="button"
            disabled
          >
            🧲 استخدمي المغناطيس
          </button>

        </div>


        <div
          id="l9MixFeedback"
          class="feedback-message info"
        >
          ابدئي بإضافة المادتين.
        </div>

      </section>


      <div
        id="l9HeatArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            💡 ماذا أثبت المغناطيس؟
          </h3>

          <p class="box-text">
            بعد خلط الحديد والكبريت فقط،
            بقي الحديد محتفظًا بخاصيته
            ويمكن فصله باستخدام المغناطيس.
            إذن ما لدينا <strong>مخلوط</strong>.
          </p>

        </section>


        <section class="lab-panel">

          <span class="mini-label">
            🔥 التجربة الثانية — التسخين
          </span>

          <h3 class="box-title">
            ماذا يحدث عند التسخين؟
          </h3>

          <p class="box-text">
            أعيدي الحديد والكبريت إلى الوعاء،
            ثم شغلي محاكاة التسخين.
            قارني الناتج بالمخلوط السابق.
          </p>


          <div
            id="l9HeatTray"
            class="mixture-container"
          ></div>


          <div class="action-row">

            <button
              id="l9PrepareHeat"
              class="lab-button"
              type="button"
            >
              ⚙️🟡 جهزي الحديد والكبريت
            </button>

            <button
              id="l9Heat"
              class="lab-button danger"
              type="button"
              disabled
            >
              🔥 شغلي التسخين
            </button>

          </div>


          <div
            id="l9HeatFeedback"
            class="feedback-message info"
          >
            جهزي المادتين أولًا.
          </div>


          <div class="science-note">

            <span>🧤</span>

            <p>
              هذه محاكاة تعليمية.
              التسخين الحقيقي للمواد الكيميائية
              يكون تحت إشراف المعلمة
              ووفق إجراءات السلامة.
            </p>

          </div>

        </section>


        <div
          id="l9NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id: "l9Notebook",

            question:
              "ما الفرق بين خلط الحديد والكبريت وبين تسخينهما معًا؟",

            observation:
              "في المخلوط استطعنا جذب الحديد بالمغناطيس، أما بعد التسخين فتكون كبريتيد الحديد بخصائص مختلفة.",

            conclusion:
              "الخلط لا يُكوّن مادة جديدة، أما الاتحاد الكيميائي فيكوّن مركبًا جديدًا."

          })}


          <div
            id="l9Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "لماذا نستطيع فصل الحديد من مخلوط الحديد والكبريت بالمغناطيس؟",

              answers: [
                "لأن الحديد يحتفظ بخاصيته في المخلوط",
                "لأن الحديد تحول إلى كبريتيد الحديد",
                "لأن الكبريت أصبح حديدًا"
              ],

              correct:
                "لأن الحديد يحتفظ بخاصيته في المخلوط",

              explanation:
                "في المخلوط تحتفظ المواد بخواصها، لذلك يمكن للمغناطيس جذب الحديد."

            })}

            <div id="l9Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  const tray =
    $("#l9Tray");


  let ironAdded = false;
  let sulfurAdded = false;
  let mixed = false;
  let magnetUsed = false;


  function addParticles(
    target,
    className,
    amount
  ) {

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const particle =
        createParticle({

          className,

          x:
            randomBetween(
              12,
              84
            ),

          y:
            randomBetween(
              35,
              82
            )

        });


      target.appendChild(
        particle
      );

    }

  }


  $("#l9AddIron")
    .addEventListener(
      "click",
      () => {

        if (ironAdded) {
          return;
        }


        ironAdded = true;

        soundExperiment();


        addParticles(
          tray,
          "iron-particle",
          18
        );


        $("#l9AddIron")
          .disabled = true;


        infoFeedback(
          $("#l9MixFeedback"),
          "⚙️ أضفتِ برادة الحديد. الآن أضيفي الكبريت."
        );


        if (
          ironAdded &&
          sulfurAdded
        ) {

          $("#l9Mix")
            .disabled = false;

        }

      }
    );


  $("#l9AddSulfur")
    .addEventListener(
      "click",
      () => {

        if (sulfurAdded) {
          return;
        }


        sulfurAdded = true;

        soundExperiment();


        addParticles(
          tray,
          "sulfur-particle",
          22
        );


        $("#l9AddSulfur")
          .disabled = true;


        infoFeedback(
          $("#l9MixFeedback"),
          "🟡 أضفتِ الكبريت. بقي أن تخلطي المادتين."
        );


        if (
          ironAdded &&
          sulfurAdded
        ) {

          $("#l9Mix")
            .disabled = false;

        }

      }
    );


  $("#l9Mix")
    .addEventListener(
      "click",
      async () => {

        if (
          !ironAdded ||
          !sulfurAdded ||
          mixed
        ) {
          return;
        }


        mixed = true;

        soundMix();


        tray.animate(
          [
            {
              transform:
                "translateX(0)"
            },
            {
              transform:
                "translateX(-10px) rotate(-1deg)"
            },
            {
              transform:
                "translateX(10px) rotate(1deg)"
            },
            {
              transform:
                "translateX(-8px)"
            },
            {
              transform:
                "translateX(8px)"
            },
            {
              transform:
                "translateX(0)"
            }
          ],
          {
            duration: 700
          }
        );


        $$(".particle", tray)
          .forEach(
            particle => {

              particle.style.left =
                `${
                  randomBetween(
                    10,
                    87
                  )
                }%`;

              particle.style.top =
                `${
                  randomBetween(
                    30,
                    83
                  )
                }%`;

            }
          );


        await wait(750);


        correctFeedback(
          $("#l9MixFeedback"),
          "🥣 أصبح الحديد والكبريت مختلطين، لكن كل مادة ما زالت موجودة بخصائصها."
        );


        $("#l9Mix")
          .disabled = true;

        $("#l9UseMagnet")
          .disabled = false;


        registerDiscovery(
          9,
          "خلط الحديد والكبريت ينتج مخلوطًا يمكن فصل الحديد منه بالمغناطيس."
        );

      }
    );


  $("#l9UseMagnet")
    .addEventListener(
      "click",
      async () => {

        if (
          !mixed ||
          magnetUsed
        ) {
          return;
        }


        magnetUsed = true;

        soundExperiment();


        $("#l9Magnet")
          .classList.add(
            "active"
          );


        const ironParticles =
          $$(".iron-particle", tray);


        ironParticles.forEach(
          (particle, index) => {

            particle.style.left =
              `${
                4 +
                (index % 5) * 2
              }%`;

            particle.style.top =
              `${
                22 +
                (index % 8) * 5
              }%`;

          }
        );


        await wait(850);


        correctFeedback(
          $("#l9MixFeedback"),
          "🧲 نجح الفصل! انجذب الحديد إلى المغناطيس بينما بقي الكبريت في الوعاء."
        );


        $("#l9UseMagnet")
          .disabled = true;


        $("#l9HeatArea")
          .classList.remove(
            "hidden"
          );

      }
    );


  let heatPrepared = false;
  let heated = false;


  $("#l9PrepareHeat")
    .addEventListener(
      "click",
      () => {

        if (heatPrepared) {
          return;
        }


        heatPrepared = true;


        const heatTray =
          $("#l9HeatTray");


        addParticles(
          heatTray,
          "iron-particle",
          16
        );


        addParticles(
          heatTray,
          "sulfur-particle",
          18
        );


        $("#l9PrepareHeat")
          .disabled = true;

        $("#l9Heat")
          .disabled = false;


        soundPop();


        infoFeedback(
          $("#l9HeatFeedback"),
          "⚙️🟡 أصبح الحديد والكبريت جاهزين لمحاكاة التسخين."
        );

      }
    );


  $("#l9Heat")
    .addEventListener(
      "click",
      async () => {

        if (
          !heatPrepared ||
          heated
        ) {
          return;
        }


        heated = true;

        $("#l9Heat")
          .disabled = true;


        soundExperiment();


        $("#l9HeatFeedback")
          .className =
            "feedback-message info";

        $("#l9HeatFeedback")
          .innerHTML =
            "🔥 يجري التسخين في المحاكاة...";


        const heatTray =
          $("#l9HeatTray");


        heatTray.style.boxShadow =
          "inset 0 -45px 70px rgba(239,125,73,.30)";


        await wait(900);


        heatTray.innerHTML = "";


        addParticles(
          heatTray,
          "compound-particle",
          22
        );


        heatTray.style.boxShadow =
          "inset 0 -25px 35px rgba(99,129,150,.08)";


        soundUnlock();


        correctFeedback(
          $("#l9HeatFeedback"),
          "✨ تكوّنت مادة جديدة: كبريتيد الحديد، وخواصها تختلف عن خواص الحديد والكبريت."
        );


        registerDiscovery(
          9,
          "تسخين الحديد والكبريت يؤدي إلى تكوّن كبريتيد الحديد."
        );


        $("#l9NotebookArea")
          .classList.remove(
            "hidden"
          );


        connectNotebook(
          $("#l9NotebookArea")
        );


        const notebookBtn =
          $(
            ".notebook-reveal-btn",
            $("#l9NotebookArea")
          );


        notebookBtn.addEventListener(
          "click",
          () => {

            $("#l9Challenge")
              .classList.remove(
                "hidden"
              );


            connectChoiceChallenge({

              parent:
                $("#l9Challenge"),

              correct:
                "لأن الحديد يحتفظ بخاصيته في المخلوط",

              wrongHint:
                "تذكري ماذا حدث عندما قربنا المغناطيس من المخلوط.",

              onCorrect:
                () => {

                  registerDiscovery(
                    9,
                    LESSONS[9].discovery
                  );


                  $("#l9Finish")
                    .innerHTML =
                      finishLessonUI(9);


                  connectFinishLesson(
                    9,
                    $("#l9Finish")
                  );

                }

            });

          },
          {
            once: true
          }
        );

      }
    );

};


/* =========================================================
   💧 المحطة 10 — المزيد حول المخاليط
========================================================= */

window.renderLesson10 = function () {

  const samples = [
    {
      id: "pure",
      icon: "🔵🔵🔵",
      name: "مادة نقية",
      answer: "نقية"
    },
    {
      id: "air",
      icon: "🌬️",
      name: "الهواء",
      answer: "مخلوط"
    },
    {
      id: "bronze",
      icon: "🥉",
      name: "البرونز",
      answer: "مخلوط"
    },
    {
      id: "water",
      icon: "💧",
      name: "المياه المعدنية",
      answer: "مخلوط"
    }
  ];


  lessonContent.innerHTML = `
    <div class="lesson-shell">

      ${lessonHero(
        10,
        "آخر محطة! صنفي المواد، اكتشفي السبائك، ثم افصلي ما في المياه المعدنية بالتبخر."
      )}

      ${learningSteps(1)}

      <section class="discovery-box">

        <span class="mini-label">
          👀 نقية أم مخلوط؟
        </span>

        <h3 class="box-title">
          افحصي العينات
        </h3>

        <p class="box-text">
          المادة النقية تحتوي مادة واحدة فقط،
          بينما المخلوط يحتوي مواد مختلفة.
          اختاري عينة ثم صنفيها.
        </p>

      </section>


      <section class="lab-panel">

        <div class="sample-grid">

          ${samples.map(
            sample => `
              <button
                class="sample-card l10-sample"
                data-id="${sample.id}"
                data-answer="${sample.answer}"
                type="button"
              >
                <span class="sample-icon">
                  ${sample.icon}
                </span>

                <strong>
                  ${sample.name}
                </strong>

                <small>
                  اختاري ثم صنفي
                </small>
              </button>
            `
          ).join("")}

        </div>


        <div
          id="l10Selected"
          class="feedback-message info"
        >
          👆 اختاري عينة.
        </div>


        <div class="classification-bins">

          <button
            class="classification-bin"
            data-classification="نقية"
            type="button"
          >
            ✨ مادة نقية
          </button>

          <button
            class="classification-bin"
            data-classification="مخلوط"
            type="button"
          >
            🥣 مخلوط
          </button>

        </div>


        <div
          id="l10ClassifyCounter"
          class="discovery-counter"
        >
          0 / 4
        </div>

      </section>


      <div
        id="l10AlloyArea"
        class="hidden"
      >

        ${learningSteps(2)}

        <section class="explain-box">

          <h3 class="box-title">
            🥉 السبائك مخاليط
          </h3>

          <p class="box-text">
            السبائك هي مخاليط من الفلزات.
            <strong>البرونز</strong>
            يتكون من النحاس والقصدير.
            و<strong>الفولاذ</strong>
            يتكون من الحديد والكربون،
            وقد يحتوي أيضًا على فلزات أخرى
            مثل الكروم أو النيكل.
          </p>

          <div class="science-note">
            <span>🌬️</span>
            <p>
              الهواء أيضًا مخلوط،
              ويمكن أن تحتوي المخاليط
              مواد صلبة أو سائلة أو غازية.
            </p>
          </div>

        </section>


        ${learningSteps(3)}

        <section class="lab-panel">

          <span class="mini-label">
            💧 تجربة التبخر
          </span>

          <h3 class="box-title">
            هل المياه المعدنية ماء فقط؟
          </h3>

          <p class="box-text">
            تحتوي المياه المعدنية أملاحًا معدنية مذابة.
            شغلي محاكاة التبخر ولاحظي ما يبقى
            بعد اختفاء الماء.
          </p>


          <div class="evaporating-beaker">

            <span
              class="steam"
              style="left:60px;"
            >
              〰
            </span>

            <span
              class="steam"
              style="
                left:105px;
                animation-delay:.25s;
              "
            >
              〰
            </span>

            <span
              class="steam"
              style="
                left:145px;
                animation-delay:.5s;
              "
            >
              〰
            </span>

            <div
              id="l10Water"
              class="water-level"
            ></div>

            <div
              id="l10Residue"
              class="salt-residue"
            ></div>

          </div>


          <div class="action-row">

            <button
              id="l10Evaporate"
              class="lab-button primary"
              type="button"
            >
              ♨️ ابدئي التبخر
            </button>

          </div>


          <div
            id="l10EvapFeedback"
            class="feedback-message info"
          >
            راقبي الكأس جيدًا 👀
          </div>

        </section>


        <div
          id="l10NotebookArea"
          class="hidden"
        >

          ${learningSteps(4)}

          ${scientistNotebook({

            id: "l10Notebook",

            question:
              "ماذا بقي بعد تبخر الماء من المياه المعدنية؟ وماذا يدل ذلك؟",

            observation:
              "بعد تبخر الماء ظهرت بقايا من الأملاح المعدنية.",

            conclusion:
              "المياه المعدنية مخلوط لأنها تحتوي ماءً وأملاحًا معدنية مذابة."

          })}


          <div
            id="l10Challenge"
            class="hidden"
          >

            ${learningSteps(5)}

            ${createChoiceChallenge({

              question:
                "أي عبارة تصف السبيكة وصفًا صحيحًا؟",

              answers: [
                "السبيكة مخلوط من الفلزات",
                "السبيكة عنصر واحد فقط",
                "السبيكة دائمًا غاز"
              ],

              correct:
                "السبيكة مخلوط من الفلزات",

              explanation:
                "السبائك مخاليط من الفلزات؛ ومن أمثلتها البرونز."

            })}

            <div id="l10Finish"></div>

          </div>

        </div>

      </div>

    </div>
  `;


  let selectedSample = null;

  const completedSamples =
    new Set();


  $$(".l10-sample")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (
            completedSamples.has(
              button.dataset.id
            )
          ) {
            return;
          }


          $$(".l10-sample")
            .forEach(
              item =>
                item.classList.remove(
                  "selected"
                )
            );


          selectedSample =
            button;


          button.classList.add(
            "selected"
          );


          soundClick();


          infoFeedback(
            $("#l10Selected"),
            `اخترتِ ${$("strong", button).textContent.trim()}.
            الآن صنفيها.`
          );

        }
      );

    });


  $$(".classification-bin")
    .forEach(bin => {

      bin.addEventListener(
        "click",
        () => {

          if (!selectedSample) {

            wrongFeedback(
              $("#l10Selected"),
              "اختاري عينة أولًا 🙈"
            );

            return;
          }


          const chosen =
            bin.dataset.classification;

          const correct =
            selectedSample.dataset.answer;


          if (
            chosen !== correct
          ) {

            wrongFeedback(
              $("#l10Selected"),
              "راجعي: هل تحتوي العينة مادة واحدة أم أكثر من مادة؟"
            );

            return;
          }


          const id =
            selectedSample.dataset.id;


          completedSamples.add(
            id
          );


          selectedSample.disabled =
            true;

          selectedSample.classList.remove(
            "selected"
          );


          soundCorrect();


          correctFeedback(
            $("#l10Selected"),
            `✨ صحيح! هذه العينة تصنف:
            ${correct}.`
          );


          selectedSample =
            null;


          $("#l10ClassifyCounter")
            .textContent =
              `${completedSamples.size} / 4`;


          if (
            completedSamples.size === 4
          ) {

            $("#l10AlloyArea")
              .classList.remove(
                "hidden"
              );


            registerDiscovery(
              10,
              "المخلوط يحتوي مواد مختلفة، بينما المادة النقية تحتوي مادة واحدة."
            );

          }

        }
      );

    });


  $("#l10Evaporate")
    .addEventListener(
      "click",
      async () => {

        const button =
          $("#l10Evaporate");


        button.disabled =
          true;


        soundExperiment();


        $$(".steam")
          .forEach(
            steam =>
              steam.classList.add(
                "show"
              )
          );


        $("#l10Water")
          .classList.add(
            "evaporated"
          );


        infoFeedback(
          $("#l10EvapFeedback"),
          "♨️ الماء يتبخر... راقبي قاع الكأس."
        );


        await wait(2100);


        $("#l10Residue")
          .classList.add(
            "show"
          );


        soundUnlock();


        correctFeedback(
          $("#l10EvapFeedback"),
          "✨ بقيت أملاح معدنية بعد تبخر الماء، وهذا يوضح أن المياه المعدنية مخلوط."
        );


        registerDiscovery(
          10,
          "المياه المعدنية تحتوي أملاحًا معدنية مذابة."
        );


        $("#l10NotebookArea")
          .classList.remove(
            "hidden"
          );


        connectNotebook(
          $("#l10NotebookArea")
        );


        const notebookBtn =
          $(
            ".notebook-reveal-btn",
            $("#l10NotebookArea")
          );


        notebookBtn.addEventListener(
          "click",
          () => {

            $("#l10Challenge")
              .classList.remove(
                "hidden"
              );


            connectChoiceChallenge({

              parent:
                $("#l10Challenge"),

              correct:
                "السبيكة مخلوط من الفلزات",

              wrongHint:
                "تذكري مثال البرونز: النحاس + القصدير.",

              onCorrect:
                () => {

                  registerDiscovery(
                    10,
                    LESSONS[10].discovery
                  );


                  $("#l10Finish")
                    .innerHTML =
                      finishLessonUI(10);


                  connectFinishLesson(
                    10,
                    $("#l10Finish")
                  );

                }

            });

          },
          {
            once: true
          }
        );

      }
    );

};


/* =========================================================
   🏆 بنك أسئلة التحدي النهائي
========================================================= */

const FINAL_QUESTIONS = [

  {
    lesson: "2-1",
    question:
      "ما المقصود بالعنصر؟",
    answers: [
      "مادة تتكون من نوع واحد من الذرات",
      "مادة لا تحتوي على ذرات",
      "أي مخلوط من مادتين",
      "مادة تتكون من سوائل فقط"
    ],
    correct:
      "مادة تتكون من نوع واحد من الذرات",
    explanation:
      "العنصر مادة تتكون من نوع واحد من الذرات."
  },

  {
    lesson: "2-2",
    question:
      "أي رمز مكتوب بالطريقة الصحيحة؟",
    answers: [
      "Na",
      "NA",
      "na",
      "nA"
    ],
    correct:
      "Na",
    explanation:
      "يكتب الحرف الأول كبيرًا، وإذا وجد حرف ثانٍ يكتب صغيرًا."
  },

  {
    lesson: "2-2",
    question:
      "ما رمز الزئبق؟",
    answers: [
      "Hg",
      "He",
      "Na",
      "O"
    ],
    correct:
      "Hg",
    explanation:
      "رمز الزئبق هو Hg."
  },

  {
    lesson: "2-3",
    question:
      "ماذا تسمى الصفوف الأفقية في الجدول الدوري؟",
    answers: [
      "الدورات",
      "المجموعات",
      "الروابط",
      "المخاليط"
    ],
    correct:
      "الدورات",
    explanation:
      "الصفوف الأفقية دورات، والأعمدة الرأسية مجموعات."
  },

  {
    lesson: "2-4",
    question:
      "ذرة الليثيوم عددها الذري 3. كم بروتونًا فيها؟",
    answers: [
      "3",
      "4",
      "7",
      "1"
    ],
    correct:
      "3",
    explanation:
      "العدد الذري يساوي عدد البروتونات."
  },

  {
    lesson: "2-4",
    question:
      "ذرة الليثيوم عددها الكتلي 7 وبها 3 بروتونات. كم نيوترونًا فيها؟",
    answers: [
      "4",
      "3",
      "7",
      "10"
    ],
    correct:
      "4",
    explanation:
      "7 − 3 = 4 نيوترونات."
  },

  {
    lesson: "2-5",
    question:
      "أي عنصر من المجموعة الأولى له درجة انصهار 98°C في بيانات الدرس؟",
    answers: [
      "Na",
      "Li",
      "K",
      "Br"
    ],
    correct:
      "Na",
    explanation:
      "درجة انصهار الصوديوم Na هي 98°C."
  },

  {
    lesson: "2-5",
    question:
      "ماذا يحدث لدرجة الانصهار من Li إلى Na إلى K؟",
    answers: [
      "تقل",
      "تزداد",
      "تبقى ثابتة",
      "تختفي"
    ],
    correct:
      "تقل",
    explanation:
      "القيم هي 180 ثم 98 ثم 63°C."
  },

  {
    lesson: "2-6",
    question:
      "أي هالوجين يكون سائلًا وفق بيانات الدرس؟",
    answers: [
      "البروم",
      "الفلور",
      "الكلور",
      "الليثيوم"
    ],
    correct:
      "البروم",
    explanation:
      "البروم Br سائل ولونه بني."
  },

  {
    lesson: "2-6",
    question:
      "أي ترتيب صحيح لنشاط F وCl وBr من الأكثر إلى الأقل؟",
    answers: [
      "F ثم Cl ثم Br",
      "Br ثم Cl ثم F",
      "Cl ثم F ثم Br",
      "F ثم Br ثم Cl"
    ],
    correct:
      "F ثم Cl ثم Br",
    explanation:
      "الفلور أكثر نشاطًا، ثم الكلور، ثم البروم."
  },

  {
    lesson: "2-7",
    question:
      "ما المادة الناتجة عن اتحاد الصوديوم والكلور كيميائيًا؟",
    answers: [
      "كلوريد الصوديوم",
      "الأكسجين",
      "الحديد",
      "الكبريت"
    ],
    correct:
      "كلوريد الصوديوم",
    explanation:
      "يتكون مركب كلوريد الصوديوم NaCl."
  },

  {
    lesson: "2-8",
    question:
      "كم ذرة أكسجين توجد في CO₂؟",
    answers: [
      "2",
      "1",
      "3",
      "4"
    ],
    correct:
      "2",
    explanation:
      "الرقم 2 بعد O يدل على وجود ذرتين من الأكسجين."
  },

  {
    lesson: "2-8",
    question:
      "لماذا يعد O₂ عنصرًا في هذا التصنيف؟",
    answers: [
      "لأنه يحتوي نوعًا واحدًا من الذرات",
      "لأنه يحتوي نوعين مختلفين من الذرات",
      "لأنه مخلوط",
      "لأنه يحتوي كربونًا"
    ],
    correct:
      "لأنه يحتوي نوعًا واحدًا من الذرات",
    explanation:
      "جزيء O₂ يحتوي ذرات أكسجين فقط."
  },

  {
    lesson: "2-9",
    question:
      "ما الذي يمكن استخدامه لفصل الحديد من مخلوط الحديد والكبريت؟",
    answers: [
      "المغناطيس",
      "الضوء",
      "المسطرة",
      "الورق"
    ],
    correct:
      "المغناطيس",
    explanation:
      "الحديد يحتفظ بخاصيته في المخلوط وينجذب إلى المغناطيس."
  },

  {
    lesson: "2-9",
    question:
      "ماذا يتكون عند تسخين الحديد والكبريت معًا في تجربة الدرس؟",
    answers: [
      "كبريتيد الحديد",
      "ماء",
      "أكسجين",
      "برونز"
    ],
    correct:
      "كبريتيد الحديد",
    explanation:
      "ينتج عن الاتحاد الكيميائي مركب جديد هو كبريتيد الحديد."
  },

  {
    lesson: "2-10",
    question:
      "البرونز مثال على ماذا؟",
    answers: [
      "سبيكة",
      "عنصر",
      "غاز نقي",
      "ذرة منفردة"
    ],
    correct:
      "سبيكة",
    explanation:
      "البرونز سبيكة تتكون من النحاس والقصدير."
  },

  {
    lesson: "2-10",
    question:
      "ماذا قد يبقى بعد تبخر المياه المعدنية؟",
    answers: [
      "أملاح معدنية",
      "ذرات حديد فقط",
      "غاز الكلور فقط",
      "لا شيء دائمًا"
    ],
    correct:
      "أملاح معدنية",
    explanation:
      "المياه المعدنية تحتوي أملاحًا معدنية مذابة."
  }

];


/* =========================================================
   🏆 تشغيل التحدي النهائي
========================================================= */

let activeFinalQuestions = [];


finalChallengeCard.addEventListener(
  "click",
  () => {

    if (
      state.completedLessons.size !== 10
    ) {

      soundWrong();

      return;
    }


    startFinalChallenge();

  }
);


function startFinalChallenge() {

  state.finalScore = 0;
  state.finalQuestion = 0;
  state.finalAnswered = false;


  activeFinalQuestions =
    shuffleArray(
      FINAL_QUESTIONS
    ).slice(
      0,
      10
    );


  soundUnlock();

  showScreen(
    finalScreen
  );


  renderFinalQuestion();

}


/* =========================================================
   السؤال النهائي
========================================================= */

function renderFinalQuestion() {

  if (
    state.finalQuestion >=
    activeFinalQuestions.length
  ) {

    finishFinalChallenge();

    return;
  }


  const question =
    activeFinalQuestions[
      state.finalQuestion
    ];


  state.finalAnswered =
    false;


  const answers =
    shuffleArray(
      question.answers
    );


  const progress =
    Math.round(
      (
        state.finalQuestion /
        activeFinalQuestions.length
      ) *
      100
    );


  finalQuizContainer.innerHTML = `
    <section class="final-question-card">

      <div class="progress-top">

        <span class="final-question-number">
          السؤال
          ${state.finalQuestion + 1}
          من
          ${activeFinalQuestions.length}
        </span>

        <strong>
          ⭐ ${state.finalScore}
        </strong>

      </div>


      <div
        class="progress-track"
        style="margin:14px 0 25px;"
      >
        <div
          class="progress-fill"
          style="width:${progress}%"
        ></div>
      </div>


      <span class="mini-label">
        من الدرس ${question.lesson}
      </span>


      <h2
        style="
          line-height:1.7;
          margin-top:12px;
        "
      >
        ${question.question}
      </h2>


      <div
        class="challenge-options"
        id="finalOptions"
      >

        ${answers.map(
          answer => `
            <button
              class="challenge-option final-answer"
              type="button"
              data-answer="${escapeHTML(answer)}"
            >
              ${answer}
            </button>
          `
        ).join("")}

      </div>


      <div
        id="finalFeedback"
        class="feedback-message"
      ></div>


      <div
        id="finalExplanation"
        class="challenge-explanation hidden"
      >
        💡 ${question.explanation}
      </div>


      <div class="action-row">

        <button
          id="nextFinalQuestion"
          class="lab-button primary hidden"
          type="button"
        >
          ${
            state.finalQuestion ===
            activeFinalQuestions.length - 1
              ? "🏆 أظهري النتيجة"
              : "السؤال التالي ←"
          }
        </button>

      </div>

    </section>
  `;


  $$(".final-answer")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (
            state.finalAnswered
          ) {
            return;
          }


          state.finalAnswered =
            true;


          const selected =
            button.dataset.answer;


          const isCorrect =
            selected ===
            question.correct;


          if (isCorrect) {

            state.finalScore++;

            button.classList.add(
              "correct"
            );


            soundCorrect();


            setFeedback(
              $("#finalFeedback"),
              "✨ إجابة صحيحة!",
              "good"
            );

          } else {

            button.classList.add(
              "wrong"
            );


            soundWrong();


            const correctButton =
              $$(".final-answer")
                .find(
                  item =>
                    item.dataset.answer ===
                    question.correct
                );


            if (correctButton) {

              correctButton.classList.add(
                "correct"
              );

            }


            setFeedback(
              $("#finalFeedback"),
              `الإجابة الصحيحة:
              <strong>${question.correct}</strong>`,
              "try"
            );

          }


          $$(".final-answer")
            .forEach(
              item =>
                item.disabled = true
            );


          $("#finalExplanation")
            .classList.remove(
              "hidden"
            );


          $("#nextFinalQuestion")
            .classList.remove(
              "hidden"
            );

        }
      );

    });


  $("#nextFinalQuestion")
    .addEventListener(
      "click",
      () => {

        soundClick();

        state.finalQuestion++;

        renderFinalQuestion();

      }
    );

}


/* =========================================================
   🏆 نتيجة التحدي النهائي
========================================================= */

function finishFinalChallenge() {

  const total =
    activeFinalQuestions.length;

  const score =
    state.finalScore;

  const percentage =
    Math.round(
      (score / total) *
      100
    );


  let message = "";

  let icon = "";


  if (
    percentage >= 90
  ) {

    icon = "🏆";

    message =
      "أداء رائع جدًا! أثبتِّ أنكِ تتذكرين أفكار الوحدة من الذرات حتى المخاليط.";

  } else if (
    percentage >= 70
  ) {

    icon = "🌟";

    message =
      "نتيجة جميلة! مررتِ على جميع المحطات وأنهيتِ المهمة العلمية.";

  } else {

    icon = "🔬";

    message =
      "أنهيتِ التحدي! يمكنكِ العودة للمحطات في أي وقت ومراجعة التجارب.";

  }


  finalQuizContainer.innerHTML = `
    <section
      class="final-question-card"
      style="text-align:center;"
    >

      <div
        style="
          font-size:72px;
          margin-bottom:10px;
        "
      >
        ${icon}
      </div>


      <span class="mini-label">
        المهمة النهائية مكتملة
      </span>


      <h2>
        ${state.studentName}،
        حصلتِ على
        ${score} / ${total}
      </h2>


      <div
        style="
          font-size:42px;
          font-weight:900;
          color:#7657d9;
          margin:18px 0;
        "
      >
        ${percentage}%
      </div>


      <p class="box-text">
        ${message}
      </p>


      <div class="rewards-row">

        <span class="reward-chip">
          ⭐ 10 محطات
        </span>

        <span class="reward-chip">
          🧪 10 تجارب
        </span>

        <span class="reward-chip">
          🏆 المهمة النهائية
        </span>

      </div>


      <button
        id="openCertificateBtn"
        class="main-button"
        type="button"
      >
        🎓 افتحي شهادة العالمة
      </button>

    </section>
  `;


  createConfetti(
    65
  );


  soundUnlock();


  $("#openCertificateBtn")
    .addEventListener(
      "click",
      openGraduation
    );

}


/* =========================================================
   🎓 شاشة التخرج
========================================================= */

function openGraduation() {

  soundUnlock();


  graduateName.textContent =
    state.studentName;

  certificateName.textContent =
    state.studentName;

  certificateStars.textContent =
    state.completedLessons.size;

  certificateXp.textContent =
    state.xp;


  showScreen(
    graduationScreen
  );


  createConfetti(
    90
  );

}


/* =========================================================
   🔁 إعادة الرحلة
========================================================= */

restartJourneyBtn.addEventListener(
  "click",
  () => {

    const restart =
      window.confirm(
        "هل تريدين بدء رحلة جديدة؟ سيُمسح تقدم هذه الرحلة."
      );


    if (!restart) {
      return;
    }


    localStorage.removeItem(
      STORAGE_KEY
    );


    state.studentName = "";

    state.completedLessons =
      new Set();

    state.currentLesson = 0;

    state.xp = 0;

    state.discoveries = [];

    state.finalScore = 0;

    state.finalQuestion = 0;


    studentNameInput.value = "";

    nameWarning.textContent = "";


    updateInterface();


    showScreen(
      welcomeScreen
    );


    soundClick();

  }
);


/* =========================================================
   ✨ تحسينات صغيرة للرحلة
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "button"
      );


    if (
      !button ||
      button.disabled
    ) {
      return;
    }


    if (
      !button.classList.contains(
        "challenge-option"
      ) &&
      !button.classList.contains(
        "counter-button"
      )
    ) {

      if (
        state.soundEnabled
      ) {

        playTone({
          frequency: 360,
          duration: 0.035,
          volume: 0.008
        });

      }

    }

  }
);


/* =========================================================
   🧪 استكمال الجلسة المحفوظة
========================================================= */

if (
  state.studentName
) {

  mapStudentName.textContent =
    state.studentName;

}


/* =========================================================
   🔬 فحص المحطات عند التشغيل
========================================================= */

function verifyLab() {

  const renderers = [];


  for (
    let i = 1;
    i <= 10;
    i++
  ) {

    renderers.push(
      typeof window[
        `renderLesson${i}`
      ] === "function"
    );

  }


  const ready =
    renderers.every(Boolean);


  if (ready) {

    console.log(
      "🧪 مختبر العناصر والمركبات جاهز — 10/10 محطات."
    );

  } else {

    console.warn(
      "هناك جزء ناقص من script.js.",
      renderers
    );

  }

}


verifyLab();


/* =========================================================
   🎀 END OF FINAL SCRIPT

   المختبر الآن يحتوي:
   ✅ 2-1 الذرات
   ✅ 2-2 الذرات والعناصر
   ✅ 2-3 الجدول الدوري
   ✅ 2-4 تركيب الذرة
   ✅ 2-5 المجموعة الأولى
   ✅ 2-6 المجموعة السابعة
   ✅ 2-7 المركبات الكيميائية
   ✅ 2-8 الصيغ الكيميائية
   ✅ 2-9 المركبات والمخاليط
   ✅ 2-10 المزيد حول المخاليط
   ✅ XP + Stars
   ✅ Badges
   ✅ Sound
   ✅ Final Challenge
   ✅ Randomized Answers
   ✅ Certificate
   ✅ Confetti
   ✅ Saved Progress

   لا تضيفي أي جزء آخر بعد هذا.
========================================================= */