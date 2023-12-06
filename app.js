/*
   In the game I want to track time, score, numberOfHoles
   If the time is up, the game is over
 */
const game = {
  time: 100,
  score: 0,
  gameOver: false,
}

/*
  In this game there are 5 'holes'.
  Generate a random number between 1 and the number of holes,
  To be able to choose one random hole at a time, and make
  the mole peek
 */
function randomHoleNumber(maxNumberOfHoles) {
  const randomNumber = Math.random() * maxNumberOfHoles;
  return Math.floor(randomNumber);
}

/*
  Get reference to the DOM elements, where the count and the score
  should appear.
 */
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');

// get all the divs that represents 'holes'
const holesElements = document.getElementsByClassName('hole');

// this will get executed by a click event on a div.hole
function whack(evt) {
  // if game over, stop here
  if(game.gameOver) return;

  // if the class 'up' exist, it means that I hit the mole,
  // the score should be updated by one
  if(evt.target.classList.contains('up')) {
    // update the game 'state' first.
    game.score += 1;

    // "sync" the ui with the game state
    scoreElement.textContent = game.score;

    // the mole div should have a class named 'hit'
    evt.target.classList.remove('up');
    evt.target.classList.add('hit');

    // And the mole should disappear (leave just the class 'hole') after a period of time
    setTimeout(() => {
      evt.target.classList.remove('hit');
    }, 500)

  }
}

/*
   Handle mole appearance in a random hole.
   Each hole is "independent" - means, that
   A recursive call get executed every period of time
 */
function moleAppear() {
  // Choose random hole
  const randomIndex = randomHoleNumber(holesElements.length);
  const randomHoleElement = holesElements[randomIndex];

  // The class 'up' make the mole appear
  randomHoleElement.classList.add('up');

  // start a timer that will execute moleAppear() again
  // if the game is not over
  const timerId = setTimeout(() => {
    randomHoleElement.classList.remove('up');

    // Stop condition
    if(!game.gameOver) {
      moleAppear();
    } else {
      clearTimeout(timerId);
    }
  }, 1000);
}

// Reset to default values, set event listeners
function initGame() {
  // reset the initial value of time and score from the game state object
  game.time = 35;
  game.score = 0;
  game.gameOver = true;

  // sync the UI with the game state
  timeElement.textContent = game.time;
  scoreElement.textContent = game.score;

  // all divs (holes) should have only 'hole' css class
  for (let i = 0; i < holesElements.length; i++) {
    holesElements[i].className = 'hole';
    holesElements[i].addEventListener('click', whack);
  }

  // First hole should have the class 'start' and
  // click event should start the game
  holesElements[0].classList.add('start');
  holesElements[0].removeEventListener('click', whack);
  holesElements[0].addEventListener('click', startGame);
}

function startGame() {
  game.gameOver = false;

  // This will make the mole with the start sign disappear
  holesElements[0].classList.remove('start');

  // change the click listener from startGame to whack
  holesElements[0].removeEventListener('click', startGame);
  holesElements[0].addEventListener('click', whack);

  //start to count down and update the UI
  const timerId = setInterval(() => {
    // update game state
    game.time -= 1;

    // sync the UI
    timeElement.textContent = game.time;

    // if time is up (0), it means GameOver
    if(game.time === 0) {
      game.gameOver = true;
      clearInterval(timerId);
      initGame();
    }
  }, 1000)

   moleAppear();
}


initGame();









