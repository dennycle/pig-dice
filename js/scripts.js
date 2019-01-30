function Player(){
  this.score = 0,
  this.roundScore = 0
}

Player.prototype.Hold = function() {
  this.score = this.roundScore + this.score;
  this.roundScore = 0;
}

Player.prototype.RollTheDie = function(diceScore, hasOne) {
  if (hasOne == true) {
    this.roundScore = 0;
    return false;
  } else {
    this.roundScore += diceScore;
    if (this.roundScore + this.score >= winningScore){
      this.score += this.roundScore;
      return this.score;
    }
    return this.roundScore;
  }
};

function Die(){
  this.point = 0
}

Die.prototype.roll = function() {
  this.point = getRandom();
  return this.point;
}

function Dice(){
  this.totalPoints = 0,
  this.hasOne = false,
  this.dice = [],
  this.currentId = 0
}

Dice.prototype.reset = function() {
  this.totalPoints = 0;
  this.hasOne = false;
}

Dice.prototype.addDie = function(die) {
  die.id = this.currentId;
  this.currentId += 1;
  this.dice.push(die);
}

Dice.prototype.findDie = function(id) {
  for (var i=0; i< this.dice.length; i++) {
    if (this.dice[i]) {
      if (this.dice[i].id == id) {
        return this.dice[i];
      }
    }
  };
  return false;
}

Dice.prototype.start = function() {
  for (var i=0; i< this.dice.length; i++) {
    if (this.dice[i]) {
      var diePoints = this.dice[i].roll();
      if (diePoints === 1){
        this.hasOne = true;
      } else {
        this.totalPoints += diePoints;
      }
    }
  };
  return false;
}

function getRandom() {
  return Math.floor(Math.random() * 6 + 1);
};

function emptyRoundScore() {
  $("#roundScore").text("0");
}

function emptyDiceScore() {
  $("#die1").text("0");
  $("#die2").text("0");
}

var player1 = new Player();
var player2 = new Player();
var winningScore = 100;
var allDice = new Dice();

function displayPlayerScore(result, userId){
  var nextId = userId + 1;
  if (userId === 2) {
    nextId = 1;
  }
  if (result >= winningScore){
    alert("Player " + userId + " wins!");
    $("#reset").show();
    disableButtons(1);
    disableButtons(2);

  } else if (result === false) {
    disableButtons(userId);
    enableButtons(nextId);
    emptyRoundScore();
    displayDiePoints(allDice);
    alert("You rolled a 1! Player " + nextId + "'s turn.");
  } else {
    $("#roundScore").text(result);
  }
}

function disableButtons(id) {
  $("#rollDie" + id).prop("disabled",true);
  $("#hold" + id).prop("disabled",true);
}
function enableButtons(id) {
  $("#rollDie" + id).prop("disabled",false);
  $("#hold" + id).prop("disabled",false);
}

function displayDiePoints(dice){
  dice.dice.forEach(function(die){
    var tagId = parseInt(die.id) + 1;
    $("#die"+ tagId).text(die.point);
  })
};

$(document).ready(function() {

  var die1 = new Die();
  var die2 = new Die();
  allDice.addDie(die1);
  allDice.addDie(die2);

  $("#rollDie1").click(function() {
    allDice.start();
    displayDiePoints(allDice);
    console.log(allDice);
    var result = player1.RollTheDie(allDice.totalPoints, allDice.hasOne);
    displayPlayerScore(result, 1);
    allDice.reset();
  });

  $("#hold1").click(function() {
    player1.Hold();
    $("#score1").text(player1.score);
    disableButtons(1);
    enableButtons(2);
    emptyRoundScore();
  });

  $("#rollDie2").click(function() {
    allDice.start();
    displayDiePoints(allDice);
    console.log(allDice);
    var result = player2.RollTheDie(allDice.totalPoints, allDice.hasOne);
    displayPlayerScore(result, 2);
    allDice.reset();
  });

  $("#hold2").click(function() {
    player2.Hold();
    $("#score2").text(player2.score);
    disableButtons(2);
    enableButtons(1);
    emptyRoundScore();
  });

  $("#reset").click(function(){
    location.reload();
  });

});
