const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");
const bgm = document.getElementById("bgm");
const bgmBtn = document.getElementById("bgmBtn");

let isPlaying = false;

enterBtn.addEventListener("click", async () => {
  enterScreen.classList.add("hide");

  try {
    await bgm.play();
    isPlaying = true;
    bgmBtn.textContent = "Ⅱ";
  } catch (e) {
    console.log("BGM 재생 실패:", e);
  }

  setTimeout(() => {
    enterScreen.style.display = "none";
  }, 1200);
});

if (bgmBtn) {
  bgmBtn.addEventListener("click", async () => {
    if (isPlaying) {
      bgm.pause();
      bgmBtn.textContent = "▶";
      isPlaying = false;
    } else {
      await bgm.play();
      bgmBtn.textContent = "Ⅱ";
      isPlaying = true;
    }
  });
}

const volumeControl = document.getElementById("volumeControl");

bgm.volume = 0.45;

volumeControl.addEventListener("input", () => {
  bgm.volume = volumeControl.value;
});

const tabBtns = document.querySelectorAll(".char-tabs button");
const cards = document.querySelectorAll(".char-card");

const modal = document.getElementById("charModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalFaction = document.getElementById("modalFaction");
const modalPosition = document.getElementById("modalPosition");
const modalLevel = document.getElementById("modalLevel");
const modalAge = document.getElementById("modalAge");
const modalDesc = document.getElementById("modalDesc");
const modalLine = document.getElementById("modalLine");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

let visibleCards = Array.from(cards);
let currentIndex = 0;

function refreshVisibleCards() {
  visibleCards = Array.from(cards).filter(card => card.style.display !== "none");
}

function openModal(index) {
  refreshVisibleCards();

  currentIndex = index;
  const card = visibleCards[currentIndex];

  modalImg.src = card.dataset.img || "";
  modalName.textContent = card.dataset.name || "";
  modalRole.textContent = card.dataset.role || "";
  modalFaction.textContent = card.dataset.faction || "";
  modalPosition.textContent = card.dataset.role || "";
  modalLevel.textContent = card.dataset.level || "";
  modalAge.textContent = card.dataset.age || "";
  modalDesc.textContent = card.dataset.desc || "";
  modalLine.textContent = card.dataset.line ? `“${card.dataset.line}”` : "";

  modal.classList.add("show");
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    refreshVisibleCards();
    openModal(visibleCards.indexOf(card));
  });
});

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.group === filter ? "block" : "none";
    });

    refreshVisibleCards();
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

modalPrev.addEventListener("click", () => {
  refreshVisibleCards();
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openModal(currentIndex);
});

modalNext.addEventListener("click", () => {
  refreshVisibleCards();
  currentIndex = (currentIndex + 1) % visibleCards.length;
  openModal(currentIndex);
});
