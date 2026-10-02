// ===============================
// عالم الذرات
// ===============================

let student = "";
let score = 0;


// ---------- أدوات عامة ----------

function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function addScore(points) {

  score += points;

  document
    .querySelectorAll(".score")
    .forEach(item => {
      item.textContent = score;
    });
}


// ===============================
// البداية
// ===============================

const startBtn =
  document.getElementById("startBtn");

const studentName =
  document.getElementById("studentName");

const nameError =
  document.getElementById("nameError");


startBtn.addEventListener("click", () => {

  student = studentName.value.trim();

  if (!student) {

    nameError.textContent =
      "اكتبي اسمكِ أولًا يا عالمة 🔬💜";

    return;
  }

  nameError.textContent = "";

  document.getElementById("helloStudent")
    .textContent =
      `العالمة ${student} 👩🏻‍🔬`;

  showScreen("zoomScreen");

});


// ===============================
// المحطة الأولى: التكبير
// ===============================

const zoomStages = [

  {
    icon: "🪨",
    title: "قطعة من المادة",
    text:
      "تبدو لنا كقطعة واحدة. لنقترب قليلًا!"
  },

  {
    icon: "🔎",
    title: "نقترب أكثر...",
    text:
      "عند التكبير نبدأ بالنظر إلى المادة بصورة أقرب."
  },

  {
    icon: "🔬",
    title: "أصغر... وأصغر!",
    text:
      "نحتاج إلى تكبير هائل للوصول إلى الأجزاء الصغيرة جدًا."
  },

  {
    icon: "⚛️",
    title: "وصلنا إلى الذرة!",
    text:
      "الذرات أجزاء صغيرة جدًا تكوّن المادة."
  }

];


let zoomIndex = 0;

const zoomBtn =
  document.getElementById("zoomBtn");

const zoomObject =
  document.getElementById("zoomObject");

const zoomTitle =
  document.getElementById("zoomTitle");

const zoomDescription =
  document.getElementById("zoomDescription");


zoomBtn.addEventListener("click", () => {

  if (zoomIndex >= zoomStages.length - 1)
    return;

  zoomIndex++;

  const stage =
    zoomStages[zoomIndex];

  zoomObject.style.opacity = "0";
  zoomObject.style.transform = "scale(.3)";

  setTimeout(() => {

    zoomObject.textContent =
      stage.icon;

    zoomTitle.textContent =
      stage.title;

    zoomDescription.textContent =
      stage.text;

    zoomObject.style.opacity = "1";
    zoomObject.style.transform = "scale(1)";

  }, 180);


  const dots =
    document.querySelectorAll(".step");

  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "on",
      i === zoomIndex
    );

  });


  if (
    zoomIndex ===
    zoomStages.length - 1
  ) {

    zoomBtn.disabled = true;

    zoomBtn.textContent =
      "✨ اكتشفنا الذرة!";

    addScore(10);

    setTimeout(() => {

      document
        .getElementById("atomDiscovery")
        .classList.remove("hidden");

    }, 450);

  }

});


document
  .getElementById("goMolecule")
  .addEventListener("click", () => {

    showScreen("moleculeScreen");

  });


// ===============================
// المحطة الثانية: الجزيء
// ===============================

let atomsAdded = 0;

document
  .querySelectorAll(".atom-choice")
  .forEach(atom => {

    atom.addEventListener("click", () => {

      if (
        atom.classList.contains("used")
      )
        return;

      atom.classList.add("used");

      const newAtom =
        document.createElement("div");

      newAtom.className = "built-o";
      newAtom.textContent = "O";

      document
        .getElementById("moleculeBuild")
        .appendChild(newAtom);

      atomsAdded++;

      document
        .getElementById("moleculeHint")
        .style.display = "none";


      if (atomsAdded === 2) {

        addScore(10);

        setTimeout(() => {

          document
            .getElementById("moleculeWin")
            .classList.remove("hidden");

        }, 400);

      }

    });

  });


document
  .getElementById("goSymbols")
  .addEventListener("click", () => {

    showScreen("symbolsScreen");

    loadSymbol();

  });


// ===============================
// المحطة الثالثة: الرموز
// ===============================

const symbols = [

  {
    symbol: "O",
    answer: "الأكسجين",
    options: [
      "الأكسجين",
      "الصوديوم",
      "الهيليوم"
    ]
  },

  {
    symbol: "He",
    answer: "الهيليوم",
    options: [
      "الزئبق",
      "الهيليوم",
      "الأكسجين"
    ]
  },

  {
    symbol: "Na",
    answer: "الصوديوم",
    options: [
      "الصوديوم",
      "الهيليوم",
      "الزئبق"
    ]
  },

  {
    symbol: "Hg",
    answer: "الزئبق",
    options: [
      "الأكسجين",
      "الصوديوم",
      "الزئبق"
    ]
  }

];


let symbolIndex = 0;


function loadSymbol() {

  const item =
    symbols[symbolIndex];

  document
    .getElementById("symbolQuestion")
    .textContent =
      item.symbol;

  document
    .getElementById("symbolNumber")
    .textContent =
      symbolIndex + 1;

  document
    .getElementById("symbolFeedback")
    .textContent = "";

  const box =
    document.getElementById("symbolOptions");

  box.innerHTML = "";


  item.options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "answer-btn";

    button.textContent =
      option;

    button.onclick = () =>
      checkSymbol(
        button,
        option,
        item.answer
      );

    box.appendChild(button);

  });

}


function checkSymbol(
  button,
  selected,
  correct
) {

  const buttons =
    document.querySelectorAll(
      "#symbolOptions .answer-btn"
    );

  buttons.forEach(b => {
    b.disabled = true;
  });


  if (selected === correct) {

    button.classList.add("correct");

    document
      .getElementById("symbolFeedback")
      .textContent =
        "✨ إجابة صحيحة!";

    addScore(5);

  }

  else {

    button.classList.add("wrong");

    document
      .getElementById("symbolFeedback")
      .textContent =
        `الإجابة الصحيحة: ${correct}`;

  }


  setTimeout(() => {

    symbolIndex++;

    if (
      symbolIndex <
      symbols.length
    ) {

      loadSymbol();

    }

    else {

      showScreen(
        "atomPartsScreen"
      );

    }

  }, 1000);

}


// ===============================
// المحطة الرابعة: أجزاء الذرة
// ===============================

const parts = {

  proton: {
    emoji: "➕",
    title: "البروتون",
    text:
      "البروتون يحمل شحنة كهربائية موجبة، ويوجد في نواة الذرة."
  },

  neutron: {
    emoji: "⚪",
    title: "النيوترون",
    text:
      "النيوترون متعادل الشحنة، ويوجد في نواة الذرة."
  },

  electron: {
    emoji: "➖",
    title: "الإلكترون",
    text:
      "الإلكترون يحمل شحنة كهربائية سالبة، ويتحرك حول نواة الذرة."
  }

};


const discoveredParts =
  new Set();


document
  .querySelectorAll(".particle")
  .forEach(particle => {

    particle.addEventListener(
      "click",
      () => {

        const type =
          particle.dataset.part;

        const info =
          parts[type];

        document
          .getElementById("partEmoji")
          .textContent =
            info.emoji;

        document
          .getElementById("partTitle")
          .textContent =
            info.title;

        document
          .getElementById("partText")
          .textContent =
            info.text;

        particle.classList.add(
          "seen"
        );

        discoveredParts.add(type);


        if (
          discoveredParts.size === 3
        ) {

          document
            .getElementById(
              "partsComplete"
            )
            .classList.remove(
              "hidden"
            );

        }

      }
    );

  });


document
  .getElementById("goBuildAtom")
  .addEventListener("click", () => {

    addScore(10);

    showScreen("buildScreen");

  });


// ===============================
// المحطة الخامسة
// ===============================

let buildAnswered = false;


document
  .querySelectorAll(".build-place")
  .forEach(place => {

    place.addEventListener(
      "click",
      () => {

        if (buildAnswered)
          return;

        const answer =
          place.dataset.answer;

        const feedback =
          document.getElementById(
            "buildFeedback"
          );


        if (answer === "orbit") {

          buildAnswered = true;

          feedback.textContent =
            "✨ ممتاز! الإلكترونات تتحرك حول النواة.";

          feedback.style.color =
            "#21836c";

          place.style.background =
            "#dffff3";

          addScore(10);


          setTimeout(() => {

            showScreen(
              "quizScreen"
            );

            loadQuiz();

          }, 1200);

        }

        else {

          feedback.textContent =
            "حاولي مرة أخرى 🔬";

          feedback.style.color =
            "#c44f6d";

        }

      }
    );

  });


// ===============================
// التحدي النهائي
// ===============================

const quiz = [

  {
    question:
      "أي جزء صغير جدًا تكوّن منه المادة؟",

    answers: [
      "الذرة",
      "الخلية",
      "النسيج"
    ],

    correct: "الذرة"
  },

  {
    question:
      "ماذا يمكن أن يتكوّن عند ارتباط ذرتين أو أكثر معًا؟",

    answers: [
      "جزيء",
      "نواة",
      "إلكترون"
    ],

    correct: "جزيء"
  },

  {
    question:
      "ما شحنة البروتون؟",

    answers: [
      "موجبة",
      "سالبة",
      "متعادل"
    ],

    correct: "موجبة"
  },

  {
    question:
      "ما شحنة الإلكترون؟",

    answers: [
      "سالبة",
      "موجبة",
      "متعادل"
    ],

    correct: "سالبة"
  },

  {
    question:
      "أين توجد البروتونات والنيوترونات؟",

    answers: [
      "في النواة",
      "خارج الذرة",
      "في المدار فقط"
    ],

    correct: "في النواة"
  }

];


let quizIndex = 0;
let quizCorrect = 0;


document
  .getElementById("quizTotal")
  .textContent =
    quiz.length;


function loadQuiz() {

  const item =
    quiz[quizIndex];

  document
    .getElementById("quizNumber")
    .textContent =
      quizIndex + 1;

  document
    .getElementById("quizQuestion")
    .textContent =
      item.question;

  document
    .getElementById("quizFeedback")
    .textContent = "";

  const box =
    document.getElementById(
      "quizAnswers"
    );

  box.innerHTML = "";


  item.answers.forEach(answer => {

    const button =
      document.createElement(
        "button"
      );

    button.className =
      "answer-btn";

    button.textContent =
      answer;

    button.onclick = () =>
      checkQuiz(
        button,
        answer,
        item.correct
      );

    box.appendChild(button);

  });

}


function checkQuiz(
  button,
  selected,
  correct
) {

  document
    .querySelectorAll(
      "#quizAnswers .answer-btn"
    )
    .forEach(b => {
      b.disabled = true;
    });


  if (selected === correct) {

    button.classList.add(
      "correct"
    );

    document
      .getElementById("quizFeedback")
      .textContent =
        "🎉 صحيحة!";

    quizCorrect++;

    addScore(10);

  }

  else {

    button.classList.add(
      "wrong"
    );

    document
      .getElementById("quizFeedback")
      .textContent =
        `الصحيح: ${correct}`;

  }


  setTimeout(() => {

    quizIndex++;

    if (
      quizIndex < quiz.length
    ) {

      loadQuiz();

    }

    else {

      showResult();

    }

  }, 950);

}


// ===============================
// النتيجة
// ===============================

function showResult() {

  document
    .getElementById("finalName")
    .textContent =
      student;

  document
    .getElementById("finalScore")
    .textContent =
      score;

  const message =
    document.getElementById(
      "finalMessage"
    );


  if (quizCorrect === 5) {

    message.textContent =
      "مذهلة! أتقنتِ تحدي الذرات بالكامل 🌟";

  }

  else if (quizCorrect >= 3) {

    message.textContent =
      "عمل رائع! أصبحتِ قريبة جدًا من الإتقان 🔬✨";

  }

  else {

    message.textContent =
      "بداية جميلة! أعيدي الرحلة وحاولي رفع نقاطكِ 💜";

  }


  showScreen("resultScreen");

}


document
  .getElementById("restartBtn")
  .addEventListener("click", () => {

    location.reload();

  });