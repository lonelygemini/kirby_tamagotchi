let hunger = 5
let happiness = 5
let isAsleep = false

const feedMessages = [
  "Nom nom! Delicious!",
  "Thank you for the food!",
  "Yum! My favorite dessert!",
  "Do you want to eat with me?",
  "Yaay!"
];

const playMessages = [
  "That was gun!",
  "Play with me more!",
  "I'm so happy playing with you!",
  "Hahaha!",
  "Play with me again?"
];

function getRandomMessage(messages) {
  const index = Math.floor(Math.random() * messages.length)
  return messages[index];
}

function updateStats() {
  document.getElementById("hunger").textContent = hunger
  document.getElementById("happiness").textContent = happiness
}

function showMessage(text) {
    document.getElementById("message-box").textContent = text
  }

  function playSound(id) {
    const sound = document.getElementById(id)
    sound.currentTime = 0;
    sound.play();
  }

  function changeFace(imageName) {
    document.getElementById("tamagotchi-face").src = "images/"+ imageName +".png"
  }

function checkSleepCondition() {
  if (hunger === 0 && happiness === 10) {
    isAsleep = true;
    showMessage("So...sleepy...")
    changeFace("sleep");
    playSound("sleep-sound")
  } 
}

function feed() {
  if (isAsleep) {
    showMessage("..hrm...")
    return;
  }

  if (hunger > 0) {
    hunger--;
    updateStats()
    showMessage(getRandomMessage(feedMessages))
    playSound("feed-sound")
    changeFace("eating")
    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500);
    checkSleepCondition()
  } else {
    showMessage("I don't want anymore...")
    changeFace("full")
    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500)
  }
}

function play() {
  if (isAsleep) {
    showMessage("Zzzz...")
    return;
  }

  if (happiness < 10) {
    happiness++
    updateStats()
    showMessage(getRandomMessage(playMessages))
    playSound("play-sound")
    changeFace("happy")
    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500);
    checkSleepCondition()
  } else {
    showMessage("I'm tired.")
    changeFace("full");
    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500)
  }
}
  

function reset() {
  hunger = 5
  happiness = 5
  isAsleep = false
  updateStats()
  showMessage("Good morning!")
  playSound("reset-sound")
  changeFace("reset")
  setTimeout(() => changeFace("normal"), 1500)
}
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("feed-btn").addEventListener("click", feed)
    document.getElementById("play-btn").addEventListener("click", play)
    document.getElementById("reset-btn").addEventListener("click", reset)
    updateStats();
})

// Automatisch updaten bij starten
updateStats()

// The character and sounds are from Nintendo. https://www.nintendo.co.jp/networkservice_guideline/en/index.html