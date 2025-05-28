let hunger = 5
let happiness = 5
let isAsleep = false
let typewriterTimeouts = []

// These variables track the Tamagotchi's state. 
// 'let' is used because the values will change during interaction.

const feedMessages = [
  "Nom nom! Delicious!",
  "Thank you for the food!",
  "Yum! My favorite dessert!",
  "Do you want to eat with me?",
  "Yaay!"
]

const playMessages = [
  "That was fun!",
  "Play with me more!",
  "I'm so happy playing with you!",
  "Hahaha!",
  "Play with me again?"
]

// 'const' is used because the arrays don't change. 
// They store possible messages that are shown when feeding or playing.

function getRandomMessage(messages) {
  const index = Math.floor(Math.random() * messages.length)
  return messages[index]
}

// Picks a random message from an array. 
// Math.random() gives a decimal between 0 and 1, multiplied by the array length.
// Math.floor() makes sure it's a whole number.

function updateStats() {
  document.getElementById("hunger").textContent = hunger
  document.getElementById("happiness").textContent = happiness
}

// Updates the hunger and happiness values on the screen.

function showMessage(text) {
  const box = document.getElementById("message-box")
  box.textContent = ""

  typewriterTimeouts.forEach(timeout => clearTimeout(timeout))
  typewriterTimeouts = []

  let i = 0

  function type() {
    if (i < text.length) {
      box.textContent += text.charAt(i)
      const timeout = setTimeout(type, 40)
      typewriterTimeouts.push(timeout)
      i++
    }
  }

  type()
}

// Shows a message in the message box, with a typewriter animation
// https://www.w3schools.com/howto/howto_js_typewriter.asp

function playSound(id) {
  const sound = document.getElementById(id)
  sound.currentTime = 0
  sound.play()
}

// Plays a sound by resetting its time and calling play().

function changeFace(imageName) {
  document.getElementById("tamagotchi-face").src = "images/" + imageName + ".png"
}

// Changes the image of the Tamagotchi based on the situation.

function checkSleepCondition() {
  if (hunger === 0 && happiness === 10) {
    isAsleep = true
    showMessage("So...sleepy...")
    changeFace("sleep")
    playSound("sleep-sound")
  }
}

// Checks if the Tamagotchi should fall asleep: when hunger is 0 and happiness is 10.

function feed() {
  if (isAsleep) {
    showMessage("..hrm...")
    return
  }

  if (hunger > 0) {
    hunger--
    updateStats()
    showMessage(getRandomMessage(feedMessages))
    playSound("feed-sound")
    changeFace("eating")

    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500)

    checkSleepCondition()
  } else {
    showMessage("I don't want anymore...")
    changeFace("full")

    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500)
  }
}

// Feeds the Tamagotchi. Hunger decreases unless it's already at 0.
// It also checks if the Tamagotchi is asleep or should fall asleep.

function play() {
  if (isAsleep) {
    showMessage("Zzzz...")
    return
  }

  if (happiness < 10) {
    happiness++
    updateStats()
    showMessage(getRandomMessage(playMessages))
    playSound("play-sound")
    changeFace("happy")

    setTimeout(() => {
      if (!isAsleep) changeFace("normal")
    }, 1500)

    checkSleepCondition()
  } else {
    showMessage("I'm tired.")
    changeFace("full")

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

document.getElementById("feed-btn").addEventListener("click", feed)
document.getElementById("play-btn").addEventListener("click", play)
document.getElementById("reset-btn").addEventListener("click", reset)

updateStats()

// The character and sounds are from Nintendo. 
// https://www.nintendo.co.jp/networkservice_guideline/en/index.html