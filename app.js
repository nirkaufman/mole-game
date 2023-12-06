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
const time = document.getElementById('time');
const score = document.getElementById('score');

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
    score.textContent = game.score;

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


/*
   The initial state of the game should be as followed:
   1. timer should display the initial value from the game state object
   2. One hole should have the class 'start' - the others should have only 'hole'
   3. When clicking the hole with the class 'start':
    - remove the class 'start'. remove the click listener from the 'start' div
    - add click event listeners to all the holes executing 'whack()'
   4. update the counter with the current time
   5. if time is up (0), change the game.gameOver flag to true
 */

for (let i = 0; i < holesElements.length; i++) {
  holesElements[i].addEventListener('click', whack)
}








