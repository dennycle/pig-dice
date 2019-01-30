function Game() {
  this.players = [],
  this.playerId = 0
}

Game.prototype.addPlayer = function(player) {
  this.players.push(player);
  player.id = this.playerId;
  this.playerId += 1;
}

Game.prototype.findPlayer = function(id) {
  for (var i = 0; i <this.players.length; i++) {
    if (this.players[i]) {
      if (this.players[i].id == id) {
        return this.players[i];
      }
    }
  };
  return false;
}

function Player(){
  this.score = 0,
  this.roundScore = 0
}

Player.prototype.clearRoundScore = function() {
  this.roundScore = 0;
}

Player.prototype.Hold = function() {
  this.score = this.roundScore + this.score;
  this.roundScore = 0;
}

Player.prototype.RollTheDie = function(dieScore) {
  if (dieScore == 1) {
    this.roundScore = 0;
    return false;
  } else {
    this.roundScore += dieScore;
    if (this.roundScore + this.score >= 100){
      this.score += this.roundScore;
      return this.score;

    }
    return this.roundScore;
  }
};
function getRandom() {
  return Math.floor(Math.random() * (7 - 1) + 1);
};

var player1 = new Player();
var player2 = new Player();

function emptyRoundScore() {
  $("#die").text("0");
  $("#roundScore").text("0");
}

function scoreCheck(result, userId){
  var nextId = userId + 1;
  if (userId === 2) {
    nextId = 1;
  }
  if (result >= 100){
    alert("Player " + userId + " wins!");
  } else if (result === false) {
    disableButtons(userId, nextId);
    emptyRoundScore();
    alert("Player " + nextId + "'s turn.");
  } else {
    $("#roundScore").text(result);
  }
}

function disableButtons(id1, id2){
  $("#rollDie" + id1).prop("disabled",true);
  $("#hold" + id1).prop("disabled",true);
  $("#rollDie" + id2).prop("disabled",false);
  $("#hold" + id2).prop("disabled",false);
}

$(document).ready(function() {
  $("#rollDie1").click(function() {
    var dieScore = getRandom();
    $("#die").text(dieScore);
    var result = player1.RollTheDie(dieScore);
    scoreCheck(result, 1);
  });

  $("#hold1").click(function() {
    player1.Hold();
    $("#score1").text(player1.score);
    disableButtons(1, 2);
    emptyRoundScore();
  });

  $("#rollDie2").click(function() {
    var dieScore = getRandom();
    $("#die").text(dieScore);
    var result = player2.RollTheDie(dieScore);
    scoreCheck(result, 2);
  });

  $("#hold2").click(function() {
    player2.Hold();
    $("#score2").text(player2.score);
    disableButtons(2, 1);
    emptyRoundScore();
  });

});
