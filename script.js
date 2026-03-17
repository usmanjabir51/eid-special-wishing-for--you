function goToResult() {
  const nameField = document.getElementById("name");
  const wishField = document.getElementById("wish");

  if (!nameField || !wishField) return;

  const name = nameField.value.trim();
  const wish = wishField.value.trim();

  if (!name || !wish) {
    alert("Please fill in both fields.");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("wish", wish);

  window.location.href = "result.html";
}

function showWishPage() {
  const typeBox = document.getElementById("type");
  if (!typeBox) return;

  const urlParams = new URLSearchParams(window.location.search);

  const name =
    urlParams.get("name") ||
    localStorage.getItem("name") ||
    "Friend";

  const wish =
    urlParams.get("wish") ||
    localStorage.getItem("wish") ||
    "happiness";

  const messages = [
    `✨ Dear ${name}, may your life shine with ${wish}, happiness and endless success.`,
    `🌙 ${name}, may your days be filled with ${wish} and your life with blessings.`,
    `💫 ${name}, may Allah grant you ${wish} and protect you always. Ameen.`,
    `🌟 ${name}, may your journey be full of ${wish}, love and happiness.`,
    `🌸 ${name}, may every step bring you closer to ${wish} and success.`,
    `✨ ${name}, may your heart stay peaceful and your life full of ${wish}.`
  ];

  const text = messages[Math.floor(Math.random() * messages.length)];
  window.currentWishText = text;
  window.currentName = name;
  window.currentWish = wish;

  let i = 0;
  typeBox.innerHTML = "";

  function typeEffect() {
    if (i < text.length) {
      typeBox.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeEffect, 30);
    }
  }

  typeEffect();

  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  }
}

function generateLink() {
  const name = window.currentName || "Friend";
  const wish = window.currentWish || "happiness";

  const base = window.location.href.split("?")[0];
  return `${base}?name=${encodeURIComponent(name)}&wish=${encodeURIComponent(wish)}`;
}

function shareWhatsApp() {
  const fullText =
    (window.currentWishText || "Eid Mubarak!") +
    "\n\nussy kehna keh bin tery bohat eidain guzaarii hain.\n" +
    "is baar to milny aa jao suna hy eid aai hy 🌙\n\n" +
    generateLink();

  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
  window.open(whatsappURL, "_blank");
}

function downloadImage() {
  const card = document.getElementById("card");
  if (!card || typeof html2canvas !== "function") return;

  html2canvas(card).then((canvas) => {
    const link = document.createElement("a");
    link.download = "eid-wish.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function goBack() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");

  if (generateBtn) {
    generateBtn.addEventListener("click", goToResult);
  }

  showWishPage();
});