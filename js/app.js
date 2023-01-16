// Global Variables
const tiles = document.querySelectorAll('.tile')
const xPlayer = 'X'
const oPlayer = 'O'
const results = document.getElementById('finishGame')
const resultsText = document.getElementById('finishText')
const reset = (document.getElementById('restart').onclick = startNew)
const boardState = Array(tiles.length)
boardState.fill(null)
let turn = xPlayer
let turnCounter = 0

//Sounds
const victory = new Audio('assets/Victory.mp3')
const wark = new Audio('assets/Wark.mp3')

//Click Fuction
function tileClick(event) {
  if (results.classList.contains('visible')) {
    return
  }
  const tile = event.target
  const tileNumber = tile.dataset.index

  if (tile.innerText != '') {
    return
  }
  turnCounter = turnCounter + 1
  if (turn === xPlayer) {
    tile.innerText = xPlayer
    boardState[tileNumber] = xPlayer
    turn = oPlayer
  } else {
    tile.innerText = oPlayer
    boardState[tileNumber] = oPlayer
    turn = xPlayer
  }
  checkWinner()
  checkTie()
}

//Checks for winner
function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const combo = winningCombination.combo
    const tileValue1 = boardState[combo[0]]
    const tileValue2 = boardState[combo[1]]
    const tileValue3 = boardState[combo[2]]

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      gameOver()
    }
  }
}

//Checks for a tie
function checkTie() {
  if (turnCounter >= 9) {
    text = 'All members have passed out'
    results.className = 'visible'
    resultsText.innerText = text
    wark.play()
  } else {
    return
  }
}

//Reveals winner
function gameOver() {
  turnCounter = 0
  if (turn == 'O') {
    text = 'X defeats O!'
  } else {
    text = 'O defeats X!'
  }
  results.className = 'visible'
  resultsText.innerText = text
  victory.play()
}

//Restarts game
function startNew() {
  turnCounter = 0
  results.className = 'hidden'
  boardState.fill(null)
  tiles.forEach((tile) => (tile.innerText = ''))
  turn = xPlayer
  results
}

//Winning Combos
const winningCombinations = [
  { combo: [0, 1, 2] },
  { combo: [3, 4, 5] },
  { combo: [6, 7, 8] },
  { combo: [0, 3, 6] },
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },
  { combo: [0, 4, 8] },
  { combo: [2, 4, 6] }
]

// Event Listeners
tiles.forEach((tile) => tile.addEventListener('click', tileClick))
