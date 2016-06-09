/* global $ */

// A constructor function allows us to easily make question objects     //TO ASK: how does this constructor function work?
function Question (qn, options, answerIndex) {
  this.qn = qn
  this.options = options
  this.answerIndex = answerIndex
}

// using the new keyword and the constructor we can create questions for the quiz
var question1 = new Question('What is my name', ['David', 'R2D2', 'Chewbacca', 'Darth Sidius'], 0)
var question2 = new Question('Am I a jedi?', ['Yes', 'No', 'Not yet', 'Never'], 2)
var question3 = new Question("Is Jar Jar Binks a Sith Lord", ["I don't know", 'Maybe', "YES", "NOOOOO"], 2)
var question4 = new Question("Is Qui-gon Jin useless?", ["Yes", "No", "Maybe", "Who?"], 0)
var question5 = new Question("Who is Rey's Father", ["Luke", "Obi-Wan", "George Lucas", "Mickey Mouse"], 1)
var question6 = new Question("How many Jedi babies did Anakin Skywalker kill?", ["200", "5", "404", "0. He's a good guy"], 0)
var question7 = new Question("Who is Snoke?", ["Darth Sidius", "Darth Vader", "Severus Snape", "Jar Jar Binks"], 0)
var question8 = new Question("Will there be balance in the force?", ["Yes", "No", "NOOO!!!", "Only in episode 3"], 0)

// we can create an object to represent all of the settings and scores for the quiz
var quiz = {
  currentQuestion: 0,
  questions: [question1, question2, question3, question4, question5, question6, question7, question8],
  isGameOver: false,
  player1Score: 0,
  player2Score: 0,
  whoseTurn: 1
}

// numberOfQuestions should return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length
}

// currentQuestion should return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion
}

// correctAnswer should return an integer that is the zero-based index the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].answerIndex // can we also do quiz.questions[quiz.currentQuestion][2] ??
}

// numberOfAnswers should return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].options.length
}

function whoseTurn() {
  if (quiz.currentQuestion < 4) {
    quiz.whoseTurn = 1
    $('#player1').addClass("highlight")
  }
  else if (quiz.currentQuestion >= 4) {
    quiz.whoseTurn = 2
  }
}

// playTurn should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn (choice) {
  if (quiz.isGameOver === true) {
    return false
  }
  var correct
  if (choice == correctAnswer()) {
    correct = true
    if (quiz.whoseTurn === 1) {
      quiz.player1Score++
    } else if (quiz.whoseTurn === 2){
      quiz.player2Score++
    }
  } else {
    correct = false
  }
  quiz.currentQuestion++

  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return correct
}

// isGameOver should return a true or false if the quiz is over.
function isGameOver () {
  return quiz.isGameOver
}

// whoWon should return 0 if the game is not yet finished, 1 or 2 depending on which player won, else 3 if the game is a draw.
function whoWon () {
  if (quiz.isGameOver === false) return 0
  if (quiz.player1Score > quiz.player2Score) return 1
  if (quiz.player2Score > quiz.player1Score) return 2
  else return 3
}

// restart should restart the game so it can be played again.
function restart () {
  quiz.currentQuestion = 0
  quiz.player1Score = 0
  quiz.player2Score = 0
  quiz.isGameOver = false
}

// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {
    $('h1').text('Game Over. The winner is ' + whoWon())
  } else {
    $('h1').text('Question: ' + quiz.questions[quiz.currentQuestion].qn)
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].options[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].options[1])
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].options[2])
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].options[3])
  }
  // update player scores regardless
  $('h2').eq(0).text('Current player: Player ' + quiz.whoseTurn)
  $('h3').eq(0).text('Player 1: ' + quiz.player1Score)
  $('h3').eq(1).text('Player 2: ' + quiz.player2Score)
}

// the jQuery ready function will add click listeners once the dom is loaded
$(function () {
  $('button').click(function () {
    // if gameover then restart else log a player turn
    if (isGameOver()) {
      restart()
    } else {
      // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
      whoseTurn()
      playTurn($(this).index())
    }
    updateDisplay()
  })
  // update the display for the first time
  updateDisplay()
})
